import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import _ from 'lodash';
import {
  BACKGROUND_LIGHT,
  BACKGROUND_PRIMARY_DARK,
  BACKGROUND_PRIMARY_LIGHT,
  PRIMARY_TEXT_DARK,
  PRIMARY_TEXT_LIGHT,
} from '../utils/constants';

const TableCumplimiento = ({data, isDarkMode}) => {
  return (
    <View
      style={{flexDirection: 'column', marginHorizontal: 20, marginBottom: 20}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 1,
          borderBottomWidth: 2,
          borderBottomColor: isDarkMode ? BACKGROUND_PRIMARY_DARK : '#CCC',
        }}>
        <View
          style={{
            width: Dimensions.get('screen').width * 0.3 - 4,
            alignItems: 'flex-start',
          }}></View>
        <View
          style={{
            width: Dimensions.get('screen').width * 0.3 - 4,
            alignItems: 'flex-end',
          }}>
          <Text
            style={{
              color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
              fontWeight: 'bold',
              fontSize: 12,
              textAlign: 'right',
            }}>
            Programado
          </Text>
        </View>

        <View
          style={{
            width: Dimensions.get('screen').width * 0.3 - 4,
            alignItems: 'flex-end',
          }}>
          <Text
            style={{
              color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
              fontWeight: 'bold',
              fontSize: 12,
            }}>
            Transportado
          </Text>
        </View>
      </View>
      <View>
        {data.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 5,
                borderBottomWidth: 1,
                borderBottomColor: isDarkMode
                  ? BACKGROUND_PRIMARY_DARK
                  : '#CCC',
              }}>
              <View
                style={{
                  width: Dimensions.get('screen').width * 0.3 - 4,
                  alignItems: 'flex-start',
                }}>
                <Text
                  style={{
                    color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                    fontWeight: '400',
                    fontSize: 13,
                  }}>
                  {item.name}
                </Text>
              </View>
              <View
                style={{
                  width: Dimensions.get('screen').width * 0.3 - 4,
                  alignItems: 'flex-end',
                }}>
                <Text
                  style={{
                    color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                    fontWeight: '400',
                    fontSize: 13,
                  }}>
                  {new Intl.NumberFormat('es-ES').format(
                    _.round(item.programado, 0),
                  )}
                </Text>
              </View>
              <View
                style={{
                  width: Dimensions.get('screen').width * 0.3 - 4,
                  alignItems: 'flex-end',
                }}>
                <Text
                  style={{
                    color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                    fontWeight: '400',
                    fontSize: 13,
                  }}>
                  {new Intl.NumberFormat('es-ES').format(
                    _.round(item.ejecutado, 0),
                  )}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default TableCumplimiento;

const styles = StyleSheet.create({});
