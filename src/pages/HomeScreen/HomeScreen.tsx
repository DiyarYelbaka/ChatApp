import { View, Text } from 'react-native'
import React from 'react'
import CustomHeaderTop from '../../components/CustomHeaderTop'
import LinearGradient from 'react-native-linear-gradient';
const HomeScreen = ({navigation}) => {
  return (
    <>
    <CustomHeaderTop onPress={()=> navigation.openDrawer()}/>
    <View>
      <Text>HomeScasdreen</Text>
    </View>
    </>
  )
}

export default HomeScreen