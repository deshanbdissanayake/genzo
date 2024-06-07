import { StyleSheet, View, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Commission from '../components/app/Commission'
import HomeHeader from '../components/app/HomeHeader'
import { colors } from '../assets/colors/colors'
import Header from '../components/general/Header'

const MonthwiseCommission = () => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Header text={'Monthly Commission'} handleGoBack={handleGoBack} />
            <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
                <Commission/>
            </ScrollView>
        </View>
    )
}

export default MonthwiseCommission

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgColor,
    },
    contentContainer: {
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
})