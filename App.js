import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import AddWordScreen from './screens/AddWordScreen';

import LearnScreen from './screens/learnScreen';
import { SQLiteProvider } from 'expo-sqlite';


export default function App() {
  
  return (
       <SQLiteProvider databaseName="words.db">

         <LearnScreen/>
       </SQLiteProvider>
 
      
   
  );
}
const styles = StyleSheet.create({

});
