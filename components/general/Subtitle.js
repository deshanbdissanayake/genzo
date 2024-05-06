import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../assets/colors/colors'

const Subtitle = ({ text, subText = null, component = null}) => {
  return (
    <View style={styles.subTitleWrapper}>
      <View style={styles.textWrapper} >
        <Text style={styles.textStyles}>{text}</Text>
        {subText && (
          <Text style={styles.subTextStyles}>{subText}</Text>
        )}
      </View>
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
    textWrapper: {

    },
    textStyles: {
        fontSize: 16,
        fontFamily: 'ms-semibold',
        color: colors.textColorPri,
    },
    subTextStyles: {
        fontSize: 12,
        fontFamily: 'ms-light',
        color: colors.textColorPri,
    }
})