import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import BG from '../../assets/Login.png'
import profil from '../../assets/profile.png'
import Colors from '../../styles/Colors'
import LinearGradient from 'react-native-linear-gradient';

const CustomSideMenu = () => {
    return ( 
     
        <LinearGradient colors={[Colors.defaultDarkColor, '#3b5998', Colors.defaultGreenColor]} style={{flex:1}}>
                <View style={styles.photoContainer}>
                    <Image
                        source={profil}
                        style={styles.image}
                    />
                </View>
               <View style={{width:'50%',height:1,backgroundColor:'white',marginTop:15,alignSelf:'center'}} />

                <Text style={{ alignSelf: 'center', fontSize: 25, color: 'white', fontWeight: 'bold', marginTop: 10 }} >Hoşgeldin</Text>
                <Text style={{ alignSelf: 'center', color: 'white', fontSize: 22, fontWeight: 'bold', marginTop: 5 }} >Diyar</Text>
               
            
                <TouchableOpacity style={styles.button}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }} >Log Out</Text>
                </TouchableOpacity>
 
        </LinearGradient>
        
    )
}

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
        alignSelf: 'center'
    },
    photoContainer: {
        width: 150,
        height: 150,
        borderWidth: 1,
        alignSelf: 'center',
        marginTop: 90,
        borderRadius: 100,
        borderColor: Colors.defaultGrayColor,
        justifyContent: 'center'
    },
    button: {
        width: '30%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 10,
        borderColor:'white',
        alignSelf:'center',
        marginTop:60,
        backgroundColor:'#95A5A6'
    }
})

export default CustomSideMenu