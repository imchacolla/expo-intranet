import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
  Dimensions,
  ActivityIndicator,
  Pressable,
  Text,
  Alert,
  RefreshControl,
  ScrollView,
  StatusBar,
} from 'react-native'

import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import Title from '../components/Title'
import AntDesign from 'react-native-vector-icons/AntDesign'
//import { Modalize } from 'react-native-modalize';
//import { RenderHtml} from '../components/RenderPage';
import {
  PRIMARY_COLOR,
  BACKGROUND_DARK,
  BACKGROUND_LIGHT,
  PRIMARY_TEXT_DARK,
  BACKGROUND_PRIMARY_DARK,
  PRIMARY_TEXT_DARK_LIGHT,
  PRIMARY_TEXT_LIGHT,
  BACKGROUND_PRIMARY_LIGHT,
} from '../utils/constants'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import { SafeAreaView } from 'react-native-safe-area-context'
import CarouselHome from '../components/CarouselHome'
import ListVacations from '../components/ListVacations'
import EchartPersonal from '../components/EchartPersonal'
import EchartPie from '../components/EchartPieEdades'
const { width, height } = Dimensions.get('screen')
const SPACING = 5
//const ITEM_SIZE = width * 0.38;
const ITEM_SIZE = 120
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2
const GESTION = new Date().getFullYear()
const HomeScreen = ({ navigation }) => {
  const ci = useSelector((state) => state.auth.ci)
  const isDarkMode = useSelector((state) => state.auth.isDarkMode)
  const [pause, setPause] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState(null)
  const [birthdays, setBirthdays] = useState([])
  const [totalVacations, setTotalVacations] = useState(0)
  const [nextVacation, setNextVacation] = useState(null)
  const [totalProgramado, setTotalProgramado] = useState(0)
  const [vacations, setVacations] = useState([])
  const [personal, setPersonal] = useState(null)
  const [edades, setEdades] = useState(null)
  const [listaVacaciones, setListaVacaciones] = useState([])
  const [indexTab, setIndexTab] = useState(0)
  //show modal
  const [refreshing, setRefreshing] = useState(false)

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout))
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    getVacations()
    getBirtdays()
    getNextVacation()
    getData()
    getChart()
    getEdades()
    wait(500).then(() => setRefreshing(false))
  }, [])

  //datos del usuario
  const getData = async () => {
    setIsLoading(true)
    const response = await axios.get('/auth/info')
    setData(response.data.data)
    setTotalVacations(response.data.vacation)
    setIsLoading(false)
    //console.log (response.data.data);
  }

  //optonet record pasajeros
  const getRecords = async () => {
    const response = await axios.get('/pasajeros/records')
    setPersonal(response.data.data)
  }

  //proxmimos cumpleañeros

  const getVacations = async () => {
    const response = await axios.get('/rrhh/vacations-programed-app')
    setVacations(response.data.data)
    setTotalProgramado(response.data.total)
    //console.log('vacations', response.data)
    return response.data.data
  }

  const getBirtdays = async () => {
    const response = await axios.get('/rrhh/birthdays')
    setBirthdays(response.data.data)
    return response.data.data
  }

  const getChart = async () => {
    const response = await axios.get('/rrhh/person-chart')
    //console.log(response.data.data)
    setPersonal(response.data.data)
  }
  const getEdades = async () => {
    const response = await axios.get('/rrhh/edades-chart')
    //console.log(response.data.data)
    setEdades(response.data.data)
  }

  const getNextVacation = async () => {
    const response = await axios.get('/rrhh/next-vacation')
    //console.log(response.data.data)
    setNextVacation(response.data.data)
    setRefreshing(false)
  }

  const getPasajeros = async () => {
    try {
      const response = await axios.get('/pasajeros/gestioneslinea/0')
      const datos = response.data.data.map((p) => {
        return {
          value: p.cantidad / 1000000,
          label: p.gestion,
          topLabelComponent: () => (
            <Text
              style={{
                color: isDarkMode ? '#cccccc' : '#333',
                fontSize: 10,
                marginBottom: 6,
              }}
            >
              {(p.cantidad / 1000000).toFixed(1)}
            </Text>
          ),
        }
      })

      //setPasajeros(datos)
    } catch (error) {}
  }
  const renderHtml = () => {
    navigation.push('html')
  }
  const customLabel = (val) => {
    return (
      <View style={{ width: 70, marginLeft: 7 }}>
        <Text
          style={{
            color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
            fontWeight: 'bold',
            //transform: [{rotateZ: '-45deg'}],
            fontSize: 10,
            marginLeft: -6,
          }}
        >
          {val}
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
  const getVacationsLista = async () => {
    try {
      const response = await axios.get(`/rrhh/vacations`)
      const data = response.data.data
      setListaVacaciones(data)
      // console.log('data', data)

      //const total = _.sumBy(data, 'total_dias')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
    getVacations()
    getBirtdays()
    getVacationsLista()

    getNextVacation()
    getChart()
    getEdades()
  }, [])

  //Modal
  const deviceWidth = Dimensions.get('screen').width
  const deviceHeight = Dimensions.get('screen').height

  const scrollX = React.useRef(new Animated.Value(0)).current
  //const scrollX = new Animated.Value (0);
  if (isLoading) {
    return <ActivityIndicator color={PRIMARY_COLOR} />
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? BACKGROUND_DARK : BACKGROUND_LIGHT,
      }}
    >
      <BottomSheetModalProvider>
        <Title title="Inicio" navigation={navigation} />

        <View
          style={{
            width: width - 10,
            minHeight: 125,
            backgroundColor: isDarkMode
              ? BACKGROUND_PRIMARY_DARK
              : BACKGROUND_PRIMARY_LIGHT,

            marginBottom: 5,
            marginHorizontal: 5,
            paddingHorizontal: 5,
            borderRadius: 10,
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={{
                uri: 'https://rrhh.miteleferico.bo/api/foto?c=' + ci,
              }}
              style={{
                marginVertical: 10,
                marginHorizontal: 5,
                width: 60,
                height: 60,
                borderRadius: 30,
              }}
            />
            <View style={{ marginTop: 5 }}>
              <Text
                style={[
                  styles.nombre,
                  {
                    color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                  },
                ]}
              >
                {data.nombres}
              </Text>
              <Text
                style={[
                  styles.apellido,
                  {
                    color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                  },
                ]}
              >
                {data.apellidos}
              </Text>
              <Text
                style={[
                  styles.cargo,
                  {
                    color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                  },
                ]}
              >
                {data.cargo}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderTopWidth: 1,
              borderTopColor: PRIMARY_COLOR,
              marginTop: 8,
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={[
                  styles.vacations,
                  {
                    color: isDarkMode ? '#f2f2f2' : '#333',
                  },
                ]}
              >
                {totalVacations}
              </Text>
              <Text
                style={[
                  styles.descriptionVacation,
                  {
                    color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : '#666',
                  },
                ]}
              >
                Días de vacación disponible
              </Text>
            </View>
            {totalProgramado > 0 && (
              <TouchableOpacity onPress={() => handlePresentModalPress()}>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={[
                      styles.vacations,
                      {
                        color: isDarkMode ? '#f2f2f2' : '#333',
                      },
                    ]}
                  >
                    {totalProgramado}
                  </Text>
                  <Text
                    style={[
                      styles.descriptionVacation,
                      {
                        color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : '#666',
                      },
                    ]}
                  >
                    Días programados gestion: {GESTION}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View
            style={{
              justifyContent: 'flex-start',
              flexDirection: 'row',

              alignContent: 'center',
            }}
          >
            <Text
              style={[
                styles.subtitle,
                {
                  color: isDarkMode ? '#b2b2b2' : PRIMARY_TEXT_LIGHT,
                },
              ]}
            >
              Próximos cumpleaños
            </Text>
          </View>
          {birthdays && (
            <Animated.FlatList
              data={birthdays}
              horizontal
              initialScrollIndex={0}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={
                {
                  //alignItems: 'center',
                }
              }
              decelerationRate={0}
              bounces={false}
              keyExtractor={(item, index) => index.toString()}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true },
              )}
              snapToInterval={ITEM_SIZE}
              scrollEventThrottle={16}
              renderItem={({ item, index }) => {
                const inputRange = [
                  (index - 1) * ITEM_SIZE,
                  index * ITEM_SIZE,
                  (index + 1) * ITEM_SIZE,
                ]
                const opacity = scrollX.interpolate({
                  inputRange,
                  outputRange: [1, 1, 0.5],
                })
                const translateY = scrollX.interpolate({
                  inputRange,
                  outputRange: [0, 0, 50],
                })
                const scale = scrollX.interpolate({
                  inputRange,
                  outputRange: [1, 1, 0.5],
                })

                return (
                  <View style={{ width: ITEM_SIZE }}>
                    <Animated.View
                      style={{
                        opacity,
                        transform: [{ scale }],
                        elevation: 1,
                        //scale,
                      }}
                    >
                      <View
                        style={{
                          marginHorizontal: SPACING,
                          //padding: SPACING * 2,
                          paddingVertical: SPACING * 2,
                          paddingHorizontal: 2,
                          alignItems: 'center',
                          backgroundColor: isDarkMode
                            ? BACKGROUND_PRIMARY_DARK
                            : BACKGROUND_PRIMARY_LIGHT,
                          borderRadius: 10,
                          minHeight: 120,
                        }}
                      >
                        <Image
                          source={{
                            uri:
                              'https://rrhh.miteleferico.bo/api/foto?c=' +
                              item.ci,
                            //+ '&w=500',
                          }}
                          style={{
                            width: 70,
                            height: 70,
                            borderTopRightRadius: 35,
                            borderBottomRightRadius: 35,
                            borderBottomLeftRadius: 35,
                          }}
                        />
                        <View style={styles.description}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: '400',
                              marginLeft: 3,
                              color: isDarkMode
                                ? PRIMARY_TEXT_DARK
                                : PRIMARY_TEXT_LIGHT,
                            }}
                          >
                            {item.nombre}
                          </Text>
                          <View style={styles.itemFecha}>
                            <Text
                              style={[
                                styles.textFecha,
                                {
                                  color: isDarkMode ? '#f2f2f2' : '#333',
                                },
                              ]}
                            >
                              {item.fecha}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </Animated.View>
                  </View>
                )
              }}
            />
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 5,
              marginTop: 8,
            }}
          >
            <View>
              <Text
                style={{
                  color: isDarkMode ? '#b2b2b2' : PRIMARY_TEXT_LIGHT,
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
              >
                Estadísticas
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => setIndexTab(0)}
                style={{
                  backgroundColor:
                    indexTab === 0 ? PRIMARY_COLOR : 'transparent',
                  paddingHorizontal: 5,
                  paddingVertical: 1,
                  borderRadius: 15,
                  marginRight: 5,
                  width: 65,
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    color:
                      indexTab === 0
                        ? '#f2f2f2'
                        : isDarkMode
                        ? '#f2f2f2'
                        : '#333',
                  }}
                >
                  Genero
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIndexTab(1)}
                style={{
                  backgroundColor:
                    indexTab === 1 ? PRIMARY_COLOR : 'transparent',

                  paddingHorizontal: 5,
                  paddingVertical: 1,
                  borderRadius: 15,
                  width: 65,
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    color:
                      indexTab === 1
                        ? '#f2f2f2'
                        : isDarkMode
                        ? '#f2f2f2'
                        : '#333',
                  }}
                >
                  Edad
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              width: Dimensions.get('screen').width - 10,
              marginHorizontal: 5,
              marginTop: 10,
              borderRadius: 10,
              backgroundColor: isDarkMode
                ? BACKGROUND_PRIMARY_DARK
                : BACKGROUND_PRIMARY_LIGHT,
              height: 190,
            }}
          >
            {personal && indexTab === 0 && (
              <EchartPersonal
                data={personal}
                isDarkMode={isDarkMode}
                color={PRIMARY_COLOR}
                mes={3}
                colorChart={PRIMARY_COLOR}
                colorLabel={PRIMARY_COLOR}
              />
            )}
            {edades && indexTab === 1 && (
              <EchartPie data={edades} isDarkMode={isDarkMode} />
            )}
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginTop: 5,
              alignContent: 'center',
              marginRight: 5,
            }}
          >
            <Text
              style={[
                styles.subtitle,
                {
                  color: isDarkMode ? '#b2b2b2' : PRIMARY_TEXT_LIGHT,
                },
              ]}
            >
              Comunicados
            </Text>
            <TouchableOpacity
              onPress={() => {
                setPause(!pause)
              }}
            >
              <AntDesign
                name={pause ? 'pausecircle' : 'caretright'}
                size={24}
                color={PRIMARY_COLOR}
              />
            </TouchableOpacity>
          </View>
          <View>
            <CarouselHome
              navigation={navigation}
              pause={pause}
              loading={isLoading}
            />
          </View>
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
            ]}
          >
            <ListVacations vacations={vacations} isDarkMode={isDarkMode} />
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    //backgroundColor: PRIMARY_COLOR,
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  nombre: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 5,
    color: 'white',
    //color: TERTIARY_COLOR,
  },
  apellido: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 5,
    marginTop: -5,
    color: 'white',
    //fontWeight: 'bold',

    //color: TERTIARY_COLOR,
  },
  cargo: {
    fontSize: 10,
    fontWeight: '500',
    marginLeft: 5,
    maxWidth: 300,
    color: '#fff',
  },
  vacations: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 0,

    marginBottom: 0,
  },
  descriptionVacation: {
    fontSize: 12,
    //color: PRIMARY_COLOR,
    width: 110,
    marginLeft: 5,
    marginTop: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    //marginBottom: 5,
    marginLeft: 5,
  },
  description: {
    marginTop: 5,
    //marginBottom: 5,
    flexDirection: 'column',
    //alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingBottom: 1,
  },
  itemNombre: {
    // color: TERTIARY_COLOR,
  },
  item: {
    marginHorizontal: 10,
    padding: 5,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 16,
  },
  itemFecha: {
    // marginTop: 5,
    //backgroundColor: '#EFEFEF',
    paddingHorizontal: 10,
    padding: 4,
    borderTopWidth: 1,
    borderTopColor: PRIMARY_COLOR,
    //paddingTop: 5,
  },
  textFecha: {
    fontSize: 14,
    //color: '#777',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  modalView: {
    // borderColor: '#666',
    // borderWidth: 1,
    margin: 10,
    // borderRadius: 10,
    padding: 10,
    //alignItems: 'center',
    // shadowColor: '#333333',
    /* shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, */
  },
  button: {
    borderRadius: 20,
    padding: 8,
    elevation: 2,
    width: 150,
    marginTop: 20,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: PRIMARY_COLOR,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
  },
  scrollView: {
    marginVertical: 1,
    //backgroundColor: 'pink',
    // alignItems: 'center',
    //justifyContent: 'center',
  },
})

export default HomeScreen
