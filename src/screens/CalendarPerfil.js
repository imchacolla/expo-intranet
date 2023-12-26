import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, {memo} from 'react';
import axios from 'axios';
import {useQuery} from '@tanstack/react-query';
import {
  BACKGROUND_DARK,
  BACKGROUND_LIGHT,
  BACKGROUND_PRIMARY_DARK,
  BACKGROUND_PRIMARY_LIGHT,
  PRIMARY_COLOR,
  PRIMARY_TEXT_DARK,
  PRIMARY_TEXT_DARK_LIGHT,
  PRIMARY_TEXT_LIGHT,
} from '../utils/constants';

const CalendarPerfil = ({route, navigation}) => {
  const month = route.params.month;

  const {isDarkMode, rol} = useSelector(state => state.auth);

  //console.log('month', month);
  const getCalendar = async () => {
    const response = await axios.post('/rrhh/calendar-perfil', month);
    return response.data.data;
  };

  const {isLoading, isError, data, error, isSuccess} = useQuery({
    queryKey: ['calendar', month],
    queryFn: getCalendar,
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? BACKGROUND_DARK : BACKGROUND_LIGHT,
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          width: 40,
          height: 40,
          padding: 0,

          alignContent: 'center',
          justifyContent: 'center',
        }}>
        <AntDesign
          name="left"
          size={32}
          color={isDarkMode ? '#EFEFEF' : '#333'}
        />
      </TouchableOpacity>
      <View
        style={{
          width: Dimensions.get('window').width,
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: isDarkMode ? '#EFEFEF' : '#333',
            fontSize: 20,
            fontWeight: '500',
          }}>
          Detalle horario
        </Text>
      </View>
      {isLoading && <ActivityIndicator color={PRIMARY_COLOR} />}
      {isError ? (
        <Text
          style={{
            color: 'red',
          }}>
          Error: {isError}
        </Text>
      ) : null}
      {isSuccess && (
        <ScrollView>
          {data?.map((item, index) => (
            <View
              key={index}
              style={{
                backgroundColor: isDarkMode
                  ? BACKGROUND_PRIMARY_DARK
                  : BACKGROUND_PRIMARY_LIGHT,
                marginHorizontal: 5,
                padding: 8,
                marginVertical: 4,
                borderLeftColor: item.color,
                borderLeftWidth: 4,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 5,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                    fontWeight: '500',
                  }}>
                  {item.calendario_fecha_ini} - {item.calendario_fecha_fin}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                    fontWeight: 'bold',
                  }}>
                  {item.horario_nombre}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    color: isDarkMode
                      ? PRIMARY_TEXT_DARK_LIGHT
                      : PRIMARY_TEXT_LIGHT,
                  }}>
                  {item.perfil_laboral} -{item.perfil_laboral_grupo}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 5,
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 'bold',
                      color: isDarkMode
                        ? PRIMARY_TEXT_DARK
                        : PRIMARY_TEXT_LIGHT,
                      marginBottom: 3,
                    }}>
                    Marcación entrada:
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: Dimensions.get('window').width / 2 - 40,
                    }}>
                    <Ionicons
                      name="ios-finger-print"
                      color={
                        isDarkMode
                          ? PRIMARY_TEXT_DARK_LIGHT
                          : PRIMARY_TEXT_LIGHT
                      }
                      size={20}
                    />
                    <Text
                      style={{
                        fontSize: 10,
                        color: isDarkMode
                          ? PRIMARY_TEXT_DARK_LIGHT
                          : PRIMARY_TEXT_LIGHT,
                      }}>
                      {item.relaboralperfilmaquina_ubicacion_entrada} - (
                      {item.relaboralperfilmaquina_estacion_entrada})
                    </Text>
                  </View>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 'bold',
                      color: isDarkMode
                        ? PRIMARY_TEXT_DARK
                        : PRIMARY_TEXT_LIGHT,
                      marginBottom: 3,
                    }}>
                    Marcación salida:
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: Dimensions.get('window').width / 2 - 40,
                    }}>
                    <Ionicons
                      name="ios-finger-print"
                      color={
                        isDarkMode
                          ? PRIMARY_TEXT_DARK_LIGHT
                          : PRIMARY_TEXT_LIGHT
                      }
                      size={20}
                    />
                    <Text
                      style={{
                        fontSize: 10,

                        color: isDarkMode
                          ? PRIMARY_TEXT_DARK_LIGHT
                          : PRIMARY_TEXT_LIGHT,
                      }}>
                      {item.relaboralperfilmaquina_ubicacion_salida} -
                      {item.relaboralperfilmaquina_estacion_salida})
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default CalendarPerfil;

const styles = StyleSheet.create({});
