import React, { createContext, useState, useEffect } from "react";
import { Alert } from 'react-native'
import { showMessage } from "react-native-flash-message";
import authErrorMessageParser from "../utils/authErrorMessageParser";
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  
  const [loading, setLoading] = useState(false)


  
  const register = async (email,password) => {
    try {
      setLoading(true)
     await auth().createUserWithEmailAndPassword(email,password)
     showMessage({
      message : "Kullanıcı Oluşturuldu",
      type: "success",
    });
      
    } catch (error) {
      console.log(error)
      setLoading(false)
      showMessage({
        message : authErrorMessageParser(error.code),
        type: "danger",
      });
    }
  }

  const login = async (email,password) => {
    try {
      setLoading(true)
      await auth().signInWithEmailAndPassword(email,password)
     showMessage({
      message : 'Giriş Başarılı',
      type: "success",
    });
      
    } catch (error) {
      console.log(error)
      setLoading(false)
      showMessage({
        message : authErrorMessageParser(error.code),
        type: "danger",
      });
    }
    
  }

  const logout = async () => {
 
  };

 
 

  return <AuthContext.Provider
    value={{
    login,
    register
    }}>{children}</AuthContext.Provider>
}