import * as React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import { DataTable } from 'react-native-paper';

import jsonToTable from 'json-to-table';

function ResultScreen({navigation, route}) {
    const { body } = route.params;
    const jsonData = JSON.parse(body);
    //console.log('json', jsonData);

    var renderArr = [];
    if(jsonData != null){
        var tempArr = [];
        for(let rowKey in jsonData){
            var tempJson = jsonData[rowKey];
            tempJson['name'] = rowKey;

            tempArr.push(tempJson);
        }
        
        tempArr = jsonToTable(tempArr)
        tempArr.map((rowArr, i) => {
            rowArr.splice(0, 0, rowArr[rowArr.length-1]);
            rowArr.pop();
        })
        
        tempArr.forEach((row, i) => {
            if(i == 0){
                renderArr.push(
                    <DataTable.Header>
                        {
                            row.map((value) => (
                                <DataTable.Title>{value}</DataTable.Title>
                            ))
                        }
                    </DataTable.Header>
                )
            }
            else{
                renderArr.push(
                    <DataTable.Row>
                        {
                            row.map((value)=>(
                                <DataTable.Cell>{value}</DataTable.Cell>
                            )) 
                        }
                    </DataTable.Row>
                )
            }
        })
        console.log(renderArr);
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={Style.titleStyle}>Result Screen</Text>
        <Text>{'\n'}</Text>
        <DataTable>
            {renderArr}
        </DataTable>
        <Text>{'\n'}</Text>
        <TouchableOpacity
            style={Style.buttonStyle}
            activeOpacity={0.5}
            onPress={() => navigation.navigate('Home')}>
            <Text style={Style.buttonTextStyle}>처음으로</Text>
        </TouchableOpacity>
        </View>
    );
}

const Style = StyleSheet.create({
    titleStyle:{
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

export default ResultScreen;