import { View, Text,StyleSheet,ScrollView,Dimensions,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import CustomHeaderTop from '../../components/CustomHeaderTop'
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import Colors from '../../styles/Colors';

import { useSelector} from 'react-redux'


const HomeScreen = ({navigation}) => {

  

  const gradiantColors = useSelector((state) => state.backGradientColor)
  const DATA = [
    {
      id: '1bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      url:'https://raw.githubusercontent.com/DiyarYelbaka/ChatApp/main/src/assets/carousel/snap1.png'
    },
    {
      id: '23ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
      url:'https://raw.githubusercontent.com/DiyarYelbaka/ChatApp/main/src/assets/carousel/snap2.png'
    },
    {
      id: '458694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      url:'https://raw.githubusercontent.com/DiyarYelbaka/ChatApp/main/src/assets/carousel/snap4.png'
    },
  ];


   const _renderItem = ({item}) => {
    return (
      <LinearGradient style={{height:200,marginTop:20,borderRadius:20,elevation:15}}  colors={[  gradiantColors.defaultBlueColor,gradiantColors.defaultGreenColor ]} >
          <Image
          style={{height:200,width:'100%'}}
          source={{uri :item.url} }
          resizeMode={'contain'}
         />
        </LinearGradient>
    );
}


  return (
    <>
    <CustomHeaderTop title={'ChatApp'} onPress={()=> navigation.openDrawer()}/>
    <ScrollView>
    <LinearGradient style={styles.container} colors={[  gradiantColors.defaultBlueColor,gradiantColors.defaultGreenColor ]} >
    <Carousel
              data={DATA}
              renderItem={_renderItem}
              sliderWidth={Dimensions.get('window').width/1}
              itemWidth={Dimensions.get('window').width/1.2}
              autoplay={true}
              autoplayDelay={5}
              loop={true}
      />
      <Text>HomeScasdreen</Text>
    
        {/* <View style={{backgroundColor:'red',width:100,height:100}}>
        <Text>ask</Text>
       </View> */}
      </LinearGradient>
    </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container:{
   height:800
  }
})

export default HomeScreen