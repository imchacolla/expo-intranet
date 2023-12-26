import React, { useEffect, useCallback, useState } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Pressable,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  Alert,
} from 'react-native';
import { useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import _ from 'lodash';

import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Title from '../components/Title';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../utils/constants';
import IonIcons from 'react-native-vector-icons/Ionicons';

import { SafeAreaView } from 'react-native-safe-area-context';
import {
  PRIMARY_TEXT,
  PRIMARY_TEXT_DARK,
  PRIMARY_TEXT_LIGHT,
  BACKGROUND_DARK,
  BACKGROUND_LIGHT,
  BACKGROUND_PRIMARY_DARK,
  BACKGROUND_PRIMARY_LIGHT,
  PRIMARY_TEXT_DARK_LIGHT,
  TERTIARY_COLOR,
} from '../utils/constants';

//ICONS

const ApproveScreen = ({ navigation }) => {
  const refTextInputSearch = React.createRef();
  const [refresh, onRefresh] = React.useState(false);
  const { isDarkMode } = useSelector(state => state.auth);
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = React.useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(100);
  const [q, setQ] = useState('');
  const [total, setTotal] = useState(0);

  const getLicenses = async () => {
    const response = await axios.get('/rrhh/lista-permisos');
    return response.data.data;
  }
  const queryLicenses = useQuery({
    queryKey: ['approve'],
    queryFn: getLicenses,
  });

  useEffect(() => {
    setFilterData(queryLicenses?.data);
  }, [queryLicenses?.data]);

  const handleResetSearch = () => {
    setQ('');
    //setPage(1);
    refTextInputSearch.current.clear();
  };
  useEffect(() => {
    const searchData = _.filter(queryLicenses?.data, item => {
      return (
        item.justificacion.toLowerCase().includes(q.toLowerCase()) ||
        item.excepcion.toLowerCase().includes(q.toLowerCase()) ||
        item.nombre.toLowerCase().includes(q.toLowerCase())
      );
    });
    setFilterData(searchData);
  }, [q]);
  const changeHandler = q => {
    setQ(q);
  };
  const debouncedChangeHandler = useCallback(debounce(changeHandler, 800), []);
  const aprovePermision = async (data) => {
    //console.log(data)
    const response = await axios.post('/rrhh/aprobar-permiso', data);
    return response.data.data;
  }
  const mutationAprove = useMutation({
    mutationFn: (data) => aprovePermision(data),
    onSuccess: (data, variables, context) => {
      if (variables.estado_solicitado === 6) {
        Alert.alert("Se aprobó el permiso correctamente.")
      }
      if (variables.estado_solicitado === -2) {
        Alert.alert("Se rechazo el permiso seleccionado.")
      }
      queryLicenses.refetch();
    },
    onError: (error, variables, context) => {
      if (variables.estado_solicitado === 6) {
        Alert.alert('Error', ` Ocurrio un error al intentar Aprobar el permiso`)
      }
      if (variables.estado_solicitado === -2) {
        Alert.alert('Error', ` Ocurrio un error al intentar Rechazar el permiso`)

      }
      console.log(`Errorcito ${error} `)
      console.log(variables);
    },
  });

  //aprobar boleta
  const handleAprove = (item) => {
    Alert.alert(
      'Aprobar permiso',
      '¿Esta usted seguro de aprobar el permiso solicitado por : \n' + item.nombre + ' ?',
      [
        {
          text: 'No',
        },
        {
          text: 'Si',
          onPress: () => {
            mutationAprove.mutate({ ...item, estado_solicitado: 6 })
            // /setShowBox(false);
          },
        },
      ],
    );

  }
  const handleRechazo = (item) => {
    Alert.alert(
      'Rechazar permiso',
      '¿Esta usted seguro de rechazar el permiso solicitado por : \n' + item.nombre + ' ?',
      [
        {
          text: 'No',
        },
        {
          text: 'Si',
          onPress: () => {
            mutationAprove.mutate({ ...item, estado_solicitado: -2 })
            // /setShowBox(false);
          },
        },
      ],
    );

  }




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
          No se encotraron boletas para aprobar
        </Text>
      </View>
    );
  };
  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'space-between',
          elevation: 1,
          // borderRadius: 10,
          backgroundColor: isDarkMode
            ? BACKGROUND_PRIMARY_DARK
            : BACKGROUND_PRIMARY_LIGHT,
          padding: 8,
          marginVertical: 3,
          // margin: 5,
        }}>
        <View style={styles.description}>
          <Text
            style={[
              styles.nombre,
              { color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT },
            ]}>
            {item.justificacion}
          </Text>
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
          <Text
            style={[
              styles.tipo,
              {
                color: isDarkMode
                  ? PRIMARY_TEXT_DARK_LIGHT
                  : PRIMARY_TEXT_LIGHT,
              },
            ]}>
            {item.excepcion}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={[
                styles.hora,
                {
                  color: isDarkMode
                    ? PRIMARY_TEXT_DARK_LIGHT
                    : PRIMARY_TEXT_LIGHT,
                },
              ]}>
              {item.fecha_ini} {item.hora_ini}
            </Text>
            <Text
              style={[
                styles.hora,
                {
                  color: isDarkMode
                    ? PRIMARY_TEXT_DARK_LIGHT
                    : PRIMARY_TEXT_LIGHT,
                },
              ]}>
              -{item.fecha_fin == item.fecha_ini ? '' : item.fecha_fin}
              {item.hora_fin}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={[
                styles.nombres,
                {
                  color: isDarkMode
                    ? PRIMARY_TEXT_DARK_LIGHT
                    : PRIMARY_TEXT_LIGHT,
                },
              ]}>
              {item.nombre}
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
          <Image
            source={{
              uri: 'https://rrhh.miteleferico.bo/api/foto?c=' + item.ci,
            }}
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              alignItems: 'center',
              marginBottom: 5,
            }}
          />
          <TouchableOpacity
            onPress={() => handleAprove(item)}>
            <View
              style={{
                width: 100,
                borderRadius: 30,
                padding: 6,
                textAlign: 'center',
                alignSelf: 'center',
                alignItems: 'center',
                backgroundColor: isDarkMode ? '#cccccc' : '#333333',
                marginBottom: 4,
              }}>
              <Text
                style={[
                  styles.estadoText,
                  { color: isDarkMode ? PRIMARY_TEXT_LIGHT : PRIMARY_TEXT_DARK },
                ]}>
                Aprobar
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRechazo(item)}>
            <View
              style={{
                width: 100,
                borderRadius: 30,
                padding: 4,
                textAlign: 'center',
                alignSelf: 'center',
                alignItems: 'center',
                borderColor: isDarkMode ? '#666666' : '#333333',
                borderWidth: 1,
              }}>
              <Text
                style={[
                  styles.estadoText,
                  { color: isDarkMode ? '#666666' : '#333333' },
                ]}>
                Rechazar
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
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
        <Title title="Aprobar permisos" navigation={navigation} />
        <View style={styles.viewSearch}>
          <View
            style={{
              height: 40,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              margin: 10,
              backgroundColor: isDarkMode
                ? BACKGROUND_PRIMARY_DARK
                : BACKGROUND_PRIMARY_LIGHT,
              width: Dimensions.get('window').width - 140,
              padding: 10,
              borderRadius: 20,
            }}>
            <IonIcons color={TERTIARY_COLOR} name="search" size={20} />
            <TextInput
              ref={refTextInputSearch}
              style={styles.search}
              label="Buscar"
              placeholder="Buscar"
              //value={q}
              placeholderTextColor={'#9c9c9c'}
              onChangeText={debouncedChangeHandler}
            />
            {q.length > 0 ? (
              <Pressable style={styles.btnSearch} onPress={handleResetSearch}>
                <IonIcons name="close-circle" color={'#9c9c9c'} size={26} />
                {/*<CancelIcon fill="#b9b9b9" />*/}
              </Pressable>
            ) : null}
          </View>
          <Text
            style={[
              styles.totalText,
              {
                color: isDarkMode
                  ? PRIMARY_TEXT_DARK_LIGHT
                  : PRIMARY_TEXT_LIGHT,
              },
            ]}>
            Total: {filterData?.length} / {queryLicenses.data?.length}
          </Text>
        </View>

        {queryLicenses.isLoading ? <ActivityIndicator size="large" style={styles.loader} /> : (
          <FlatList
            data={filterData}
            initialNumToRender={10}
            renderItem={({ item, index }) => renderItem({ item, index })}
            keyExtractor={item => item.id}
            //getItemCount={filterData => filterData.length}
            // onEndReached={onEndReached}
            //getItem={getItem}
            ListFooterComponent={footerList}
            ListEmptyComponent={emptyView}
            refreshing={refresh}
            onRefresh={() => queryLicenses.refetch()}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ApproveScreen;

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
  nombres: {
    fontSize: 12,
    fontWeight: '400',
    //textTransform: 'uppercase',
  },
  cargo: {
    fontSize: 12,
  },
  celular: {
    fontSize: 10,
    textAlign: 'center',
  },

  estadoText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '400',
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
    marginLeft: -20,
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
    fontSize: 12,
    fontWeight: '300',
    textAlign: 'left',
    color: SECONDARY_COLOR,
  },
  hora: {
    fontSize: 10,
    fontWeight: '100',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
