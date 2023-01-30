import { View, Text,StyleSheet,ScrollView,Dimensions,Image } from 'react-native'
import React from 'react'
import CustomHeaderTop from '../../components/CustomHeaderTop'
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import Colors from '../../styles/Colors';



const HomeScreen = ({navigation}) => {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

   const _renderItem = ({item, index}) => {
    return (
        <View style={{height:200,marginTop:20,borderRadius:20}} >
          <Image
          style={{height:200,width:'100%'}}
          source={require('../../assets/carousel/snap2.png')}
          resizeMode={'contain'}
         />
        </View>
    );
}


  return (
    <>
    <CustomHeaderTop onPress={()=> navigation.openDrawer()}/>
    <ScrollView>
    <LinearGradient style={styles.container} colors={[  '#3b5998',Colors.defaultGreenColor ]} >
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