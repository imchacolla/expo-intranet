import {
  View,
  Text,
  Pressable,
  Dimensions,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import Title from '../components/Title';
import 'moment';
import 'moment/locale/es';
import moment from 'moment-timezone';
import axios from 'axios';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

///CONSTANTS COLORS
import {
  PRIMARY_COLOR,
  BACKGROUND_PRIMARY_DARK,
  BACKGROUND_PRIMARY_LIGHT,
  PRIMARY_TEXT_DARK,
  PRIMARY_TEXT_LIGHT,
  BACKGROUND_DARK,
  BACKGROUND_LIGHT,
  PRIMARY_TEXT_DARK_LIGHT,
} from '../utils/constants';
import _ from 'lodash';
//import reactquery
import { useQuery } from '@tanstack/react-query';
//import {ScrollView,RefreshControl} from 'react-native-gesture-handler';
import { FlashList } from '@shopify/flash-list';
import CalendarPerfil from './CalendarPerfil';

const Calendars = ({ navigation }) => {
  const { width, height } = Dimensions.get('screen');
  const { isDarkMode } = useSelector(state => state.auth);
  const [selectedDate, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD'),
  );
  const [refreshing, setRefreshing] = useState(false);

  const [dotPermisos, setDotPermisos] = useState([]);
  const [dotFeriados, setDotFeriados] = useState([]);
  const [dotMarcaciones, setDotMarcaciones] = useState([]);
  const [refresh, setRefresh] = React.useState(false);
  //const [selectedDay, setSelectedDay] = useState(moment().format('DD'));
  const [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'));
  const [month, setMonth] = useState({
    dateString: moment().format('YYYY-MM-DD'),
    day: moment().format('DD'),
    month: moment().format('MM'),
    year: moment().format('YYYY'),
  });

  const theme = {
    backgroundColor: '#475480',
    calendarBackground: 'transparent',
    // calendarBackground: isDarkMode
    //   ? BACKGROUND_PRIMARY_DARK
    //   : BACKGROUND_PRIMARY_LIGHT,
    //textSectionTitleColor: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
    textSectionTitleColor: '#999',
    textSectionTitleDisabledColor: '#d9e1e8',
    selectedDayBackgroundColor: '#00adf5',
    selectedDayTextColor: PRIMARY_COLOR,
    todayTextColor: PRIMARY_COLOR,
    dayTextColor: '#2d4150',
    textDisabledColor: '#d9e1e8',
    dotColor: '#21ac7e',
    selectedDotColor: '#ffffff',
    arrowColor: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
    disabledArrowColor: '#d9e1e8',
    monthTextColor: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
    indicatorColor: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
    textDayFontWeight: '400',
    textMonthFontWeight: '400',
    textDayHeaderFontWeight: '600',
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 14,
  };
  LocaleConfig.locales['es'] = {
    monthNames: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
    monthNamesShort: [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ],
    dayNames: [
      'Domingo',
      'Lun',
      'Mar',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sabado',
    ],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    today: 'Hoy',
  };
  LocaleConfig.defaultLocale = 'es';
  const onRefresh = () => {
    // /getEvents();
    //getEventsDay(selectedDate);
    queryEventsDay.refetch()
    console.log('refresh day');
  };
  //get events Day

  /* 
  const getEventsDay = async date => {
    setData([]);
    setIsLoading(true);
    setSelectedDate(date);
    const response = await axios.get('/rrhh/events', {
      params: {
        start: date,
        end: date,
      },
    });
    console.log(response.data.data);
    if (response.status == 200) {
      setData(response.data.data);
      //setIndexFilter (index);
      setIsLoading(false);
    }
    setIsLoading(false);
  }; */
  //eventos dia
  const getEventsDay = async () => {
    const response = await axios.get('/rrhh/events', {
      params: {
        start: selectedDate,
        end: selectedDate,
      },
    });
    return response.data.data;
  };

  const queryEventsDay = useQuery({
    queryKey: ['eventsDay', selectedDate],
    queryFn: getEventsDay,
  });
  const getEvents = async () => {
    setDotPermisos([]);
    setDotFeriados([]);
    setDotMarcaciones([]);
    //setIsLoading(true);
    const response = await axios.post('/rrhh/events-month', month);
    if (response.status == 200) {
      setDotPermisos(response.data.permisos);
      setDotFeriados(response.data.feriados);
      setDotMarcaciones(response.data.marcaciones);
    }
    //setIsLoading(false);
  };
  //GET MARKETS
  useEffect(() => {
    getEvents();
  }, [month.month]);

  const emptyList = () => {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text
          style={{
            color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
          }}>
          No se encontraron eventos
        </Text>
      </View>
    );
  };
  const renderHeader = date => {
    return (
      <View>
        <Text
          style={{
            color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
            fontWeight: '500',
            fontSize: 16,
          }}>
          {moment(month.dateString).format('MMMM yyyy')}
        </Text>
      </View>
    );
  };
  const dayComponent = ({ date, state }) => {
    return (
      <Pressable onPress={() => setSelectedDate(date.dateString)}>
        <View
          style={{
            alignItems: 'center',
            // width: Dimensions.get('screen').width / 7 - 2,
            height: 25,
          }}>
          <View
            style={{
              alignItems: 'center',
              alignContent: 'center',
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor:
                selectedDate === date.dateString
                  ? PRIMARY_COLOR
                  : isDarkMode
                    ? BACKGROUND_PRIMARY_DARK
                    : BACKGROUND_PRIMARY_LIGHT,
            }}>
            <Text
              style={{
                textAlign: 'center',
                // backgroundColor:
                //   selectedDate === date.dateString
                //     ? PRIMARY_COLOR
                //     : isDarkMode
                //     ? BACKGROUND_PRIMARY_DARK
                //     : BACKGROUND_PRIMARY_LIGHT,
                height: 24,
                borderRadius: 13,
                width: 25,
                borderColor:
                  currentDate == date.dateString
                    ? PRIMARY_COLOR
                    : 'transparent',
                borderWidth: currentDate == date.dateString ? 1 : 0,

                color:
                  state === 'disabled'
                    ? isDarkMode
                      ? PRIMARY_TEXT_DARK_LIGHT
                      : '#CCC'
                    : selectedDate === date.dateString
                      ? 'white'
                      : isDarkMode
                        ? PRIMARY_TEXT_DARK
                        : PRIMARY_TEXT_LIGHT,
              }}>
              {date.day}
            </Text>
            {/* DOTS */}
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              {dotPermisos.length > 0 &&
                (_.findIndex(dotPermisos, function (o) {
                  return o.ini === date.day;
                }) > -1 && state != 'disabled' ? (
                  <View
                    style={{
                      width: 6,
                      height: 3,
                      backgroundColor: '#d941a6',
                      borderRadius: 2,
                      marginHorizontal: 1,
                    }}></View>
                ) : (
                  <View />
                ))}
              {dotFeriados.length > 0 &&
                (_.findIndex(dotFeriados, function (o) {
                  return o.ini === date.day;
                }) > -1 && state != 'disabled' ? (
                  <View
                    style={{
                      width: 6,
                      height: 3,
                      backgroundColor: '#ee9266',
                      borderRadius: 2,
                    }}></View>
                ) : (
                  <View />
                ))}
              {dotMarcaciones.length > 0 &&
                (_.findIndex(dotMarcaciones, function (o) {
                  return o.ini === date.day;
                }) > -1 && state != 'disabled' ? (
                  <View
                    style={{
                      width: 6,
                      height: 3,
                      backgroundColor: '#5ec297',
                      borderRadius: 2,
                      marginHorizontal: 1,
                    }}></View>
                ) : (
                  <View />
                ))}
            </View>
            {/* FIN DOTS */}
          </View>
        </View>
      </Pressable>
    );
  };

  const Arrow = direction => {
    if (direction == 'left') {
      return (
        <IonIcons
          name={'chevron-back'}
          size={24}
          color={isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT}
        />
      );
    } else {
      return (
        <IonIcons
          name={'chevron-forward'}
          size={24}
          color={isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT}
        />
      );
    }
  };

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['40%', '60%', '90%'], []);
  const handlePresentModalPress = useCallback(
    t => {
      navigation.push('CalendarPerfil', { month });
      //bottomSheetRef.current?.present();
    },
    [month],
  );

  return (
    <BottomSheetModalProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: isDarkMode ? BACKGROUND_DARK : BACKGROUND_LIGHT,
        }}>
        <Title title="Eventos" navigation={navigation} />

        <View
          style={{
            backgroundColor: isDarkMode
              ? BACKGROUND_PRIMARY_DARK
              : BACKGROUND_PRIMARY_LIGHT,
          }}>
          <Calendar
            key={'calendar'}
            dayComponent={dayComponent}
            renderDay={(day, item) => {
              return <View />;
            }}
            initialDate={selectedDate}
            onDayLongPress={day => {
              console.log('selected day', day);
            }}
            monthFormat={'MMMM yyyy'}
            onMonthChange={month => {
              setMonth(month);
            }}
            renderHeader={date => renderHeader(date)}
            renderArrow={Arrow}
            firstDay={1}
            showWeekNumbers={false}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={subtractMonth => subtractMonth()}
            // Handler which gets executed when press arrow icon right. It receive a callback can go next month
            onPressArrowRight={addMonth => addMonth()}
            enableSwipeMonths={true}
            theme={theme}
          />
        </View>
        <View
          style={{
            // width: 30,
            marginTop: 15,
            marginBottom: 5,
            // backgroundColor: PRIMARY_COLOR,
            borderRadius: 15,
            marginLeft: 10,
            marginHorizontal: 10,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <IonIcons
              name="ios-today-sharp"
              size={16}
              color={isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT}
            />
            <Text
              style={{
                fontSize: 16,

                color: isDarkMode
                  ? PRIMARY_TEXT_DARK_LIGHT
                  : PRIMARY_TEXT_LIGHT,
              }}>
              {moment(month.dateString).format('LL')}
            </Text>
          </View>
          <TouchableOpacity onPress={handlePresentModalPress}>
            <View
              style={{
                backgroundColor: isDarkMode ? '#eee' : 'transparent',
                borderColor: isDarkMode ? '#eee' : '#333',
                borderWidth: 1,
                borderRadius: 12,
                paddingVertical: 2,
                paddingHorizontal: 8,
                alignItems: 'center',
                flexDirection: 'row',
                height: 24,
                alignContent: 'center',
              }}>
              <IonIcons name="ios-calendar-outline" size={18} color={'#333'} />
              <Text
                style={{
                  marginLeft: 3,
                  fontSize: 12,
                  color: '#333',
                }}>
                Horario
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {queryEventsDay.isLoading ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 200,
              }}>
              <ActivityIndicator size="large" color={PRIMARY_COLOR} />
            </View>
          ) : (
            <View
              style={{
                width: Dimensions.get('screen').width,
                marginBottom: 20,
              }}>
              {queryEventsDay.data?.map((item, index) => (
                <View key={index} style={[styles.event, {}]}>
                  <View
                    style={{
                      width: 70,
                      marginRight: 5,
                    }}>
                    <Text
                      style={[
                        styles.time,
                        {
                          color: isDarkMode
                            ? PRIMARY_TEXT_DARK
                            : PRIMARY_TEXT_LIGHT,
                        },
                      ]}>
                      {item.time_event}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: width - 90,
                      borderLeftWidth: 3,
                      borderLeftColor: item.color,
                      //borderRadius: 10,
                      padding: 5,
                      backgroundColor: isDarkMode
                        ? BACKGROUND_PRIMARY_DARK
                        : BACKGROUND_PRIMARY_LIGHT,
                    }}>
                    <Text
                      style={[
                        styles.name,
                        {
                          color: isDarkMode
                            ? PRIMARY_TEXT_DARK
                            : PRIMARY_TEXT_LIGHT,
                        },
                      ]}>
                      {item.type === 'M' ? 'Marcación' : item.event_name}
                    </Text>
                    <Text
                      style={[
                        styles.type,
                        {
                          color: isDarkMode
                            ? PRIMARY_TEXT_DARK
                            : PRIMARY_TEXT_LIGHT,
                        },
                      ]}>
                      {item.type === 'M' ? item.event_name : item.type_event}
                    </Text>
                    {item.type == 'P' ? (
                      <Text
                        style={[
                          styles.estado,
                          {
                            color: isDarkMode
                              ? PRIMARY_TEXT_DARK
                              : PRIMARY_TEXT_LIGHT,
                            fontWeight: '600',
                            color: item.color,
                          },
                        ]}>
                        {item.estado}
                      </Text>
                    ) : null}
                  </View>
                </View>
              ))}
              {queryEventsDay.data?.length === 0 ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 200,
                  }}>
                  <Text
                    style={{
                      color: isDarkMode
                        ? PRIMARY_TEXT_DARK_LIGHT
                        : PRIMARY_TEXT_LIGHT,
                    }}>
                    No hay eventos para este día
                  </Text>
                </View>
              ) : null}
            </View>
          )}
        </ScrollView>
        <BottomSheetModal
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={{
            borderRadius: 20,
            backgroundColor: isDarkMode ? BACKGROUND_PRIMARY_DARK : 'white',
          }}
        //onChange={handleSheetChanges}
        >
          <View
            style={[
              styles.contentContainer,
              {
                backgroundColor: isDarkMode
                  ? BACKGROUND_PRIMARY_DARK
                  : BACKGROUND_PRIMARY_LIGHT,
              },
            ]}>
            <View
              style={{
                flexDirection: 'column',
              }}>
              <CalendarPerfil month={month} isDarkMode={isDarkMode} />
            </View>
          </View>
        </BottomSheetModal>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  listTab: {
    //flex: 1,
    padding: 0,
    flexDirection: 'row',
    //alignSelf: 'center',
    width: Dimensions.get('window').width,
    justifyContent: 'space-between',
  },

  event: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: 5,
    padding: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 16,

    fontWeight: '400',
  },
  type: {
    fontSize: 12,
    fontWeight: '400',
    textTransform: 'uppercase',
  },
  estado: {
    fontSize: 11,
    fontWeight: '100',
    color: '#4A73DD',
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});

export default Calendars;
