import { Text, StyleSheet, View,TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
const WordBlock = ({tr,en,onDelete}) => {

  return(
    <View style={styles.container}>
      <Text style={styles.text}>{tr}</Text>
      <View style={styles.textMiddle}></View>
      
      <Text style={styles.text}>{en}</Text>
      <TouchableOpacity style={styles.button} onPress={onDelete}>
        <MaterialCommunityIcons name="delete" size={24} color="white" />
       
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    width: '90%',
    borderColor: 'rgb(17, 82, 115)',
    borderWidth: 4,
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'rgb(17, 82, 115)',
   padding: 2,
    borderRadius: 5, 
    height: '100%',
    marginLeft: 'auto',
    width: '16%',
    alignItems: 'center',

  },
  
  textMiddle:{
     backgroundColor: 'rgb(17, 82, 115)',
     width: 2.5,
     height: '80%',
     alignSelf: 'center',
  },

  text:{
    color: 'rgb(17, 82, 115)',
    textAlignVertical: 'center',
    width: '42%',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default WordBlock;