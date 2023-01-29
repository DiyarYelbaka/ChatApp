import { View, Text,StyleSheet } from 'react-native'
import React,{useState} from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Colors from '../../styles/Colors'
import {  formatDistance, parseISO, subDays } from 'date-fns'
import {tr} from 'date-fns/locale'

const CustomMessageCard = ({message}) => {

  // let setTimeZone

  // console.log(message.date)
  // if(message.date.length <0){
  //   console.log('sa')
  //   setTimeZone ="2023-01-29T11:03:00.780Z"
  // }else{
  //   setTimeZone =message.date
  // }

  const formatedDate = formatDistance(parseISO(message.date), new Date(), { addSuffix: true,locale:tr })
  

  // moment(message.date).startOf('hour').fromNow() 

  return (
   <View   style={styles.container}>

     <View style={styles.left}/>

    <LinearGradient start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}} 
     colors={[Colors.defaultGreenColor,Colors.defaultDarkColor ]} style={{  flex:1 ,borderTopRightRadius:20,borderBottomLeftRadius:20,}} >
      <Text style={{color:'black',marginLeft:10}} >{message.username}</Text>
      <Text style={{color:'white',marginLeft:10}} >{message.text}</Text>
      <View>

      </View>
      <Text style={{color:'white',alignSelf:'flex-end',marginRight:10,fontSize:10}} >{formatedDate}</Text>
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