import { View, Text,StyleSheet,TouchableOpacity,SafeAreaView,Alert } from 'react-native'
import React,{useEffect} from 'react'
import Router from './src/Router';
import { AuthProvider } from './src/context/AuthContext';
import SplashScreen from 'react-native-splash-screen'
import messaging from '@react-native-firebase/messaging';



const App = () => {

  useEffect(()=>{
    SplashScreen.hide()
    requestUserPermission()
    getToken()

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });


    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      
    });

    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    
    });

     
    return unsubscribe

  },[])

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  async function getToken(){
    const fcmToken = await messaging().getToken()
    console.log(fcmToken)
  }


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
