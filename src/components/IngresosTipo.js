import React, {
    useState,
    useRef,
    useEffect,
    useCallback,
} from 'react';

import {
    View,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    Text,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
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

} from '../utils/constants';

const IngresosTipo = ({ isDarkMode, data }) => {
    //sumar monto de campo data que se encuentra en la columna monto con lodash
    const montoTotal = _.sumBy(data, function (o) {
        return parseInt(o.monto);
    });
    return (

        <View>
            <View
                style={{
                    flexDirection: 'column',
                    //marginHorizontal: 10,
                    //  backgroundColor: isDarkMode ? BACKGROUND_PRIMARY_DARK : BACKGROUND_PRIMARY_LIGHT,
                    borderRadius: 5,
                    marginTop: 20,
                }}
            >
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    backgroundColor: isDarkMode ? BACKGROUND_PRIMARY_DARK : "#ddd",
                    /* borderBottomColor: isDarkMode ? "#444" : "#DDD",
                    borderBottomWidth: 1, */
                }}>
                    <View>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                        }}>Tipo ingreso</Text>
                    </View>
                    <View>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                        }}>Cantidad</Text>
                    </View>
                    <View>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                        }}>Monto (Bs)</Text>

                    </View>
                </View>
                {data?.map((item, index) => (
                    <View
                        key={index}
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginHorizontal: 10,
                            paddingVertical: 5,
                            //backgroundColor: isDarkMode ? BACKGROUND_PRIMARY_DARK : BACKGROUND_PRIMARY_LIGHT,
                            borderBottomColor: isDarkMode ? "#3d3d3d" : "#DDD",
                            borderBottomWidth: 1,
                        }}>
                        <View style={{
                            width: Dimensions.get('screen').width / 3 - 8,

                        }}>
                            <Text style={{
                                fontSize: 14,
                                color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                            }}>{item.tipo_ingreso}</Text>
                        </View>
                        <View
                            style={{
                                width: Dimensions.get('screen').width / 3 - 8,
                                alignContent: 'flex-end',
                                alignItems: 'flex-end'
                            }}
                        >
                            <Text style={{
                                fontSize: 14,
                                color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,

                            }}>{new Intl.NumberFormat('es-ES').format(
                                _.round(item.cantidad, 0),
                            )}</Text>
                        </View>
                        <View style={{
                            width: Dimensions.get('screen').width / 3 - 8,
                            alignContent: 'flex-end',
                            alignItems: 'flex-end'
                        }}>
                            <Text style={{
                                fontSize: 14,
                                color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                            }}>{new Intl.NumberFormat('es-ES').format(
                                _.round(item.monto, 0),
                            )}</Text>

                        </View>
                    </View>
                ))
                }
                <View

                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        //backgroundColor: isDarkMode ? BACKGROUND_PRIMARY_DARK : BACKGROUND_PRIMARY_LIGHT,                        

                    }}>
                    <View style={{
                        width: Dimensions.get('screen').width / 3 - 8,

                    }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                        }}>Total</Text>
                    </View>
                    <View style={{
                        width: Dimensions.get('screen').width / 3 - 8,
                        alignContent: 'flex-end',
                        alignItems: 'flex-end'
                    }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                        }}>{new Intl.NumberFormat('es-ES').format(
                            _.round(montoTotal, 0),
                        )}</Text>

                    </View>
                </View>
            </View>

        </View>
    )
}

export default IngresosTipo