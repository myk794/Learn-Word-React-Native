import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import Toast, { BaseToast } from 'react-native-toast-message';
import { wordPacks } from '../assets/wordPacks';
import useWords from '../hooks/useWords';

export default function WordPacksScreen() {
  const navigation = useNavigation();
  const { addWords } = useWords();

  const toastConfig = {
    customInfo: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'rgb(17, 82, 115)', backgroundColor: 'black' }}
        text1Style={{ color: 'white' }}
        text2Style={{ color: 'white' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      />
    ),
  };

  const handleAdd = async (pack) => {
    const added = await addWords(pack.words);
    Toast.show({
      type: 'customInfo',
      text1: added > 0 ? `${added} kelime eklendi` : 'Bu paket zaten ekli',
      visibilityTime: 2000,
      position: 'bottom',
    });
  };

  const backButtonHandler = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.headerText}>Word Packs</Text>
        <TouchableOpacity style={styles.backButton} onPress={backButtonHandler}>
          <AntDesign name="back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={wordPacks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.packCard}>
            <View style={styles.packInfo}>
              <Text style={styles.packName}>{item.name}</Text>
              <Text style={styles.packDesc}>{item.description}</Text>
              <Text style={styles.packCount}>{item.words.length} kelime</Text>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={() => handleAdd(item)}>
              <AntDesign name="plus" size={20} color="white" />
              <Text style={styles.addButtonText}>Ekle</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Toast config={toastConfig} />
    </View>
  );
}

const PRIMARY = 'rgb(17, 82, 115)';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: '10%',
  },
  head: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
  },
  headerText: {
    color: PRIMARY,
    fontSize: 20,
    fontWeight: '600',
    alignSelf: 'center',
    textAlign: 'center',
    marginLeft: 10,
    flex: 1,
  },
  backButton: {
    backgroundColor: PRIMARY,
    padding: 5,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginLeft: 'auto',
  },
  list: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  packCard: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: PRIMARY,
    borderWidth: 3,
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    backgroundColor: 'white',
  },
  packInfo: {
    flex: 1,
    paddingRight: 10,
  },
  packName: {
    color: PRIMARY,
    fontSize: 18,
    fontWeight: '700',
  },
  packDesc: {
    color: '#5a7688',
    fontSize: 13,
    marginTop: 2,
  },
  packCount: {
    color: PRIMARY,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 6,
  },
  addButton: {
    backgroundColor: PRIMARY,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignItems: 'center',
    flexDirection: 'row',
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
    marginLeft: 4,
  },
});
