import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native'
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


const InMessageScreen = ({ navigation, route }) => {

  const { id } = route.params;

  const [value, setValue]: any = useState('')
  const [contentList, setContentList]: any = useState('')
  const [user, setUser]: any = useState('')


  useEffect(() => {
    ListDataFunc()
    getUser()
  }, [])

  //User Çekme
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


  async function ListDataFunc() {
    const reference = firebase.app().database("https://chatapp-9bb02-default-rtdb.europe-west1.firebasedatabase.app/").ref(`/rooms/${id}/messages/`)
    reference.on('value', snapshot => {
      const contentData = snapshot.val();
      const parsedData = parseContentData(contentData || {})
      setContentList(parsedData)

    })
  }




  function onSendPress() {
    // firebase.app().database('"https://chatapp-9bb02-default-rtdb.europe-west1.firebasedatabase.app/"').ref('messages/')
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
      like: 0
    }

    firebase.app().database("https://chatapp-9bb02-default-rtdb.europe-west1.firebasedatabase.app/").ref(`rooms/${id}/messages/`).push(contentObject)

    setValue('')
  }

  function onHandleHeart(item) {
    firebase.app().database("https://chatapp-9bb02-default-rtdb.europe-west1.firebasedatabase.app/").ref(`rooms/${id}/messages/${item.id}/`).update({ like: item.like + 1 })
  }

  const renderContent = ({ item }) => <CustomMessageCard message={item} user={item.username} onPress={() => onHandleHeart(item)} />



  return (
    <>
      <CustomHeaderTop onPress={() => navigation.goBack()} onBackButton={true} />
      <LinearGradient style={styles.container} colors={[Colors.defaultBlueColor, Colors.defaultGreenColor]} >

        <FlatList
          data={contentList}
          renderItem={renderContent}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 90 }}
        />

        <View style={styles.messageContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder='Mesajınız'
              style={styles.input}
              value={value}
              onChangeText={setValue}
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
    height: 50,
    borderRadius: 50,
    elevation: 5
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 50,
    marginLeft: 10
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
    elevation: 5
  }
})

export default InMessageScreen