import { View, Text, ImageBackground, StyleSheet, Image, Switch, TouchableOpacity, Dimensions } from 'react-native'
import React, { useContext, useState } from 'react'
import BgImage from '../../assets/Login.png'
import CustomInput from '../../components/CustomInput'
import { ScrollView } from 'react-native-gesture-handler'
import CustomButton from '../../components/CustomButton'
import Colors from '../../styles/Colors'
import CustomSocialButton from '../../components/CustomSocialButton'
import { useForm, Controller } from "react-hook-form";
import { AuthContext } from '../../context/AuthContext'
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux'
import Lottie from 'lottie-react-native';
import Loading from '../../Loading'

const SignInScreen = ({ navigation }: any) => {

  const gradiantColors = useSelector((state) => state.backGradientColor)
  const { handleSubmit, control, formState: { errors } } = useForm();

  const [isEnabled, setIsEnabled] = useState(false);


  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const { login } = useContext(AuthContext)

  async function onLoginPress(data) {
    const { password, email } = data;
    return login(email, password)
  }



  // if(1>0){
  //   return <Loading  />
  // }



  return (

    <LinearGradient colors={[gradiantColors.defaultBlueColor, gradiantColors.defaultGreenColor,]} style={styles.container}>
      <ScrollView>
        <View style={styles.lottieContainer} >
          <Lottie
            style={{ backgroundColor: 'white',flex:1 }}
            autoPlay
            source={require('../../assets/lottie/loginProfile.json')}
          />
        </View>
        <Text style={styles.title}>Login</Text>
        <CustomInput
          title={'Email'}
          placeholder={'Email Addres'}
          visiblePassword={false}
          control={control}
          name={'email'}
          rules={{
            required: 'Please enter username.',
            minLength: {
              value: 2,
              message: 'Geçersiz Email!'
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
          }}
          secureTextEntry={true}
        />

        <View style={styles.rememberMeContainer} >
          <View style={{ flexDirection: 'row' }} >
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isEnabled ? Colors.defaultGreenColor : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{ alignSelf: 'flex-start' }}
            />
            <Text style={{ color: 'white', alignSelf: 'center' }} >Remember Me</Text>
          </View>
          <TouchableOpacity style={{ elevation: 5 }}  >
            <Text style={{ color: 'white', textDecorationLine: 'underline' }}>forgot password?</Text>
          </TouchableOpacity>
        </View>

        {/* Component */}
        <CustomButton title={'Login'} onPress={handleSubmit(onLoginPress)} />
        {/* Component */}
        <CustomSocialButton title={'Or Login With '} />

        <View style={{ flexDirection: 'row', marginHorizontal: 68, justifyContent: 'center', marginTop: Dimensions.get('window').height / 12 ,marginBottom:20}} >
          <Text style={{ color: 'white' }} >Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')} >
            <Text style={{ color: 'white', marginLeft: 5, fontWeight: 'bold' }} >Sign Up</Text>
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
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
    marginHorizontal: 68,
  },
  lottieContainer: {
    height: 100,
    backgroundColor: 'blue',
    width: 100,
    alignSelf: 'center',
    borderRadius: 100,
    overflow: 'hidden',
    marginTop: 120,
    elevation:10
  }
});

export default SignInScreen