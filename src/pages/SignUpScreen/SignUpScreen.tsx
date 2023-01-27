import { View, Text, ImageBackground, StyleSheet, Image, Switch, TouchableOpacity,Dimensions } from 'react-native'
import React, { useState } from 'react'
import BgImage from '../../assets/Login.png'
import CustomInput from '../../components/CustomInput'
import { ScrollView } from 'react-native-gesture-handler'
import CustomButton from '../../components/CustomButton'
import Colors from '../../styles/Colors'
import CustomSocialButton from '../../components/CustomSocialButton'

const SignUpScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <ImageBackground source={BgImage} style={styles.image}>
      <ScrollView>
        <Text style={styles.title}>Sign Up</Text>
        <CustomInput title={'User Name'} placeholder={'User Name'} visiblePassword={false} />
        <CustomInput title={'Email'} placeholder={'Email Addres'} visiblePassword={false} />
        <CustomInput title={'Password'} placeholder={'Password'} visiblePassword={true} />
        <CustomInput title={'Confirm Password'} placeholder={'Confirm Password'} visiblePassword={true} />
        
        {/* Component */}
        <CustomButton title={'Sign Up'} />
         {/* Component */}
        <CustomSocialButton  title={'Or SignUp With '}/>
      
        <View style={{flexDirection:'row', marginHorizontal: 68,justifyContent:'center',marginTop:Dimensions.get('window').height/11,margin:20}} >
          <Text style={{color:'white'}} >Already have an account?</Text>
          <TouchableOpacity>
            <Text style={{color:Colors.defaultGreenColor,marginLeft:5}} >Login</Text>
          </TouchableOpacity>
        </View>
        
      </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '120%',
    alignSelf: 'center'
  },
  title: {
    color: 'white',
    fontSize: 28,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: 40
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
    marginHorizontal: 68,
  }
});

export default SignUpScreen