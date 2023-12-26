import React, {
    useState,
    useRef,
    useEffect,
    useCallback,
} from 'react';

import { SocketContext } from '../../contexts/SocketContext';
import {
    View,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    Text,
    RefreshControl,
    ScrollView,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';
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
import SocketVelocidades from '../../components/SocketVelocidades';
const Velocidades = ({ navigation }) => {
    const { ci, user, isDarkMode } = useSelector(state => state.auth);


    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: isDarkMode ? BACKGROUND_DARK : BACKGROUND_LIGHT,
            }}>
            <Title title="Velocidades" navigation={navigation} />

            <SocketVelocidades />
            <View >
                <Text style={{
                    marginTop: 10,
                    fontSize: 12,
                    marginLeft: 10,
                    color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                }}>
                    Velocidades expresadas en m/s
                </Text>

            </View>
        </SafeAreaView>
    )
}

export default Velocidades

const styles = StyleSheet.create({})