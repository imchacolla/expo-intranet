import React, {useEffect, useCallback, useState} from 'react';
import {StyleSheet, View, Pressable, Text, Dimensions} from 'react-native';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../utils/constants';

import {
  PRIMARY_TEXT,
  PRIMARY_TEXT_DARK,
  PRIMARY_TEXT_LIGHT,
  BACKGROUND_DARK,
  BACKGROUND_LIGHT,
  BACKGROUND_PRIMARY_DARK,
  BACKGROUND_PRIMARY_LIGHT,
  PRIMARY_TEXT_DARK_LIGHT,
  TERTIARY_COLOR,
} from '../utils/constants';

const Permiso = ({item, isDarkMode}) => {
  return (
    <Pressable onPress={() => {}}>
      <View
        key={item.id}
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'space-between',
          elevation: 1,
          // borderRadius: 10,
          backgroundColor: isDarkMode
            ? BACKGROUND_PRIMARY_DARK
            : BACKGROUND_PRIMARY_LIGHT,
          padding: 8,
          marginVertical: 2,
        }}>
        <View style={styles.description}>
          <Text
            style={[
              styles.nombre,
              {color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT},
            ]}>
            {item.justificacion}
          </Text>
          <Text
            style={[
              styles.cargo,
              {
                color: isDarkMode
                  ? PRIMARY_TEXT_DARK_LIGHT
                  : PRIMARY_TEXT_LIGHT,
              },
            ]}>
            {item.destino}
          </Text>
          <Text
            style={[
              styles.tipo,
              {
                color: isDarkMode
                  ? PRIMARY_TEXT_DARK_LIGHT
                  : PRIMARY_TEXT_LIGHT,
              },
            ]}>
            {item.tipo_boleta}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={[
                styles.hora,
                {
                  color: isDarkMode
                    ? PRIMARY_TEXT_DARK_LIGHT
                    : PRIMARY_TEXT_LIGHT,
                },
              ]}>
              {item.fecha_ini} {item.hora_ini}
            </Text>
            <View style={{width: 10}}>
              <Text
                style={[
                  styles.hora,
                  {
                    textAlign: 'center',
                    color: isDarkMode
                      ? PRIMARY_TEXT_DARK_LIGHT
                      : PRIMARY_TEXT_LIGHT,
                  },
                ]}>
                {'-'}
              </Text>
            </View>
            <Text
              style={[
                styles.hora,
                {
                  color: isDarkMode
                    ? PRIMARY_TEXT_DARK_LIGHT
                    : PRIMARY_TEXT_LIGHT,
                },
              ]}>
              {item.fecha_fin == item.fecha_ini ? '' : item.fecha_fin}{' '}
              {item.hora_fin}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: 100,
            alignItems: 'center',
            alignContent: 'space-around',
            alignSelf: 'center',
          }}>
          <View
            style={{
              width: 100,
              borderRadius: 0,
              padding: 2,
              textAlign: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              //  borderColor: item.estado > 5 ? '#95D780' : '#CFA9FC',
              //borderColor: item.estado > 5 ? PRIMARY_COLOR : '#CFA9FC',
              //borderWidth: 1,
              //borderStyle: 'dotted',
            }}>
            <Text
              style={[
                styles.estadoText,
                {color: item.estado > 5 ? PRIMARY_COLOR : '#CFA9FC'},
              ]}>
              {item.estado_nombre}
            </Text>
          </View>
          <View
            style={{
              alignItems: 'flex-start',

              width: 90,
              // height: 48,
              //borderRadius: 5,
              // borderColor: item.estado > 5 ? '#95D780' : '#CFA9FC',
              //borderColor: item.estado > 5 ? PRIMARY_COLOR : '#CFA9FC',
              // borderWidth: item.estado > 5 ?1:0,
              padding: 3,
            }}>
            <Text
              style={{
                color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                fontSize: 11,
              }}>
              {item.aprobado_por}
            </Text>
            {/*<Image
                source={{
                  uri: 'https://rrhh.miteleferico.bo/api/foto?c=' + item.ci,
                }}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 21,
                  alignItems: 'center',
                }}
              /> */}
          </View>
        </View>
      </View>
    </Pressable>
  );
};
export default Permiso;

const styles = StyleSheet.create({
  loader: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  dataContainer: {
    flexDirection: 'row',
  },
  avatar: {
    marginRight: 5,
    marginLeft: 0,
  },
  nombre: {
    fontSize: 15,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  cargo: {
    fontSize: 12,
  },
  celular: {
    fontSize: 10,
    textAlign: 'center',
  },

  estadoText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  viewSearch: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  search: {
    height: 36,
    margin: 5,
    width: '89%',
    //borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    //backgroundColor: '#efefef',
    color: '#a7a7a7',
  },
  viewSearchInput: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    //backgroundColor: '#FFFFFF',
    margin: 5,
    borderRadius: 25,
    width: '80%',
    padding: 5,
  },

  btnSearch: {
    backgroundColor: 'transparent',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    marginLeftt: 15,
    padding: 0,
  },
  totalText: {
    fontSize: 10,
  },
  description: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: Dimensions.get('window').width - 100,
  },
  email: {
    fontSize: 10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {
      width: -4,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  interno: {
    fontSize: 10,
    fontWeight: '100',
    textAlign: 'center',
  },
  icon: {
    width: 26,
    height: 26,
  },
  tipo: {
    fontSize: 13,
    fontWeight: '400',
    textAlign: 'left',
    color: SECONDARY_COLOR,
  },
  hora: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
});
