import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

const HomeNav = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home Screen" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="Profile Screen" component={ProfileScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

export default HomeNav