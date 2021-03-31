import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { DataTable } from 'react-native-paper';

function ResultScreen({navigation, route}) {
    const { body } = route.params;
    const jsonData = JSON.parse(body);
    console.log('json', jsonData);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red' }}>
        <Text>Result Screen</Text>
        <DataTable>
        {
            Object.keys(jsonData).forEach((rowKey, i)=>{
                var rowData = jsonData[rowKey];
                if(i == 0){
                    <DataTable.Header>
                        <DataTable.Title>Name</DataTable.Title>
                        {
                            Object.keys(rowData).forEach((dataKey, j)=>{
                                <DataTable.Title>{dataKey}</DataTable.Title>
                            })
                        }
                    </DataTable.Header>
                }

                <DataTable.Row>
                    <DataTable.Cell>{rowKey}</DataTable.Cell>
                    {
                        Object.keys(rowData).forEach((dataKey, j)=>{
                            <DataTable.Cell>{rowData[dataKey]}</DataTable.Cell>
                        })
                    }
                </DataTable.Row>
            })
            // tabledData.forEach((row,index)=>{
            //     console.log(row);
            //     if(index == 0){
            //         row.forEach((element, index)=>{
            //             <DataTable.Title>{element}</DataTable.Title>
            //         })
            //     }
            //     else if(index > 0){
            //         row.forEach((element, index)=>{
            //             <DataTable.Cell>{element}</DataTable.Cell>
            //         })
            //     }
            // })
        }
        </DataTable>
        <Button
            title="Go to Home"
            onPress={() => navigation.navigate('Home')}
        />
        <Button
            title="Go to Details"
            onPress={() => navigation.navigate('Details')}
        />
        </View>
    );
}

export default ResultScreen;