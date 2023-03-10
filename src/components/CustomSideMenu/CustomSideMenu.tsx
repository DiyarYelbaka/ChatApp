import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Colors from '../../styles/Colors'
import LinearGradient from 'react-native-linear-gradient';
import { AuthContext } from '../../context/AuthContext'
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import parseContentUserData from '../../utils/parseContentUserData'
import Lottie from 'lottie-react-native';

import { useSelector, useDispatch } from 'react-redux'
import { setGreenColor, setGrayColor, setDarkColor, setBlueColor } from '../../redux/slices/colorTemaSlice'


const CustomSideMenu = () => {

    interface User {
      username: string;
    }
      
    

    const [user, setUser] = useState<User>({username:''})

    const gradiantColors = useSelector((state:any) => state.backGradientColor)
    const dispatch = useDispatch()


    useEffect(() => {
        getUser()
    }, [])

    async function getUser() {
        try {
            const reference = await firebase.app().database("https://chatapp-9bb02-default-rtdb.europe-west1.firebasedatabase.app/").ref(`users/`)
            reference.on('value', snapshot => {
                const usersData = snapshot.val();
                const usersParsedData = parseContentUserData(usersData || {})
                const userMail = auth().currentUser?.email
                const found = usersParsedData.find(item => item.email === userMail);
                setUser(found)
            })

        } catch (error) {
            console.log(error)
        }
    }

    const { logOut } = useContext(AuthContext)

    function handlePress() {
        return logOut()
    }

    function onHandleFirsTema() {
        dispatch(setGreenColor('#0ACF83'))
        dispatch(setGrayColor('#A09F99'))
        dispatch(setDarkColor('#292F3F'))
        dispatch(setBlueColor('#3b5998'))
    }

    function onHandleSecondTema() {
        dispatch(setGreenColor('#4b749f'))
        dispatch(setDarkColor('#292F3F'))
        dispatch(setBlueColor('#243748'))
        dispatch(setGrayColor('#A09F99'))
    }

    return (

        <LinearGradient colors={[gradiantColors.defaultDarkColor, gradiantColors.defaultBlueColor, gradiantColors.defaultGreenColor]} style={{ flex: 1, borderTopRightRadius: 30, borderBottomRightRadius: 30 }}>
            <View style={styles.photoContainer}>
                <View style={styles.lottieContainer} >
                    <Lottie
                        style={{ backgroundColor: 'white' }}
                        autoPlay
                        source={require('../../assets/lottie/sideProfil.json')}
                    />
                </View>
            </View>
            <View style={styles.line} />

            <Text style={styles.welcome} >Welcome</Text>
            <Text style={styles.username} >{user.username}</Text>


            <TouchableOpacity style={styles.button} onPress={handlePress} >
                <Text style={styles.logOut} >Log Out</Text>
            </TouchableOpacity>

            <View style={{ height: 100, top: 50 }} >
                <Text style={styles.temaTitle} >Select Tema</Text>
                <View style={styles.selectTemaContainer} >
                    <TouchableOpacity onPress={onHandleFirsTema} >
                        <LinearGradient colors={[Colors.defaultDarkColor, Colors.defaultGreenColor]} style={styles.gradiantBG} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onHandleSecondTema}>
                        <LinearGradient colors={['#292F3F', Colors.defaultBlueColor, '#4b749f']} style={styles.gradiantBG} />
                    </TouchableOpacity>
                </View>
            </View>
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
        width: 140,
        height: 140,
        borderWidth: 1,
        alignSelf: 'center',
        marginTop: 90,
        borderRadius: 100,
        borderColor: 'white',
        justifyContent: 'center'
    },
    button: {
        width: '30%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'white',
        alignSelf: 'center',
        marginTop: 60,
    },
    lottieContainer: {
        height: 130,
        backgroundColor: 'bluet',
        width: 130,
        alignSelf: 'center',
        borderRadius: 100,
        overflow: 'hidden'
    },
    line: {
        width: '50%',
        height: 1,
        backgroundColor: 'white',
        marginTop: 15,
        alignSelf: 'center'
    },
    welcome: {
        alignSelf: 'center',
        fontSize: 25,
        color: 'white',
        ontWeight: 'bold',
        marginTop: 10
    },
    username: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 5
    },
    temaTitle: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 19,
        fontWeight: 'bold'
    },
    selectTemaContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: '50%',
        justifyContent: 'space-around',
        marginTop: 20
    },
    gradiantBG: {
        height: 50,
        width: 50,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'white'
    },
    logOut: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    }
})

export default CustomSideMenu