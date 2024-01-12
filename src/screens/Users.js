import React, { useEffect, useMemo, useCallback, useState, useRef } from 'react'
import {
  Alert,
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
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesing from 'react-native-vector-icons/AntDesign'
import { SafeAreaView } from 'react-native-safe-area-context'
import debounce from 'lodash/debounce'
import _ from 'lodash'
import axios from 'axios'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'

import Title from '../components/Title'
//import {SharedElement} from 'react-navigation-shared-element';
//CONSTANTS COLORS
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
  PRIMARY_TEXT_DARK_LIGHT,
} from '../utils/constants'
//import REACT REDUX
import { useDispatch, useSelector } from 'react-redux'
//import filter persson
import FilterPersons from '../components/FilterPersons'
import { FlashList } from '@shopify/flash-list'

const Users = ({ navigation }) => {
  const refTextInputSearch = React.createRef()
  const [refresh, setRefresh] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState([])
  const [filterData, setFilterData] = React.useState([])
  const [page, setPage] = React.useState(1)
  const [perPage, setPerPage] = React.useState(1000)
  const [q, setQ] = React.useState('')
  const [total, setTotal] = React.useState(0)
  const [checked, setChecked] = useState(true)
  const [indexTab, setIndexTab] = React.useState(0)
  const [gerencia, setGerencia] = React.useState('TODO')

  const { isDarkMode, user } = useSelector((state) => state.auth)
  const getData = async () => {
    setLoading(true)
    refTextInputSearch.current.clear()
    setQ('')
    setData([])
    setFilterData([])
    setGerencia('TODO')
    try {
      const response = await axios.get('rrhh/personal-app', {
        params: {
          q: '',
          page: 1,
          perPage: perPage,
          estado: indexTab ? 0 : 1,
        },
      })
      setData(response.data.data)
      setFilterData(response.data.data)
      setTotal(response.data.total)
    } catch (error) {
      Alert.alert('Error', 'Ocurrio un error al obtener datos')
      console.log(error)
      setLoading(false)
    }
    setLoading(false)
  }
  const onRefresh = () => {
    getData()
  }
  useEffect(() => {
    console.log('Datos del servidor')
    getData()
  }, [indexTab, isDarkMode])
  //busqueda
  useEffect(() => {
    setLoading(true)
    const searchData = _.filter(data, (item) => {
      if (gerencia === 'TODO') {
        return (
          item.nombre.toLowerCase().includes(q.toLowerCase()) ||
          item.ci.toLowerCase().includes(q.toLowerCase()) ||
          item.cargo.toLowerCase().includes(q.toLowerCase()) ||
          item.celular_per.toLowerCase().includes(q.toLowerCase())
        )
      } else {
        return (
          (item.nombre.toLowerCase().includes(q.toLowerCase()) ||
            item.ci.toLowerCase().includes(q.toLowerCase()) ||
            item.cargo.toLowerCase().includes(q.toLowerCase()) ||
            item.celular_per.toLowerCase().includes(q.toLowerCase())) &&
          item.sigla.toLowerCase() === gerencia.toLowerCase()
        )
      }
    })
    setLoading(false)
    console.log('cantidad encontrada:', searchData.length)
    setFilterData(searchData)
  }, [q, gerencia])

  const navigateToDetail = (item) => {
    navigation.push('Detail', { item })
  }
  const onEndReached = () => {
    if (page * perPage < total) {
      setPage(page + 1)
    }
    console.log('end reached')
  }

  const handleResetSearch = () => {
    setFilterData(data)
    setQ('')
    refTextInputSearch.current.clear()
  }

  const changeHandler = (q) => {
    setQ(q)
  }
  const footerList = () => {
    return <View style={{ height: 40 }} />
  }
  const debouncedChangeHandler = useCallback(debounce(changeHandler, 500), [])

  //Linking
  const handleCallPress = (celular) => {
    Linking.openURL(`tel:${celular}`)
  }

  //Linking Whatsapp
  const handleWhatsappPress = (celular) => {
    Linking.openURL(`whatsapp://send?phone=${celular}`)
  }

  //Linking Email
  const handleEmailPress = (email) => {
    Linking.openURL(`mailto:${email}`)
  }

  const scrollY = React.useRef(new Animated.Value(0)).current

  const ITEM_SIZE = 75
  const getItem = (data, index) => {
    return data[index]
  }
  //render persona
  const renderItem = ({ item, index }) => {
    const inputRange = [
      -1,
      0,
      index * (ITEM_SIZE + 8),
      (index + 2) * (ITEM_SIZE + 8),
    ]

    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0],
    })
    return (
      <BottomSheetModalProvider>
        <View
          style={{
            padding: 8,
            marginVertical: 2,
            backgroundColor: isDarkMode
              ? BACKGROUND_PRIMARY_DARK
              : BACKGROUND_PRIMARY_LIGHT,
            // transform: [{scale}],
            elevation: 1,
          }}
        >
          <TouchableOpacity
            onPress={() => navigateToDetail(item)}
            key={'person' + index}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: ITEM_SIZE,
              }}
            >
              <View style={styles.avatar}>
                <Image
                  source={{
                    uri: 'https://rrhh.miteleferico.bo/api/foto?c=' + item.ci,
                  }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    marginRight: 5,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  alignContent: 'space-between',
                  flex: 1,
                }}
              >
                <View style={styles.description}>
                  <Text
                    style={{
                      fontSize: 15,
                      textAlign: 'left',
                      fontWeight: 'bold',
                      color: isDarkMode
                        ? PRIMARY_TEXT_DARK
                        : PRIMARY_TEXT_LIGHT,
                    }}
                  >
                    {item.nombre}
                  </Text>

                  <Text
                    style={{
                      fontSize: 11,
                      //alignContent: 'flex-start',
                      textAlign: 'left',
                      fontWeight: '400',
                      color: isDarkMode
                        ? PRIMARY_TEXT_DARK
                        : PRIMARY_TEXT_LIGHT,
                    }}
                  >
                    {item.cargo.length > 35
                      ? item.cargo.substring(0, 35) + '...'
                      : item.cargo}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      textAlign: 'left',
                      color: isDarkMode
                        ? PRIMARY_TEXT_DARK
                        : PRIMARY_TEXT_LIGHT,
                    }}
                  >
                    {user.rol_app > 5 ? item.celular_per + '|' : ''}{' '}
                    {item.e_mail_inst}
                  </Text>
                  {indexTab == 0 ? null : (
                    <Text style={styles.baja}>
                      Fecha Baja: {item.fecha_baja}
                    </Text>
                  )}
                </View>
              </View>

              <View>
                <View style={styles.sigla}>
                  <Text style={styles.siglaText}>{item.sigla}</Text>
                </View>
                <Text
                  style={[
                    styles.interno,
                    {
                      color: isDarkMode
                        ? PRIMARY_TEXT_DARK
                        : PRIMARY_TEXT_LIGHT,
                    },
                  ]}
                >
                  {item.interno_inst}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',

              borderTopColor: isDarkMode ? BACKGROUND_DARK : BACKGROUND_LIGHT,
              borderTopWidth: 1,
              paddingHorizontal: 25,
              paddingTop: 4,
            }}
          >
            <TouchableOpacity
              onPress={() => handleCallPress(item.celular_per)}
              style={styles.button}
              key={'call' + index}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <AntDesing
                  name="phone"
                  size={16}
                  color={
                    isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT
                  }
                />
                <Text
                  style={{
                    color: isDarkMode
                      ? PRIMARY_TEXT_DARK_LIGHT
                      : PRIMARY_TEXT_LIGHT,
                    fontSize: 12,
                    fontWeight: '400',
                    margin: 2,
                  }}
                >
                  Llamar
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleWhatsappPress(item.celular_per)}
              style={styles.button}
              key={'whatspp' + index}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Ionicons
                  name="ios-logo-whatsapp"
                  size={16}
                  color={
                    isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT
                  }
                />
                <Text
                  style={{
                    color: isDarkMode
                      ? PRIMARY_TEXT_DARK_LIGHT
                      : PRIMARY_TEXT_LIGHT,
                    fontSize: 12,
                    fontWeight: '400',
                    margin: 2,
                  }}
                >
                  Escribir
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleEmailPress(item.e_mail_inst)}
              style={styles.button}
              key={'mail' + index}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Ionicons
                  name="ios-mail-outline"
                  size={16}
                  color={
                    isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT
                  }
                />
                <Text
                  style={{
                    color: isDarkMode
                      ? PRIMARY_TEXT_DARK_LIGHT
                      : PRIMARY_TEXT_LIGHT,
                    fontSize: 12,
                    fontWeight: '400',
                    margin: 2,
                  }}
                >
                  Enviar
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheetModalProvider>
    )
  }

  const listTab = [
    {
      status: 'Activo',
    },
  ]
  if (user.rol_app > 5) {
    listTab.push({
      status: 'Pasivo',
    })
  }
  const setIndexFilter = (index) => {
    setIndexTab(index)
  }
  //empty list
  const emptyView = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
          }}
        >
          No se encotraron datos
        </Text>
      </View>
    )
  }

  const bottomSheetRef = useRef(null)
  // variables
  const snapPoints = useMemo(() => ['30%', '40%', '55%'], [])
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present()
  }, [])

  const handleSetGerencia = (name) => {
    setGerencia(name)
  }
  return (
    <BottomSheetModalProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: isDarkMode ? BACKGROUND_DARK : BACKGROUND_LIGHT,
        }}
      >
        <View style={{ flex: 1 }}>
          <Title title="Personal" navigation={navigation} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'center',
              marginHorizontal: 5,
            }}
          >
            <View style={styles.listTab}>
              {listTab.map((t, index) => (
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={[
                    styles.btnTab,
                    indexTab === index && styles.btnTabActive,
                  ]}
                  key={'btn' + index}
                  onPress={() => setIndexFilter(index)}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '400',
                      color: isDarkMode
                        ? PRIMARY_TEXT_DARK
                        : indexTab == index
                        ? PRIMARY_TEXT_DARK
                        : PRIMARY_TEXT_LIGHT,
                    }}
                  >
                    {t.status}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                marginTop: 5,
                color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
              }}
            >
              Total: {filterData.length}/{total}
            </Text>
          </View>
          <View style={styles.viewSearch}>
            <View
              style={{
                height: 40,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginVertical: 10,
                backgroundColor: isDarkMode
                  ? BACKGROUND_PRIMARY_DARK
                  : BACKGROUND_PRIMARY_LIGHT,
                width: Dimensions.get('window').width - 80,
                padding: 10,
                borderRadius: 20,
              }}
            >
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
                <Pressable style={styles.btnCancel} onPress={handleResetSearch}>
                  <Ionicons
                    color={TERTIARY_COLOR}
                    name="close-circle-sharp"
                    size={28}
                  />

                  {/* <CancelIcon fill="#b9b9b9" />*/}
                </Pressable>
              ) : null}
            </View>
            <TouchableOpacity
              onPress={handlePresentModalPress}
              style={styles.button}
              key={'mail'}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 10,
                  borderRadius: 8,
                  backgroundColor: isDarkMode
                    ? BACKGROUND_PRIMARY_DARK
                    : '#FFFFFF',
                }}
              >
                <Ionicons
                  name="funnel"
                  size={16}
                  color={
                    gerencia != 'TODO'
                      ? PRIMARY_COLOR
                      : isDarkMode
                      ? PRIMARY_TEXT_DARK
                      : PRIMARY_TEXT_LIGHT
                  }
                />
              </View>
            </TouchableOpacity>
            {/*<Toggle checked={checked} onChange={onCheckedChange}>
          {`${checked ? 'Activo' : 'Pasivo'}`}: {total}
          </Toggle>*/}
          </View>

          {loading ? (
            <View style={styles.loader}>
              <ActivityIndicator
                size="large"
                color={PRIMARY_COLOR}
                style={styles.loader}
              />
            </View>
          ) : (
            <FlashList
              data={filterData}
              initialNumToRender={10}
              renderItem={({ item, index }) => renderItem({ item, index })}
              keyExtractor={(item) => item.id}
              getItemCount={(filterData) => filterData.length}
              onEndReached={onEndReached}
              getItem={getItem}
              ListFooterComponent={footerList}
              ListEmptyComponent={emptyView}
              refreshing={refresh}
              onRefresh={onRefresh}
              estimatedItemSize={1000}
              nativeID="list"
            />
          )}
        </View>
        <BottomSheetModal
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={{
            borderRadius: 20,

            borderWidth: 1,
            borderColor: isDarkMode
              ? BACKGROUND_PRIMARY_DARK
              : BACKGROUND_PRIMARY_LIGHT,
            backgroundColor: isDarkMode
              ? BACKGROUND_PRIMARY_DARK
              : BACKGROUND_PRIMARY_LIGHT,
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
            ]}
          >
            <FilterPersons
              handleSetGerencia={handleSetGerencia}
              selected={gerencia}
              bottomSheetRef={bottomSheetRef}
              isDarkMode={isDarkMode}
            />
          </View>
        </BottomSheetModal>
      </SafeAreaView>
    </BottomSheetModalProvider>
  )
}

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
  nombre: {},
  cargo: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 5,
  },
  celular: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 5,
  },
  sigla: {
    backgroundColor: PRIMARY_COLOR,
    color: '#efefef',
    padding: 4,
    width: 45,
    textAlign: 'center',
    borderRadius: 5,
  },
  siglaText: {
    fontSize: 10,
    color: '#efefef',
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
  btnSearch: {
    backgroundColor: 'transparent',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    marginLeftt: 10,
    padding: 0,
  },
  totalText: {
    fontSize: 10,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  description: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    minHeight: 85,
  },
  email: {
    fontSize: 12,
    fontWeight: '300',
    marginTop: 5,
    // color: PRIMARY_COLOR
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
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnCancel: {
    marginLeft: -16,
    marginTop: -6,
  },
  baja: {
    fontSize: 12,
    fontWeight: '400',
    color: '#C04545',
  },
  listTab: {
    //flex: 1,
    paddingBottom: 5,
    flexDirection: 'row',
    //alignSelf: 'center',
    //width: Dimensions.get ('window').width,
    justifyContent: 'flex-start',

    //backgroundColor: 'white',
  },
  btnTab: {
    width: Dimensions.get('window').width / 4,
    justifyContent: 'center',
    alignItems: 'center',
    //paddingBottom: 5,
    height: 30,
    borderBottomColor: 'white',
  },
  textTab: {
    fontSize: 16,
  },
  btnTabActive: {
    /* borderBottomColor: PRIMARY_COLOR,
    borderBottomWidth: 3, */
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 25,
  },
  button: {
    padding: 1,
  },
})

export default Users
