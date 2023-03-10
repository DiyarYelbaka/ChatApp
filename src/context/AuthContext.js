import React, { createContext, useState } from "react";
import { Alert } from 'react-native'
import { showMessage } from "react-native-flash-message";
import authErrorMessageParser from "../utils/authErrorMessageParser";
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import Config from "react-native-config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [loading, setLoading] = useState(false)

 

  const register = async (email,password,username) => {

    try {
      setLoading(true)
      await auth().createUserWithEmailAndPassword(email,password)
      const userMail = auth().currentUser?.email
      const contentObject = {
        username:username,
        email:userMail
      }
     firebase.app().database(Config.FR_RDB).ref(`users`).push(contentObject)
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

  const logOut = async () => {
    auth().signOut().then(() => console.log('User signed out!'));
  };

 
 

  return <AuthContext.Provider
    value={{
    login,
    register,
    logOut
    }}>{children}</AuthContext.Provider>
}