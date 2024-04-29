import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const HomeNav = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home Screen" component={HomeScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

export default HomeNav