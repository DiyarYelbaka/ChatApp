import { View, Text, ImageBackground,StyleSheet,Image } from 'react-native'
import React from 'react'
import BgImage from '../../assets/Login.png'
import CustomInput from '../../components/CustomInput'
import { ScrollView } from 'react-native-gesture-handler'

const SignInScreen = () => {
  return (
   <ImageBackground source={BgImage} style={styles.image}>
    <ScrollView>
     <Text style={styles.title}>Login</Text>
     <CustomInput title={'Email'} placeholder={'Email Addres'} visiblePassword={false} />
     <CustomInput title={'Password'} placeholder={'Password'} visiblePassword={true} />
     
    </ScrollView>
   </ImageBackground>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width:'120%',
    alignSelf:'center',
  },
  title:{
    color:'white',
    fontSize:28,
    alignSelf:'center',
    fontWeight:'bold'
  }
});

export default SignInScreen