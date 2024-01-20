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
} from '../../utils/constants'
import { MESES } from '../../utils/dataBilletaje'
import SocketParque from '../../components/SocketParque'
import Title from '../../components/Title'
import EchartVisitantesParque from '../../components/EchartVisitantesParque'
import EchartBarParque from '../../components/EchartBarParque'
import Select from '../../components/Select'
import EchartPieEdades from '../../components/EchartPieEdades'
import MaxPasajeros from '../../components/MaxPasajeros'
import SumPasajeros from '../../components/SumPasajeros'
import MeanPasajeros from '../../components/MeanPasajeros'
const HomeParque = ({ navigation }) => {
  const { ci, user, isDarkMode } = useSelector((state) => state.auth)
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
    const url = `/pasajeros/visitantes-gestion`
    const response = await axios.get(url)
    return response.data.data
  }
  const getVisitantes = async () => {
    const url = `/pasajeros/todo-parque-gestion/${gestion}/${month}`
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
    queryKey: ['visitantes', gestion, month, uuid],
    queryFn: getVisitantes,
  })
  const queryVisitantesGestion = useQuery({
    queryKey: ['visitantes-gestion', uuid],
    queryFn: getVisitantesGestion,
  })
  const queryVisitantesTipo = useQuery({
    queryKey: ['visitantes-tipo', gestion, month, uuid],
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
  const PALETTE = [
    '#673400ff',
    '#d8a674',
    '#e2c0a4',
    '#c7bd82',
    '#1c3532',
    '#212323',
  ]
  console.log(queryVisitantesTipo.data)
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? BACKGROUND_DARK : BACKGROUND_LIGHT,
      }}
    >
      <Title title="PCyMT" navigation={navigation} />

      <SocketParque />
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {queryVisitantesGestion.isSuccess && (
          <EchartBarParque
            data={queryVisitantesGestion.data}
            isDarkMode={isDarkMode}
            color={'#673400ff'}
            colorChart={'#d8a674'}
            colorLabel={'#f2f2f2'}
            borderColor={'#683C0Dff'}
          />
        )}
        <View
          style={{
            //width: Dimensions.get('screen').width - 10,
            //marginTop: 5,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: isDarkMode
              ? BACKGROUND_PRIMARY_DARK
              : BACKGROUND_PRIMARY_LIGHT,
            paddingHorizontal: 5,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Text
            style={{
              color: isDarkMode ? PRIMARY_TEXT_DARK : '#673400ff',
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
              backgroundColor: isDarkMode
                ? BACKGROUND_PRIMARY_DARK
                : BACKGROUND_PRIMARY_LIGHT,
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
                  color={'#673400ff'}
                  colorChart={'#F5C4AC'}
                  colorLabel={PRIMARY_COLOR}
                  gestion={gestion}
                  borderColor={'#683C0Dff'}
                />
              </>
            )}
          </View>
          <View
            style={{
              minHeight: 200,
              //backgroundColor: '#FDFDFD',
              //paddingHorizontal: 5,
              //borderRadius: 10,
            }}
          >
            {queryVisitantesTipo.isSuccess && (
              <EchartPieEdades
                isDarkMode={isDarkMode}
                data={queryVisitantesTipo.data}
                color={'#673400ff'}
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

export default HomeParque

const styles = StyleSheet.create({})
