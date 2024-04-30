import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../assets/colors/colors'
import Button from '../components/general/Button'
import { useNavigation } from '@react-navigation/native'

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const handleNextClick = () => {
    navigation.navigate('Login')
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleTextStyles}>Welcome</Text>
          <Text style={styles.subTitleTextStyles}>Genzo Mobile</Text>
        </View>
        <Image
          style={styles.imageStyles}
          source={require('../assets/images/welcome.gif')}
        />
      </View>
      <View style={styles.btnWrapper}>
        <Button
          bgColor={colors.bgColorSec}
          content={<Text style={{ color: colors.textColorSec }}>Let's Go!</Text>}
          func={handleNextClick}
        />
      </View>
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  imageStyles: {
    width: 250,
    height: 250,
    resizeMode: 'cover',
  },
  contentWrapper: {
    flex: 6,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  }, 
  titleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnWrapper: {
    flex: 1,
  }, 
  titleTextStyles: {
    fontSize: 48,
    fontFamily: 'ms-bold',
    color: colors.textColorPri,
  }, 
  subTitleTextStyles: {
    fontSize: 24,
    fontFamily: 'ms-regular',
    color: colors.textColorPri,
  }, 
})