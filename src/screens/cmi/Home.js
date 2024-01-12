import React, { useState, useRef, useEffect, useCallback } from 'react'

import { SocketContext } from '../../contexts/SocketContext'
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

import Ionicons from 'react-native-vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context'
import _ from 'lodash'
//import axios and react-query
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
import { MESES, LINEAS } from '../../utils/dataBilletaje'

import Title from '../../components/Title'

//import components
import EchartBar from '../../components/EchartBar'
import EchartGauge from '../../components/EchartGauge'
import Select from '../../components/Select'
import SelectLine from '../../components/SelectLine'
import SocketHome from '../../components/SocketHome'
import SumPasajeros from '../../components/SumPasajeros'
import MeanPasajeros from '../../components/MeanPasajeros'
import MaxPasajeros from '../../components/MaxPasajeros'
import TableCumplimiento from '../../components/TableCumplimiento'
import EchartPie from '../../components/EchartPie'

const Home = ({ navigation }) => {
  const { ci, user, isDarkMode } = useSelector((state) => state.auth)
  const [refreshing, setRefreshing] = useState(false)
  const [year, setYear] = useState(0)
  const [month, setMonth] = useState(0)
  const [line, setLine] = useState(0)
  const [dataYear, setDataYear] = useState([])
  const [color, setColor] = useState(PRIMARY_COLOR)
  const [nameLine, setNameLine] = useState('Todas')
  const [nameYear, setNameYear] = useState('Todos')
  const [nameMonth, setNameMonth] = useState('Todos')
  const [uuid, setUuid] = useState(new Date())

  const onRefresh = React.useCallback(() => {
    setUuid(new Date())
    // wait(500).then(() => setRefreshing(false));
  }, [])

  const getReportAll = async () => {
    const url = '/billetaje/chart-bar'
    const response = await axios.post(url, {
      year,
      month,
      line,
    })
    return response.data.data
  }
  const getCumplimiento = async () => {
    const url = `/pasajeros/cumplimiento/${year}/${month}/${line}`
    const response = await axios.get(url)
    return response.data.data
  }
  const getPasajerosTipo = async () => {
    let gestion = year
    if (year === 0) {
      gestion = new Date().getFullYear()
    }
    const response = await axios.get(
      `/pasajeros/lineasgestiontipo-app/${gestion}/${line}`,
    )
    // console.log(response.data.data);
    return response.data.data
  }
  //get report from backend
  const queryReport = useQuery({
    queryKey: ['report', year, month, line, uuid],
    queryFn: getReportAll,
  })

  //get report from backend
  const queryCumplimiento = useQuery({
    queryKey: ['cumplimiento', year, month, line, uuid],
    queryFn: getCumplimiento,
  })

  const queryPasajerosTipo = useQuery({
    queryKey: ['tipo', year, line],
    queryFn: getPasajerosTipo,
  })

  const dataYearFunction = () => {
    const data = [
      {
        value: 0,
        label: 'Todos',
      },
    ]
    for (i = new Date().getFullYear(); i >= 2014; i--) {
      data.push({ value: i, label: i.toString() })
    }
    setDataYear(data)
  }
  const setYearValue = (value) => {
    setYear(value)
    if (value === 0) {
      setMonth(0)
      setNameYear('Todos')
    } else {
      const itemYear = _.find(dataYear, function (item) {
        return item.value === value
      })
      setNameYear(itemYear.value)
    }
  }
  const setMonthValue = (value) => {
    setMonth(value)
    const itemMonth = _.find(MESES, function (item) {
      return item.value === value
    })
    setNameMonth(itemMonth.name)
  }
  const setLineValue = (value) => {
    setLine(value)
    const itemLine = _.find(LINEAS, function (item) {
      return item.id == value
    })
    setColor(itemLine.color)
    setNameLine(itemLine.name)
  }
  useEffect(() => {
    dataYearFunction()
  }, [])

  const getMonthTitle = () => {
    if (month > 0) {
      return ' / Mes: ' + nameMonth
    }
  }
  const getMonthTitleCumplimiento = () => {
    if (month > 0) {
      return ' / Mes: ' + nameMonth
    } else {
      const mes = new Date().getMonth() + 1
      const itemMonth = _.find(MESES, function (item) {
        return item.value === mes
      })
      return ' / Mes: ' + itemMonth.name
    }
  }
  const getYearTitle = () => {
    if (year > 0) {
      return 'Año: ' + year
    } else {
      return 'Año: ' + new Date().getFullYear()
    }
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? BACKGROUND_DARK : BACKGROUND_LIGHT,
      }}
    >
      <Title title="" navigation={navigation} />
      <SocketHome />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
          marginTop: 5,
          marginBottom: 8,
          backgroundColor: isDarkMode
            ? BACKGROUND_PRIMARY_DARK
            : BACKGROUND_PRIMARY_LIGHT,
          paddingHorizontal: 10,
          paddingVertical: 2,
          borderRadius: 10,
        }}
      >
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
            Año:
          </Text>
          <Select
            data={dataYear}
            isDarkMode={isDarkMode}
            setSelectValue={setYearValue}
            value={year}
          />
        </View>
        {year > 0 && (
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
        )}
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
            Linea:
          </Text>
          <SelectLine
            data={LINEAS}
            isDarkMode={isDarkMode}
            setSelectValue={setLineValue}
            value={line}
          />
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {queryReport.isLoading ||
        queryPasajerosTipo.isLoading ||
        queryCumplimiento.isLoading ? (
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: Dimensions.get('screen').height / 2,
            }}
          >
            <ActivityIndicator size={'large'} color={PRIMARY_COLOR} />
          </View>
        ) : (
          <View>
            <View>
              <View
                style={{
                  borderColor: isDarkMode ? '#3D3D3D' : PRIMARY_COLOR,
                  borderWidth: 1,
                  borderRadius: 10,
                  marginHorizontal: 2,
                  paddingVertical: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                    marginHorizontal: 10,
                    fontWeight: 'bold',
                  }}
                >
                  Pasajeros
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                    marginHorizontal: 10,
                    fontWeight: '500',
                  }}
                >
                  Año: {nameYear} {getMonthTitle()} / Linea: {nameLine}
                </Text>

                <EchartBar
                  data={queryReport.data}
                  color={color}
                  colorChart={
                    isDarkMode ? BACKGROUND_PRIMARY_DARK : BACKGROUND_LIGHT
                  }
                  colorLabel={isDarkMode ? '#caf5ea' : '#D3D3D3'}
                  mes={month}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 20,
                    marginTop: 5,
                  }}
                >
                  <SumPasajeros
                    data={queryReport.data}
                    isDarkMode={isDarkMode}
                  />
                  <MeanPasajeros
                    data={queryReport.data}
                    isDarkMode={isDarkMode}
                  />
                  <MaxPasajeros
                    data={queryReport.data}
                    isDarkMode={isDarkMode}
                  />
                </View>
              </View>
              <View
                style={{
                  borderColor: isDarkMode ? '#3D3D3D' : PRIMARY_COLOR,
                  borderWidth: 1,
                  borderRadius: 10,
                  marginTop: 10,
                  marginHorizontal: 2,
                }}
              >
                <View
                  style={{
                    marginTop: 10,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    height: 250,
                    flexDirection: 'column',
                    /* backgroundColor: isDarkMode
                    ? BACKGROUND_PRIMARY_DARK
                    : BACKGROUND_PRIMARY_LIGHT, */
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: isDarkMode
                        ? PRIMARY_TEXT_DARK
                        : PRIMARY_TEXT_LIGHT,
                      marginHorizontal: 10,
                      fontWeight: 'bold',
                    }}
                  >
                    Cumplimiento
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: isDarkMode
                        ? PRIMARY_TEXT_DARK
                        : PRIMARY_TEXT_LIGHT,
                      marginHorizontal: 10,
                      fontWeight: '500',
                    }}
                  >
                    {getYearTitle()} {getMonthTitleCumplimiento()} / Linea:{' '}
                    {nameLine}
                  </Text>
                  <EchartGauge
                    isDarkMode={isDarkMode}
                    data={queryCumplimiento.data}
                  />
                </View>
                <TableCumplimiento
                  isDarkMode={isDarkMode}
                  data={queryCumplimiento.data}
                />
              </View>
              <View
                style={{
                  borderColor: isDarkMode ? '#3D3D3D' : PRIMARY_COLOR,
                  borderWidth: 1,
                  borderRadius: 10,
                  marginTop: 10,
                  marginHorizontal: 2,
                  paddingVertical: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                    marginHorizontal: 10,
                    fontWeight: 'bold',
                  }}
                >
                  Pasajeros/Tipo
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                    marginHorizontal: 10,
                    fontWeight: '500',
                  }}
                >
                  {getYearTitle()} / Linea: {nameLine})
                </Text>
                <EchartPie
                  data={queryPasajerosTipo.data}
                  isDarkMode={isDarkMode}
                />
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
})
