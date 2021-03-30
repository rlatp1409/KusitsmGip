import * as React from 'react';
import { View, Text, Button, StyleSheet, font, Image} from 'react-native';
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
            width: 200
          }} source = {require('/Users/gimsehan/Develop/React_class/KusitsmGip/image/mainImage.png')}/>
      <Text Style = {Style.textStyle}>조별과제 내에 기생하는 기생충들을 우린 '프리라이더'라 부릅니다.</Text>
      <Text Style = {Style.textStyle}>이번 조 안에도 누군가는 꿀을 빨고 당신과 같은 학점을 얻어갔습니다. </Text>
      <Text Style = {Style.textStyle}>당신이 그를 손쉽게 처리할 수 있도록 '프리라이더'를 알려드리죠. </Text>
      <Text Style = {Style.testStyle}>선택은 당신에 몫입니다.</Text>
      <Button
        title="Go to File upload"
        onPress={() => navigation.navigate('FileUpload')}
      />
    </View>
  );
}

const Style = StyleSheet.create({
    testStyle:{
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
    },
    textStyle:{
      fontSize: 6,
      textAlign: 'center',
    }
});


export default HomeScreen;
 