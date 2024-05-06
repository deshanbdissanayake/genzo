import { StyleSheet, View, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Commission from '../components/app/Commission'
import HomeHeader from '../components/app/HomeHeader'
import { colors } from '../assets/colors/colors'

const MonthwiseCommission = () => {
    return (
        <View style={styles.container}>
            <HomeHeader title={'Monthly Commission'} />
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