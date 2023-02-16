import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList,ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomHeaderTop from '../../components/CustomHeaderTop'
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../styles/Colors';
import Send from '../../assets/send.svg'
import { firebase } from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import parseContentData from '../../utils/parseContentData';
import CustomMessageCard from '../../components/CustomMessageCard';
import parseContentUserData from '../../utils/parseContentUserData';
import { useSelector } from 'react-redux'
import Config from 'react-native-config';
import { FlashList } from "@shopify/flash-list";





const InMessageScreen = ({ navigation, route }:any) => {

  // const showNotification = () => {
  //   PushNotification.localNotification({
  //     title: '🌹Sevgililer Günü İndirimi',
  //     message: '💎Sevdikleriniz için en anlamlı hediyeler artık %30 indirimli',
  //     popInitialNotification: true,
  //   });
  // };


  const gradiantColors = useSelector((state:any) => state.backGradientColor)

  const { id, title } = route.params;

  interface User {
    username: string;
  }

  const [value, setValue] = useState<string>('')
  const [contentList, setContentList]:any= useState('')
  const [user, setUser] = useState<User>({username:''})


  useEffect(() => {
    ListDataFunc()
    getUser()
  }, [])
  

  //User Çekme
  async function getUser() {
    try {
      const reference = await firebase.app().database(Config.FR_RDB).ref(`users/`)
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


  async function ListDataFunc() {
    const reference = firebase.app().database(Config.FR_RDB).ref(`/rooms/${id}/messages/`)
    reference.on('value', snapshot => {
      const contentData = snapshot.val();
      const parsedData = parseContentData(contentData || {})
      setContentList(parsedData)

    })
  }


  function sendContent() {

    if (value == '') {
      return;
    }


    let now = new Date();
    let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    let localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);


    const contentObject = {
      text: value,
      username: user.username,
      date: localISOTime,
      like: 0,
    }

    firebase.app().database(Config.FR_RDB).ref(`rooms/${id}/messages/`).push(contentObject)

    setValue('')
  }
  // Kalp Sayısı Ekleme
  // function onHandleHeart(item) {
  //   if(item.like>= 9){
  //     return null
  //   }
  //   firebase.app().database(Config.FR_RDB).ref(`rooms/${id}/messages/${item.id}/`).update({ like: item.like + 1 })
  // }
  
  interface RenderContentProps {
    item: {
      username: string;
      text: string;
      like: number;
      date: string;
      id:string
    };
  }
  
  const renderContent: React.FC<RenderContentProps> = ({ item }) => (
    <CustomMessageCard
      message={item}
    />
   
  )



  return (
    <>
      <CustomHeaderTop title={title} onPress={() => navigation.goBack()} onBackButton={true} />
      <LinearGradient style={styles.container} colors={[gradiantColors.defaultBlueColor, gradiantColors.defaultGreenColor]} >
     
        <FlatList
          data={contentList}
          renderItem={renderContent}
          keyExtractor={item => item.id}
          inverted={true}
          initialNumToRender={20}
          contentContainerStyle={{ paddingTop: 90,}}
          
          
        />
      

        <View style={styles.messageContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder='Mesajınız'
              style={styles.input}
              value={value}
              onChangeText={setValue}
              multiline={true}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={sendContent} >
            <Send width={30} height={30} />
          </TouchableOpacity>
        </View>

      </LinearGradient>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  messageContainer: {
    minHeight: 70,
    width: '100%',
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 40,
    justifyContent: 'center'

  },
  inputContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: Colors.defaultGrayColor,
    width: '75%',
    minHeight: 50,
    borderRadius: 50,
    elevation: 5
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 50,
    marginLeft: 10,
  },
  button: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: Colors.defaultGrayColor,
    elevation: 5,

  }
})

export default InMessageScreen