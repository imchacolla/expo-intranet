import React, {useEffect, useCallback, useState} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Pressable,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import debounce from 'lodash/debounce';
import _, {set} from 'lodash';
//import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import Title from '../components/Title';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../utils/constants';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Snackbar from 'react-native-snackbar';
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

const SigecScreen = ({navigation}) => {
  const DEFAULT_MESSAGE =
    'Si desea buscar documentos hágalo en la casilla buscar. debe ingresar 3 caracteres como minimo';
  const refTextInputSearch = React.createRef();
  const [refresh, onRefresh] = React.useState(false);
  const {isDarkMode} = useSelector(state => state.auth);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [q, setQ] = useState('');
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(
    DEFAULT_MESSAGE
  );

  const getData = async () => {
  
    if (q.length < 3) {
      console.log('aun no buscamos');
      setMessage(DEFAULT_MESSAGE);
      setData([]);
      setPage(1);
      return false;
    }
    setIsLoading(true);
    setMessage('');
    console.log('buscamos ');
    try {
      const response = await axios.post('/sigec/find', {
        q,
        page,
        perPage,
      });

      if (response.data.total < 1) {
        setData([]);
        setPage(1);
        setMessage('No se encontró resultados para: ' + q);
      } else {
        if(page===1){
          setData(response.data.data)
        }else{
        setData([...data, ...response.data.data]);
        //setFilterData(response.data.data);
      }
      setTotal(response.data.total);
      }
      //console.log(response.data.data);
    } catch (error) {
      //console.log (error);
      setData([]);
      setPage(1);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const navigateToDetail = item => {
    if(item.nur!=""){
      navigation.navigate('DetalleSigec', {item: item});
    }
    else {
      Alert.alert('Mensaje', 'El documento no tiene hora de ruta')
    }
  };
  const onEndReached = () => {
   
    if (page * perPage < total) {
      console.log('traer mas datos');
      setPage(page + 1);
      getData();
    } 
    // else {

    //     Snackbar.show({
    //       text: 'Es todo para: ' + q,
    //       duration: Snackbar.LENGTH_SHORT,
    //     });
    //   }
    
  };

  const handleResetSearch = () => {
    setData([]);
    setPage(1);
    setQ('');
    setTotal(0)
    refTextInputSearch.current.clear();
  };

  const changeHandler = q => {
    setPage(1);
    setData([]);
    setQ(q);
    getData();
  };
  //debounced find input
  const debouncedChangeHandler = useCallback(debounce(changeHandler, 900), []);

  useEffect(() => {
    setData([]);
    if(q.length>2){
      getData();
    }
  }, [q]);

  const renderLoader = () => {
    return isLoading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };
  const emptyView = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
            width: 300,
            alignSelf: 'center',
            textAlign: 'center',
            fontSize: 16,
          }}>
          {message}
        </Text>
      </View>
    );
  };
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => navigateToDetail(item)} key={item.id}>
        <View
          style={{
            flexDirection: 'column',
            //alignContent: 'center',
            //            elevation: 1,
            //borderRadius: 10,
            backgroundColor: isDarkMode
              ? BACKGROUND_PRIMARY_DARK
              : BACKGROUND_PRIMARY_LIGHT,
            padding: 5,
            marginBottom: 5,
            width: Dimensions.get('window').width,
          }}>
          <View
            style={{
              //alignItems: 'center',
              flexDirection: 'row',
              alignContent: 'space-between',
            }}>
            <View
              style={{
                alignSelf: 'flex-start',
                width: Dimensions.get('window').width - 120,
              }}>
              <Text
                style={{
                  color: isDarkMode ? 'white' : PRIMARY_TEXT_LIGHT,
                  fontWeight: 'bold',
                }}>
                {item.cite_original}
              </Text>
            </View>
            
              {item.nur.length ? (
                <View
                  style={{
                    //width: 120,
                    alignSelf: 'flex-end',
                    borderRadius: 20,
                    padding: 6,
                    textAlign: 'center',
                    alignSelf: 'center',
                    alignItems: 'center',
                    borderColor: isDarkMode ? '#ffffff' : PRIMARY_COLOR,
                    //backgroundColor: PRIMARY_COLOR,
                    borderWidth: 1,

                    marginBottom: 2,
                    //transform: [{rotate: '-90deg'}],
                  }}>
                  <Text
                    style={[
                      styles.estadoText,
                      {
                        color: isDarkMode ? '#ffffff' : PRIMARY_COLOR, 
                        //color: 'white',
                        fontSize: 12,
                        fontWeight: 'bold',
                      },
                    ]}>
                    {item.nur}
                  </Text>
                </View>
              ) : null}
          </View>
          <View style={styles.description}>
            <Text
              style={[
                {
                  color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                  marginBottom: 5,
                },
              ]}>
              {item.referencia}
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
              {item.nombre_remitente}
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
              {item.cargo_remitente}
            </Text>
            {item.institucion_remitente != null && (
              <Text
                style={[
                  styles.tipo,
                  {
                    color: isDarkMode
                      ? PRIMARY_TEXT_DARK_LIGHT
                      : PRIMARY_TEXT_LIGHT,
                    fontWeight: 'bold',
                  },
                ]}>
                {item.institucion_remitente}
              </Text>
            )}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignSelf: 'flex-end',
              }}>
              <IonIcons
                name="calendar-outline"
                size={16}
                color={
                  isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT
                }
              />
              <Text
                style={[
                  styles.hora,
                  {
                    color: isDarkMode
                      ? PRIMARY_TEXT_DARK_LIGHT
                      : PRIMARY_TEXT_LIGHT,
                    marginLeft: 2,
                  },
                ]}>
                {item.fecha}
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
      <View style={{flex: 1}}>
        <Title title="SIGEC" navigation={navigation} />
        <View style={styles.viewSearch} >
          <View
            style={{
              height: 40,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              margin:0,
              //marginBottom: 10,
              backgroundColor: isDarkMode
                ? BACKGROUND_PRIMARY_DARK
                : BACKGROUND_PRIMARY_LIGHT,
              width: Dimensions.get('window').width - 100,
              padding: 10,
              borderRadius:20,
            }}>
           <IonIcons color={TERTIARY_COLOR} name="search" size={20} />
            <TextInput
              ref={refTextInputSearch}
              style={styles.search}
              label="Buscar"
              placeholder="Hoja de ruta, cite, referencia..."
              //value={q}
              placeholderTextColor={'#9c9c9c'}
              onChangeText={debouncedChangeHandler}
            />
            {q.length > 0 ? (
              <Pressable style={styles.btnSearch} onPress={handleResetSearch}>
                <IonIcons name='close-circle' color={'#9c9c9c'} size={26} />
   
              </Pressable>
            ) : null}
            
          </View>
          {total>0&&(
          <Text
            style={[
              styles.totalText,
              {
                color: isDarkMode
                  ? PRIMARY_TEXT_DARK_LIGHT
                  : PRIMARY_TEXT_LIGHT,
              marginRight:10    
              },
            ]}>
            Total: {total}
          </Text>)}
        </View>

        {loading ? null : (
          <FlatList
            data={data}
            //initialNumToRender={10}
            //renderItem={({item, index}) => renderItem({item, index})}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            // getItemCount={data => data.length}
            onEndReached={onEndReached}
            // getItem={getItem}
            ListFooterComponent={renderLoader}
            ListEmptyComponent={emptyView}
            //refreshing={refresh}
            //onRefresh={getData}
            onEndReachedThreshold={0}
          />
        )}
        {loading ? (
          <ActivityIndicator size="large" style={styles.loader} />
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default SigecScreen;

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
    fontSize: 12,
    fontWeight: '500',
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
  

  estadoText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
  viewSearch: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent:'flex-start',
    paddingLeft: 10,
  },
  search: {
    height: 36,
    //margin: 5,
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
   // margin: 5,
    borderRadius: 25,
    width: '89%',
    //padding: 5,
  },

  btnSearch: {
    backgroundColor: 'transparent',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
   marginLeft: -9,
    padding: 0,
  },
  totalText: {
    fontSize: 11,
  },
  description: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: Dimensions.get('window').width - 15,
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
    fontSize: 11,
    fontWeight: '100',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
