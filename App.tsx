import { View, Text,StyleSheet,TouchableOpacity,SafeAreaView } from 'react-native'
import React,{useEffect} from 'react'
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import Router from './src/Router';
import { AuthProvider } from './src/context/AuthContext';
import SplashScreen from 'react-native-splash-screen'



const App = () => {

  useEffect(()=>{
    SplashScreen.hide()
  },[])

  return (
    <SafeAreaView style={{flex:1}}>
      <AuthProvider>
       <Router/>
      </AuthProvider>
    </SafeAreaView>
   
  )
}

const styles = StyleSheet.create({
  container:{

  }
})

export default App
