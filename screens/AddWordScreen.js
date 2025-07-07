import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import AddForm from './components/AddForm';
import { SQLiteProvider } from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';
export default function AddWordScreen() {
  const navigation = useNavigation();
  const homeButtonHandler = () => {
    navigation.navigate('HomeScreen');
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.homeButton} onPress={homeButtonHandler}>
        <Text style={styles.homeButtonText}>X</Text>
      </TouchableOpacity>
      <AddForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  buttonText: {
    color: 'white',

    fontSize: 20,
  },
  homeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  homeButton: {


    position: 'absolute',
    right: 20,
    top: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#115273',
    width: 40,
    height: 40,
    padding: 5,
    borderRadius: 50,


    // iOS Shadow
    shadowColor: '#000000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 3.84,

    // Android Shadow
    elevation: 5,
  },
})