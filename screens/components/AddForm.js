import { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';

const AddForm = () => {
    const [form, setForm] = useState({
        en: '',
        tr: ''
    });

    const db = useSQLiteContext();
    const handleSubmit = async () => {
        try {
            if (!form.en || !form.tr) {
                throw new Error('All fields are required!');
            }
            await db.runAsync(
                'INSERT INTO words (en,tr) VALUES (?,?)',
                [form.en, form.tr]
            );
            Alert.alert('Success', 'Word Added Successfully!');
            setForm({
                en: '',
                tr: ''
            });
        } catch (error) {
            console.error(error);
            Alert.alert('Error', error.message || 'An error occured while adding word.');
        }
    };

    return (
        <View style={styles.main}>
            <Text style={styles.header}>Add Word</Text>
            <View style={styles.container}>
                <Text style={styles.inputHeader}>English</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter text..."
                    value={form.en}
                    onChangeText={(text) => setForm({ ...form, en: text })} />
                <Text style={styles.inputHeader}>Turkish</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter text..."
                    value={form.tr}
                    onChangeText={(text) => setForm({ ...form, tr: text })} />

            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.buttonText}>ADD</Text>
            </TouchableOpacity>
        </View>

    );

}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: '5%',
    },
    header:{
        color: '#115273',
        fontSize: 24,
        fontWeight: '600',
        alignSelf: 'center',
        marginBottom: 10,
    },
    container: {
        padding: 20,
        backgroundColor: '#115273',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inputHeader: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'medium',
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        backgroundColor: 'white',
        borderRadius: 15,
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,

        shadowColor: 'black',
        shadowOffset: {
            width: 5,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,

        // Android shadow
        elevation: 5,
    },
    submitButton: {
        borderRadius: 15,
        backgroundColor: '#115273',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '20%',
        marginTop: 20,
        padding: 5,
        height: 40,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default AddForm;