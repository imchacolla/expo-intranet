import React, {useEffect, useCallback, useState} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Pressable,
  FlatList,
  TextInput,
  Linking,
  Image,
  VirtualizedList,
  TouchableOpacity,
  Text,
  Dimensions,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import debounce from 'lodash/debounce';
import _ from 'lodash';
import axios from 'axios';
import Title from '../components/Title';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../utils/constants';
import 'moment';
import 'moment/locale/es';
import moment from 'moment-timezone';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {SafeAreaView} from 'react-native-safe-area-context';
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

const AlmacenScreen = ({navigation}) => {
  const refTextInputSearch = React.createRef();
  const [refresh, onRefresh] = React.useState(false);
  const {isDarkMode} = useSelector(state => state.auth);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = React.useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(100);
  const [q, setQ] = useState('');
  const [total, setTotal] = useState(0);

  const getData = async () => {
    setLoading(true);
    setQ('');
    refTextInputSearch.current.clear();
    setData([]);
    setFilterData([]);
    try {
      const response = await axios.get('/almacen/lista-solicitudes');
      setData(response.data.data);
      setFilterData(response.data.data);
      setTotal(response.data.total);
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  };

  const navigateToDetail = item => {
    navigation.navigate('Detalle',{ item: item});
  };
  const onEndReached = () => {
    if (page * perPage < total) {
      setPage(page + 1);
    }
    console.log('end reached');
  };

  const handleResetSearch = () => {
    setData([]);
    setQ('');
    setPage(1);
    refTextInputSearch.current.clear();
  };

  const changeHandler = q => {
    setQ(q);
  };

  const estados= {
    'VISTO BUENO':'#f3f29c',
    'SOLICITADO':'#b7caee',
    'AUTORIZADO':'#a8ebf0',
    'APROBADO':'#b5f7c2'    
  };
  const debouncedChangeHandler = useCallback(debounce(changeHandler, 800), []);
  //Linking
  const handleCallPress = celular => {
    Linking.openURL(`tel:${celular}`);
  };
  const ITEM_SIZE = 75;
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
          No se encotraron solicitudes.
        </Text>
      </View>
    );
  };
  const renderItem = ({item, index}) => {
    const {_row} = item;
    return (
      <TouchableOpacity
        onPress={() => navigateToDetail(_row)}
        key={'person' + index}>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'space-between',
            elevation: 1,
            borderRadius: 10,
            backgroundColor: isDarkMode
              ? BACKGROUND_PRIMARY_DARK
              : BACKGROUND_PRIMARY_LIGHT,
            padding: 8,
            margin: 5,
          }}>
          <View style={styles.description}>
            <Text
              style={[
                styles.nombre,
                {color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT},
              ]}>
              {_row.solicitante}
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
              {_row.cargo}
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
              {_row.departamento}
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
                Fecha: {moment(_row.fecha_solicitud).fromNow()}
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
                    color: '#333',

                    fontWeight: '600',
                    backgroundColor:
                      //estados._row.estado === 'SOLICITADO' ? '#cef3fa':_row.estado === 'AUTORIZADO' ? '#f0ee98':'#9ee2b8',
                      estados[_row.estado],
                    borderTopLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,
                    padding: 4,
                    marginTop: 2,
                  },
                ]}>
                {_row.estado}
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
            <Text
              style={{
                color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                fontWeight: 'bold',
                fontSize: 11,
              }}>
              #{_row.solicitud_maestro_id}
            </Text>
            <Image
              source={{
                uri: 'https://rrhh.miteleferico.bo/api/foto?c=' + _row.ci,
              }}
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                alignItems: 'center',
                marginBottom: 5,
              }}
            />
            {/** VISTO BUENO */}
            {_row.estado === 'VISTO BUENO' && (
              <View>
                <View
                  style={{
                    width: 100,
                    borderRadius: 30,
                    padding: 6,
                    textAlign: 'center',
                    alignSelf: 'center',
                    alignItems: 'center',
                    borderColor: PRIMARY_COLOR,
                    borderWidth: 1,
                    marginBottom: 4,
                  }}>
                  <Text
                    style={[
                      styles.estadoText,
                      {
                        color: PRIMARY_COLOR,
                      },
                    ]}>
                    Ver detalle
                  </Text>
                </View>
              </View>
            )}
            {/** AUTORIZAR */}
            {_row.estado === 'SOLICITADO' && (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      'Aprobar solicitud',
                      '¿Esta usted seguro de aprobar todos los items?',
                      [
                        {
                          text: 'No',
                        },
                        {
                          text: 'Si',
                          onPress: () => {
                            console.log('aprobar');
                          },
                        },
                      ],
                    );
                  }}>
                  <View
                    style={{
                      width: 100,
                      borderRadius: 30,
                      padding: 6,
                      textAlign: 'center',
                      alignSelf: 'center',
                      alignItems: 'center',
                      backgroundColor: isDarkMode ? '#cccccc' : PRIMARY_COLOR,
                      marginBottom: 4,
                    }}>
                    <Text
                      style={[
                        styles.estadoText,
                        {
                          color: isDarkMode
                            ? PRIMARY_TEXT_LIGHT
                            : PRIMARY_TEXT_DARK,
                        },
                      ]}>
                      Aprobar
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
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
                        {color: isDarkMode ? '#666666' : '#333333'},
                      ]}>
                      Rechazar
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            {/** APROBAR */}
            {_row.estado === 'APROBADO' && (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      'Autorizar solicitud',
                      '¿Esta usted seguro de autorizar solicitud?',
                      [
                        {
                          text: 'No',
                        },
                        {
                          text: 'Si',
                          onPress: () => {
                            console.log('aprobar');
                          },
                        },
                      ],
                    );
                  }}>
                  <View
                    style={{
                      width: 100,
                      borderRadius: 30,
                      padding: 6,
                      textAlign: 'center',
                      alignSelf: 'center',
                      alignItems: 'center',
                      backgroundColor: isDarkMode ? '#cccccc' : PRIMARY_COLOR,
                      marginBottom: 4,
                    }}>
                    <Text
                      style={[
                        styles.estadoText,
                        {
                          color: isDarkMode
                            ? PRIMARY_TEXT_LIGHT
                            : PRIMARY_TEXT_DARK,
                        },
                      ]}>
                      Autorizar
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
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
                        {color: isDarkMode ? '#666666' : '#333333'},
                      ]}>
                      Rechazar
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    const searchData = _.filter(data, item => {
      return item._row.solicitante.toLowerCase().includes(q.toLowerCase());
    });
    //console.log('cantidad encontrada:', searchData.length);
    setFilterData(searchData);
  }, [q]);
  const footerList = () => {
    return <View style={{height: 75}} />;
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? BACKGROUND_DARK : BACKGROUND_LIGHT,
      }}>
      <View style={{flex: 1}}>
        <Title title="Solicitudes almacen" navigation={navigation} />
        <View style={styles.viewSearch} level="3">
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
            <FontAwesome5 color={TERTIARY_COLOR} name="search" size={20} />
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
                {/* <Icon name="cancel" size={20} color="#595959" /> */}
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
            Total: {filterData.length}
          </Text>
        </View>

        {loading ? null : (
          <VirtualizedList
            data={filterData}
            initialNumToRender={10}
            renderItem={({item, index}) => renderItem({item, index})}
            keyExtractor={item => item._row.solicitud_maestro_id}
            getItemCount={filterData => filterData.length}
            onEndReached={onEndReached}
            getItem={getItem}
            ListFooterComponent={footerList}
            ListEmptyComponent={emptyView}
            refreshing={refresh}
            onRefresh={getData}
          />
        )}
        {loading ? (
          <ActivityIndicator size="large" style={styles.loader} />
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default AlmacenScreen;

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
    fontSize: 13,
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
    marginLeftt: 15,
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
    fontSize: 14,
    fontWeight: '100',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
