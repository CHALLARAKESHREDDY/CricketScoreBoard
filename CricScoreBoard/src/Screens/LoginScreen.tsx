import { Button, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { LoginStackProps } from '../Routes/LoginRoute';
import { StackScreenProps } from '@react-navigation/stack';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { contextObject } from '../Context/ContextProvider';
import Snackbar from 'react-native-snackbar';

type propsLogin = StackScreenProps<LoginStackProps, "Login">;

const LoginScreen = ({ navigation }: propsLogin) => {
  const [name, setName] = useState<string>("");
  const { setIsLoggedIn,setUser} = useContext(contextObject);
 
  const handleLogin = async () => {
    if (name.length < 1) {
      Snackbar.show({ text: "Enter your name broh", duration: Snackbar.LENGTH_LONG,textColor:"red"});
    } else {
      try {
        await AsyncStorage.setItem('crikName', name);
        setIsLoggedIn(true);
        Snackbar.show({ text:"Successfully Logined", duration: Snackbar.LENGTH_LONG,textColor:"green"});

        setUser(name)
      } catch {
        setIsLoggedIn(false);
        Snackbar.show({ text: "Error Logging", duration: Snackbar.LENGTH_LONG,textColor:"red"});

      }
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require("../assets/pngwing.com.png")} style={styles.Image} />
      <TextInput 
        value={name} 
        onChangeText={(text) => setName(text)} 
        placeholder='Enter Your Name' 
        style={styles.Input}
      />
      <Pressable onPress={()=>handleLogin()} style={styles.Button}>
        <Text>Let's Go</Text>
      </Pressable>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container:{
      flex:1,
      justifyContent:"center",
      alignItems:"center",
      padding:20,
  },
  Image:{
    height:250,
    width:180,
    resizeMode: 'contain',
  },
  Input:{
    backgroundColor:"grey",
    width:"100%",
    margin:20,
    borderRadius:10,
    padding:15,
    
  },
  Button:{
    width:'100%',
    padding:15,
    backgroundColor:"#2874A6",
    borderRadius:10,
    alignItems:"center"
  }
});
