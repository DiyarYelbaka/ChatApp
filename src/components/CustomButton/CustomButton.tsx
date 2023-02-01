import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../styles/Colors'

 type Props = {
    title:string
    onPress(): void
  };

const CustomButton:React.FC<Props> = ({title,onPress}) => {
  return (
   <TouchableOpacity style={styles.container} onPress={onPress} >
    <Text style={styles.text}>{title}</Text>
   </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.defaultGreenColor,
        height:55,
        marginHorizontal:68,
        marginTop:30,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center',

    },
    text:{
        color:'white',
        fontSize:18,
        fontWeight:'bold'
    }
})

export default CustomButton