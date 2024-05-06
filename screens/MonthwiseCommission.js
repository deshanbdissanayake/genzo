import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/general/Header'
import { useNavigation } from '@react-navigation/native'
import { colors } from '../assets/colors/colors'
import Commission from '../components/app/Commission'

const MonthwiseCommission = () => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();    
    }

    return (
        <View style={styles.container}>
            <Header text={'Monthwise Commission'} handleGoBack={handleGoBack} />
            <Commission/>
        </View>
    )
}

export default MonthwiseCommission

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: colors.bgColor,
    },
})