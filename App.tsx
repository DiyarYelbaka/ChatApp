import { View, Text,StyleSheet,TouchableOpacity,SafeAreaView,Alert,Linking,BackHandler } from 'react-native'
import React,{useEffect} from 'react'
import Router from './src/Router';
import { AuthProvider } from './src/context/AuthContext';
import SplashScreen from 'react-native-splash-screen'
import messaging from '@react-native-firebase/messaging';
import Config from 'react-native-config';
import { firebase } from '@react-native-firebase/database';
import VersionCheck from 'react-native-version-check';


const App = () => {

  async function getVersiyon() {
    const versionApp = VersionCheck.getCurrentVersion()
    const reference = firebase.app().database(Config.FR_RDB).ref(`/versiyon`)
    reference.on('value', snapshot => {
      const DBversion = snapshot.val();
      console.log(DBversion,versionApp)
      if(versionApp != DBversion)
      Alert.alert('Ops', 'A new version is available for the app, please update it!', [
        {text: 'Update', onPress: async() => {
         await Linking.openURL('https://play.google.com/apps/internaltest/4700941378232812679') 

         BackHandler.exitApp();
          }},
      ]);
    },   {cancelable: false})
  }
 


  useEffect(()=>{
    SplashScreen.hide()
    requestUserPermission()
    getToken()
    getVersiyon()

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
