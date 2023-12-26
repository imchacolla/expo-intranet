import React, {useEffect, useCallback, useState} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Pressable,
  FlatList,
  TextInput,
  Linking,
  Animated,
  Image,
  VirtualizedList,
  TouchableOpacity,
  Text,
  Dimensions,
  Alert,
  Switch
} from 'react-native';
import {useSelector} from 'react-redux';
import debounce from 'lodash/debounce';
import _ from 'lodash';
//import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import Title from '../components/Title';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../utils/constants';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AntDesign from  'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
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
import { event } from 'react-native-reanimated';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//ICONS

const AlmacenDetalleScreen = ({route, navigation}) => {
  const {item} = route.params;

  const [refresh, onRefresh] = React.useState(false);
  const {isDarkMode} = useSelector(state => state.auth);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = React.useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(100);
  const [q, setQ] = useState('');
  const [total, setTotal] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedCountTotal, setSelectedCountTotal] = useState(0);
  const [items, setItems] = useState([]);

  //traer datos detalle
  const getData = async () => {
    setLoading(true);
    setQ('');
    setData([]);
    setFilterData([]);
    try {
      const response = await axios.get(
        `/almacen/detalle-solicitud/${item.solicitud_maestro_id}`,
      );
      setData(response.data.data);
      //setFilterData(response.data.data);
      setTotal(response.data.total);
      const selectTotal = _.filter(response.data.data, function (o) {
        if (o._row.visto_bueno + o._row.aprobacion + o._row.autorizacion > 0)
          return o;
      }).length;
      setSelectedCountTotal(selectTotal);
      const items = _.map(response.data.data, function (item) {
        item._row.switch = false;
        return item;
      });
      setFilterData(items);
    } catch (error) {
      //console.log (error);
      Alert.alert('Error', 'Error');
      setLoading(false);
    }
    setLoading(false);
  };

  setSwitchValue = (val, ind) => {
    const tempData = _.cloneDeep(filterData);
    tempData[ind]._row.switch = val;
    console.log(val, ind);
    setFilterData(tempData);
    //contar
    const selected = _.filter(tempData, function (o) {
      if (o._row.switch) return o;
    }).length;
    setSelectedCount(selected);
  };
  const onEndReached = () => {
    if (page * perPage < total) {
      setPage(page + 1);
    }
  };

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
          No se encotraron datos
        </Text>
      </View>
    );
  };
  const renderItem = ({item, index}) => {
    const {_row} = item;
    return (
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
        <View
          style={{
            width: 80,
            alignItems: 'center',
            alignContent: 'space-around',
            alignSelf: 'center',
          }}>
          <Image
            source={{
              uri: _row.item_imagen_url,
            }}
            resizeMode="contain"
            style={{
              width: 80,
              height: 80,
              borderRadius: 10,
              alignItems: 'center',
              marginRight: 5,
            }}
          />
          <Text
            style={[
              styles.codigo,
              {
                color: isDarkMode
                  ? PRIMARY_TEXT_DARK_LIGHT
                  : PRIMARY_TEXT_LIGHT,
              },
            ]}>
            {_row.item_codigo}
          </Text>
        </View>
        <View style={styles.description}>
          <Text
            style={[
              styles.nombre,
              {color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT},
            ]}>
            {_row.item}
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
            Cantidad: {_row.cantidad_solicitada}
          </Text>
          {_row.estado === 'VISTO BUENO' && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                width: 150,
              }}>
              <MaterialComunityIcons
                name="account-check-outline"
                color={
                  isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT
                }
                size={22}
              />
              <Text
                style={{
                  fontSize: 12,
                  marginLeft: 5,
                  fontWeight: '500',
                  fontStyle: 'italic',
                  color: isDarkMode
                    ? PRIMARY_TEXT_DARK_LIGHT
                    : PRIMARY_TEXT_LIGHT,
                }}>
                {_row.estados.visto_bueno}
              </Text>
            </View>
          )}

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
              {_row.nombre}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: 40,
            alignItems: 'center',
            alignContent: 'space-around',
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Aprobar boleta',
                '¿Esta usted seguro de aprobar la boleta?',
                [
                  {
                    text: 'No',
                  },
                  {
                    text: 'Si',
                    onPress: () => {
                      console.log('aprobar');
                      // /setShowBox(false);
                    },
                  },
                ],
              );
            }}>
            <View
              style={
                {
                  /*  width: 100,
                borderRadius: 30,
                padding: 6,
                textAlign: 'center',
                alignSelf: 'center',
                alignItems: 'center',
                backgroundColor: isDarkMode ? '#cccccc' : PRIMARY_COLOR,
                marginBottom: 4, */
                }
              }>
              {/** VISTO BUENO */}

              {_row.visto_bueno > 0 && (
                <Switch
                  onValueChange={value => setSwitchValue(value, index)}
                  thumbColor={PRIMARY_COLOR}
                  trackColor={{false: '#999', true: '#6c78e4'}}
                  value={_row.switch}
                  ios_backgroundColor={'6c78e4'}
                />
              )}
              {/** APROBACION */}
              {_row.aprobacion > 0 && (
                <Switch
                  onValueChange={value => setSwitchValue(value, index)}
                  thumbColor={PRIMARY_COLOR}
                  trackColor={{false: '#999', true: '#6c78e4'}}
                  value={_row.switch}
                  ios_backgroundColor={PRIMARY_COLOR}
                />
              )}
              {/** AUTHORIZACION */}
              {_row.autorizacion > 0 && (
                <Switch
                  onValueChange={value => setSwitchValue(value, index)}
                  thumbColor={PRIMARY_COLOR}
                  trackColor={{false: '#999', true: '#6c78e4'}}
                  value={_row.switch}
                  ios_backgroundColor={PRIMARY_COLOR}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const estados = {
    'VISTO BUENO': 'VOBO',
    SOLICITADO: 'APROBAR',
    AUTORIZADO: 'AUTORIZAR',
    APROBADO: '',
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    const searchData = _.filter(data, item => {
      return item._row.solicitante.toLowerCase().includes(q.toLowerCase());
    });
    console.log('cantidad encontrada:', searchData.length);
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
        <View style={styles.viewSearch} level="3">
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              alignContent: 'center',
              marginHorizontal: 5,
              marginBottom: 5,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{
                width: 40,
                height: 40,
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <AntDesign
                name="left"
                size={24}
                color={isDarkMode ? '#EFEFEF' : '#333'}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              #{item.solicitud_maestro_id}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                width: Dimensions.get('screen').width - 200,
              }}>
              <TouchableOpacity
                style={{
                  padding: 4,
                  borderRadius: 16,
                  backgroundColor: isDarkMode ? '#111' : '#ccc',
                  alignItems: 'center',
                  alignContent: 'center',
                  width: 32,
                  height: 32,
                }}
                onPress={() => {}}>
                <MaterialComunityIcons
                  name="checkbox-marked-circle"
                  size={24}
                  color={PRIMARY_COLOR}
                />
              </TouchableOpacity>

              {selectedCount > 0 && (
                <TouchableOpacity
                  style={{
                    padding: 4,
                    borderRadius: 16,
                    backgroundColor: isDarkMode ? '#111' : '#ccc',
                    alignItems: 'center',
                    alignContent: 'center',
                    width: 32,
                    height: 32,
                    marginLeft: 3,
                  }}
                  onPress={() => {}}>
                  <MaterialComunityIcons
                    style={{alignSelf: 'center'}}
                    name="checkbox-marked-circle"
                    size={24}
                    color={PRIMARY_COLOR}
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={{
                  padding: 4,
                  borderRadius: 16,
                  backgroundColor: isDarkMode ? '#111' : '#ccc',
                  alignItems: 'center',
                  alignContent: 'center',
                  width: 32,
                  height: 32,
                  marginLeft: 3,
                }}
                onPress={() => {}}>
                <AntDesign
                  name="closecircle"
                  size={24}
                  color={isDarkMode ? 'white' : '#111'}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text
              style={[
                styles.totalText,
                {
                  color: isDarkMode
                    ? PRIMARY_TEXT_DARK_LIGHT
                    : PRIMARY_TEXT_LIGHT,
                },
              ]}>
              SELEC: {selectedCount} / {selectedCountTotal}
            </Text>
            <Text
              style={[
                styles.totalText,
                {
                  fontWeight: 'bold',
                  color: isDarkMode
                    ? PRIMARY_TEXT_DARK_LIGHT
                    : PRIMARY_TEXT_LIGHT,
                },
              ]}>
              ITEMS: {filterData.length}
            </Text>
          </View>
        </View>

        {loading ? null : (
          <VirtualizedList
            data={filterData}
            initialNumToRender={10}
            renderItem={({item, index}) => renderItem({item, index})}
            keyExtractor={item => item._row.solicitud_detalle_id}
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

export default AlmacenDetalleScreen;

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
  codigo: {
    fontSize: 13,
    fontWeight: '500',
  },
  nombres: {
    fontSize: 12,
    fontWeight: '400',
    //textTransform: 'uppercase',
  },
  cargo: {
    fontSize: 15,
    fontWeight: '500'
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
    fontSize: 13,
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