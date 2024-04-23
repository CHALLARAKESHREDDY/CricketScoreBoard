import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { contextObject } from '../Context/ContextProvider'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Snackbar from 'react-native-snackbar';
import Modal from "react-native-modal";


const AScoreScreen = () => {
  const {totalOvers,setTotalOvers}=useContext(contextObject)
  const [score, setScore] = useState<number>(0)
  const [overs,setOvers]=useState<number>(0)
  const [wickets,setWickets]=useState<number>(0)
  const [fours,setFours]=useState<number>(0)
  const [sixes,setSixes]=useState<number>(0)
  const [isLoading,setIsLoading]=useState<boolean>(true)
  const [fullOvers,setFullOvers]=useState(totalOvers)
  const [modalVisible, setModalVisible] = useState(false);


  useEffect(()=>{
    const  retrieveData= async()=>{
      try{
        const value=await AsyncStorage.getItem("TeamAScoreBoard")
        const resultObject=JSON.parse(value as string)
        setScore(resultObject.score)
        setFours(resultObject.fours)
        setSixes(resultObject.sixes)
        setOvers(resultObject.overs)
        setWickets(resultObject.wickets)
        setTotalOvers(resultObject.totalOvers)
        setIsLoading(false)
      }catch(e) {
        setIsLoading(false)
        Snackbar.show({
          text: "can`t Load the data",
          duration: Snackbar.LENGTH_LONG,
          action: {
              text: 'UNDO',
              textColor: 'red',
          },
      });
      
      }
    }
    retrieveData()
  },[])

  const handleIncrease=(key:string)=>{
    if (!key.includes("Noball")){
        if (overs < 0.5) {
          setOvers(parseFloat((overs + 0.1).toFixed(1)));
        }else {
          const lastDigit = Math.floor((overs * 10) % 10);
            if (lastDigit === 5) {
                setOvers(Math.ceil(overs));
            }else {
                setOvers(parseFloat((overs + 0.1).toFixed(1)));
            }
        }
    }

       if (key==="oneScore"){
         setScore(prev=> prev+1)
       }else if (key==="twoScore"){
          setScore(prev=>prev+2)
       }else if (key==="threeScore"){
          setScore(prev=>prev+3)
       }
       else if (key==="wickets"){
        setWickets(prev=>prev+1)
       }else if (key==="six"){
          setScore(prev=>prev+6)
          setSixes(prev=>prev+1)
       }else if (key==="four"){
        setScore(prev=>prev+4)
        setFours(prev=>prev+1)
       }else if (key==="wicket"){
        setWickets(prev=>prev+1)
       }else if (key==="wicket+1"){
        setWickets(prev=>prev+1)
        setScore(prev=>prev+1)
       }else if (key==="wicket+2"){
        setWickets(prev=>prev+1)
        setScore(prev=>prev+2)
       }else if (key==="wicket+3"){
        setWickets(prev=>prev+1)
        setScore(prev=>prev+3)
       }else if (key==="Noball"){
        setScore(prev=>prev+1)
       }else if (key==="Noball+1"){
        setScore(prev=>prev+2)
       }else if (key==="Noball+2"){
        setScore(prev=>prev+3)
       }else if (key==="Noball+3"){
        setScore(prev=>prev+4)
       }else if (key==="Noball+4"){
        setScore(prev=>prev+4)
        setFours(prev=>prev+1)
       }else if (key==="Noball+6"){
        setScore(prev=>prev+6)
        setSixes(prev=>prev+1)
       }
  }

  const handleDecrease=(key:string)=>{
    if (key==="score"){
      setScore(prev=> prev-1)
    }else if (key==="wickets"){
     setWickets(prev=>prev-1)
    }
  }

  const handleReset=()=>{
    setScore(0)
    setOvers(0)
    setFours(0)
    setSixes(0)
    setWickets(0)
    setTotalOvers("")
    setFullOvers("")
    setModalVisible(!modalVisible)
  }


  const handleSave=async()=>{
    try {
      const res = await AsyncStorage.setItem("TeamAScoreBoard", 
                  JSON.stringify({
                      "overs": overs,
                      "fours": fours,
                      "sixes": sixes,
                      "wickets": wickets,
                      "score": score,
                      "totalOvers": fullOvers
                  }))
              Snackbar.show({
                  text: 'Successfully Saved',
                  duration: Snackbar.LENGTH_LONG,
                  action: {
                      text: 'UNDO',
                      textColor: 'green',
                  },
              });
      
  } catch (e) {
      Snackbar.show({
          text: "Error cant save the data",
          duration: Snackbar.LENGTH_LONG,
          action: {
              text: 'UNDO',
              textColor: 'red',
          },
      });
  }

  }
  
  if (isLoading) {
    return (
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  if (!totalOvers){
    return(
      <View style={styles.container}>
        <TextInput  value={fullOvers} onChangeText={(text)=>setFullOvers(text)} keyboardType='numeric' style={styles.oversInput}  placeholder='Enter nnumber of overs' />
        <Pressable style={styles.gameStart} onPress={()=>setTotalOvers(`${fullOvers}`)}>
          <Text>Start the Game</Text>
        </Pressable>
      </View>

    )
  }


  const modalView=()=>{
    return(
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{color:"black"}}>Are you sure you want to Reset?</Text>
            <View style={styles.NoYesContainer}>
              <Pressable style={[styles.NoButton,styles.button]} onPress={() => setModalVisible(!modalVisible)}>
                <Text>No</Text>
              </Pressable>
              <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => handleReset()}
              >
              <Text style={styles.textStyle}>Yes</Text>
            </Pressable>
            </View>
           
          </View>
        </View>
      </Modal>
    )
  }


  return (
    <View style={styles.container}>
         {modalView()}
         <Text>Total Overs: {totalOvers}</Text>
         <View style={styles.Board}>
          <View style={styles.Score}>
               <Text style={styles.ScoreTitle}>Score🏏</Text>
               <Text style={styles.ScoreCount}>{score}</Text>
               <View style={styles.ButtonsContainer}>
                 <Pressable style={[styles.Button,styles.Decrease]} onPress={()=>handleDecrease("score")}>
                  <Text>Decrease</Text>
                 </Pressable>
                 <Pressable style={[styles.Button,styles.Reset]} onPress={()=>handleIncrease("oneScore")} >
                  <Text>One</Text>
                 </Pressable >
                 <Pressable style={[styles.Button,styles.Reset]} onPress={()=>handleIncrease("twoScore")} >
                  <Text>Two</Text>
                 </Pressable >
                 <Pressable style={[styles.Button,styles.Increase]} onPress={()=>handleIncrease("threeScore")} >
                  <Text>Three</Text>
                 </Pressable>
               </View>
          </View>
          <View style={styles.Separator}></View>
          <View style={styles.Score}>
               <Text style={styles.ScoreTitle}>Wickets</Text>
               <Text style={styles.ScoreCount}>{wickets}</Text>
               <View style={styles.ButtonsContainer}>
                 <Pressable style={[styles.Button,styles.Decrease]} onPress={()=>handleIncrease("wickets")}>
                  <Text>Wicket</Text>
                 </Pressable>
                 <Pressable style={[styles.Button,styles.Reset]} onPress={()=>handleIncrease("wicket+1")} >
                  <Text>W+1</Text>
                 </Pressable >
                 <Pressable style={[styles.Button,styles.Reset]}  onPress={()=>handleIncrease("wicket+2")}>
                  <Text>W+2</Text>
                 </Pressable >
              
                 <Pressable style={[styles.Button,styles.Increase]}  onPress={()=>handleIncrease("wicket+3")}>
                  <Text>W+3</Text>
                 </Pressable>
               </View>
          </View>
          <View style={styles.Separator}></View>
          <View style={styles.Score}>
               <Text style={styles.ScoreTitle}>Overs</Text>
               <Text style={styles.ScoreCount}>{overs}</Text>
               <View style={styles.ButtonsContainer}>
                 <Pressable style={[styles.Button,styles.Reset]} onPress={()=>handleIncrease("Noball")} >
                  <Text>No ball</Text>
                 </Pressable >
                 <Pressable style={[styles.Button,styles.Reset]} onPress={()=>handleIncrease("Noball+1")} >
                  <Text>Noball+1</Text>
                 </Pressable >
                 <Pressable style={[styles.Button,styles.Reset]} onPress={()=>handleIncrease("Noball+2")}>
                  <Text>Noball+2</Text>
                 </Pressable >
                 <Pressable style={[styles.Button,styles.Increase]} onPress={()=>handleIncrease("Noball+3")}>
                  <Text>Noball+3</Text>
                 </Pressable>
               </View>
          </View>
          <View style={styles.Separator}></View>
          <View style={styles.Score}>
               <Text style={styles.ScoreTitle}>Boundaries</Text>
               <View style={styles.Boundaries}>
                  <Text style={styles.ScoreCount}>{fours}</Text>
                  <Text style={styles.ScoreCount}>{sixes}</Text>
               </View>
               <View style={styles.ButtonsContainer}>
                 <Pressable style={[styles.Button,styles.Decrease]} onPress={()=>handleIncrease("four")}>
                  <Text>Four/4</Text>
                 </Pressable>
                 <Pressable style={[styles.Button,styles.Reset]} onPress={()=>handleIncrease("Noball+4")}>
                  <Text>Noball+4</Text>
                 </Pressable >
                 <Pressable style={[styles.Button,styles.Reset]} onPress={()=>handleIncrease("Noball+6")}>
                  <Text>Noball+6</Text>
                 </Pressable >
                 
                 <Pressable style={[styles.Button,styles.Increase]} onPress={()=>handleIncrease("six")}>
                  <Text>Six/6</Text>
                 </Pressable>
               </View>
          </View>
          
         </View>
         <View style={styles.saveResetContainer}>
          <Pressable style={styles.resetButton} onPress={()=>setModalVisible(true)}>
            <Text>Reset</Text>
          </Pressable>
          <Pressable style={styles.saveButton} onPress={()=>handleSave()}>
            <Text>Save</Text>
          </Pressable>
         </View>
    </View>
  )
}

export default AScoreScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#4F674F"
  },
  Board:{
    height:"85%",
    width:"85%",
    backgroundColor:"#BD987B",
    borderWidth:2,
    borderStyle:"solid",
    borderColor:"#fff",
    borderRadius:20,
    alignItems:"center",
    paddingVertical:10
  },
  Score:{
    width:"90%",
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  ButtonsContainer:{
    flexDirection:"row",
    width:"100%",
    justifyContent:"space-between",

  },
  ScoreTitle:{
      fontSize:18,
      color:"green"
  },
  ScoreCount:{
    fontSize:30,
    fontWeight:"bold",
    color:"#fff",
    marginVertical:8
  },
  Button:{
    flex:1,
    paddingVertical:10,
    borderWidth:1,
    borderStyle:"solid",
    borderColor:"#fff",
    borderRadius:10,
    alignItems:"center",
    margin:5,
    
  },
  Decrease:{
    backgroundColor:"#D44F44"
  },
  Reset:{
    backgroundColor:"#50504F"
  },
  Increase:{
    backgroundColor:"#4DA04A"
  },
  Separator:{
    height:2,
    width:"95%",
    backgroundColor:"#fff"
  },
  Boundaries:{
     flexDirection:"row",
     width:"72%",
     justifyContent:"space-between",
  },
  Ones:{
    flexDirection:"row",

  },
  saveResetContainer:{
     flexDirection:"row",
     width:"60%",
     alignItems:"center",
     justifyContent:"center",

  },
  resetButton:{
    paddingHorizontal:20,
    paddingVertical:10,
    backgroundColor:"#D44F44",
    marginHorizontal:12,
    borderRadius:8,
    margin:10

  },
  saveButton:{
    paddingHorizontal:20,
    paddingVertical:10,
    backgroundColor:"skyblue",
    marginHorizontal:12,
    borderRadius:8,
    margin:10
  },
  oversInput:{
    backgroundColor:"grey",
    width:"80%",
    borderRadius:10,
    padding:10,
  },
  topOversContainer:{
    flexDirection:"row",
    
  },
  gameStart:{
    backgroundColor:"#154360",
    width:"80%",
    borderRadius:10,
    padding:14,
    alignItems:"center",
    margin:30
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 8,
    elevation: 2,
    paddingHorizontal:14
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    
  },
  NoYesContainer:{
    flexDirection:"row",
    width:"90%",
    justifyContent:'space-between',
    marginTop:20
  },
  NoButton:{
    backgroundColor:"grey"
  }
})