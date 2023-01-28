import { View, Text,StyleSheet,TouchableOpacity,ImageBackground } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Menu from '../../assets/menu.svg'
import Logo from '../../assets/message.svg'
import Colors from '../../styles/Colors'
import BG from '../../assets/Login.png'


const CustomHeaderTop = ({onPress}) => {
  return (
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}}  colors={[Colors.defaultDarkColor, '#3b5998' ]} style={styles.container}>
        <TouchableOpacity style={styles.menu} onPress={onPress} >
           <Menu width={30} height={30}  style={{marginLeft:15}}   />
        </TouchableOpacity>
        <View style={styles.menu2} >
            <Logo width={30} height={30} />
            <Text style={styles.title} >ChatApp</Text>
        </View>
        <View style={styles.menu3} />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#292F3F',
        minHeight:60,
        justifyContent:'center',
        flexDirection:'row'
    },
    menu:{
        //backgroundColor:'blue',
        flex:0.333,
        justifyContent:'center'
    },
    menu2:{
        //backgroundColor:'yellow',
        flex:0.333,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    menu3:{
       // backgroundColor:'green',
        flex:0.333
    },
    title:{
        marginLeft:10,
        color:Colors.defaultGreenColor,
        fontSize:18,
        fontWeight:'bold'
    }
})

export default CustomHeaderTop