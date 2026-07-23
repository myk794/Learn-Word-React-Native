import { StyleSheet, Text, View, TouchableOpacity, Modal,Button} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect, useState } from 'react';
import { BlurView } from 'expo-blur';
import useWords from '../hooks/useWords';
import { APP_VERSION, OTA_REVISION } from '../version';
export default function HomeScreen() {
    const { count: totalWords, refresh } = useWords();
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
    const goWordPacks = () => {
        navigation.navigate('WordPacksScreen');
    }
    useLayoutEffect(() => {
        refresh();
    }, [refresh])
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
                        <Text style={styles.modalText}>You need at least 5 words to play. Add a ready-made set from WORD PACKS, or add your own.</Text>
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

            <TouchableOpacity style={styles.playButton} onPress={goWordPacks}>
                <Text style={styles.buttonText}>WORD PACKS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.totalWordsButton} onPress={goWordList}>

            <Text style={styles.totalWordsText}>You have {totalWords} words</Text>
            </TouchableOpacity>
            <Text style={styles.versionText}>v{APP_VERSION}-{OTA_REVISION}</Text>
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
        fontWeight: '500',
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
        paddingBottom: 25,
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
        marginTop: 25,
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
    versionText:{
        position: 'absolute',
        bottom: 8,
        right: 12,
        color: 'rgba(255,255,255,0.6)',
        fontSize: 12,
    },
})