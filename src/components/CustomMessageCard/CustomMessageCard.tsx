import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Colors from '../../styles/Colors'
import {  formatDistance, parseISO, subDays } from 'date-fns'
import {tr} from 'date-fns/locale'
import Heart from '../../assets/heart.svg'

const CustomMessageCard = ({message,onPress}) => {

const formatedDate = formatDistance(parseISO(message.date), new Date(), { addSuffix: true,locale:tr })
  
  return (
   <View   style={styles.container}>
     <View style={styles.left}/>
    <LinearGradient start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}} 
     colors={[Colors.defaultGreenColor,Colors.defaultDarkColor ]} style={{  flex:1 ,borderTopRightRadius:20,borderBottomLeftRadius:20,borderBottomRightRadius:20}} >

        <Text style={{color:'black',marginLeft:10}} >{message.username}</Text>
        <Text style={{color:'white',marginLeft:10,padding:10}} >{message.text}</Text>
      <Text style={{color:'white',alignSelf:'flex-end',marginRight:10,fontSize:10}} >{formatedDate}</Text>

      <TouchableOpacity style={{position:'absolute',right:10,top:10,flexDirection:'row'}} onPress={onPress} >
        <Heart width={20} height={20} color={'red'} />
      {message.like > 0 &&  <Text style={{alignSelf:'flex-end',color:'white',fontSize:10}} >{message.like}</Text>}
      </TouchableOpacity>
      
    </LinearGradient>

   </View>
   
  )
}

const styles = StyleSheet.create({
    container:{
        minHeight:60,
        marginTop:10,
        width:'80%',
        flexDirection:'row',
        borderRadius:50,
        marginLeft:5,
      
    },
    left:{
     width:'2%',
     backgroundColor:Colors.defaultGreenColor,
     height:10,
     borderBottomLeftRadius:100
      
    }
})

export default CustomMessageCard