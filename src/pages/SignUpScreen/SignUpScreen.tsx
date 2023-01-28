import { View, Text, ImageBackground, StyleSheet, Image, Switch, TouchableOpacity, Dimensions } from 'react-native'
import React, { useContext, useState } from 'react'
import BgImage from '../../assets/Login.png'
import CustomInput from '../../components/CustomInput'
import { ScrollView } from 'react-native-gesture-handler'
import CustomButton from '../../components/CustomButton'
import Colors from '../../styles/Colors'
import CustomSocialButton from '../../components/CustomSocialButton'
import { useForm, Controller } from "react-hook-form";
import authErrorMessageParser from '../../utils/authErrorMessageParser'
import { showMessage} from "react-native-flash-message";
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../../context/AuthContext'

const SignUpScreen = ({ navigation }: any) => {
  

  const { handleSubmit, control, formState: { errors },watch } = useForm();

  const pwd = watch('password')


  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

 

  const {register} = useContext(AuthContext)

async function onSignUpPress(data) {
    const {email,password} = data;
    return register(email,password)
  }


  return (
    <ImageBackground source={BgImage} style={styles.image}>
      <ScrollView>
        <Text style={styles.title}>Sign Up</Text>
      
        <CustomInput
          title={'Email'}
          placeholder={'Email Addres'}
          visiblePassword={false}
          control={control}
          name={'email'}
          rules={{
            required: 'Please enter email.',
            minLength: {
              value: 5,
              message: 'Invalid email.'
            },
          }}
          secureTextEntry={false}
        />

        <CustomInput
          title={'Password'}
          placeholder={'Password'}
          visiblePassword={true}
          control={control}
          name={'password'}
          rules={{
            required: 'Please enter password.',
            minLength: {
              value: 5,
              message: 'Invalid password.'
            },
          }}
          secureTextEntry={true}
        />

        <CustomInput
          title={'Confirm Password'}
          placeholder={'Confirm Password'}
          visiblePassword={true}
          control={control}
          name={'confirmPassword'}
          rules={{
            validate:value => value == pwd || 'password do not match'
           }}
           secureTextEntry={true}
        />

        {/* Component */}
        <CustomButton title={'Sign Up'} onPress={handleSubmit(onSignUpPress)} />
        {/* Component */}
        <CustomSocialButton title={'Or SignUp With '} />

        <View style={{ flexDirection: 'row', marginHorizontal: 68, justifyContent: 'center', marginTop: Dimensions.get('window').height / 11, margin: 20 }} >
          <Text style={{ color: 'white' }} >Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')} >
            <Text style={{ color: Colors.defaultGreenColor, marginLeft: 5, fontWeight: 'bold' }} >Login</Text>
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
    marginTop: 50,
    marginBottom: 10
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