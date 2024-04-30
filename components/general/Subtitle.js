import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../assets/colors/colors'

const Subtitle = ({ text, component = null}) => {
  return (
    <View style={styles.subTitleWrapper}>
      <Text style={styles.textStyles}>{text}</Text>
      {component && component}
    </View>
  )
}

export default Subtitle

const styles = StyleSheet.create({
    subTitleWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    textStyles: {
        fontSize: 16,
        fontFamily: 'ms-semibold',
        color: colors.textColorPri,
    }
})