import { View, Text, StyleSheet, ScrollView, Dimensions, Image, TouchableOpacity, TextInput, Alert, Linking } from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomHeaderTop from '../../components/CustomHeaderTop'
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import Colors from '../../styles/Colors';
import Lottie from 'lottie-react-native';
import Hand from '../../assets/hand.svg'
import Modal from "react-native-modal";
import { firebase } from '@react-native-firebase/database';
import VersionCheck from 'react-native-version-check';


import { useSelector } from 'react-redux'
import Config from 'react-native-config';


const HomeScreen = ({ navigation }:any) => {


  const [isModalVisible, setModalVisible] = useState(false)

  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const versionApp = VersionCheck.getCurrentVersion()

  const gradiantColors = useSelector((state: any) => state.backGradientColor)
  const DATA = [
    {
      id: '1bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      url: 'https://raw.githubusercontent.com/DiyarYelbaka/ChatApp/main/src/assets/carousel/snap1.png'
    },
    {
      id: '23ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
      url: 'https://raw.githubusercontent.com/DiyarYelbaka/ChatApp/main/src/assets/carousel/snap2.png'
    },
    {
      id: '458694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      url: 'https://raw.githubusercontent.com/DiyarYelbaka/ChatApp/main/src/assets/carousel/snap4.png'
    },
  ];

  function onOpenModal() {
    setModalVisible(!isModalVisible);
  }

  function onSendSubjectPress() {

    try {
      const contentObject = {
        title,
        description,
        date: new Date().toISOString(),
      }
      firebase.app().database(Config.FR_RDB).ref(`requests/`).push(contentObject)
      Alert.alert('Successful', 'Your request has been sent successfully.')

    } catch (error) {
      Alert.alert('Ops', 'Please try again later.')
    }
    setModalVisible(false)
    setDescription('')
    setTitle('')

  }

  interface Item {
    url: string;
  }
  
  interface RenderItemProps {
    item: Item;
  }

  const _renderItem = ({ item }: RenderItemProps) => {

    return (
      <LinearGradient style={{ height: 200, marginTop: 20, borderRadius: 20, elevation: 15, marginBottom: 20 }} colors={[gradiantColors.defaultBlueColor, gradiantColors.defaultGreenColor]} >
        <Image
          style={{ height: 200, width: '100%' }}
          source={{ uri: item.url }}
          resizeMode={'contain'}
        />
      </LinearGradient>
    );
  }

  return (
    <>
      <LinearGradient style={styles.container} colors={[gradiantColors.defaultBlueColor, gradiantColors.defaultGreenColor]} >
        <CustomHeaderTop title={'ChatApp'} onPress={() => navigation.openDrawer()} />
        <ScrollView>
          <Carousel
            data={DATA}
            renderItem={_renderItem}
            sliderWidth={Dimensions.get('window').width / 1}
            itemWidth={Dimensions.get('window').width / 1.2}
            autoplay={true}
            autoplayDelay={5}
            loop={true}
          />


          <LinearGradient style={styles.card} colors={[gradiantColors.defaultBlueColor, gradiantColors.defaultGreenColor]} >
            <View >
              <View style={styles.cardHead} >
                <Text style={{ color: 'white', marginLeft: 20, fontSize: 15, fontWeight: 'bold' }} >
                  Hello! Welcome
                </Text>
                <Hand style={{ top: -3 }} width={35} height={20} />
              </View>
              <View style={{ marginHorizontal: 10, justifyContent: 'center' }} >
                <Text style={{ color: 'white', marginLeft: 20, fontWeight: 'bold' }} >
                  {' '} The app is currently under construction.
                </Text>
                <Text style={{ color: 'white', marginLeft: 20, fontWeight: 'bold', marginTop: 10 }} >
                  - If you have requests and requests, you can send them to us by pressing the button below.
                </Text>
                <TouchableOpacity onPress={onOpenModal} style={{ marginHorizontal: 100 }} >
                  <LinearGradient style={styles.button} colors={[gradiantColors.defaultGreenColor, gradiantColors.defaultBlueColor]} >
                    <Text style={{ color: 'white' }} >Request Button</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>

          <LinearGradient style={styles.versionContainer} colors={[gradiantColors.defaultBlueColor, gradiantColors.defaultGreenColor]}>
            <Text style={{ color: '#FFFF00', fontSize: 18, fontWeight: 'bold' }} >Beta Version</Text>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }} >v.{versionApp}</Text>
          </LinearGradient>

        </ScrollView>

        {/* /////////////////Modal//////////////// */}
        <Modal
          isVisible={isModalVisible}
          onBackButtonPress={onOpenModal}
          onBackdropPress={onOpenModal}
        >

          <LinearGradient style={styles.modalContainer} colors={[gradiantColors.defaultBlueColor, gradiantColors.defaultGreenColor]} >
            <Text style={styles.modalInputHead} >Subject :</Text>
            <View style={styles.modalInputContainer} >
              <TextInput
                placeholder='Subject heading'
                style={styles.modalInput}
                value={title}
                onChangeText={setTitle}
              />
            </View>

            <Text style={styles.modalInputHead} >Description :</Text>
            <View style={styles.modalInputContainer} >
              <ScrollView>
                <TextInput
                  placeholder='Write a description'
                  style={[styles.modalInput, { height: 120 }]}
                  multiline
                  value={description}
                  onChangeText={setDescription}
                />
              </ScrollView>
            </View>

            <TouchableOpacity onPress={onSendSubjectPress} style={{ marginHorizontal: 100 }} >
              <LinearGradient style={styles.button} colors={[gradiantColors.defaultGreenColor, gradiantColors.defaultBlueColor]} >
                <Text style={{ color: 'white' }} >Send</Text>
              </LinearGradient>
            </TouchableOpacity>

          </LinearGradient>
        </Modal>

      </LinearGradient>


    </>
  )
}

const styles = StyleSheet.create({
  versionContainer: {
    minHeight: 60,
    backgroundColor: Colors.defaultBlueColor,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 10
  },
  modalContainer: {
    backgroundColor: 'white',
    minHeight: 400,
    borderRadius: 30,
    justifyContent: 'center'
  },
  modalInputContainer: {
    backgroundColor: 'white',
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15
  },
  modalInputHead: {
    color: 'white',
    marginHorizontal: 40,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  modalInput: {
    // backgroundColor:'red',
    width: '92%',
    marginLeft: 10,
    minHeight: 40,
  },
  container: {
    flex: 1
  },
  card: {
    backgroundColor: Colors.defaultDarkColor,
    minHeight: 220,
    marginHorizontal: 20,
    borderRadius: 50,
    justifyContent: 'center',
    elevation: 10,
    marginBottom: 20,
    marginTop: 20
  },
  cardHead: {
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'flex-end'
  },
  button: {
    backgroundColor: 'red',
    height: 50,
    borderRadius: 50,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5
  }
})

export default HomeScreen