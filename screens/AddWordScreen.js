import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import AddForm from './components/AddForm';
import { SQLiteProvider } from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';
export default function AddWordScreen() {
  const navigation = useNavigation();
        const homeButtonHandler = () =>{
            navigation.navigate('HomeScreen');
        }
  return (
    <SQLiteProvider
      databaseName="words.db"
      onInit={async (db) => {
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS words (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            en TEXT NOT NULL,
            tr TEXT NOT NULL
            );
            PRAGMA journal_mode=WAL;
            `)
      }}
      options={{ useNewConnections: false }}
    >
      <AddForm />
      <TouchableOpacity style={styles.homeButton} onPress={homeButtonHandler}>
        <Text style={styles.buttonText}>HOME</Text>
      </TouchableOpacity>
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
   buttonText:{
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
  },
})