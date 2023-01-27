import { View, Text,StyleSheet,TextInput,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import Visible from '../../assets/onVisible.svg'
import OffVisible from '../../assets/offVisible.svg'

type Props = {
    title:string
    placeholder:string
    visiblePassword:boolean
  };

const CustomInput:React.FC<Props> = ({title,placeholder,visiblePassword=false}) => {
    
  const [visible, setVisible] = useState(false)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.inputContainer}>
       <TextInput style={styles.input} placeholder={placeholder}  />
       {/* {visiblePassword ? visible ?
        <Visible width="30" height="30" fill={'#A09F99'} style={styles.eyes} />
         :
        <OffVisible width="30" height="30" fill={'#A09F99'} style={styles.eyes} />
      :null } */}
      </View>
    </View>
  )
}

const styles= StyleSheet.create({
    container:{
        minHeight:72,
        justifyContent:'space-between',
        width:'70%',
        alignSelf:'center',
        marginTop:20,
    },
    inputContainer:{
      backgroundColor:'#D8D8DD',
      borderRadius:10,

      flexDirection:'row',
      justifyContent:'space-between'
      
    },
    input:{
       height:52,
       marginLeft:10,

       overflow:'hidden'
    },
    text:{
        color:'white',
        fontWeight:'bold'
    },
    eyes:{
      alignSelf:'center',
      marginRight:20
    }
})

export default CustomInput