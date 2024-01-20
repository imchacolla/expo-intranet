import React, { useState, useRef, useEffect, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
  RefreshControl,
  ScrollView,
  Platform,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import {
  PRIMARY_COLOR,
  BACKGROUND_DARK,
  BACKGROUND_LIGHT,
  PRIMARY_TEXT_DARK,
  BACKGROUND_PRIMARY_DARK,
  PRIMARY_TEXT_LIGHT,
  BACKGROUND_PRIMARY_LIGHT,
  BACKGROUND_ORURO,
} from '../../utils/constants'
import { MESES } from '../../utils/dataBilletaje'
import SocketOruro from '../../components/SocketOruro'
import Title from '../../components/Title'
import EchartVisitantesParque from '../../components/EchartVisitantesParque'
import EchartBarParque from '../../components/EchartBarParque'
import Select from '../../components/Select'
import EchartPieOruro from '../../components/EchartPieOruro'
import MaxPasajeros from '../../components/MaxPasajeros'
import SumPasajeros from '../../components/SumPasajeros'
import MeanPasajeros from '../../components/MeanPasajeros'
import EchartBarIngresos from '../../components/EchartBarIngresos'
const HomeOruro = ({ navigation }) => {
  const isDarkMode = useSelector((state) => state.auth.isDarkMode)
  const [gestion, setGestion] = useState(new Date().getFullYear())
  const [dataYear, setDataYear] = useState([])
  const [month, setMonth] = useState(0)
  const [refreshing, setRefreshing] = useState(false)

  const [uuid, setUuid] = useState(new Date())

  const onRefresh = React.useCallback(() => {
    setUuid(new Date())
    // wait(500).then(() => setRefreshing(false));
  }, [])
  const dataYearFunction = () => {
    const data = []
    for (i = new Date().getFullYear(); i >= 2021; i--) {
      data.push({ value: i, label: i.toString() })
    }
    setDataYear(data)
  }
  useEffect(() => {
    dataYearFunction()
  }, [])

  const getVisitantesGestion = async () => {
    const url = `/pasajeros/oruro-gestion`
    const response = await axios.get(url)
    return response.data.data
  }
  const getPasajeros = async () => {
    const url = `/pasajeros/oruro/${gestion}/${month}`
    //console.log(url)
    const response = await axios.get(url)
    return response.data.data
  }

  const getIngresoMeses = async () => {
    const response = await axios.get(`/ingresos/mes-oruro-app/${gestion}`)
    console.log('ingresos', response.data)
    return response.data.data
  }
  const queryVisitantes = useQuery({
    queryKey: ['oruro', gestion, month, uuid],
    queryFn: getPasajeros,
  })
  const queryVisitantesGestion = useQuery({
    queryKey: ['oruro-gestion', uuid],
    queryFn: getVisitantesGestion,
  })

  const queryIngresosMeses = useQuery({
    queryKey: ['ingresos-mes-oruro', gestion, uuid],
    queryFn: getIngresoMeses,
  })

  const setYearValue = (value) => {
    setGestion(value)
    setMonth(0)
  }
  const setMonthValue = (value) => {
    setMonth(value)
    // const itemMonth = _.find(MESES, function (item) {
    //   return item.value === value
    // })
    //setNameMonth(itemMonth.name)
  }
  const PALETTE = [BACKGROUND_ORURO, '#7b1810', '#604d4a', '#db383c', '#e8e9e9']
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? BACKGROUND_DARK : BACKGROUND_LIGHT,
      }}
    >
      <Title title="Teleférico Turístico Oruro" navigation={navigation} />
      <SocketOruro />
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={{
            backgroundColor: BACKGROUND_ORURO,
            minHeight: 230,
            borderRadius: 20,
            paddingTop: Platform.OS === 'android' ? 0 : 40,
            marginHorizontal: 5,
          }}
        >
          {queryVisitantesGestion.isSuccess && (
            <EchartBarParque
              data={queryVisitantesGestion.data}
              isDarkMode={isDarkMode}
              color={'#D2BCC3'}
              colorChart={'#F9F6F5'}
              colorLabel={'#4f0509'}
              borderColor={'#9A7676'}
            />
          )}
        </View>

        <View
          style={{
            //width: Dimensions.get('screen').width - 10,
            //marginTop: 5,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            // backgroundColor: isDarkMode
            //   ? BACKGROUND_PRIMARY_DARK
            //   : BACKGROUND_PRIMARY_LIGHT,
            paddingHorizontal: 5,
            // borderTopLeftRadius: 20,
            // borderTopRightRadius: 20,
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Text
            style={{
              color: isDarkMode ? PRIMARY_TEXT_DARK : BACKGROUND_ORURO,
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Visitantes
          </Text>

          <View
            style={{
              width: 100,
            }}
          >
            <Text
              style={{
                fontSize: 10,
                color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
              }}
            >
              Año:
            </Text>
            <Select
              data={dataYear}
              isDarkMode={isDarkMode}
              setSelectValue={setYearValue}
              value={gestion}
            />
          </View>
          <View
            style={{
              width: 90,
            }}
          >
            <Text
              style={{
                fontSize: 10,
                color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
              }}
            >
              Mes:
            </Text>
            <Select
              data={MESES}
              isDarkMode={isDarkMode}
              setSelectValue={setMonthValue}
              value={month}
            />
          </View>
        </View>

        <View
          style={
            {
              // paddingHorizontal: 5,
            }
          }
        >
          <View
            style={{
              paddingHorizontal: 5,
              minHeight: 200,
              //borderRadius: 10,
            }}
          >
            {queryVisitantes.isSuccess && (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 5,
                  }}
                >
                  <SumPasajeros
                    data={queryVisitantes.data}
                    isDarkMode={isDarkMode}
                  />
                  <MeanPasajeros
                    data={queryVisitantes.data}
                    isDarkMode={isDarkMode}
                  />
                  <MaxPasajeros
                    data={queryVisitantes.data}
                    isDarkMode={isDarkMode}
                  />
                </View>
                <EchartVisitantesParque
                  isDarkMode={isDarkMode}
                  data={queryVisitantes.data}
                  color={BACKGROUND_ORURO}
                  colorChart={'#7b1810'}
                  colorLabel={PRIMARY_COLOR}
                  gestion={gestion}
                  borderColor={'#9A7676'}
                />
              </>
            )}
          </View>
          <View
            style={{
              paddingHorizontal: 5,
            }}
          >
            <Text
              style={{
                color: isDarkMode ? PRIMARY_TEXT_DARK : BACKGROUND_ORURO,
                fontSize: 20,
                fontWeight: 'bold',
              }}
            >
              Ingresos Bs.
            </Text>
          </View>
          <View
            style={{
              minHeight: 200,
            }}
          >
            {queryIngresosMeses.isSuccess && (
              <EchartBarIngresos
                data={queryIngresosMeses.data}
                isDarkMode={isDarkMode}
                color={BACKGROUND_ORURO}
                colorChart={
                  isDarkMode ? BACKGROUND_PRIMARY_DARK : BACKGROUND_LIGHT
                }
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeOruro

const styles = StyleSheet.create({})
