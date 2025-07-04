import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function HomeButton() {
  return (
    <View style={styles.container}>
      <Text>HomeButton</Text>
    </View>
  )
}

const styles = StyleSheet.create({
container:{
    position: 'absolute',
    bottom: 20,
    width: 200,
    height: 50,
    marginBottom:'auto',
    backgroundColor: '#115273',
},
})