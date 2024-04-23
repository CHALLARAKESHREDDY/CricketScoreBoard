import React, { FC, createContext, useState, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type contextProps={
  isLoggedIn:boolean;
  setIsLoggedIn:(isLoggedIn:boolean)=>void;
  user:string;
  setUser:(user:string)=>void;
  selectedTeam:string;
  setSelectedTeam:(selectedTeam:string)=>void;
  totalOvers:string;
  setTotalOvers:(overs:string)=>void;
}

export const contextObject=createContext<contextProps>({
  isLoggedIn:false,
  setIsLoggedIn:()=>{},
  user:"",
  setUser:()=>{},
  selectedTeam:"",
  setSelectedTeam:()=>{},
  totalOvers:"",
  setTotalOvers:()=>{}

})

const ContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn,setIsLoggedIn]=useState(false)
  const [user,setUser]=useState("")
  const [selectedTeam,setSelectedTeam]=useState("")
  const [totalOvers,setTotalOvers]=useState("")


  const defaultValue={
  isLoggedIn,
  setIsLoggedIn,
  user,
  setUser,
  selectedTeam,
  setSelectedTeam,
  totalOvers,
  setTotalOvers
  }

  

    
    return (
        <contextObject.Provider value={defaultValue}>
            {children}
        </contextObject.Provider>
    );
};

export default ContextProvider;
