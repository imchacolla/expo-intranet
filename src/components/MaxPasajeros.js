import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import _ from 'lodash';
import {PRIMARY_TEXT_DARK, PRIMARY_TEXT_LIGHT} from '../utils/constants';

const MaxPasajeros = ({data, isDarkMode}) => {
  if (data.length < 1) {
    return null;
  }
  const max = _.maxBy(data, function (o) {
    return parseInt(o.value);
  });

  return (
    <View>
      <Text
        style={{
          fontSize: 10,
          color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
        }}>
        Max(
        {max.name})
      </Text>
      <Text
        style={{
          fontWeight: '600',
          color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
        }}>
        {new Intl.NumberFormat('es-ES').format(_.round(max.value, 0))}
      </Text>
    </View>
  );
};

export default MaxPasajeros;

const styles = StyleSheet.create({});
