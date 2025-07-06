import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
export default function HomeScreen() {

    const navigation = useNavigation();
    const playButtonHandler = () =>{
        navigation.navigate('LearnScreen');
    }
    const addWordHandler = () =>{
        navigation.navigate('AddWordScreen');
    }
  return (
    <View style={styles.container}>
        <Text style={styles.header}>SWIPE WORD</Text>
        <TouchableOpacity style={styles.playButton} onPress={playButtonHandler}>
            <Text style={styles.buttonText}>PLAY</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.playButton} onPress={addWordHandler}>
            <Text style={styles.buttonText}>ADD WORD</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#115273',
        
    },
    header:{
        color: 'white',
        fontWeight: 'medium',
        fontSize: 40,
        alignSelf: 'center',
        top: '5%',
    },
    playButton:{
        width: '60%',
        height: 50,
        backgroundColor: 'white',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#18729F',
        top: '30%',
        marginTop: 20,
    },
    buttonText: {
        color: '#115273',
        fontWeight: 'medium',
        fontSize: 20,
    }
})