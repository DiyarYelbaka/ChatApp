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

const SignInScreen = ({ navigation }: any) => {


  const { handleSubmit, control, formState: { errors } } = useForm();

  const [isEnabled, setIsEnabled] = useState(false);


  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const {login} = useContext(AuthContext)

  async function onLoginPress(data) {
    const { password, email } = data;
    return login(email,password)
  }
 

  return (
    
    <ImageBackground source={BgImage} style={styles.image}>
      <ScrollView>
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
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{ alignSelf: 'flex-start', transform: [{ scaleX: 1.1 }, { scaleY: 1.2 }] }}
            />
            <Text style={{ color: '#A09F99', alignSelf: 'center' }} >Remember Me</Text>
          </View>
          <TouchableOpacity  >
            <Text style={{ color: '#A09F99', textDecorationLine: 'underline' }}>forgot password?</Text>
          </TouchableOpacity>
        </View>

        {/* Component */}
        <CustomButton title={'Login'} onPress={handleSubmit(onLoginPress)} />
        {/* Component */}
        <CustomSocialButton title={'Or Login With '} />

        <View style={{ flexDirection: 'row', marginHorizontal: 68, justifyContent: 'center', marginTop: Dimensions.get('window').height / 8 }} >
          <Text style={{ color: 'white' }} >Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')} >
            <Text style={{ color: Colors.defaultGreenColor, marginLeft: 5, fontWeight: 'bold' }} >Sign Up</Text>
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
    marginTop: 120,
    marginBottom: 20
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
    marginHorizontal: 68,
  }
});

export default SignInScreen