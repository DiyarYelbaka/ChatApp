import { View, Text, StyleSheet, Image, ImageStyle } from 'react-native'
import React from 'react'
import Home from '../../assets/home.svg'
import Colors from '../../styles/Colors'
import Dot from '../../assets/dot.svg'
import Message from '../../assets/message-menu.svg'


const CustomTabIcon = ({ source, focused, title }: any) => {
    return (
        <View>
            <View style={{ alignItems: 'center', justifyContent: 'center', width:50}}>
                {source==1 && <Home width="100%" height="25" 
                    style={{ color: focused ? Colors.defaultGreenColor : 'white' }}
                />}
                {source==2 && <Message width='100%' height="25"
                    style={{ color: focused ?  Colors.defaultGreenColor : 'white' }}
                />}
                  {focused && 
                    <Dot width="50" height="25"
                    style={{ color: focused ?  Colors.defaultGreenColor : 'white', }}/>
                  }  

            </View>
        
        </View>
    )
}



export default CustomTabIcon