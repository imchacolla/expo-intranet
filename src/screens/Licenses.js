import React, { useEffect, useCallback, useState } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Pressable,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
  FlatList
} from 'react-native';
import { useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import _ from 'lodash';
//import * as Animatable from 'react-native-animatable';
//import use query
import { useQuery } from '@tanstack/react-query';

import axios from 'axios';
import Title from '../components/Title';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  PRIMARY_TEXT_DARK,
  PRIMARY_TEXT_LIGHT,
  BACKGROUND_DARK,
  BACKGROUND_LIGHT,
  BACKGROUND_PRIMARY_DARK,
  BACKGROUND_PRIMARY_LIGHT,
  PRIMARY_TEXT_DARK_LIGHT,
  TERTIARY_COLOR,
} from '../utils/constants';
//import dispatch
//import { logout } from '../store/auth';
import { setRefreshPage } from '../store/auth';

import { useDispatch } from 'react-redux';

const LicensesScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const refTextInputSearch = React.createRef();
  const [refresh, onRefresh] = React.useState(false);
  const { isDarkMode, refreshPage } = useSelector(state => state.auth);
  const [loading, setLoading] = useState(false);
  //const [data, setData] = useState([]);
  const [filterData, setFilterData] = React.useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(100);
  const [q, setQ] = useState('');
  const [total, setTotal] = useState(0);
  const [uuid, setUuid] = useState(new Date());


  const getLicenses = async () => {
    const response = await axios.post('/rrhh/boletas', {
      q,
      page: 1,
      perPage,
    });
    //console.log('response', response.data.data)
    return response.data.data
  }
  const queryLicenses = useQuery({
    queryKey: ['licenses', refreshPage],
    queryFn: getLicenses,
  })
  useEffect(() => {
    setFilterData(queryLicenses?.data);
  }, [queryLicenses?.data]);

  const onEndReached = () => {
    if (page * perPage < total) {
      setPage(page + 1);
    }
    console.log('end reached');
  };

  const handleResetSearch = () => {
    //setData([]);
    setQ('');
    refTextInputSearch.current.clear();
  };

  const changeHandler = q => {
    setQ(q);
  };

  const debouncedChangeHandler = useCallback(debounce(changeHandler, 800), []);
  const getItem = (data, index) => {
    return data[index];
  };
  const emptyView = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Text
          style={{
            color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
          }}>
          no se encontraron boletas de permiso
        </Text>
      </View>
    );
  };
  const renderItem = ({ item, index }) => {
    return (
      <View
        key={index}
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'space-between',
          // elevation: 1,
          // borderRadius: 10,
          backgroundColor: isDarkMode
            ? BACKGROUND_PRIMARY_DARK
            : BACKGROUND_PRIMARY_LIGHT,
          padding: 8,
          marginVertical: 5,
          marginHorizontal: 10,
          borderRadius: 10,
        }}>
        <View style={styles.description}>
          <Text
            style={[
              styles.nombre,
              { color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT },
            ]}>
            {item.justificacion}
          </Text>
          <View
            style={{
              // borderColor: isDarkMode ? '#9999' : "#999",
              //borderWidth: 1,
              borderRadius: 5,
              paddingHorizontal: 5,
              paddingVertical: 3,
              marginVertical: 5
            }}>
            <Text
              style={[
                styles.tipo,
                {
                  color: isDarkMode
                    ? PRIMARY_TEXT_DARK_LIGHT
                    : PRIMARY_TEXT_LIGHT,
                  fontWeight: 'bold'
                },
              ]}>
              {item.tipo_boleta}
            </Text>
          </View>
          {item.destino && (
            <View style={{ flexDirection: 'row', marginVertical: 5 }}>
              <IonIcons
                name="ios-location"
                size={16}
                color={
                  isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : "#999"
                }
              />
              <Text
                style={[
                  styles.cargo,
                  {
                    color: isDarkMode
                      ? PRIMARY_TEXT_DARK_LIGHT
                      : PRIMARY_TEXT_LIGHT,
                  },
                ]}>
                {item.destino}
              </Text>
            </View>
          )}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <IonIcons
              name="calendar"
              size={16}
              color={isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : "#999"}
            />
            <Text
              style={[
                styles.hora,
                {
                  marginLeft: 5,
                  color: isDarkMode
                    ? PRIMARY_TEXT_DARK_LIGHT
                    : PRIMARY_TEXT_LIGHT,
                },
              ]}>
              {item.fecha_ini} {item.hora_ini}
            </Text>
            <View style={{ width: 10 }}>
              <Text
                style={[
                  styles.hora,
                  {
                    textAlign: 'center',
                    color: isDarkMode
                      ? PRIMARY_TEXT_DARK_LIGHT
                      : PRIMARY_TEXT_LIGHT,
                  },
                ]}>
                {'-'}
              </Text>
            </View>
            <Text
              style={[
                styles.hora,
                {
                  color: isDarkMode
                    ? PRIMARY_TEXT_DARK_LIGHT
                    : PRIMARY_TEXT_LIGHT,
                },
              ]}>
              {item.fecha_fin == item.fecha_ini ? '' : item.fecha_fin}{' '}
              {item.hora_fin}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: 100,
            alignItems: 'center',
            alignContent: 'space-around',
            alignSelf: 'center',
          }}>
          <View
            style={{
              width: 100,
              borderRadius: 5,
              padding: 2,
              textAlign: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              borderColor: item.estado > 5 ? '#95D780' : item.estado == -2 ? 'red' : '#CFA9FC',
              //borderColor: item.estado > 5 ? PRIMARY_COLOR : '#CFA9FC',
              borderWidth: 1,
              //borderStyle: 'dotted',
            }}>
            <Text
              style={[
                styles.estadoText,
                { color: item.estado > 5 ? '#66C490' : '#6958AB' },
              ]}>
              {item.estado_nombre}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              width: 90,
              padding: 3,
            }}>
            <Text
              style={{
                color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                fontSize: 11,
                textAlign: 'center',
              }}>
              {item.aprobado_por}
            </Text>
            <Text
              style={{
                color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                fontSize: 11,
                textAlign: 'center',
              }}>
              {item.fecha_aprobacion}
            </Text>
            {/* {item.ci?
              (<Image
                source={{
                  uri: 'https://rrhh.miteleferico.bo/api/foto?c=' + item.ci,
                }}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  alignItems: 'center',
                }}
              />):null } */}
          </View>
        </View>
      </View>
    );
  };

  const onRefreshHandle = () => {
    console.log(new Date().toString());
    dispatch(setRefreshPage(new Date().toString()));

  }
  //busqueda
  useEffect(() => {
    const searchData = _.filter(queryLicenses?.data, item => {
      return (
        item.justificacion.toLowerCase().includes(q.toLowerCase()) ||
        item.tipo_boleta.toLowerCase().includes(q.toLowerCase()) ||
        item.destino.toLowerCase().includes(q.toLowerCase())
      );
    });
    console.log('cantidad encontrada:', searchData.length);
    setFilterData(searchData);
  }, [q]);
  const footerList = () => {
    return <View style={{ height: 75 }} />;
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? BACKGROUND_DARK : BACKGROUND_LIGHT,
      }}>
      <View style={{ flex: 1 }}>
        <Title title="Permisos" navigation={navigation} />
        <View style={styles.viewSearch} level="3">
          <View
            style={{
              height: 40,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              margin: 0,
              backgroundColor: isDarkMode
                ? BACKGROUND_PRIMARY_DARK
                : BACKGROUND_PRIMARY_LIGHT,
              width: Dimensions.get('window').width - 20,
              padding: 10,
              borderRadius: 20,
            }}>
            <IonIcons color={TERTIARY_COLOR} name="search" size={20} />
            <TextInput
              ref={refTextInputSearch}
              style={styles.search}
              label="Buscar"
              placeholder="Buscar"
              placeholderTextColor={'#9c9c9c'}
              onChangeText={debouncedChangeHandler}
            />
            {q.length > 0 ? (
              <Pressable style={styles.btnSearch} onPress={handleResetSearch}>
                <IonIcons name="close-circle" color={'#9c9c9c'} size={26} />
              </Pressable>
            ) : null}
          </View>
        </View>

        {queryLicenses.isLoading ? <ActivityIndicator
          size="large"
          color={PRIMARY_COLOR}
          style={styles.loader}
        /> : (
          <FlatList
            data={filterData}
            initialNumToRender={10}
            renderItem={({ item, index }) => renderItem({ item, index })}
            keyExtractor={item => item.id}
            onEndReached={onEndReached}
            ListFooterComponent={footerList}
            ListEmptyComponent={emptyView}
            refreshing={refresh}
            onRefresh={onRefreshHandle}
          />
        )}

        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: PRIMARY_COLOR,
            opacity: 1,
            alignContent: 'center',
            position: 'absolute',
            bottom: 10,
            left: Dimensions.get('window').width - 75,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('Boleta')}>
          <IonIcons name="ios-add" size={32} color={'white'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LicensesScreen;

const styles = StyleSheet.create({
  loader: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  dataContainer: {
    flexDirection: 'row',
  },
  avatar: {
    marginRight: 5,
    marginLeft: 0,
  },
  nombre: {
    fontSize: 15,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  cargo: {
    fontSize: 12,
  },
  celular: {
    fontSize: 10,
    textAlign: 'center',
  },

  estadoText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  viewSearch: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  search: {
    height: 36,
    margin: 5,
    width: '89%',
    //borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    //backgroundColor: '#efefef',
    color: '#a7a7a7',
  },
  viewSearchInput: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    //backgroundColor: '#FFFFFF',
    margin: 5,
    borderRadius: 25,
    width: '80%',
    padding: 5,
  },

  btnSearch: {
    backgroundColor: 'transparent',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    marginLeft: -18,
    padding: 0,
  },
  totalText: {
    fontSize: 10,
  },
  description: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: Dimensions.get('window').width - 100,
  },
  email: {
    fontSize: 10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {
      width: -4,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  interno: {
    fontSize: 10,
    fontWeight: '100',
    textAlign: 'center',
  },
  icon: {
    width: 26,
    height: 26,
  },
  tipo: {
    fontSize: 10,
    fontWeight: '400',
    textAlign: 'left',
    color: SECONDARY_COLOR,
  },
  hora: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
});
