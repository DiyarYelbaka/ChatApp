import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Colors from '../../styles/Colors'
import { formatDistance, parseISO, subDays } from 'date-fns'
import { tr } from 'date-fns/locale'
import Heart from '../../assets/heart.svg'
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import parseContentUserData from '../../utils/parseContentUserData'
import { useSelector } from 'react-redux'

const CustomMessageCard = ({ message, onPress, user }) => {

  const [card, setCard] = useState(true)

  const gradiantColors = useSelector((state) => state.backGradientColor)


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
        if (found.username == user) {
          setCard(false)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }


  const formatedDate = formatDistance(parseISO(message.date), new Date(), { addSuffix: true, locale: tr })

  return (
    <>
      {card ?
        <View style={styles.container}>
          <View style={[styles.left,{backgroundColor:gradiantColors.defaultGreenColor}]} />
          <View>
            <LinearGradient start={{ x: 0, y: 0.75 }} end={{ x: 1, y: 0.25 }}
              colors={[gradiantColors.defaultGreenColor, Colors.defaultDarkColor]} style={{ flex: 1, elevation:10, borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }} >

              <Text style={{ marginLeft: 10, color: Colors.defaultDarkColor, fontSize: 10 }} >{message.username}</Text>
              <Text style={{ color: 'white', marginLeft: 10, paddingHorizontal: 10, fontSize: 14, marginTop: 5 }} >{message.text}</Text>
              <Text style={{ color: 'white', alignSelf: 'flex-end', marginRight: 10, fontSize: 8, paddingHorizontal: 20, marginVertical: 5 }} >{formatedDate}</Text>

              <TouchableOpacity style={{ position: 'absolute', right: 10, top: 5, flexDirection: 'row' }} onPress={onPress} >
                <Heart width={13} height={13} color={'#DC143C'} />
                {message.like > 0 && <Text style={{ alignSelf: 'flex-end', color: 'white', fontSize: 10 }} >{message.like}</Text>}
              </TouchableOpacity>

            </LinearGradient>
          </View>
        </View>
       :
        <View style={styles.container2}>
          <View>
            <LinearGradient start={{ x: 0, y: 0.75 }} end={{ x: 1, y: 0.25 }}
              colors={[gradiantColors.defaultDarkColor, gradiantColors.defaultGreenColor]} style={[{ elevation:5, borderTopLeftRadius: 15, borderBottomLeftRadius: 15, borderBottomRightRadius: 15, justifyContent: 'center' }]} >
              <Text style={[{ color: 'white', marginLeft: 1, textAlign: 'center', alignSelf: 'flex-start', },message.like>0 ? {paddingHorizontal:25}:{paddingHorizontal: 10,padding:5 }]} >{message.text}</Text>
              <Text style={{ color: 'white', alignSelf: 'flex-end', marginRight: 10, fontSize: 8, paddingHorizontal: 10, paddingVertical: 5 }} >{formatedDate}</Text>
            {
              message.like >0 &&
              <View style={{ position: 'absolute', left: 7,top:3, flexDirection: 'row' }} onPress={onPress} >
                <Heart width={13} height={13} color={'#DC143C'} />
                 <Text style={{ alignSelf: 'flex-end', color: 'white', fontSize: 10 }} >{message.like}</Text>
              </View>
            }
            

            </LinearGradient>
          </View>
          <View style={[styles.right,{backgroundColor:gradiantColors.defaultGreenColor}]} />
        </View>
     }
    </>

  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: '80%',
    flexDirection: 'row',
    borderRadius: 50,
    marginLeft: 5,
    marginVertical: 4
  },
  left: {
    width: '2%',
    height: 10,
    borderBottomLeftRadius: 100

  },
  container2: {
    width: '80%',
    flexDirection: 'row',
    borderRadius: 50,
    marginRight: 5,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    marginVertical: 4,
   

  },
  right: {
    width: '2%',
    height: 10,
    borderBottomRightRadius: 100

  },
})

export default CustomMessageCard