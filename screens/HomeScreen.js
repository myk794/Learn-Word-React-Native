import { StyleSheet, Text, View, TouchableOpacity, Modal,Button} from 'react-native'
import React from 'react'
import { NavigationRouteContext, useNavigation } from '@react-navigation/native';
import { useLayoutEffect, useState } from 'react';
import { BlurView } from 'expo-blur';
import { useSQLiteContext } from 'expo-sqlite';
export default function HomeScreen() {
    const db = useSQLiteContext();
    const [totalWords, setTotalWords] = useState(0)
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const playButtonHandler = () => {
        if (totalWords < 5) {
            setModalVisible(true);
        }
        else {
            navigation.navigate('LearnScreen');
        }

    }
    const addWordHandler = () => {
        navigation.navigate('AddWordScreen');
    }
    const goWordList = () => {
        navigation.navigate('WordListScreen');
    }
    useLayoutEffect(() => {
        async function fetchWords() {
            const result = await db.getAllAsync(`SELECT * FROM words`);
            await setTotalWords(result.length);
            
        }

        fetchWords();

    }, [])
    return (
        <View style={styles.container}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <BlurView intensity={90} tint="dark" style={styles.modalContainer}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>UPS!</Text>
                        <Text style={styles.modalText}>You need more than 5 words to play. Please add more words.</Text>
                        <TouchableOpacity style={styles.okButton} onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.okText}>OK</Text>
                    </TouchableOpacity>
                    </View>
                    
                </BlurView>
            </Modal>
            <Text style={styles.header}>SWIPE WORD</Text>
            <TouchableOpacity style={styles.playButton} onPress={playButtonHandler}>
                <Text style={styles.buttonText}>PLAY</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.playButton} onPress={addWordHandler}>
                <Text style={styles.buttonText}>ADD WORD</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.totalWordsButton} onPress={goWordList}>

            <Text style={styles.totalWordsText}>You have {totalWords} words</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#115273',

    },
    header: {
        color: 'white',
        fontWeight: 'medium',
        fontSize: 40,
        alignSelf: 'center',
        top: '5%',
    },
    playButton: {
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
        fontWeight: '600',
        fontSize: 20,
    },
    modalContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalBox:{
        width: '90%',
        height: 200,
        backgroundColor: 'white',
        borderRadius: 20,
    },
    modalTitle:{
        color: '#115273',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
    },
    modalText:{
        color: '#115273',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 15,
        marginHorizontal: 20,
    },
    okButton:{
        width: '80%',
        height: 40,
        borderRadius:15,
        marginTop: 50,
        backgroundColor: '#115273',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    okText:{
        color: 'white',
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
    },
    totalWordsText:{
        color: 'white',
        textDecorationLine: 'underline',
        alignSelf: 'center',
    },
    totalWordsButton:{
         position: 'absolute',
        bottom: '7%',
        alignSelf: 'center',

    },
})