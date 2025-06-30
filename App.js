import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import AddWordScreen from './screens/AddWordScreen';


export default function App() {
  
  return (
    <View>

      <AddWordScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  
});
