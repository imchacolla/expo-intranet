import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import _ from 'lodash';
import {PRIMARY_TEXT_DARK, PRIMARY_TEXT_LIGHT} from '../utils/constants';

const MeanPasajeros = ({data, isDarkMode}) => {
  const media = _.meanBy(data, function (o) {
    return parseInt(o.value);
  });
  return (
    <View>
      <Text
        style={{
          fontSize: 10,
          color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
        }}>
        Promedio
      </Text>
      <Text
        style={{
          fontWeight: '600',
          color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
        }}>
        {new Intl.NumberFormat('es-ES').format(_.round(media, 0))}
      </Text>
    </View>
  );
};

export default MeanPasajeros;

const styles = StyleSheet.create({});
