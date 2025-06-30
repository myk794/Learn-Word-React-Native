import { useState } from "react";
import {View,TextInput, Button, StyleSheet,Alert} from 'react-native';
import {useSQLiteContext} from 'expo-sqlite';

const AddForm = () => {
    const [form,setForm] = useState({
        en: '',
        tr: ''
    });

    const db = useSQLiteContext();
    const handleSubmit = async () =>{
        try {
            if(!form.en || !form.tr){
                throw new Error('All fields are required!');
            }
            await db.runAsync(
                'INSERT INTO words (en,tr) VALUES (?,?)',
                [form.en,form.tr]
            );
            Alert.alert('Success','Word Added Successfully!');
            setForm({
                en: '',
                tr: ''
            });
        } catch (error) {
            console.error(error);
            Alert.alert('Error', error.message || 'An error occured while adding word.');
        }
    };

    return(
        <View style={styles.container}>
            <TextInput
            style={styles.input}
            placeholder="English"
            value={form.en}
            onChangeText={(text)=> setForm({...form,en:text})}/>
            <TextInput
            style={styles.input}
            placeholder="Turkish"
            value={form.tr}
            onChangeText={(text)=> setForm({...form,tr:text})}/>
            <Button title="Add Word" onPress={handleSubmit}/>
        </View>
    );

}

const styles = StyleSheet.create({
    container:{
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    }
});

export default AddForm;