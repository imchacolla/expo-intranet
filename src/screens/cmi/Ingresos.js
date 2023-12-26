import React, {
    useState,
    useEffect,
} from 'react';

import {
    View,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    Text,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import { SafeAreaView } from 'react-native-safe-area-context';
import _ from 'lodash';
//import axios and react-query
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {
    PRIMARY_COLOR,
    BACKGROUND_DARK,
    BACKGROUND_LIGHT,
    PRIMARY_TEXT_DARK,
    BACKGROUND_PRIMARY_DARK,
    PRIMARY_TEXT_LIGHT,
    BACKGROUND_PRIMARY_LIGHT,

} from '../../utils/constants';

import { MES, LINEAS } from '../../utils/dataBilletaje';

import Title from '../../components/Title';
import Select from '../../components/Select';
import SelectLine from '../../components/SelectLine';

//import components
import IngresosTipo from '../../components/IngresosTipo';
import EchartBarIngresos from '../../components/EchartBarIngresos';
const Ingresos = ({ navigation }) => {
    const { ci, user, isDarkMode } = useSelector(state => state.auth);
    const [color, setColor] = useState(PRIMARY_COLOR);

    const [year, setYear] = useState(new Date().getFullYear());
    const [linea, setLinea] = useState(0);
    const [dataYear, setDataYear] = useState([]);
    const [nameLine, setNameLine] = useState('Todas');

    //year data 
    const dataYearFunction = () => {
        const data = [];
        for (i = new Date().getFullYear(); i >= 2014; i--) {
            data.push({ value: i, label: i.toString() });
        }
        setDataYear(data);
    };
    useEffect(() => {
        dataYearFunction();
    }, []);

    //functions api rest
    const getIngresosTipo = async () => {
        const response = await axios.get(`/ingresos/tipo-app/${year}/${linea}`)
        return response.data.data
    }
    const queryIngresosTipo = useQuery({
        queryKey: ['ingresos-tipo', year, linea],
        queryFn: getIngresosTipo,
    })
    const getIngresoMeses = async () => {
        const response = await axios.get(`/ingresos/mes-app/${year}/${linea}`)
        console.log(response.data.data)
        return response.data.data
    }
    const queryIngresosMeses = useQuery({
        queryKey: ['ingresos-mes', year, linea],
        queryFn: getIngresoMeses,
    })


    const setYearValue = value => {
        setYear(value);
        if (value === 0) {
            setYear(0);
        } else {
            const itemYear = _.find(dataYear, function (item) {
                return item.value === value;
            });
            //setNameYear(itemYear.value);
        }
    };
    const setLineValue = value => {
        setLinea(value);
        const itemLine = _.find(LINEAS, function (item) {
            return item.id == value;
        });
        setColor(itemLine.color);
        setNameLine(itemLine.name);
    };



    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: isDarkMode ? BACKGROUND_DARK : BACKGROUND_LIGHT,
            }}>
            <Title title="Ingresos" navigation={navigation} />
            <View>
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
                        paddingHorizontal: 20,
                        paddingVertical: 2,
                        borderRadius: 10,
                    }}
                >

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
                            value={year}
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
                            Linea:
                        </Text>
                        <SelectLine
                            data={LINEAS}
                            isDarkMode={isDarkMode}
                            setSelectValue={setLineValue}
                            value={linea}
                        />
                    </View>

                </View>
                {queryIngresosMeses.isLoading || queryIngresosTipo.isLoading ? (
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: Dimensions.get('screen').height / 2
                    }}>

                        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
                    </View>
                ) : (
                    <View>
                        <EchartBarIngresos data={queryIngresosMeses.data} isDarkMode={isDarkMode}
                            color={color}
                            colorChart={
                                isDarkMode ? BACKGROUND_PRIMARY_DARK : BACKGROUND_LIGHT
                            }
                        />
                        <IngresosTipo data={queryIngresosTipo.data} isDarkMode={isDarkMode} />
                    </View>
                )}
            </View>
        </SafeAreaView>
    )
}

export default Ingresos

const styles = StyleSheet.create({})