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
  const [loading, setLoading] = useState(true)
  const [onePress, setOnePress] = useState(true)


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
    setLoading(false)


  }


  const formatedDate = formatDistance(parseISO(message.date), new Date(), { addSuffix: true, locale: tr })

  return (
    <>

      {card ?
        <View style={styles.container}>
          <View style={[styles.left, { backgroundColor: gradiantColors.defaultGreenColor }]} />
          <View>
            <LinearGradient start={{ x: 0, y: 0.75 }} end={{ x: 1, y: 0.25 }}
              colors={[gradiantColors.defaultGreenColor, Colors.defaultDarkColor]} style={styles.gradiant} >

              <Text style={styles.messageUsername} >{message.username}</Text>
              <Text style={styles.messageText} >{message.text}</Text>
              <Text style={styles.date} >{formatedDate}</Text>

              {/* <TouchableOpacity style={[styles.heartButton,message.like > 0 ? {} :  {backgroundColor:'transparent'}  ]} onPress={message.like >= 9 ? null : onPress} >
                <Heart width={13} height={13} color={message.like > 0 ? '#DC143C' : 'white'} />
                {message.like > 0 &&
                  <Text style={{ color: 'black', fontSize: 9, }} >{message.like >= 9 ? '9+' : message.like}</Text>
                }
              </TouchableOpacity> */}

            </LinearGradient>
          </View>
        </View>
        :
        <View style={styles.container2}>
          <View>
            <LinearGradient start={{ x: 0, y: 0.75 }} end={{ x: 1, y: 0.25 }}
              colors={[gradiantColors.defaultDarkColor, gradiantColors.defaultGreenColor]} style={styles.gradiantTwo} >

              <Text style={styles.messageText} >{message.text}</Text>
              <View style={[{ justifyContent: 'space-around' }, message.like > 0 ? { flexDirection: 'row' } : {}]}>
                <Text style={[styles.date, card ? {} : { paddingHorizontal: 10 }]} >{formatedDate}</Text>
                {/* {
                  message.like > 0 &&
                  <View style={styles.rightHeartContainer} onPress={onPress} >
                    <Heart width={10} height={10} color={'#DC143C'} />
                    <Text style={{ color: 'white', fontSize: 9 }} >{message.like >= 9 ? '9+' : '5'}</Text>
                  </View>
                } */}
              </View>

            </LinearGradient>
          </View>
          <View style={[styles.right, { backgroundColor: gradiantColors.defaultGreenColor }]} />
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
  gradiant: {
    elevation: 10,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  gradiantTwo: {
    elevation: 15,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  messageText: {
    color: 'white',
    paddingHorizontal: 10,
    fontSize: 14,
    marginTop: 4

  },
  messageUsername: {
    marginLeft: 10,
    color: 'yellow',
    fontSize: 10,
    paddingRight:20
  },
  date: {
    color: 'white',
    alignSelf: 'flex-end',
    marginRight: 10,
    fontSize: 8,
    paddingHorizontal: 10,
    marginVertical: 5
  },
  heartButton: {
    flexDirection: 'row',
    position: 'absolute',
    right: -10,
    bottom: -10,
    backgroundColor: Colors.defaultGreenColor,
    height: 25,
    width: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },
  rightHeartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginRight: 10
  }


})

export default CustomMessageCard