import { View, Text,ImageBackground,StyleSheet } from 'react-native'
import React from 'react'
import BgImage from '../../assets/Login.png'

const WelcomeScreen = () => {
  return (
    <ImageBackground source={BgImage} style={styles.image}>

    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    container:{

    },
    image: {
        flex: 1,
        width: '120%',
        alignSelf: 'center'
      },
})

export default WelcomeScreen