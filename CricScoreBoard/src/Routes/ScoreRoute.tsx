import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Teams from '../Screens/Teams';
import ScoreScreen from '../Screens/AteamScoreScreen';

import { contextObject } from '../Context/ContextProvider';

export type ScoreStackProps={
  teams:undefined,
  score:undefined
}

const Stack = createStackNavigator<ScoreStackProps>();

const ScoreRoute = () => {
  const {selectedTeam}=useContext(contextObject);

  return (
   <Stack.Navigator>
    <Stack.Screen  name="teams" component={Teams} options={{ title: 'Teams'}} />
    <Stack.Screen name="score" component={ScoreScreen} options={{title:`Team "${selectedTeam}" ScoreBoard`,headerTitleAlign: 'center' }} />
   </Stack.Navigator>
  )
}

export default ScoreRoute

const styles = StyleSheet.create({})