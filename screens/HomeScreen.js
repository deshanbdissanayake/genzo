import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../assets/colors/colors'
import { Entypo } from '@expo/vector-icons';
import HomeHeader from '../components/app/HomeHeader';
import Summary from '../components/app/Summary';
import Subtitle from '../components/general/Subtitle';
import Commission from '../components/app/Commission';


const HomeScreen = () => {
  return (
    <View style={styles.container}>
        <HomeHeader/>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.cardSecWrapper}>
              <Subtitle text={'Summary'} />
              <Summary/>
          </View>
          <View style={styles.cardSecWrapper}>
              <Subtitle text={'Commissions'} />
              <Commission/>
          </View>
        </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  contentContainer: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  cardSecWrapper: {
    marginBottom: 15,
  }
})