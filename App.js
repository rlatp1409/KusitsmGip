// In App.js in a new project

import * as React from 'react';
import { View, Text, Button, Image, StyleSheet, Animated} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import BlueScreen from './screens/BlueScreen';
import FileUploadScreen from './screens/FileUploadScreen';
import ResultScreen from './screens/ResultScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options = {{title : '큐시즘 개발 6조 X 요즘것들'}} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="Blue" component={BlueScreen} />
          <Stack.Screen name="FileUpload" component={FileUploadScreen} />
          <Stack.Screen name="Result" component={ResultScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const Style = StyleSheet.create({
  testStyle:{
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
  }
  });

  





export default App;