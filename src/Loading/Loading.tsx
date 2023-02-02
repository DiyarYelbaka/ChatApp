import { View, Text } from 'react-native'
import React from 'react'
import Lottie from 'lottie-react-native';

const Loading = () => {
  return (
    <Lottie
    style={{backgroundColor:'white'}}
      autoPlay
      source={require('../../src/assets/lottie/loginBG.json')}
    />
  )
}

export default Loading