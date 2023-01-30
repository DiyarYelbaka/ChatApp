import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Visible from '../../assets/onVisible.svg'
import OffVisible from '../../assets/offVisible.svg'
import { useForm, Controller } from "react-hook-form";
import Colors from '../../styles/Colors';

type Props = {
  title: string
  placeholder: string
  visiblePassword: boolean
  name:string
  control:any
  rules:any
  secureTextEntry:boolean
};

const CustomInput: React.FC<Props> = ({ title, placeholder, visiblePassword = false,name,control,rules={},onChange, onBlur, value,secureTextEntry  }) => {


  const [visible, setVisible] = useState(false)

  return (
    <>
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value },fieldState:{error} }) => (
        <View style={styles.container}>
          <Text style={styles.text}>{title}</Text>
          <View style={styles.inputContainer}>
            <TextInput 
            autoCapitalize='none'
            style={styles.input} 
            placeholder={placeholder}
            value={value}
            onChangeText={onChange} 
            onBlur={onBlur} 
            secureTextEntry={secureTextEntry}
           
            />
          </View>
          {error && <Text style={styles.error}>{error.message ||'Error'}</Text>}
        </View>
      )}
     
    />
      
    
     </>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: 72,
    justifyContent: 'space-between',
    width: '70%',
    alignSelf: 'center',
    marginTop: 20,
  },
  inputContainer: {
    backgroundColor: '#D8D8DD',
    borderRadius: 10,

    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden'

  },
  input: {
    minHeight: 52,
    marginLeft: 10,
    width: '80%'
  },
  text: {
    color: 'white',
    fontWeight: 'bold'
  },
  eyes: {
    alignSelf: 'center',
    marginRight: 20,

  },
  error:{
    color:Colors.defaultGreenColor,
    fontSize:11,
    fontWeight:'bold'
  }
})

export default CustomInput

{/* {visiblePassword ? visible ?
        <Visible width="30" height="30" fill={'#A09F99'} style={styles.eyes} />
         :
        <OffVisible width="30" height="30" fill={'#A09F99'} style={styles.eyes} />
      :null } */}