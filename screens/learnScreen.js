import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState, useEffect, useLayoutEffect } from 'react';
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import useWords from '../hooks/useWords';
import SwipeDeck from './components/SwipeDeck';
export default function LearnScreen() {
  const { words, refresh } = useWords();
  const [score, setScore] = useState(0);
  const [leftText, setLeftText] = useState('');
  const [rightText, setRightText] = useState('');

  const [randomWord, setRandomWord] = useState('');
  const [correctWord, setCorrectWord] = useState('');
  const [correctDirection, setCorrectDirection] = useState("left");

  const navigation = useNavigation();
  const homeButtonHandler = () => {
    navigation.navigate('HomeScreen');
  }
  useLayoutEffect(() => {
    refresh();
  }, [refresh])
  useEffect(() => {
    if (words.length > 0) {
      setWordsTexts(words[0]);
    }
  }, [words])
  function onSwipedLeft(word) {
    if (correctDirection === "left") {
      setScore(prev => prev + 1);
    }
    setWordsTexts(word);
  }
  function onSwipedRight(word) {
    if (correctDirection === "right") {
      setScore(prev => prev + 1);
    }
    setWordsTexts(word);
  }
  function setWordsTexts(word) {
    const answers = getWordAnswers(word);
    if (answers.error) {
      return;
    }

    setRandomWord(answers.random);
    setCorrectWord(answers.correct);

    // 0: left --- 1:right
    const direction = Math.round(Math.random());
    if (direction === 0) {
      setCorrectDirection("left");
      setLeftText(answers.correct);
      setRightText(answers.random);
    }
    else {
      setCorrectDirection("right");
      setLeftText(answers.random);
      setRightText(answers.correct);
    }
  }
  function getWordAnswers(word) {
    if (!word) {
      return { error: "Kelime bulunamadı." };
    }

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
        {words.length > 0 && (
          <SwipeDeck
            cards={words}
            onSwipeLeft={(nextCard) => onSwipedLeft(nextCard)}
            onSwipeRight={(nextCard) => onSwipedRight(nextCard)}
            renderCard={(item, cardIdx) => (
              <View style={styles.card}>
                <Text style={styles.text}>{item?.en ?? "?"}</Text>
                {[1, 2, 3, 4, 5, 6, 7].map((k) => {
                  const w = words[(cardIdx + k) % words.length];
                  return (
                    <Text key={k} style={styles.nextWord}>{w?.en ?? ""}</Text>
                  );
                })}
                <LinearGradient
                  colors={['transparent', '#115273']}
                  locations={[0.35, 0.95]}
                  style={styles.fadeOverlay}
                  pointerEvents="none"
                />
              </View>
            )}
          />
        )}
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
    marginTop: '53%',
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
    width: 220,
    height: 300,
    borderRadius: 42,
    backgroundColor: "#115273",
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 22,
    paddingHorizontal: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 26,
    color: "white",
    fontWeight: 'bold',
    marginBottom: 8,
  },
  nextWord: {
    textAlign: 'center',
    fontSize: 18,
    color: "white",
    fontWeight: 'bold',
    marginTop: 6,
  },
  fadeOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
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