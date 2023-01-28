import { View, Text,StyleSheet,TouchableOpacity,SafeAreaView } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import Router from './src/Router';
import { AuthProvider } from './src/context/AuthContext';


const App = () => {

  function onCheckDB(){
    const reference = firebase.app().database("https://chatapp-9bb02-default-rtdb.europe-west1.firebasedatabase.app/").ref("books")
    reference.once('value').then(snapshot => {
     const response =  snapshot.val();
     console.log(response)
  }).catch(err=> console.log(err));
  }

  function listenDB(){
    const reference = firebase.app().database("https://chatapp-9bb02-default-rtdb.europe-west1.firebasedatabase.app/").ref("books")
    reference.on('value', snapshot => {
      console.log( snapshot.val());
    });
  }
  
  function setDB(){
    const reference = firebase.app().database("https://chatapp-9bb02-default-rtdb.europe-west1.firebasedatabase.app/").ref("car/rentable")
    reference.set({
      brand:'edddee',
      model:'A2',
      preice:123,
    })
  }

  function updateDB(){
    const reference = firebase.app().database("https://chatapp-9bb02-default-rtdb.europe-west1.firebasedatabase.app/").ref("car/rentable")
    reference.update({
      brand:'edddee',
      model:'A3',
      preice:123,
    })
  }

  function pushDB(){
    const reference = firebase.app().database("https://chatapp-9bb02-default-rtdb.europe-west1.firebasedatabase.app/").ref("car/rentable")
    reference.push({
      brand:'Passat',
      model:'12',
      preice:333,
    })
  }

 

  return (
    <SafeAreaView style={{flex:1}}>
      <AuthProvider>
       <Router/>
      </AuthProvider>
    </SafeAreaView>
   
    // <View style={styles.container} > 
    //   <TouchableOpacity onPress={onCheckDB} >
    //     <Text>Check DB</Text>
    //   </TouchableOpacity>
    //   <TouchableOpacity onPress={listenDB} >
    //     <Text>Listen DB</Text>
    //   </TouchableOpacity>
    //   <TouchableOpacity onPress={setDB} >
    //     <Text>Set DB</Text>
    //   </TouchableOpacity>
    //   <TouchableOpacity onPress={updateDB} >
    //     <Text>Update DB</Text>
    //   </TouchableOpacity>
    //   <TouchableOpacity onPress={pushDB} >
    //     <Text>Push DB</Text>
    //   </TouchableOpacity>
    // </View>
  )
}

const styles = StyleSheet.create({
  container:{

  }
})

export default App

// Auth işlemleri

// const signUp=()=>{
//   auth().createUserWithEmailAndPassword('jane.doeasd@example.com', 'SuperSecretPassword!')
//   .then(res => console.log('Sign Up'))
//   .catch(err=> console.log(err))
// }
// const signIn=()=>{
//   auth().signInWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
//   .then(res => console.log('Sign In'))
//   .catch(err=> console.log(err))
// }
// const signOut=()=>{
//   auth().signOut()
//   .then(res => console.log('Sign Out'))
//   .catch(err=> console.log(err))
// }
// const checkUser=()=>{
//   console.log(auth().currentUser);
  
// }

// return (
//   <View style={styles.container} > 
//     <Text style={{fontSize:70,}}>App</Text>
//     <TouchableOpacity style={{alignSelf:'center'}} onPress={signUp} >
//       <Text style={{color:'red',fontSize:22}}>Sign Up</Text>
//     </TouchableOpacity>
//     <TouchableOpacity style={{alignSelf:'center',marginTop:20}}  onPress={signIn} >
//       <Text style={{color:'red',fontSize:22}}>Sign In</Text>
//     </TouchableOpacity>
//     <TouchableOpacity style={{alignSelf:'center',marginTop:20}}  onPress={signOut} >
//       <Text style={{color:'red',fontSize:22}}>Sign Out</Text>
//     </TouchableOpacity>
//     <TouchableOpacity style={{alignSelf:'center',marginTop:20}}  onPress={checkUser} >
//       <Text style={{color:'red',fontSize:22}}>Check User</Text>
//     </TouchableOpacity>
//   </View>
// )