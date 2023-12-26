import React, {useContext, useState, useEffect, useCallback} from 'react';

import {SocketContext} from '../contexts/SocketContext';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';

import {useSelector} from 'react-redux';

import {SafeAreaView} from 'react-native-safe-area-context';
import _ from 'lodash';
import {PRIMARY_TEXT_DARK, PRIMARY_TEXT_LIGHT} from '../utils/constants';

const SocketPasajerosHoy = ({navigation}) => {
  const socket = useContext(SocketContext);
  const {ci, user, isDarkMode} = useSelector(state => state.auth);
  const [pasajerosHoy, setPasajerosHoy] = useState('0');

  const socketPasajerosHoy = useCallback(v => {
    setPasajerosHoy(v);
  }, []);

  useEffect(() => {
    socket.on('pasajeros-hoy', socketPasajerosHoy);
    return () => {
      socket.off('pasajeros-hoy');
    };
  }, [socket]);

  return (
    <>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 36,
            fontWeight: '500',
            color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
          }}>
          {new Intl.NumberFormat('es-ES').format(_.round(pasajerosHoy, 0))}
        </Text>
      </View>
    </>
  );
};

export default SocketPasajerosHoy;

const styles = StyleSheet.create({});
