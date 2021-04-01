import * as React from 'react';
import { View, Text, Button, StyleSheet, font, Image, TouchableOpacity} from 'react-native';
import { white } from 'react-native-paper/lib/typescript/styles/colors';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',}}>
      <View>
       <Text style = {Style.testStyle}>Find Out FreeRider</Text>
      </View>
      <Image style={{
            resizeMode: "contain",
            height: 300,
            width: 200,
          }} source = {require('../image/mainImage.png')}/>
        <Text style = {{textAlign: "center", fontSize: 12}}>
          조별과제 내에 기생하는 기생충들을 우린 '프리라이더'라 부릅니다.
          {'\n'}
          이번 조 안에도 누군가는 꿀을 빨고 당신과 같은 학점을 얻어갔습니다.
          {'\n'}
          당신이 그를 손쉽게 처리할 수 있도록 '프리라이더'를 알려드리죠.
          </Text>
        <Text style = {{fontWeight: "bold", fontSize: 15, padding: 7}}> 
          선택은 당신에 몫입니다.</Text>
      <TouchableOpacity
        style={Style.buttonStyle}
        activeOpacity={0.5}
        onPress={() => navigation.navigate('FileUpload')}>
        <Text style={Style.buttonTextStyle}>Find Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const Style = StyleSheet.create({
    testStyle:{
      color: 'black',
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    buttonStyle: {
      backgroundColor: '#307ecc',
      borderWidth: 0,
      color: '#FFFFFF',
      borderColor: '#307ecc',
      width: 120,
      height: 40,
      alignItems: 'center',
      borderRadius: 30,
      marginLeft: 35,
      marginRight: 35,
      marginTop: 15,
    },
    buttonTextStyle: {
      color: '#FFFFFF',
      paddingVertical: 10,
      fontSize: 16,
    },
});


export default HomeScreen;
 