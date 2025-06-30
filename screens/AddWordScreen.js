import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AddForm from './components/AddForm';
import { SQLiteProvider } from 'expo-sqlite';
export default function AddWordScreen() {
  return (
    <SQLiteProvider 
    databaseName="words.db"
    onInit={async (db) =>{
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS words (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            en TEXT NOT NULL,
            tr TEXT NOT NULL
            );
            PRAGMA journal_mode=WAL;
            `)
    }}
    options={{useNewConnections: false}}
    > 
        <AddForm/>
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({})