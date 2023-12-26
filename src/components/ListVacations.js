import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  PRIMARY_COLOR,
  BACKGROUND_DARK,
  PRIMARY_TEXT_DARK,
  PRIMARY_TEXT_LIGHT,
  BACKGROUND_PRIMARY_DARK,
  BACKGROUND_PRIMARY_LIGHT,
  BACKGROUND_LIGHT,
} from '../utils/constants';
const ListVacations = ({vacations, isDarkMode}) => {
  return (
    <View
      style={{
        paddingHorizontal: 20,
      }}>
      <View
        style={{
          width: '100%',
        }}>
        <View
          style={[
            styles.modalView,
            {
              backgroundColor: 'transparent',
            },
          ]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: PRIMARY_COLOR,
                paddingBottom: 3,
              }}>
              <Text
                style={{
                  marginRight: 20,
                  fontWeight: 'bold',
                  color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                }}>
                FECHA INICIO
              </Text>
            </View>
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: PRIMARY_COLOR,
              }}>
              <Text
                style={{
                  marginRight: 20,
                  fontWeight: 'bold',
                  color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                }}>
                FECHA FIN
              </Text>
            </View>
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: PRIMARY_COLOR,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                }}>
                DIAS
              </Text>
            </View>
          </View>
          <View style={{height: 5}}></View>
          {vacations.map((v, i) => (
            <View
              key={i}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{textAlign: 'left', margin: 2}}>
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: 'left',
                    color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                  }}>
                  {v.fecha_ini}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                  }}>
                  {v.fecha_fin}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                  }}>
                  {v.dias}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default ListVacations;

const styles = StyleSheet.create({});
