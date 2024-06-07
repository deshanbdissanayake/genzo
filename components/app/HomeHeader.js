import React from 'react';
import { Text, View, Image, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';

import { colors } from '../../assets/colors/colors';

const HomeHeader = ({title = null}) => {
  const navigation = useNavigation();

  const openDrawer = () => {
    //console.log('drawer')
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleProfile = () => {
    navigation.navigate('Profile Screen')
  }

  return (
    <View>
      <StatusBar backgroundColor={colors.bgColorSec} barStyle="light-content" />
      <View style={styles.headerContainer}>
        <View style={styles.leftContainer}>
          {/* Hamburger menu */}
          <TouchableOpacity onPress={openDrawer} style={{padding: 5}}>
            <Ionicons name="menu" size={24} color={colors.textColorSec} />
          </TouchableOpacity>
        </View>
        <View style={styles.centerContainer}>
          {/* Logo */}
          {/*<Image source={require('../../assets/images/app/logo.png')} style={styles.logo} />*/}
          {/* Name */}
          <Text style={styles.name}>{title ? title : 'Genzo'}</Text>
        </View>
        <View style={styles.rightContainer}>
          {/* User icon */}
          <TouchableOpacity onPress={handleProfile} style={{padding: 5}}>
            <Ionicons name="person" size={24} color={colors.textColorSec} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.bgColorSec,
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerContainer: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  name: {
    fontSize: 18,
    color: colors.textColorSec,
    fontFamily: 'ms-bold',
    textAlign: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export default HomeHeader;