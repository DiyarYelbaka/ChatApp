import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Menu from '../../assets/menu.svg'
import Logo from '../../assets/message.svg'
import Colors from '../../styles/Colors'
import Back from '../../assets/back.svg'
import { useSelector } from 'react-redux'

interface Props  {
    title: string
    onPress(): void
    onBackButton?: boolean
};


const CustomHeaderTop: React.FC<Props> = ({ onPress, onBackButton, title }) => {

    const gradiantColors = useSelector((state: any) => state.backGradientColor)

    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[gradiantColors.defaultDarkColor, gradiantColors.defaultBlueColor]} style={styles.container}>

            <TouchableOpacity style={styles.menu} onPress={onPress} >
                {onBackButton ?
                    <Back width={30} height={30} style={{ marginLeft: 15, color: Colors.defaultGreenColor }} /> :
                    <Menu width={30} height={30} style={{ marginLeft: 15, color: Colors.defaultGreenColor }} />
                }
            </TouchableOpacity>


            <View style={styles.menu2} >
                <Logo width={30} height={30}/>
                <Text style={styles.title} >{title}</Text>
            </View>

            <View style={styles.menu3} />

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#292F3F',
        minHeight: 60,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    menu: {
        //backgroundColor:'blue',
        flex: 0.333,
        justifyContent: 'center'
    },
    menu2: {
        //backgroundColor:'yellow',
        // flex:0.333,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    menu3: {
        // backgroundColor:'green',
        flex: 0.333
    },
    title: {
        marginLeft: 10,
        color: Colors.defaultGreenColor,
        fontSize: 15,
        fontWeight: 'bold'
    }
})

export default CustomHeaderTop