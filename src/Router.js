import { View, Text,  } from 'react-native'
import React,{useEffect,useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignInScreen from './pages/SignInScreen';
import SignUpScreen from './pages/SignUpScreen';
import HomeScreen from './pages/HomeScreen';
import WelcomeScreen from './pages/WelcomeScreen';
import FlashMessage from "react-native-flash-message";
import CustomSideMenu from './components/CustomSideMenu';
import CustomTabIcon from './components/CustomTabIcon';
import Colors from './styles/Colors';
import RoomsScreen from './pages/RoomsScreen';
import InMessageScreen from './pages/InMessageScreen';
import auth from '@react-native-firebase/auth';

import { useSelector } from 'react-redux'


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const Router = () => {

  const gradiantColors = useSelector((state) => state.backGradientColor)

  const [userSession, setUserSession] = useState()

  useEffect(() => {
    auth().onAuthStateChanged((user)=>{
      setUserSession(!!user)
    });
  }, []);
  

  return (
    <NavigationContainer>
     <Stack.Navigator
     
     screenOptions={{
      headerShown:false,
     
     }}
     >
      {
        !userSession ?
        <>
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        
        </>
        :
        <>
        <Stack.Screen name="HomeScreen" component={MyDrawer} />
       <Stack.Screen name="InMessageScreen" component={InMessageScreen} />
       
        </>
      }
      </Stack.Navigator>
      <FlashMessage position="top" /> 
    </NavigationContainer>
  )



function MyDrawer() {
  return (
    <Drawer.Navigator
    drawerContent={props => <CustomSideMenu {...props} />}
    screenOptions={{
      headerShown:false ,
      drawerStyle: {
        backgroundColor: 'transparent',
        width: '65%',
      },
     }}
     
     
    >
      <Drawer.Screen name="Feed" component={MyTabs} />
    </Drawer.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
     screenOptions={{
      headerShown:false,
      tabBarShowLabel: false,
      tabBarStyle: {
        position: 'absolute',
        elevation: 8,
        backgroundColor: Colors.defaultDarkColor,
        marginHorizontal:50,
        height: 65,
        bottom:15,
        borderRadius:100,
        borderTopWidth: 0
        // borderBottomRightRadius:50,
        // borderTopxLeftRadius:50
      },
    }}
     >
      <Tab.Screen name="Home" component={HomeScreen} 
         options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon title='Ana Sayfa' focused={focused} source={1} />
          ),
        }}
      />
      <Tab.Screen name="Message" component={RoomsScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <CustomTabIcon title='Ana Sayfa' focused={focused} source={2} />
        ),
      }}
       />
    </Tab.Navigator>
  );
}

}

export default Router