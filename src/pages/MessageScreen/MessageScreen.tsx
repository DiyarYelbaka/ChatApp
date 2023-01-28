import { View, Text, StyleSheet,TouchableOpacity,ScrollView,FlatList,Dimensions,TextInput } from 'react-native'
import React,{useState} from 'react'
import CustomHeaderTop from '../../components/CustomHeaderTop'
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../styles/Colors';
import AddRom from '../../assets/addRom.svg'
import Modal from "react-native-modal";

const MessageScreen = ({ navigation }) => {

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Aşk',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Yazılım',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Okul',
    },
    {
      id: '586943a0f-3da1-471f-bd96-145571e29d72',
      title: 'Hayat',
    },
    
    
  ];

  const Item = ({title}) => (
    <TouchableOpacity onPress={()=> navigation.navigate("InMessageScreen") }>
    <LinearGradient style={styles.cardContainer} colors={[Colors.defaultGreenColor, '#3b5998' ]} >
      <Text style={styles.cardTitle}>{title}</Text>
    </LinearGradient>
    </TouchableOpacity>
  );
  

  
  return (
    <>
      <CustomHeaderTop onPress={() => navigation.openDrawer()} />
      <LinearGradient colors={[Colors.defaultDarkColor, '#3b5998',]} style={styles.container}>
      <View style={{marginTop:30}} />
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={{alignItems:'center'}}
       
      />

        <TouchableOpacity style={styles.button} onPress={toggleModal} >
          <AddRom width={30} height={30} color={'red'} />
       </TouchableOpacity>

       <Modal 
       isVisible={isModalVisible}
       onBackButtonPress={toggleModal}
       onBackdropPress={toggleModal}
       >
        <LinearGradient colors={[Colors.defaultGreenColor, '#3b5998',]} style={styles.modalContainer}>
          <View style={styles.modalInputContainer} >
          <TextInput
            placeholder='Oda İsmi'
            style={styles.modalInput}
          />
          </View>
          <TouchableOpacity style={{backgroundColor:Colors.defaultDarkColor,width:'30%',height:40,justifyContent:'center',marginTop:20,alignSelf:'center',borderTopRightRadius:20,borderBottomLeftRadius:20}}>
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
    backgroundColor:Colors.defaultGreenColor,
    height:160,
    margin:10,
    width:Dimensions.get('window').width/2.3,
    borderTopRightRadius:50,
    borderBottomLeftRadius:50,
    elevation:10,
    borderWidth:2,
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