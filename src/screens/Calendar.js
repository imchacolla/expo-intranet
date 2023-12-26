// //import packages
// import React, {Component, useEffect} from 'react';
// import axios from 'axios';
// //import react redux
// import {useSelector} from 'react-redux';
// import {
//   Alert,
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Button,
//   FlatList,
//   ActivityIndicator,
//   Dimensions,
//   Text,
// } from 'react-native';
// //import {View, Text} from '@ui-kitten/components';

// import {SafeAreaView} from 'react-native-safe-area-context';
// import Title from '../components/Title';
// import CalendarStrip from 'react-native-calendar-strip';
// import 'moment';
// import 'moment/locale/es';
// import moment from 'moment-timezone';
// //IMPORT COLOR CONSTANT

// //CONSTANTS COLORS
// import {
//   PRIMARY_COLOR,
//   SECONDARY_COLOR,
//   TERTIARY_COLOR,
//   PRIMARY_BACKGROUND,
//   //PRIMARY_TEXT,
//   BACKGROUND_PRIMARY_DARK,
//   BACKGROUND_PRIMARY_LIGHT,
//   PRIMARY_TEXT_DARK,
//   PRIMARY_TEXT_LIGHT,
//   BACKGROUND_DARK,
//   BACKGROUND_LIGHT,
// } from '../utils/constants';
// const CalendarScreen = ({navigation}) => {
//   const {width, height} = Dimensions.get('window');

//   const {isDarkMode} = useSelector(state => state.auth);
//   const [selectedIndex, setSelectedIndex] = React.useState(0);
//   const [index, setIndex] = React.useState(0);

//   const [selectedDate, setSelectedDate] = React.useState(
//     moment().format('YYYY-MM-DD'),
//   );
//   const [marcaciones, setMarcaciones] = React.useState([]);
//   const [dataList, setDataList] = React.useState([]);
//   const [date, setDate] = React.useState(moment().format('YYYYMMDD'));
//   const [data, setData] = React.useState([]);
//   const [others, setOther] = React.useState([]);
//   const [isLoading, setIsLoading] = React.useState(false);
//   const [refresh, setRefresh] = React.useState(false);

//   const getEvents = async date => {
//     setData([]);
//     setIsLoading(true);
//     const response = await axios.get('/rrhh/events', {
//       params: {
//         start: date,
//         end: date,
//       },
//     });
//     if (response.status == 200) {
//       setData(response.data.data);
//       //setIndexFilter (index);
//       setIsLoading(false);
//     }
//     setIsLoading(false);
//   };
//   useEffect(() => {
//     getEvents(moment().format('YYYYMMDD'));
//   }, []);

//   const handleSelected = date => {
//     setSelectedDate(date.format('YYYY-MM-DD'));
//     setDate(date.format('YYYYMMDD'));
//     getEvents(date.format('YYYYMMDD'));
//   };

//   const onRefresh = () => {
//     getEvents(date);
//     console.log('refresh invoced');
//   };
//   //cambio de semana
//   const onWeekChanged = (start, end) => {
//     console.log(start, end);
//   };
//   const onWeekScrollEnd = (start, end) => {
//     console.log('onWeekScrollStart', start, end);
//   };
//   const setIndexFilter = index => {
//     if (index == 0) {
//       setDataList(data);
//     } else if (index == 1) {
//       setDataList(others);
//     }
//     setIndex(index);
//   };
//   const markedDatesFunc = date => {
//     // Dot
//     if (date.isoWeekday() === 4) {
//       // Thursdays
//       return {
//         dots: [
//           {
//             color: 'red',
//             selectedColor: 'blue',
//           },
//         ],
//       };
//     }
//     return {};
//   };
//   //market
//   const markedDatesArray = [
//     {
//       date: '2022-05-20',
//       dots: [
//         {
//           color: 'blue',
//         },
//       ],
//     },
//     {
//       date: '2022-05-21',
//       lines: [
//         {
//           color: 'blue',
//         },
//       ],
//     },
//   ];

//   const listTab = [
//     {
//       status: 'MARCACIONES',
//     },
//     {
//       status: 'GESTION RRHH',
//     },
//     {
//       status: 'OTROS',
//     },
//   ];

//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         backgroundColor: isDarkMode ? BACKGROUND_DARK : BACKGROUND_LIGHT,
//       }}>
//       <View style={{flex: 1}}>
//         <Title
//           title="Eventos"
//           subtitle="Marcaciones, permisos y eventos de la empresa. "
//           navigation={navigation}
//         />
//         <View
//           style={{
//             paddingBottom: 10,
//             backgroundColor: isDarkMode
//               ? BACKGROUND_PRIMARY_DARK
//               : BACKGROUND_PRIMARY_LIGHT,
//           }}>
//           <CalendarStrip
//             scrollable
//             calendarAnimation={{type: 'sequence', duration: 30}}
//             daySelectionAnimation={{
//               type: 'background',
//               duration: 300,
//               highlightColor: '#9265DC',
//             }}
//             style={{
//               height: 100,
//               paddingTop: 2,
//               width: '100%',
//             }}
//             // onWeekChanged={onWeekChanged}
//             //onWeekScrollEnd={onWeekScrollEnd}
//             calendarHeaderStyle={{color: isDarkMode ? 'white' : '#333333'}}
//             //calendarColor={'#353a6d'}
//             dateNumberStyle={{color: isDarkMode ? 'white' : '#333333'}}
//             dateNameStyle={{color: isDarkMode ? 'white' : '#333333'}}
//             // iconContainer={{flex: 1}}
//             highli
//             ghtDateNameStyle={{color: 'white'}}
//             highlightDateNumberStyle={{color: '#eeeeee'}}
//             highlightDateNameStyle={{color: 'white'}}
//             highlightDateContainerStyle={{backgroundColor: PRIMARY_COLOR}}
//             //customDatesStyles={customDatesStyles}
//             //markedDates={markedDatesArray}
//             // startingDate={moment ()}
//             selectedDate={selectedDate}
//             /* markedDates={this.state.markedDates}
//         datesBlacklist={this.datesBlacklistFunc}
//         onDateSelected={this.onDateSelected} */
//             //handleSelected={handleSelected}
//             onDateSelected={handleSelected}
//             //useIsoWeekday={true}
//             iconContainer={{width: 0, display: 'none'}}
//           />
//         </View>
//         <View level="1">
//           <View
//             style={[
//               styles.listTab,
//               {
//                 backgroundColor: isDarkMode
//                   ? BACKGROUND_PRIMARY_DARK
//                   : BACKGROUND_PRIMARY_LIGHT,
//               },
//             ]}>
//             {listTab.map((t, indexTab) => (
//               <TouchableOpacity
//                 style={[
//                   styles.btnTab,
//                   index == indexTab && styles.btnTabActive,
//                 ]}
//                 onPress={() => setIndexFilter(indexTab)}
//                 key={'tab' + indexTab}>
//                 <Text
//                   style={{
//                     fontWeight: '600',
//                     color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
//                   }}>
//                   {t.status}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//           <View>
//             <View style={{marginVertical: 10}}>
//               <Text
//                 style={{
//                   color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
//                 }}>
//                 FECHA: {selectedDate}
//               </Text>
//             </View>
//             {isLoading ? (
//               <ActivityIndicator size="large" color={PRIMARY_COLOR} />
//             ) : (
//               <FlatList
//                 key="list-calendar"
//                 data={data}
//                 keyExtractor={(item, index) => index.toString()}
//                 style={{marginBottom: 20}}
//                 renderItem={({item, index}) => (
//                   <View style={[styles.event, {}]}>
//                     <View
//                       style={{
//                         width: 65,
//                         marginRight: 5,
//                       }}>
//                       <Text
//                         style={[
//                           styles.text,
//                           {
//                             color: isDarkMode
//                               ? PRIMARY_TEXT_DARK
//                               : PRIMARY_TEXT_LIGHT,
//                           },
//                         ]}>
//                         {item.time_event}
//                       </Text>
//                     </View>
//                     <View
//                       style={{
//                         width: width - 450,
//                         borderLeftWidth: 3,
//                         borderLeftColor: item.color,
//                         padding: 5,
//                         backgroundColor: isDarkMode
//                           ? BACKGROUND_PRIMARY_DARK
//                           : BACKGROUND_PRIMARY_LIGHT,
//                       }}>
//                       <Text
//                         style={[
//                           styles.name,
//                           {
//                             color: isDarkMode
//                               ? PRIMARY_TEXT_DARK
//                               : PRIMARY_TEXT_LIGHT,
//                           },
//                         ]}>
//                         {item.event_name}
//                       </Text>
//                       <Text
//                         style={[
//                           styles.type,
//                           {
//                             color: isDarkMode
//                               ? PRIMARY_TEXT_DARK
//                               : PRIMARY_TEXT_LIGHT,
//                           },
//                         ]}>
//                         {item.type_event}
//                       </Text>
//                       {item.type == 'P' ? (
//                         <Text
//                           style={[
//                             styles.estado,
//                             {
//                               color: isDarkMode
//                                 ? PRIMARY_TEXT_DARK
//                                 : PRIMARY_TEXT_LIGHT,
//                               fontWeight: '600',
//                               color: item.color,
//                             },
//                           ]}>
//                           {item.estado}
//                         </Text>
//                       ) : null}
//                     </View>
//                   </View>
//                 )}
//                 refreshing={refresh}
//                 onRefresh={onRefresh}
//                 scrollEnabled

//                 //keyExtractor={(item, index) => item.index}
//               />
//             )}
//             <View style={{height: 90}}></View>
//             {!isLoading && data.length == 0 ? (
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignContent: 'center',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   height: 200,
//                 }}>
//                 <Text
//                   style={{
//                     fontSize: 22,
//                     color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
//                   }}>
//                   No se encontró ningun evento
//                 </Text>
//               </View>
//             ) : null}
//           </View>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };
// const styles = StyleSheet.create({
//   listTab: {
//     //flex: 1,
//     padding: 0,
//     flexDirection: 'row',
//     //alignSelf: 'center',
//     width: Dimensions.get('window').width,
//     justifyContent: 'space-between',
//   },
//   btnTab: {
//     width: Dimensions.get('screen').width / 3.33,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingBottom: 5,
//     height: 40,
//   },
//   textTab: {
//     fontSize: 16,
//   },
//   btnTabActive: {
//     borderBottomColor: PRIMARY_COLOR,
//     borderBottomWidth: 3,
//   },
//   event: {
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     marginHorizontal: 5,
//     padding: 2,
//   },
//   name: {
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   type: {
//     fontSize: 12,
//     fontWeight: '400',
//     textTransform: 'uppercase',
//   },
//   estado: {
//     fontSize: 11,
//     fontWeight: '100',
//     color: '#4A73DD',
//   },
//   item: {
//     backgroundColor: 'white',
//     flex: 1,
//     borderRadius: 5,
//     padding: 10,
//     marginRight: 10,
//     marginTop: 17,
//   },
//   emptyDate: {
//     height: 15,
//     flex: 1,
//     paddingTop: 30,
//   },
// });
// export default CalendarScreen;
