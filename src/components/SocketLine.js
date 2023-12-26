import React, {useContext, useState, useEffect, useCallback} from 'react';

import {SocketContext} from '../contexts/SocketContext';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
} from 'react-native';

import {useSelector} from 'react-redux';

import {SafeAreaView} from 'react-native-safe-area-context';
import _ from 'lodash';
import {
  BACKGROUND_PRIMARY_DARK,
  PRIMARY_TEXT_DARK,
  PRIMARY_TEXT_LIGHT,
} from '../utils/constants';

const SocketLine = ({navigation}) => {
  const socket = useContext(SocketContext);
  const {ci, user, isDarkMode} = useSelector(state => state.auth);
  const [pasajerosTodo, setPasajerosTodo] = useState([]);
  //Socket function
  const socketPasajerosLinea = useCallback(v => {
    setPasajerosTodo(v);
  }, []);

  useEffect(() => {
    socket.on('pasajeros-linea-hoy-web', socketPasajerosLinea);
    return () => {
      socket.off('pasajeros-linea-hoy-web');
    };
  }, [socket]);
  const width = Dimensions.get('screen').width - 40;

  const getWidth = cantidad => {
    let percent = 0;
    if (cantidad > 0) {
      percent = (cantidad / 30000) * 100;
    }
    return parseInt(percent * 100) / width + '%';
  };

  return (
    <ScrollView>
      <View
        style={{
          flexDirection: 'column',
          marginHorizontal: 10,
          marginTop: 20,
        }}>
        {pasajerosTodo.map(item => (
          <View key={item.id}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: isDarkMode ? item.color : PRIMARY_TEXT_LIGHT,
                }}>
                {item.linea}
              </Text>
              <Text
                style={{
                  color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                }}>
                {new Intl.NumberFormat('es-ES').format(
                  _.round(item.cantidad, 0),
                )}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                marginBottom: 10,
              }}>
              <View
                style={{
                  backgroundColor: item.color,
                  width: getWidth(item.cantidad),
                  height: 10,
                  borderRadius: 2,
                }}></View>
              <View
                style={{
                  borderTopColor: item.color,
                  width: '100%',
                  height: 1,
                  borderTopWidth: 1,
                }}></View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default SocketLine;

const styles = StyleSheet.create({});
