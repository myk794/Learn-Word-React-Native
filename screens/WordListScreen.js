import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { useLayoutEffect, useState } from 'react'
import WordBlock from './components/WordBlock';
import { useSQLiteContext } from 'expo-sqlite';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
export default function WordListScreen() {
  const navigation = useNavigation();
  const [words, setWords] = useState()

  const db = useSQLiteContext();

  const deleteWord = async (id) => {
    await db.runAsync(`DELETE FROM words WHERE id = ?`, [id]);
    const updated = await db.getAllAsync(`SELECT * FROM words`);
    setWords(updated);
    Toast.show({
      type: 'customInfo',
      text1: 'Deleted item!',
      visibilityTime: 2000,
      position: 'bottom',
    });

  }
  const toastConfig = {
    customInfo: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'rgb(17, 82, 115)', backgroundColor: 'black' }} // 👈 Arka plan
        text1Style={{ color: 'white' }} // Yazı rengi
        text2Style={{ color: 'white' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      />
    ),
  };
  useLayoutEffect(() => {
    async function fetchWords() {
      const result = await db.getAllAsync(`SELECT * FROM words`);
      await setWords(result);

    }

    fetchWords();

  }, []);
  const backButtonHandler = () => {
    navigation.navigate('HomeScreen');
  }
  return (


    <View style={styles.container}>
      <View style={styles.head}>

        <Text style={styles.headerText}>Word List</Text>
        <TouchableOpacity style={styles.backButton} onPress={backButtonHandler}>
          <AntDesign name="back" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {words.length === 0 ? (<Text style={styles.noWord}>You have no words.</Text>) : (<FlatList
        data={words}
        renderItem={({ item }) => <WordBlock tr={item.tr} en={item.en} onDelete={() => deleteWord(item.id)} />}
        keyExtractor={item => item.id} />)}
      
      <Toast config={toastConfig} />
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: '10%',
  },
  noWord: {
    color: 'rgb(17, 82, 115)',
    alignSelf: 'center',
    textAlign: 'center',
    top: '45%',
  },
  head: {
    flexDirection: 'row',

    width: '90%',
    alignSelf: 'center'
  },
  headerText: {
    color: 'rgb(17, 82, 115)',
    fontSize: 20,
    fontWeight: 600,
    alignSelf: 'center',
    textAlign: 'center',
    marginLeft: 10,
    flex: 1,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: 'rgb(17, 82, 115)',
    padding: 5,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginLeft: 'auto',
  }
})