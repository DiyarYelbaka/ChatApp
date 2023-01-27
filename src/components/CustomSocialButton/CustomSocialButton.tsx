import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../styles/Colors'
import Google from '../../assets/google.svg'
import Facebook from '../../assets/facebook.svg'
import Apple from '../../assets/apple.svg'

const CustomSocialButton = () => {
  return (
    <View style={styles.container}>
    <View style={{alignSelf:'center',flexDirection:'row',alignItems:'center',marginTop:40}}>
      <View style={{flex: 1, height: 1, backgroundColor: Colors.defaultGrayColor}} />
      <Text style={{color:'white'}}>    Or Login With    </Text>
      <View style={{flex: 1, height: 1, backgroundColor:  Colors.defaultGrayColor}} />
    </View>
    <View style={styles.cardContainer}>
     <TouchableOpacity style={styles.card}>
      <Google width="20" height="30" fill={'#A09F99'} style={styles.logo} />
     </TouchableOpacity>
     <TouchableOpacity style={styles.card}>
      <Apple width="20" height="30" fill={'#A09F99'} style={styles.logo} />
     </TouchableOpacity>
     <TouchableOpacity style={styles.card}>
      <Facebook width="20" height="30" fill={'#A09F99'} style={styles.logo} />
     </TouchableOpacity>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:65,
    },
    cardContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:15
    },
    card:{
        backgroundColor:'#484848',
        height:60,
        width:'30%',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10
    },
    logo:{

    }
})

export default CustomSocialButton