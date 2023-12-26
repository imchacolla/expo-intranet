import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native';
import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Title from '../../components/Title';
import { SafeAreaView } from 'react-native-safe-area-context';
import _ from 'lodash';
//import axios and react-query
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {
  BACKGROUND_DARK,
  BACKGROUND_LIGHT,
  BACKGROUND_PRIMARY_DARK,
  BACKGROUND_PRIMARY_LIGHT,
  PRIMARY_TEXT_LIGHT,
  PRIMARY_COLOR,
  PRIMARY_TEXT_DARK,
} from '../../utils/constants';
import { MES, LINEAS, DIAS } from '../../utils/dataBilletaje';
import EchartBarHalfHour from '../../components/EchartBarHalfHour';
import EchartBarYear from '../../components/EchartBarYear';
import Select from '../../components/Select';
import SelectLine from '../../components/SelectLine';


const HalfHour = ({ navigation }) => {
  const [gestion, setGestion] = useState(new Date().getFullYear());
  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [linea, setLinea] = useState(0);
  const [dia, setDia] = useState(-1);
  const [color, setColor] = useState(PRIMARY_COLOR);
  const [dataYear, setDataYear] = useState([]);
  const [nameMonth, setNameMonth] = useState('');
  const [nameLine, setNameLine] = useState('Todas');
  const [nameDay, setNameDay] = useState('Todos');
  const dataYearFunction = () => {
    const data = [];
    for (i = new Date().getFullYear(); i >= 2014; i--) {
      data.push({ value: i, label: i.toString() });
    }
    setDataYear(data);
  };

  useMemo(() => dataYearFunction(), []);


  const setYearValue = value => {
    setGestion(value);
    if (value === 0) {
      setGestion(0);
    } else {
      const itemYear = _.find(dataYear, function (item) {
        return item.value === value;
      });
      //setNameYear(itemYear.value);
    }
  };
  const setMonthValue = value => {
    setMes(value);
    const itemMonth = _.find(MES, function (item) {
      return item.value === value;
    });
    setNameMonth(itemMonth.name);
  };

  const setDiaValue = value => {
    setDia(value);
    const itemDia = _.find(DIAS, function (item) {
      return item.value == value;
    });
    setNameDay(itemDia.label);
  };

  const setLineValue = value => {
    setLinea(value);
    const itemLine = _.find(LINEAS, function (item) {
      return item.id == value;
    });
    setColor(itemLine.color);
    setNameLine(itemLine.name);
  };


  useEffect(() => {
    //mes por defecto mes actual
    const itemMonth = _.find(MES, function (item) {
      return item.value === mes;
    });

    setNameMonth(itemMonth.name);
  }, [])
  const getData = async () => {
    const url = `/pasajeros/mediahora-app`;
    const response = await axios.post(url, {
      gestion,
      linea,
      mes,
      dia,
    });
    return response.data.data;
  };
  //get report from backend
  const queryReport = useQuery({
    queryKey: ['report', gestion, mes, linea, dia],
    queryFn: getData,
  });
  const getDataYear = async () => {
    const url = `/pasajeros/todo-gestion-app/${gestion}/${linea}`;
    const response = await axios.get(url);

    return response.data.data;
  };
  //get report from backend
  const queryReportYear = useQuery({
    queryKey: ['reportGestion', gestion, linea],
    queryFn: getDataYear,
  });
  const handlePressCalendar = () => {
    setShowCalendar(false);
  }
  const { isDarkMode } = useSelector(state => state.auth);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? BACKGROUND_DARK : BACKGROUND_LIGHT,
      }}
    >
      <View>
        <Title title={'Pasajeros'} navigation={navigation} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 10,
            marginTop: 2,
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
              width: 75,
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
          {gestion > 0 && (
            <View
              style={{
                width: 75,
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
                data={MES}
                isDarkMode={isDarkMode}
                setSelectValue={setMonthValue}
                value={mes}
              />
            </View>
          )}
          <View
            style={{
              width: 95,
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
              value={linea}
            />
          </View>
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
              Dia:
            </Text>
            <Select
              data={DIAS}
              isDarkMode={isDarkMode}
              setSelectValue={setDiaValue}
              value={dia}
            />
          </View>
        </View>

        {queryReport.isLoading || queryReportYear.isLoading ? (
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: Dimensions.get('screen').height / 2,
            width: '100%',
          }}>
            <ActivityIndicator size={'large'} color={PRIMARY_COLOR} />
          </View>
        ) : (
          <View>
            <View style={{
              borderColor: isDarkMode ? '#3D3D3D' : '#BBBBBB',
              borderWidth: 1,
              borderRadius: 10,
              marginTop: 10,
              marginHorizontal: 2,
              paddingVertical: 5
            }}>
              <Text style={{
                fontSize: 14,
                color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                marginHorizontal: 10,
                fontWeight: 'bold'
              }}>
                Media Hora
              </Text>
              <Text style={{
                fontSize: 12,
                color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                marginHorizontal: 10,
                fontWeight: '500'
              }}>
                Año: {gestion} / Mes: {nameMonth} / Linea: {nameLine} / Dia: {nameDay}
              </Text>
              <EchartBarHalfHour
                data={queryReport.data}
                color={color}
                isDarkMode={isDarkMode}
                colorChart={
                  isDarkMode ? BACKGROUND_PRIMARY_DARK : BACKGROUND_LIGHT
                }
                colorLabel={isDarkMode ? '#ccc' : PRIMARY_TEXT_LIGHT}
              />
            </View>

            <View style={{
              borderColor: isDarkMode ? '#3D3D3D' : '#BBBBBB',
              borderWidth: 1,
              borderRadius: 10,
              marginTop: 10,
              marginHorizontal: 2,
              paddingVertical: 5
            }}>
              <Text style={{
                fontSize: 14,
                color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                marginHorizontal: 10,
                fontWeight: 'bold'
              }}>
                Pasajeros año
              </Text>
              <Text style={{
                fontSize: 12,
                color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                marginHorizontal: 10,
                fontWeight: '500'
              }}>
                Año: {gestion} / Linea: {nameLine}
              </Text>
              <EchartBarYear
                data={queryReportYear.data}
                color={color}
                isDarkMode={isDarkMode}
                nameLine={nameLine}
                gestion={gestion}
                colorChart={
                  isDarkMode ? BACKGROUND_PRIMARY_DARK : BACKGROUND_LIGHT
                }
                colorLabel={isDarkMode ? '#ccc' : PRIMARY_TEXT_LIGHT}
              />
            </View>
          </View>
        )}

      </View>
    </SafeAreaView>
  );
};

export default HalfHour;

const styles = StyleSheet.create({});
