import { View, Text,StyleSheet,TextInput,TouchableOpacity,FlatList } from 'react-native'
import React,{useState,useEffect} from 'react'
import CustomHeaderTop from '../../components/CustomHeaderTop'
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../styles/Colors';
import Send from '../../assets/send.svg'
import { firebase } from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import parseContentData from '../../utils/parseContentData';
import CustomMessageCard from '../../components/CustomMessageCard';


const InMessageScreen = ({navigation}) => {

  const [value, setValue]:any = useState('')
  const [contentList, setContentList]:any = useState('')

  useEffect(()=>{
    const reference = firebase.app().database("https://chatapp-9bb02-default-rtdb.europe-west1.firebasedatabase.app/").ref("messages/")
    reference.on('value',snapshot => {
     const contentData =  snapshot.val();
     
     const parsedData = parseContentData(contentData || {})
     setContentList(parsedData)
     
    })
  },[])


  function onSendPress(){
    // firebase.app().database('"https://chatapp-9bb02-default-rtdb.europe-west1.firebasedatabase.app/"').ref('messages/')
  }

  function sendContent(){

    if(value==''){
      return;
    }

    const userMail = auth().currentUser?.email

    const contentObject = {
      text:value,
      username:userMail?.split('@')[0],
      date: new Date().toISOString(),
      like:0
    }
    
    firebase.app().database("https://chatapp-9bb02-default-rtdb.europe-west1.firebasedatabase.app/").ref('messages/').push(contentObject)

    setValue('')
  }

  function onHandleHeart(item){
    firebase.app().database("https://chatapp-9bb02-default-rtdb.europe-west1.firebasedatabase.app/").ref(`messages/${item.id}/`).update({like:item.like+1})
  }

  const renderContent= ({item}) =>  <CustomMessageCard message={item} onPress={()=>onHandleHeart(item)} /> 

  console.log(contentList)

  return (
    <>
    <CustomHeaderTop onPress={()=> navigation.goBack()} onBackButton={true} />
    <LinearGradient style={styles.container} colors={[  '#3b5998',Colors.defaultGreenColor ]} >

     <FlatList
        data={contentList}
        renderItem={renderContent}
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingBottom:90}}
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
    container:{
        flex:1
    },
    messageContainer:{
        minHeight:70,
        width:'100%',
        position:'absolute',
        bottom:10,
        flexDirection:'row',
        alignItems:'center',
        borderRadius:40,
        justifyContent:'center'
        
    },
    inputContainer:{
        backgroundColor:'white',
        borderWidth:1,
        borderColor:Colors.defaultGrayColor,
        width:'75%',
        height:50,
        borderRadius:50,
        elevation:5
    },
    input:{
        backgroundColor:'white',
        borderRadius:50,
        marginLeft:10
    },
    button:{
        backgroundColor:'white',
        width:50,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50,
        marginLeft:10,
        borderWidth:1,
        borderColor:Colors.defaultGrayColor,
        elevation:5
    }
})

export default InMessageScreen