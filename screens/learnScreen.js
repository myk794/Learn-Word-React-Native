import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useState, useEffect, useRef } from 'react';
import React from 'react'
import { useSQLiteContext } from 'expo-sqlite';

export default function LearnScreen() {
  const db = useSQLiteContext();
  const swiperRef = useRef(null);
  const [words, setWords] = useState([{ "en": "phone", "id": 1, "tr": "telefon" }, { "en": "bag", "id": 2, "tr": "çanta" }, { "en": "cup", "id": 3, "tr": "bardak" }, { "en": "keyboard", "id": 4, "tr": "klavye" }]);
  const [score,setScore]= useState(0);
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
       <Text style={styles.infoText}>swipe left or right</Text>
      <Swiper
        cards={words}
        ref={swiperRef}
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
        onSwipedAll={() =>{console.log("All cards swiped!")}}
        cardIndex={0}
        backgroundColor={'#FFFFFF'}
        stackSize={4}>
        
        
      </Swiper>
      <Text style={styles.yourScoreHeader}>Your Score</Text>
      <Text style={styles.score}>{score}</Text>
      <Text style={styles.infoText}>swipe left or right</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',

  },
  card: {
     
    width: 200,
    height: 300,
   
    marginTop: 'auto',
    borderRadius: 42,
    alignSelf: "center",
    backgroundColor: "#115273",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    top: 50,
    textAlign: 'center',
    fontSize: 24,
    backgroundColor: "transparent",
    color: "white",
  },
  infoText:{
    fontSize: 16,
    color: 'gray',
    alignSelf:'center',
    position: 'absolute',
    marginTop: '55%',
     
  },
  yourScoreHeader:{
    fontSize: 36,
    color: "#115273",
    alignSelf:'center',
    position: 'absolute',
    marginTop: '10%',
  },
  score:{
    fontSize: 24,
    color: "#115273",
    alignSelf:'center',
 position: 'absolute',
     marginTop: '30%',

    },
})