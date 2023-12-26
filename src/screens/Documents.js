import React, { useEffect, useCallback } from 'react';
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
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import debounce from 'lodash/debounce';
import axios from 'axios';
import _ from 'lodash';
import { useQuery } from '@tanstack/react-query';

import Title from '../components/Title';

//ICONS

//CONSTANTS
import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  TERTIARY_COLOR,
  PRIMARY_BACKGROUND,
  BACKGROUND_PRIMARY_DARK,
  BACKGROUND_PRIMARY_LIGHT,
  PRIMARY_TEXT_DARK,
  PRIMARY_TEXT_LIGHT,
  BACKGROUND_DARK,
  BACKGROUND_LIGHT,
} from '../utils/constants';
import { windowWidth } from '../utils/Dimentions';

const DocumentsScreen = ({ navigation }) => {
  const refTextInputSearch = React.createRef();
  const [refresh, setRefresh] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [filterData, setFilterData] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(150);
  const [q, setQ] = React.useState('');
  const [total, setTotal] = React.useState(0);
  const isDarkMode = useSelector(state => state.auth.isDarkMode);

  const getData = async () => {
    setLoading(true);
    //refTextInputSearch.current.clear();
    setQ('');
    setData([]);
    setFilterData([]);
    try {
      const response = await axios.get('/intranet/documentos', {
        params: {
          q: q,
          page: page,
          perPage: perPage,
        },
      });
      //const newData = data.concat (response.data.data);
      setData(response.data.data);
      setFilterData(response.data.data);
      setTotal(response.data.total);
      setLoading(false);
    } catch (error) {
      Alert.alert('Error', 'Ocurrio un error al obtener datos');
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  //busqueda
  useEffect(() => {
    const searchData = _.filter(data, item => {
      return item.nombre.toLowerCase().includes(q.toLowerCase());
    });
    console.log('cantidad encontrada:', searchData.length);
    setFilterData(searchData);
  }, [q]);

  const navigateToDetail = item => {
    navigation.navigate('PDF', { item: item });
  };
  const onEndReached = () => {
    if (page * perPage < total) {
      setPage(page + 1);
    }
    console.log('end reached');
  };

  const handleResetSearch = () => {
    setQ('');
    refTextInputSearch.current.clear();
  };

  const changeHandler = q => {
    setQ(q);
  };
  const footerList = () => {
    return <View style={{ height: 75 }} />;
  };

  const debouncedChangeHandler = useCallback(debounce(changeHandler, 800), []);

  const scrollY = React.useRef(new Animated.Value(0)).current;
  const ITEM_SIZE = 155;
  const getItem = (data, index) => {
    return data[index];
  };
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => navigateToDetail(item)}>
        <View
          style={{
            flex: 1 / 2,
            width: Dimensions.get('screen').width / 2 - 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 8,
            marginVertical: 4,
            marginHorizontal: 4,
            minHeight: ITEM_SIZE,
            borderRadius: 10,
            backgroundColor: isDarkMode
              ? BACKGROUND_PRIMARY_DARK
              : item.tamanio < 1
                ? '#daf5e1'
                : item.tamanio < 3
                  ? '#e9ffea'
                  : item.tamanio < 3
                    ? '#ede3ff'
                    : item.tamanio < 5
                      ? '#ffffe3'
                      : item.tamanio < 7
                        ? '#e3f5ff'
                        : '#f8e3e5',

            //transform: [{scale}],
            // borderColor: !isDarkMode
            //   ? 'transparent'
            //   : item.tamanio < 1
            //     ? '#BFF5A0'
            //     : item.tamanio < 3
            //       ? "#926AF5"
            //       : item.tamanio < 5
            //         ? '#F3DD79'
            //         : item.tamanio < 7 ? '#8F95FC' : '#E0948D',
            //         borderWidth:1,
            //         borderRadius:5,
            elevation: 1,
            alignItems: 'stretch',
          }}>
          <View style={styles.description}>
            <Text
              style={[
                styles.nombre,
                {
                  color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                },
              ]}>
              {item.nombre}
            </Text>
            <View
              style={[
                styles.tamanio,
                {
                  backgroundColor: !isDarkMode
                    ? BACKGROUND_PRIMARY_DARK
                    : item.tamanio < 1
                      ? '#BFF5A0'
                      : item.tamanio < 3
                        ? '#926AF5'
                        : item.tamanio < 5
                          ? '#F3DD79'
                          : item.tamanio < 7
                            ? '#8F95FC'
                            : '#E0948D',
                },
              ]}>
              <Text
                style={[
                  styles.tamanioText,
                  {
                    color: isDarkMode ? '#000' : '#F2F2F2',
                  },
                ]}>
                Tamaño: {item.tamanio}M
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? BACKGROUND_DARK : BACKGROUND_LIGHT,
      }}>
      <View style={{ flex: 1 }}>
        <Title title="Normativa" navigation={navigation} />
        {data.length > 0 && setLoading ? (
          <View>
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
                  width: Dimensions.get('screen').width - 40,
                  padding: 10,
                  borderRadius: 20,
                  width: Dimensions.get('screen').width - 120,
                }}>
                <Ionicons color={TERTIARY_COLOR} name="search" size={20} />
                <TextInput
                  ref={refTextInputSearch}
                  style={styles.search}
                  label="Buscar"
                  placeholder="Buscar"
                  placeholderTextColor={'#9c9c9c'}
                  onChangeText={debouncedChangeHandler}
                />
                {q.length > 0 ? (
                  <Pressable
                    style={styles.btnCancel}
                    onPress={handleResetSearch}>
                    <Ionicons
                      color={TERTIARY_COLOR}
                      name="close-circle-sharp"
                      size={28}
                    />
                  </Pressable>
                ) : null}
              </View>
              <Text
                style={{
                  color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                }}>
                {filterData.length}/{total}
              </Text>

            </View>

            <Animated.FlatList
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: true },
              )}
              data={filterData}
              key="users-list"
              renderItem={renderItem}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
              refreshing={refresh}
              onRefresh={getData}
              ListFooterComponent={footerList}
              ListEmptyComponent={
                <View
                  style={{
                    flex: 1 / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: isDarkMode
                        ? PRIMARY_TEXT_DARK
                        : PRIMARY_TEXT_LIGHT,
                    }}>
                    No se encontraron documentos para: '{q}'
                  </Text>
                </View>
              }
            />
          </View>
        ) : (
          <ActivityIndicator
            size="large"
            color={PRIMARY_COLOR}
            style={styles.loader}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default DocumentsScreen;

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
    //alignContent: 'flex-start',
    textAlign: 'left',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  cargo: {
    fontSize: 10,
  },
  celular: {
    fontSize: 10,
    textAlign: 'center',
  },
  tamanio: {
    //backgroundColor: PRIMARY_COLOR,
    paddingVertical: 2,
    paddingHorizontal: 5,
    textAlign: 'rigth',
    borderRadius: 20,
    borderWidth: 1,
  },
  tamanioText: {
    fontSize: 12,
    textAlign: 'center',
    color: 'white',
  },
  viewSearch: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
    paddingRight: 10,
    padding: 0,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  viewSearchInput: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 5,
    borderRadius: 50,
    width: 240,
    padding: 5,
  },
  search: {
    height: 36,
    margin: 5,
    width: '79%',
    //borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    //backgroundColor: '#FFFFFF',
    color: '#a7a7a7',
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  btnCancel: {
    marginLeft: -1,
    marginTop: -6
  }
});
