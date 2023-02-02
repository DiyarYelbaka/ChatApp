import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Visible from '../../assets/openEye.svg'
import OffVisible from '../../assets/closeEye.svg'
import { useForm, Controller } from "react-hook-form";
import Colors from '../../styles/Colors';
import Lottie from 'lottie-react-native';

type Props = {
  title: string
  placeholder: string
  visiblePassword: boolean
  name: string
  control: any
  rules: any
  secureTextEntry: boolean
};

const CustomInput: React.FC<Props> = ({ title, placeholder, visiblePassword = false, name, control, rules = {}, onChange, onBlur, value, secureTextEntry }) => {


  const [visible, setVisible] = useState(false)

  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
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
                secureTextEntry={ visible ? null :  secureTextEntry}

              />
              <TouchableOpacity style={styles.eyes} onPress={()=> setVisible(!visible)}  >
              {visiblePassword ? visible ?
                <Visible width="30" height="30" fill={'#A09F99'} />
                :
                <OffVisible width="30" height="30" fill={'#A09F99'}  /> : null
                }
               </TouchableOpacity>
            </View>
            {error && <Text style={styles.error}>{error.message || 'Error'}</Text>}
          </View>
        )}

      />


    </>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight:72,
    justifyContent: 'space-between',
    width: '70%',
    alignSelf: 'center',
    marginTop: 20,
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
  },
  input: {
    minHeight: 52,
    marginLeft: 10,
    overflow:'hidden',
    flex:1
  },
  text: {
    color: 'white',
    fontWeight: 'bold'
  },
  eyes: {
    position:'absolute',
    right:0,
    alignSelf:'center',
    height:'100%',
    width:'15%',
    alignItems:'center',
    justifyContent:'center'
  },
  error: {
    color: Colors.defaultGreenColor,
    fontSize: 11,
    fontWeight: 'bold',
    
  }
})

export default CustomInput

{/* {visiblePassword ? visible ?
        <Visible width="30" height="30" fill={'#A09F99'} style={styles.eyes} />
         :
        <OffVisible width="30" height="30" fill={'#A09F99'} style={styles.eyes} />
      :null } */}