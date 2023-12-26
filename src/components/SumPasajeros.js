import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import _ from 'lodash';
import {PRIMARY_TEXT_DARK, PRIMARY_TEXT_LIGHT} from '../utils/constants';

const SumPasajeros = ({data, isDarkMode}) => {
  const suma = _.sumBy(data, function (o) {
    return parseInt(o.value);
  });
  return (
    <View>
      <Text
        style={{
          fontSize: 10,
          color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
        }}>
        Total
      </Text>
      <Text
        style={{
          fontWeight: '600',
          color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
        }}>
        {new Intl.NumberFormat('es-ES').format(_.round(suma, 0))}
      </Text>
    </View>
  );
};

export default SumPasajeros;

const styles = StyleSheet.create({});
