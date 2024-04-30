import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../assets/colors/colors'

const ChangePassword = () => {
  return (
    <View style={styles.container}>
        <Text>Under development</Text>
    </View>
  )
}

export default ChangePassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgColor,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
})