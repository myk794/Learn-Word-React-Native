import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useState, useEffect } from 'react';
import React from 'react'
import { useSQLiteContext } from 'expo-sqlite';

export default function LearnScreen() {
  const db = useSQLiteContext();
  const [words, setWords] = useState([{ "en": "phone", "id": 1, "tr": "telefon" }, { "en": "bag", "id": 2, "tr": "çanta" }, { "en": "cup", "id": 3, "tr": "bardak" }, { "en": "keyboard", "id": 4, "tr": "klavye" }]);

  useEffect(() => {
    async function fetchWords() {
      const result = await db.getAllAsync(`SELECT * FROM words`);
      console.log("DB CONTENT:", result);
      setWords(result);

    }

    fetchWords();
  }, [])


  function onSwipedLeft() {
    console.log("Swiped Left!");

  }
  function onSwipedRight() {
    console.log("Swiped Right");
  }
  return (
    <View style={styles.container}>
      <Swiper
        cards={words}
        renderCard={(item) => {
          return (
            <View style={styles.card}>
              <Text style={styles.text}>{item.en}</Text>
            </View>
          )
        }}
        keyExtractor={(item) => item.id.toString()}
        verticalSwipe={false}
        onSwiped={(cardIndex) => { console.log(cardIndex) }}
        onSwipedLeft={onSwipedLeft}
        onSwipedRight={onSwipedRight}
        onSwipedAll={() => { console.log('onSwipedAll') }}
        cardIndex={0}
        backgroundColor={'#4FD0E9'}
        stackSize={4}>

        <Button
          onPress={() => { console.log('oulala') }}
          title="Press me">
          You can press me
        </Button>
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  card: {
    width: 200,
    height: 100,
    flex: 1,
    borderRadius: 42,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#115273",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    textAlign: "center",
    fontSize: 32,
    backgroundColor: "transparent",
    color: "white",
  }
})