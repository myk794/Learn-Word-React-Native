import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import React from 'react'
import { useSQLiteContext } from 'expo-sqlite';
import { LinearGradient } from 'expo-linear-gradient';
import HomeButton from './components/HomeButton';
import { useNavigation } from '@react-navigation/native';
export default function LearnScreen() {
  const db = useSQLiteContext();
  const swiperRef = useRef(null);
  const [words, setWords] = useState([{ "en": "phone", "id": 1, "tr": "telefon" },
  { "en": "bag", "id": 2, "tr": "çanta" },
  { "en": "cup", "id": 3, "tr": "bardak" },
  { "en": "keyboard", "id": 4, "tr": "klavye" },
  { "en": "frame", "id": 5, "tr": "çerçeve" },
  { "en": "mouse", "id": 6, "tr": "fare" },
  { "en": "mother", "id": 7, "tr": "anne" },
  { "en": "glass", "id": 8, "tr": "cam" }]);
  const [score, setScore] = useState(0);
  const [leftText, setLeftText] = useState("araba");
  const [rightText, setRightText] = useState("bilgisayar");

  const [randomWord, setRandomWord] = useState('test_random');
  const [correctWord, setCorrectWord] = useState('test_correct');
  const [correctDirection, setCorrectDirection] = useState("left");

  const [counter, setCounter] = useState(0);

  const navigation = useNavigation();
  const homeButtonHandler = () => {
    navigation.navigate('HomeScreen');
  }
  useLayoutEffect(() => {
    async function fetchWords() {
      const result = await db.getAllAsync(`SELECT * FROM words`);
      await setWords(result);
    }

    fetchWords();

  }, [])
  useEffect(() => {
    setWordsTexts(words[0]);

  }, [words])
  function onSwipedLeft(word) {
    if (correctDirection === "left") {
      console.log("CORRECT!");
      setScore(score + 1);

    }
    setWordsTexts(word);
    console.log("Swiped Left!");
  }
  function onSwipedRight(word) {

    if (correctDirection === "right") {
      console.log("CORRECT!");
      setScore(score + 1);

    }
    setWordsTexts(word);
    console.log("Swiped Right");

  }
  async function setWordsTexts(word) {
    const answers = await getWordAnswers(word);


    await setRandomWord(answers.random);
    await setCorrectWord(answers.correct);

    // 0: left --- 1:right
    const direction = Math.round(Math.random());
    if (direction === 0) {
      await setCorrectDirection("left");
      await setLeftText(answers.correct);
      await setRightText(answers.random);
    }
    else {
      await setCorrectDirection("right");
      await setLeftText(answers.random);
      await setRightText(answers.correct);
    }
  }
  function getWordAnswers(word) {

    const targetWord = words.find(word1 => word1.id === word.id);

    if (!targetWord) {
      return { error: "Belirtilen id'ye sahip kelime bulunamadı." };
    }

    const otherWords = words.filter(word1 => word1.id !== word.id);

    if (otherWords.length === 0) {
      return { error: "Başka kelime yok." };
    }

    const randomIndex = Math.floor(Math.random() * otherWords.length);
    const randomWord = otherWords[randomIndex];

    return {
      correct: targetWord.tr,
      random: randomWord.tr,
    };
  }
  return (



    <View style={styles.container}>

      <Text style={styles.infoText}>swipe left or right</Text>
      <View style={styles.swiper}>
        <Swiper
          cards={words}
          ref={swiperRef}
          renderCard={(item, cardIndex) => {
            return (
              <View style={styles.card}>
                <Text style={styles.text}>{item.en}</Text>
                <Text style={styles.nextWord}>{words[cardIndex + 1 === words.length ? 0 : cardIndex + 1]?.en ?? "?"}</Text>
                <Text style={styles.nextWord}>{words[cardIndex + 2 === words.length ? 0 : cardIndex + 2]?.en ?? "?"}</Text>
                <Text style={styles.nextWord}>{words[cardIndex + 3 === words.length ? 0 : cardIndex + 3]?.en ?? "?"}</Text>
                <Text style={styles.nextWord}>{words[cardIndex + 4 === words.length ? 0 : cardIndex + 4]?.en ?? "?"}</Text>
                <Text style={styles.nextWord}>{words[cardIndex + 5 === words.length ? 0 : cardIndex + 5]?.en ?? "?"}</Text>
                <Text style={styles.nextWord}>{words[cardIndex + 6 === words.length ? 0 : cardIndex + 6]?.en ?? "?"}</Text>
                <LinearGradient
                  // Background Linear Gradient
                  colors={['transparent', '#115273']}
                  style={styles.gradientOverlay}
                />
              </View>
            )
          }}
          keyExtractor={(item) => item.id.toString()}
          verticalSwipe={false}
          onSwiped={() => { setCounter(counter + 1) }}
          onSwipedLeft={(cardIndex) => { onSwipedLeft(words[cardIndex + 1]) }}
          onSwipedRight={(cardIndex) => { onSwipedRight(words[cardIndex + 1]) }}
          onSwipedAll={() => { console.log("All cards swiped!") }}
          cardIndex={0}
          backgroundColor={'#FFFFFF'}
          infinite={true}
          stackSize={4}>

        </Swiper>
      </View>

      <Text style={styles.yourScoreHeader}>Your Score</Text>
      <Text style={styles.score}>{score}</Text>
      <Text style={styles.infoText}>swipe left or right</Text>
      <View style={styles.leftTextContainer}>

        <Text style={styles.leftText}>{leftText}</Text>
        <Text style={styles.leftText}>{'   <'}</Text>
      </View>

      <View style={styles.rightTextContainer}>

        <Text style={styles.rightText}>{rightText}</Text>
        <Text style={styles.rightText}>{'      >'}</Text>
      </View>
      <TouchableOpacity style={styles.homeButton} onPress={homeButtonHandler}>
        <Text style={styles.buttonText}>HOME</Text>
      </TouchableOpacity>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  swiper:{
    
  },
  buttonText: {
    color: 'white',

    fontSize: 20,
  },
  homeButton: {

    position: 'absolute',
    bottom: '10%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#115273',
    width: '40%',
    padding: 5,
    borderRadius: 14,
    zIndex: 1,
  },
  card: {

    width: 200,
    height: 300,
    marginTop: '50%',
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
    top: 30,
    textAlign: 'center',
    fontSize: 24,
    backgroundColor: "transparent",
    color: "white",
    fontWeight: 'bold',
  },
  nextWord: {
    top: 30,
    textAlign: 'center',
    fontSize: 24,
    backgroundColor: "transparent",
    color: "white",
    fontWeight: 'bold',
    opacity: 0.5,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 25,
    left: 10,
    right: 10,
    bottom: 25,
  },
  infoText: {
    fontSize: 14,
    color: '#B6B6B6',
    alignSelf: 'center',
    position: 'absolute',
    marginTop: '55%',

  },
  yourScoreHeader: {
    fontSize: 36,
    color: "#115273",
    alignSelf: 'center',
    position: 'absolute',
    marginTop: '10%',
  },
  score: {
    fontSize: 24,
    color: "#115273",
    alignSelf: 'center',
    position: 'absolute',
    marginTop: '30%',

  },
  leftText: {
    fontSize: 20,
    color: "#115273",

  },
  leftTextContainer: {
    position: 'absolute',
    display: 'flex',
    marginTop: '45%',
    marginLeft: 20,
  },
  rightText: {
    fontSize: 20,
    color: "#115273",

  },
  rightTextContainer: {
    position: 'absolute',
    display: 'flex',
    marginTop: '45%',
    right: 0,
    marginRight: 20,
  }
})