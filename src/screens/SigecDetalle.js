import React, {useEffect, useRef, useCallback, useState} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Pressable,
  FlatList,
  TextInput,
  Linking,
  TouchableOpacity,
  Text,
  Dimensions,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import debounce from 'lodash/debounce';
import _ from 'lodash';
//import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import Title from '../components/Title';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../utils/constants';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {SafeAreaView} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
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

const SigecDetalleScreen = ({route, navigation}) => {
  const ref = useRef(null);
  //obener ubicacion del documento
  const item = route.params.item;
  //let refIndex=0;
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
  const [index, setIndex] = useState(0);
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const CONTENT_OFFSET_THRESHOLD = 300;
  const MAX_LENGTH = 22;
  const getData = async () => {
    setLoading(true);
    setData([]);
    try {
      //console.log(item.nur)
      const response = await axios.post(`/sigec/seguimiento`, {nur: item.nur});

      //console.log(response.data.data)
      const refIndex = _.findIndex(response.data.data, function (s, index) {
        if (s.id_estado === 1 && s.oficial > 0) {
          return index;
        }
      });
      setIndex(refIndex);
      setData(response.data.data);
      // setTotal(response.data.total);
    } catch (error) {
      //console.log (error);
      Alert.alert('Error', 'Error');
      setLoading(false);
    }
    setLoading(false);
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

  const debouncedChangeHandler = useCallback(debounce(changeHandler, 800), []);
  //Linking
  const handleCallPress = celular => {
    Linking.openURL(`tel:${celular}`);
  };
  const ITEM_SIZE = 75;
  const ITEM_HEIGHT = 180;
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
          marginHorizontal: 20,
          alignContent: 'center',
        }}>
        <Text
          style={{
            alignSelf: 'center',
            textAlign: 'center',
            color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
          }}>
          La hoja de ruta no tiene seguimiento
        </Text>
        <Text
          style={{
            alignSelf: 'center',
            textAlign: 'center',
            color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
          }}>
          (no fue aún derivado){' '}
        </Text>
      </View>
    );
  };
  useEffect(() => {
    getData();
  }, []);
  const scrollTo = () => {
    if (index > 0) {
      ref.current?.scrollToIndex({index: index, animated: true});
    }
  };
  const scrollTop = () => {
    ref.current?.scrollToIndex({index: 0, animated: true});
  };
  const footerList = () => {
    return <View style={{height: 75}} />;
  };
  const renderItem = ({item, index}) => {
    return (
      <View
        key={index}
        style={{
          elevation: 1,

          backgroundColor: isDarkMode
            ? item.oficial === 1
              ? PRIMARY_COLOR
              : BACKGROUND_PRIMARY_DARK
            : item.oficial === 1
            ? '#dde6f1'
            : BACKGROUND_PRIMARY_LIGHT,
          padding: 2,
          marginVertical: 3,
          borderLeftColor: item.oficial > 0 ? PRIMARY_COLOR : '#999',
          borderLeftWidth: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <View style={styles.description}>
            <Text
              style={[
                styles.nombre,
                {color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT},
              ]}>
              {item.nombre_emisor.length > MAX_LENGTH
                ? item.nombre_emisor.substring(0, MAX_LENGTH) + '...'
                : item.nombre_emisor}
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
              {item.cargo_emisor}
            </Text>
            <Text
              style={[
                styles.fecha,
                {
                  color: isDarkMode
                    ? PRIMARY_TEXT_DARK_LIGHT
                    : PRIMARY_TEXT_LIGHT,
                  marginVertical: 4,
                },
              ]}>
              {item.fecha_emision} {item.hora_emision}
            </Text>
            <View>
              {item.oficial > 0 ? (
                item.id_estado > 1 ? (
                  <IonIcons name="ios-paw" color={PRIMARY_COLOR} size={24} />
                ) : item.id_estado === 1 ? (
                  <IonIcons name="flag" color={'#f19216'} size={24} />
                ) : null
              ) : null}
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              marginTop: 2,
            }}>
            <IonIcons
              name="arrow-forward"
              color={item.oficial > 0 ? PRIMARY_COLOR : '#999'}
              size={20}
            />
          </View>
          <View style={[styles.description, {}]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={[
                  styles.nombre,
                  {
                    color: isDarkMode
                      ? PRIMARY_TEXT_DARK_LIGHT
                      : PRIMARY_TEXT_LIGHT,
                  },
                ]}>
                {item.nombre_receptor.length > MAX_LENGTH
                  ? item.nombre_receptor.substring(0, MAX_LENGTH) + '...'
                  : item.nombre_receptor}
              </Text>
            </View>
            <View>
              <Text
                style={[
                  styles.cargo,
                  {
                    color: isDarkMode
                      ? PRIMARY_TEXT_DARK_LIGHT
                      : PRIMARY_TEXT_LIGHT,
                  },
                ]}>
                {item.cargo_receptor}
              </Text>
            </View>
            {item.fecha_recepcion ? (
              <View style={{marginVertical: 4}}>
                <Text
                  style={[
                    styles.fecha,
                    {
                      color: isDarkMode
                        ? PRIMARY_TEXT_DARK_LIGHT
                        : PRIMARY_TEXT_LIGHT,
                    },
                  ]}>
                  {item.fecha_recepcion} {item.hora_recepcion}
                </Text>
              </View>
            ) : null}
            <View>
              {item.oficial > 0 ? (
                item.id_estado === 4 ? (
                  <IonIcons name="ios-paw" color={PRIMARY_COLOR} size={24} />
                ) : item.id_estado > 1 ? (
                  <IonIcons name="flag" color={'#f19216'} size={24} />
                ) : null
              ) : null}
            </View>
          </View>
        </View>
        <View>
          <Text
            style={{
              //color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
              fontSize: 11,
              //backgroundColor: PRIMARY_COLOR,
              color: PRIMARY_COLOR,
              marginVertical: 4,
              alignSelf: 'flex-end',
            }}>
            {item.estado}
          </Text>
          <Text
            style={{
              color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
              fontSize: 10,
              fontStyle: 'italic',
            }}>
            {item.proveido}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? BACKGROUND_DARK : BACKGROUND_LIGHT,
      }}>
      <View style={{flex: 1}}>
        <View
          style={{
            elevation: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              //width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              alignContent: 'center',
              marginHorizontal: 5,
              marginBottom: 5,
              //marginBottom: 20,
              //borderBottomWidth: 1,
              // borderBottomColor: isDarkMode ? '#333' : '#666',
              //paddingBottom: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{
                width: 40,
                height: 40,
                //marginLeft: Dimensions.get('window').width - 60,
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
                // marginLeft: -20,
              }}>
              {item.nur}
            </Text>
            <Pressable
              style={{
                height: 34,
                width: 34,
                borderRadius: 20,
                backgroundColor: isDarkMode
                  ? PRIMARY_TEXT_LIGHT
                  : PRIMARY_TEXT_DARK,

                alignItems: 'center',
                alignContent: 'center',
              }}
              onPress={scrollTo}>
              <IonIcons name="flag" color={'#dc9613'} size={32} />
            </Pressable>
          </View>
          <View
            style={{
              paddingHorizontal: 5,
              paddingBottom: 4,
              marginBottom: 1,
            }}>
            <Text
              style={{
                fontWeight: '400',
                color: isDarkMode
                  ? PRIMARY_TEXT_DARK_LIGHT
                  : PRIMARY_TEXT_LIGHT,
              }}>
              {item.referencia}
            </Text>
          </View>
        </View>

        {loading ? null : (
          <FlatList
            ref={ref}
            data={data}
            initialScrollIndex={index}
            style={{flexGrow: 0, paddingTop: 10}}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            //getItemCount={data => data.length}
            //onEndReached={onEndReached}
            //getItem={getItem}
            ListFooterComponent={footerList}
            ListEmptyComponent={emptyView}
            refreshing={refresh}
            onRefresh={getData}
            getItemLayout={(data, index) => ({
              length: ITEM_HEIGHT,
              offset: ITEM_HEIGHT * index,
              index,
            })}
            onScroll={event => {
              setContentVerticalOffset(event.nativeEvent.contentOffset.y);
            }}
          />
        )}
        {contentVerticalOffset > CONTENT_OFFSET_THRESHOLD && (
          <IonIcons
            style={styles.scrollTopButton}
            // previously configured Icon props
            onPress={() => {
              ref.current.scrollToOffset({offset: 0, animated: true});
            }}
            name="arrow-up-circle-outline"
            size={40}
            color={PRIMARY_COLOR}
          />
        )}
        {loading ? (
          <ActivityIndicator size="large" style={styles.loader} />
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default SigecDetalleScreen;

const styles = StyleSheet.create({
  scrollTopButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 20,
  },
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
    fontSize: 14,
    fontWeight: '600',

    //textTransform: 'uppercase',
  },
  codigo: {
    fontSize: 13,
    fontWeight: '500',
  },
  cargo: {
    fontSize: 13,
    height: 32,
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
    width: Dimensions.get('window').width / 2,
  },
  email: {
    fontSize: 10,
  },
  shadowProp: {
    shadowColor: '#bcd0dc',
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
  fecha: {
    fontSize: 10,
    fontWeight: '600',
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
