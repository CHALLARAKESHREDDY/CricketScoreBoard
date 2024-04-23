import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { contextObject } from '../Context/ContextProvider';
import { ScoreStackProps } from '../Routes/ScoreRoute';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';

type TeamsProps= StackScreenProps<ScoreStackProps, "teams">




const Teams = ({navigation} :TeamsProps) => {
  const {user,setIsLoggedIn,setSelectedTeam}=useContext(contextObject)

  const handleLogout= async()=>{
    try {
      await AsyncStorage.removeItem("crikName");
      setIsLoggedIn(false)
      Snackbar.show({ text:"LoggedOut Successfully", duration: Snackbar.LENGTH_LONG,textColor:"green"});

    } catch (error) {
      Snackbar.show({ text:"Error Logging Out", duration: Snackbar.LENGTH_LONG,textColor:"green"});

    }
  }

  const handleTeam=(team:string)=>{
    setSelectedTeam(team)
    navigation.navigate('score')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Hello, {user} Welcome!</Text>
      <Image  source={require('../assets/batsman-7874714_640.png')} style={styles.Image}/>
      <Text style={styles.welcome}>Let`s Go</Text>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.buttons} onPress={() =>handleTeam("A")}>
          <Text style={styles.buttonText}>Team A</Text>
        </Pressable>
        <Pressable style={styles.buttons} onPress={() =>handleTeam("B")}>
          <Text style={styles.buttonText}>Team B</Text>
        </Pressable>
      </View>
      <Pressable style={styles.logoutButton} onPress={()=>handleLogout()} >
          <Text >Logout</Text>
      </Pressable>
    </View>
  )
}

export default Teams

const styles = StyleSheet.create({
  container:{
     flex:1,
     alignItems:"center",
     justifyContent:"center",
     padding:20,
     paddingTop:40
  },
  welcome:{
    color:"green",
    fontSize:25,
  },
  buttons:{
    paddingHorizontal:40,
    paddingVertical:13,
    borderRadius:10,
    backgroundColor:"#5D6D7E",
    marginVertical:10
  },
  buttonText:{
    fontSize:16
  },
  logoutButton:{
    backgroundColor:"#4A4B4C",
    paddingHorizontal:10,
    paddingVertical:4,
    color:"black",
    alignSelf:"flex-end",
    marginTop:"auto",
    borderRadius:5,
    padding:5
  },
  Image:{
    height:250,
    width:140,
    resizeMode: 'contain',
  },
  buttonContainer:{
    marginTop:10
  }
})

