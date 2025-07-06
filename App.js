import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import AddWordScreen from './screens/AddWordScreen';

import LearnScreen from './screens/learnScreen';
import { SQLiteProvider } from 'expo-sqlite';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';


export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <SQLiteProvider databaseName="words.db">

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomeScreen" component={HomeScreen}  options={{ headerShown: false }}/>
          <Stack.Screen name="LearnScreen" component={LearnScreen}  options={{ headerShown: false }}/>
          <Stack.Screen name="AddWordScreen" component={AddWordScreen}  options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SQLiteProvider>




  );
}
const styles = StyleSheet.create({

});
