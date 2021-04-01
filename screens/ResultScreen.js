import * as React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native';
import { DataTable } from 'react-native-paper';
import { LineChart, PieChart } from 'react-native-chart-kit';

import jsonToTable from 'json-to-table';

function ResultScreen({navigation, route}) {
    const { body } = route.params;
    const jsonData = JSON.parse(body);
    //console.log('json', jsonData);
    const screenWidth = Dimensions.get("window").width;
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    const sortByKey = (array, key) => {
        return array.sort((a, b) =>
        {
            var x = a[key]; var y = b[key];
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        });
    }

    var graphDefault = [
        {
            color: "#f2ceb6",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            color: "#ecb19f",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            color: "#ec8c98",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            color: "#e36d8d",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            color: "#d75287",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            color: "#bd3e8b",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            color: "#9b3193",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            color: "#6b2c95",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            color: "#5c2084",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            color: "#521c68",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            color: "#3e125d",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            color: "#2b0e46",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        }
    ];

    var pieArr = [];
    var percentJsonArr = [];
    var scoreJsonArr = [];
    var countJsonArr = [];
    var fileshareJsonArr = [];
    var apologyJsonArr = [];
    if(jsonData != null){
        Object.keys(jsonData).forEach((rowKey, index) => {
            var rowJson = jsonData[rowKey];
            var tempJson = {};
            tempJson = graphDefault[index];
            tempJson['name'] = rowKey;
            tempJson['count'] = rowJson['count'];
            countJsonArr.push({ name: rowKey, value: rowJson['count']});
            tempJson['Msg Length'] = rowJson['Msg Length'];
            tempJson['Apology_count'] = rowJson['Apology_count'];
            apologyJsonArr.push({ name: rowKey, value: rowJson['Apology_count']});
            tempJson['Fileshare_count'] = rowJson['Fileshare_count'];
            fileshareJsonArr.push({ name: rowKey, value: rowJson['Fileshare_count']});
            tempJson['AM_count'] = rowJson['AM_count'];
            tempJson['PM_count'] = rowJson['PM_count'];
            tempJson['score'] = rowJson['score'];
            scoreJsonArr.push({ name: rowKey, value: rowJson['score']});
            tempJson['percent'] = rowJson['percent'];
            percentJsonArr.push({ name: rowKey, value: rowJson['percent']});
            pieArr.push(tempJson);
        })

        percentJsonArr = sortByKey(percentJsonArr, 'value');
        scoreJsonArr = sortByKey(scoreJsonArr, 'value');
        countJsonArr = sortByKey(countJsonArr, 'value');
        fileshareJsonArr = sortByKey(fileshareJsonArr, 'value');
        apologyJsonArr = sortByKey(apologyJsonArr, 'value');
    }

    return (
        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
            <Text style={Style.titleStyle}>분석결과 (기여도)</Text>
            <PieChart
                data={pieArr}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor={"percent"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                center={[0, 0]}
                absolute={false}
            />
            <Text style={Style.textStyleMain}>
                <Text style={Style.textStyleOne}>Free Rider: {scoreJsonArr[scoreJsonArr.length - 1]['name']} {'\n'}</Text>
                {'\n'}
                총 기여도 점수 {'\n'}
                {
                    scoreJsonArr.map((row, index)=>(
                        (index == 0) && (
                            <Text style={Style.textStyleTwo}>
                                👑Man of the team : {row['name']} {Math.floor(row['value'])}점 {'\n'}
                            </Text>
                        ) || 
                        (index != 0) && (
                            <Text>
                                {index+1}위 : {row['name']} {Math.floor(row['value'])}점 {'\n'}
                            </Text>
                        )
                    ))
                }
                {'\n'}
                카카오톡 데이터 분석결과 <Text style={Style.textStyleTwo}>{scoreJsonArr[scoreJsonArr.length - 1]['name']}</Text> 학생이 프리라이더군요. {'\n'}
                {
                    (percentJsonArr[percentJsonArr.length - 1]['value'] < (1/(2 * percentJsonArr.length))) && (
                        <Text>
                            제거 대상입니다. 즉결 처리하도록 하죠.
                        </Text>
                    ) || 
                    (percentJsonArr[percentJsonArr.length - 1]['value'] < (1/(1.5 * percentJsonArr.length))) && (
                        <Text>
                            이 친구, 프리라이더 위험지수입니다. 바른 길로 인도하는 것이 좋을 것 같습니다.
                        </Text>
                    ) || 
                    (
                        <Text>
                            그래도 준수하게 노력하였으니 한번 봐 드리는 걸로 하죠.
                        </Text>   
                    )
                }
                {'\n'}
                {'\n'}
            </Text>
            <Text style={Style.subTitleStyle}>침묵빌런 - Silence villan</Text>
            <PieChart
                data={pieArr}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor={"count"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                center={[0, 0]}
                absolute={false}
            />
            <Text style={Style.textStyleMain}>
                 위 그래프는 얼마나 대화를 활발하게 참여했는지를 보여줍니다. 분위기메이커와 침묵빌런을 확인해보세요.
                {'\n'}{'\n'}
                {
                    countJsonArr.map((row, index)=>(
                        <Text>
                            {index+1}위 : {row['name']} {Math.floor(row['value'])}건 {'\n'}
                        </Text>
                    ))
                }
            </Text>
            <Text style={Style.subTitleStyle}>파일 업로더 - File uploader</Text>
            <PieChart
                data={pieArr}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor={"Fileshare_count"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                center={[0, 0]}
                absolute={false}
            />
            <Text style={Style.textStyleMain}>
                 위 그래프는 얼마나 파일을 공유했는지 보여줍니다. 파일 공유를 하지 않은 다운로더를 확인해보세요.
                {'\n'}{'\n'}
                {
                    fileshareJsonArr.map((row, index)=>(
                        <Text>
                            {index+1}위 : {row['name']} {Math.floor(row['value'])}건 {'\n'}
                        </Text>
                    ))
                }
            </Text>
            <Text style={Style.subTitleStyle}>죄송무새 - Sorry bird</Text>
            <PieChart
                data={pieArr}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor={"Apology_count"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                center={[0, 0]}
                absolute={false}
            />
            <Text style={Style.textStyleMain}>
                 위 그래프는 얼마나 사과를 많이 했는지를 보여줍니다. 그들이 무엇을 잘못했습니까?
                {'\n'}{'\n'}
                {
                    apologyJsonArr.map((row, index)=>(
                        <Text>
                            {index+1}위 : {row['name']} {Math.floor(row['value'])}건 {'\n'}
                        </Text>
                    ))
                }
            </Text>
            <Image style={{
                resizeMode: "contain",
                height: 300,
                width: 200,
            }} source = {require('../image/mainImage.png')}/>
            <Text style={Style.textStyleMain}>
                위 결과는 카카오톡 데이터에 기반한 분석결과임으로 실제 느낀 경험과 다를  수 있습니다.{'\n'}
                재미로만 봐주세요. 😎{'\n'}
                <Text style={Style.textStyleThree}>
                    The above result is an analysis table based on Kakaotalk data, so it may be different from the actual experience.{'\n'}
                    Please watch it for fun. 😎{'\n'}
                </Text>
            </Text>
            
            <TouchableOpacity
                style={Style.buttonStyle}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Home')}>
                <Text style={Style.buttonTextStyle}>처음으로</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const Style = StyleSheet.create({
    titleStyle:{
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    subTitleStyle:{
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    textStyleMain:{
        color: 'black',
        fontSize: 15,
        marginVertical: 10,
        marginHorizontal: 20,
    },
    textStyleOne:{
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    textStyleTwo:{
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    textStyleThree:{
        color: 'black',
        fontSize: 12,
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