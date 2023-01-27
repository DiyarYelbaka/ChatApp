import { View, Text, ImageBackground, StyleSheet, Image, Switch, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import BgImage from '../../assets/Login.png'
import CustomInput from '../../components/CustomInput'
import { ScrollView } from 'react-native-gesture-handler'
import CustomButton from '../../components/CustomButton'
import Colors from '../../styles/Colors'
import CustomSocialButton from '../../components/CustomSocialButton'

const SignInScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <ImageBackground source={BgImage} style={styles.image}>
      <ScrollView>
        <Text style={styles.title}>Login</Text>
        <CustomInput title={'Email'} placeholder={'Email Addres'} visiblePassword={false} />
        <CustomInput title={'Password'} placeholder={'Password'} visiblePassword={true} />
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
        <CustomButton />
         {/* Component */}
        <CustomSocialButton/>
      
        
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
    marginTop: 120
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