// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   TouchableOpacity,
//   StyleSheet,
//   Animated,
//   Image,
//   Dimensions,
//   ActivityIndicator,
//   Pressable,
//   Text,
//   Alert,
//   Modal,
//   RefreshControl,
// } from 'react-native';
// import {BarChart, LineChart, PieChart} from 'react-native-gifted-charts';
// import {PRIMARY_COLOR} from '../utils/constants';

// const PasajerosMes = ({data}) => {
//   return (
//     <View style={{width: Dimensions.get('window').width - 10}}>
//       <LineChart
//         data={data}
//         //height={Dimensions.get('window').height / 2}
//         //width={150}
//         areaChart
//         //hideDataPoints
//         isAnimated
//         animationDuration={1200}
//         initialSpacing={20}
//         thickness={5}
//         hideRules
//         hideYAxisText
//         yAxisColor="#0b49a5"
//         showVerticalLines
//         verticalLinesColor="#666666"
//         xAxisColor="#97acc4"
//         color="#00C39A"
//         startFillColor="#00C39A"
//         endFillColor={'#BFF5A0'}
//         yAxisThickness={0}
//         //maxValue={600}
//         noOfSections={3}
//         //yAxisTextStyle={{color: 'lightgray'}}
//         //curved
//         startOpacity={0.4}
//         endOpacity={0.4}
//         spacing={Dimensions.get('window').width / data.length - 5}
//         //backgroundColor="#414141"
//         rulesColor="gray"
//         rulesType="solid"
//         dataPointsHeight={20}
//         dataPointsWidth={20}
//       />
//       {/* <BarChart
//         initialSpacing={5}
//         width={Dimensions.get('window').width - 10}
//         data={pasajeros}
        
//         showGradient
//         hideRules
//         showFractionalValues
//         showYAxisIndices
//         showXAxisIndices
//         isAnimated
//         xAxisColor={isDarkMode ? '#cccccc' : '#666666'}
//         yAxisColor={isDarkMode ? '#cccccc' : '#666666'}
//         yAxisTextStyle={{
//           color: isDarkMode ? '#cccccc' : '#666666',
//           fontSize: 9,
//         }}
//         spacing={2}
//         barWidth={30}
//         yAxisThickness={0}
//         xAxisThickness={0}
//         noOfSections={5}
//         yAxisLabelTexts={['0', '20M', '40M', '60M', '80M', '100M']}
//         xAxisLabelTextStyle={{
//           fontSize: 9,
//           color: isDarkMode ? '#cccccc' : '#666666',
//           marginLeft: 8,
//           // transform: [{rotateZ: '-20deg'}],
//         }}
//         xAxisLabelContainerStyle={{marginLeft: 35}}
//       /> */}
//     </View>
//   );
// };

// export default PasajerosMes;
