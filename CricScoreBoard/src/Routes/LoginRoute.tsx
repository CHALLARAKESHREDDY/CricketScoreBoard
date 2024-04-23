import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import LoginScreen from '../Screens/LoginScreen';


export type LoginStackProps={Login:undefined}

const Stack = createStackNavigator<LoginStackProps>();


const LoginRoute = () => {
  return (
   <Stack.Navigator>
    <Stack.Screen name='Login' component={LoginScreen} options={{title:"Login",headerTitleAlign: 'center'}}  />
   </Stack.Navigator>
  )
}

export default LoginRoute

const styles = StyleSheet.create({})