// Import React
import React, { useState } from 'react';
// Import core components
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { RadioButton, Text } from 'react-native-paper';

import RNFS from 'react-native-fs';

function FileUploadScreen({navigation}){
  const [katalkList, setKatalkList] = useState(null);
  const [value, setValue] = useState(0);

  const uploadFile = () => {
    var path = katalkList[katalkList.length - 1 - value].path + '/KakaoTalkChats.txt';

    var uploadUrl = 'http://harksulim.shop/upload/';
    // create an array of objects of the files you want to upload
    var files = [
      {
        filename: 'KakaoTalkChats.txt',
        filepath: path,
        filetype: 'text/plain'
      }
    ];

    var uploadBegin = (response) => {
      var jobId = response.jobId;
      console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
    };

    var uploadProgress = (response) => {
      var percentage = Math.floor((response.totalBytesSent/response.totalBytesExpectedToSend) * 100);
      console.log('UPLOAD IS ' + percentage + '% DONE!');
    };

    // upload files
    RNFS.uploadFiles({
      toUrl: uploadUrl,
      files: files,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      begin: uploadBegin,
      //progress: uploadProgress
    }).promise.then((response) => {
        console.log('response', response)
        if (response.statusCode == 200) {
          alert('FILES UPLOADED!'); // response.statusCode, response.headers, response.body
        } else {
          alert('SERVER ERROR');
        }
      })
      .catch((err) => {
        if(err.description === "cancelled") {
          // cancelled by user
        }
        alert('Error occured');
        console.log(err);
      });
  }

  const showKatalkList = () => {
    //const path = RNFS.ExternalStorageDirectoryPath;
    const path = "/storage/emulated/0/KakaoTalk/Chats";
    console.log(path)
    RNFS.readDir(path)
    .then((result)=>{
      console.log('GOT RESULT', result);
      setKatalkList(result);
    })
    .catch((err) => {
      alert(err);
    })
  }

  var renderKatalkList = []
  if(katalkList != null){
    renderKatalkList = katalkList.slice(-5).reverse().map((katalkInfo, index) => (
        <View style={styles.radioGroupStyle} key = {index}>
          <RadioButton value={index} />
          <Text>{katalkInfo.name}</Text>
        </View>
      )  
    )
  }

  return (
    <View style={styles.mainBody}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 30, textAlign: 'center' }}>
          React Native File Upload Example
        </Text>
        <Text
          style={{
            fontSize: 25,
            marginTop: 20,
            marginBottom: 30,
            textAlign: 'center',
          }}>
          {'\n'}
          KUSITMS
          {'\n'}
          Development Team 6
        </Text>
      </View>
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={showKatalkList}>
        <Text style={styles.buttonTextStyle}>Show Kakaotalk List</Text>
      </TouchableOpacity>
      <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
      {renderKatalkList}
      </RadioButton.Group>
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={uploadFile}>
        <Text style={styles.buttonTextStyle}>Upload File</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
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
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
  },
  radioGroupStyle: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 5,
    marginLeft: 35,
    marginRight: 90,
  }
});

export default FileUploadScreen;