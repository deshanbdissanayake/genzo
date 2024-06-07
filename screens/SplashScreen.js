import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={require('../assets/images/logo.png')} style={styles.imageStyles} />
      </View>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyles: {
    width: 250,
    resizeMode: 'contain',
  },
})