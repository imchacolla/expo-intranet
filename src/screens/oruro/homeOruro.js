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
const HomeOruro = ({ navigation }) => {
  const { ci, user, isDarkMode } = useSelector((state) => state.auth)
  const [gestion, setGestion] = useState(new Date().getFullYear())
  const [dataYear, setDataYear] = useState([])
  const [month, setMonth] = useState(0)

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
    console.log(url)
    const response = await axios.get(url)
    return response.data.data
  }
  const getVisitantesTipoGestion = async () => {
    const url = `/pasajeros/visitantes-parque-app/${gestion}/${month}`
    console.log(url)

    const response = await axios.get(url)
    return response.data.data
  }
  const queryVisitantes = useQuery({
    queryKey: ['oruro', gestion, month],
    queryFn: getPasajeros,
  })
  const queryVisitantesGestion = useQuery({
    queryKey: ['oruro-gestion'],
    queryFn: getVisitantesGestion,
  })
  const queryVisitantesTipo = useQuery({
    queryKey: ['oruro-tipo', gestion, month],
    queryFn: getVisitantesTipoGestion,
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
  console.log(queryVisitantesTipo.data)
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? BACKGROUND_DARK : BACKGROUND_LIGHT,
      }}
    >
      <Title title="Teleférico Turistico Oruro" navigation={navigation} />
      <SocketOruro />
      <ScrollView style={{ flex: 1 }}>
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
              color={'#C8C8C8'}
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
              minHeight: 200,
            }}
          >
            {queryVisitantesTipo.isSuccess && (
              <EchartPieOruro
                isDarkMode={isDarkMode}
                data={queryVisitantesTipo.data}
                color={'#6a503f'}
                colorChart={'#d8a674'}
                colorLabel={PRIMARY_COLOR}
                gestion={gestion}
                palette={PALETTE}
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
