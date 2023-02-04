import { View, Text, StyleSheet,TouchableOpacity,ScrollView,FlatList,Dimensions,TextInput,Alert } from 'react-native'
import React,{useState,useEffect} from 'react'
import CustomHeaderTop from '../../components/CustomHeaderTop'
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../styles/Colors';
import AddRom from '../../assets/addRom.svg'
import Modal from "react-native-modal";
import { firebase } from '@react-native-firebase/database';
import parseContentData from '../../utils/parseContentData';
import { useSelector} from 'react-redux'
import Config from 'react-native-config'

const MessageScreen = ({ navigation }) => {

  console.log(Config.FR_RDB)

  const gradiantColors = useSelector((state) => state.backGradientColor)

  const [value, setValue]:any = useState('')
  const [isModalVisible, setModalVisible] = useState(false);
  const [contentList, setContentList]:any = useState('')
  const [user, setUser]:any = useState('')
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  function sendContent(){

    if(value==''){
      return;
    }

    const contentObject = {
      title:value,
      date: new Date().toISOString(),
    }
    
    firebase.app().database(Config.FR_RDB).ref(`rooms/`).push(contentObject)

    setModalVisible(false)
    setValue('')
  }

  useEffect(()=>{
    const reference = firebase.app().database(Config.FR_RDB).ref(`rooms/`)
    reference.on('value',snapshot => {
     const contentData =  snapshot.val();
     
     const parsedData = parseContentData(contentData || {})
     setContentList(parsedData)
     
    })
  },[])

 async function onDeleteCardPress(id){
  try {
    await firebase.app().database(Config.FR_RDB).ref(`rooms/${id}`).remove()

  } catch (error) {
    Alert.alert('hata','Silinemedi')
  }
  }

  

  const Item = ({title,id}) => (
    <TouchableOpacity  onLongPress={()=> onDeleteCardPress(id)} onPress={()=> navigation.navigate("InMessageScreen",{id}) }>
    <LinearGradient style={styles.cardContainer} colors={[gradiantColors.defaultGreenColor,gradiantColors.defaultBlueColor ]} >
      <Text style={styles.cardTitle}>{title}</Text>
    </LinearGradient>
    </TouchableOpacity>
  );
  
  // console.log(contentList)

  return (
    <>
      <CustomHeaderTop title={'ChatApp'} onPress={() => navigation.openDrawer()} />
      <LinearGradient colors={[gradiantColors.defaultBlueColor,gradiantColors.defaultGreenColor, ]} style={styles.container}>
      <View style={{marginTop:30}} />
      <FlatList
        data={contentList}
        renderItem={({item}) => <Item title={item.title} id={item.id} />}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={{alignItems:'center',paddingBottom:90}}
      />

        <TouchableOpacity style={styles.button} onPress={toggleModal} >
          <AddRom width={30} height={30} color={'red'} />
       </TouchableOpacity>

       <Modal 
       isVisible={isModalVisible}
       onBackButtonPress={toggleModal}
       onBackdropPress={toggleModal}
       >
        
        <LinearGradient colors={[gradiantColors.defaultBlueColor,gradiantColors.defaultGreenColor, ]} style={styles.modalContainer}>
          <View style={styles.modalInputContainer} >
          <TextInput
            placeholder='Oda İsmi'
            style={styles.modalInput}
            value={value}
            onChangeText={setValue}
          />
          </View>
          <TouchableOpacity style={styles.modalButton} onPress={sendContent} >
           <Text style={{alignSelf:'center',color:'white',fontSize:22,fontWeight:'bold'}} >Oda Aç</Text>
          </TouchableOpacity>
        </LinearGradient>
      </Modal>
      </LinearGradient>
    </>
  )
}

const styles = StyleSheet.create({
  modalContainer:{
    backgroundColor:'white',
    minHeight:200,
    width:'90%',
    alignSelf:'center',
    borderBottomLeftRadius:100,
    borderTopRightRadius:100,
    justifyContent:'center'
  },
  modalButton:{
    backgroundColor:Colors.defaultDarkColor,
    width:'30%',
    height:40,
    justifyContent:'center',
    marginTop:20,
    alignSelf:'center',
    borderTopRightRadius:20,
    borderBottomLeftRadius:20
  },
  modalInputContainer:{
    backgroundColor:'white',
    marginHorizontal:30,
    borderRadius:50,
    overflow:'hidden'
  },
  modalInput:{
    height:50,
    backgroundColor:'white',
    marginLeft:10
  },
  container: {
    flex: 1,

  },
  button:{
    height:60,
    width:60,
    backgroundColor:Colors.defaultGreenColor,
    borderRadius:50,
    position:'absolute',
    bottom:120,
    right:30,
    elevation:5,
    justifyContent:'center',
    alignItems:'center'
  },
  cardContainer:{
    height:160,
    margin:10,
    width:Dimensions.get('window').width/2.3,
    borderTopRightRadius:50,
    borderBottomLeftRadius:50,
    elevation:10,
    borderWidth:0,
    borderColor:Colors.defaultDarkColor,
    justifyContent:'center',
    alignItems:'center',
    

  },
  cardTitle:{
    color:'white',
    fontSize:22,
  }

})

export default MessageScreen