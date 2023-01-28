import { View, Text,StyleSheet,TextInput,TouchableOpacity } from 'react-native'
import React from 'react'
import CustomHeaderTop from '../../components/CustomHeaderTop'
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../styles/Colors';
import Send from '../../assets/send.svg'

const InMessageScreen = ({navigation}) => {
  return (
    <>
    <CustomHeaderTop onPress={()=> navigation.goBack()}/>
    <LinearGradient style={styles.container} colors={[  '#3b5998',Colors.defaultGreenColor ]} >
      <View style={styles.messageContainer}>
        <View style={styles.inputContainer}>
          <TextInput
             placeholder='Mesajınız'
             style={styles.input}
          />
        </View> 
        
        <TouchableOpacity style={styles.button} >
           <Send width={30} height={30} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
    </>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    messageContainer:{
        minHeight:70,
        width:'100%',
        position:'absolute',
        bottom:10,
        flexDirection:'row',
        alignItems:'center',
        borderRadius:40,
        justifyContent:'center'
        
    },
    inputContainer:{
        backgroundColor:'white',
        borderWidth:1,
        borderColor:Colors.defaultGrayColor,
        width:'75%',
        height:50,
        borderRadius:50,
        elevation:5
    },
    input:{
        backgroundColor:'white',
        borderRadius:50,
        marginLeft:10
    },
    button:{
        backgroundColor:'white',
        width:50,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50,
        marginLeft:10,
        borderWidth:1,
        borderColor:Colors.defaultGrayColor,
        elevation:5
    }
})

export default InMessageScreen