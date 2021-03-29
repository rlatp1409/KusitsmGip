import * as React from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'yellowgreen' }}>
      <Text style = {Style.testStyle}>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        title="Go to Blue"
        onPress={() => navigation.navigate('Blue')}
      />
      <Button
        title="Go to File upload"
        onPress={() => navigation.navigate('FileUpload')}
      />
    </View>
  );
}

const Style = StyleSheet.create({
    testStyle:{
        color: 'red'
    }
});

export default HomeScreen;
