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
import { useSelector} from 'react-redux'
import LinearGradient from 'react-native-linear-gradient';

const SignUpScreen = ({ navigation }: any) => {
  
  const gradiantColors = useSelector((state) => state.backGradientColor)
  const { handleSubmit, control, formState: { errors },watch } = useForm();

  const pwd = watch('password')


  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

 

  const {register} = useContext(AuthContext)

async function onSignUpPress(data) {
    const {email,password,username} = data;
    return register(email,password,username)
  }


  return (
    <LinearGradient colors={[gradiantColors.defaultBlueColor, gradiantColors.defaultGreenColor,]} style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Sign Up</Text>
        <CustomInput
          title={'User Name'}
          placeholder={'User Name'}
          visiblePassword={false}
          control={control}
          name={'username'}
          rules={{
            required: 'Please enter username.',
            minLength: {
              value: 1,
              message: 'Invalid username.'
            },
          }}
          secureTextEntry={false}
        />
      
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
            <Text style={{ color:'white', marginLeft: 5, fontWeight: 'bold' }} >Login</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
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