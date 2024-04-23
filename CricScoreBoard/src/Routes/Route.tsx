import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator, Text } from 'react-native'; // Ensure Text is imported
import AsyncStorage from '@react-native-async-storage/async-storage';
import { contextObject } from '../Context/ContextProvider';
import ScoreRoute from './ScoreRoute';
import LoginRoute from './LoginRoute';

const Stack = createStackNavigator();

const Route = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn, setIsLoggedIn,setUser} = useContext(contextObject);

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        const userName = await AsyncStorage.getItem('crikName');
        if (userName) {
          setIsLoggedIn(true);
          setUser(userName);
          console.log("times")
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking user login status:', error);
        setIsLoading(false);
      }
    };

    checkLoggedInStatus();
  }, [setIsLoggedIn,setUser]);

  if (isLoading) {
    return (
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <ScoreRoute />
      ) : (
        <LoginRoute />
      )}
    </NavigationContainer>
  );
};

export default Route;
