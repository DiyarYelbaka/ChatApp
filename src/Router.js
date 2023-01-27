import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './pages/SignInScreen';
import SignUpScreen from './pages/SignUpScreen';
import HomeScreen from './pages/HomeScreen';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
     <Stack.Navigator
     screenOptions={{
      headerShown:false
     }}
     >
       <Stack.Screen name="SignInScreen" component={SignInScreen} />
       <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
       <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Router