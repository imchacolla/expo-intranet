import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {
  PRIMARY_COLOR,
  BACKGROUND_DARK,
  PRIMARY_TEXT_DARK,
  PRIMARY_TEXT_LIGHT,
  BACKGROUND_PRIMARY_DARK,
  BACKGROUND_PRIMARY_LIGHT,
  BACKGROUND_LIGHT,
} from '../utils/constants'
const GESTION = new Date().getFullYear()
const ListVacations = ({ vacations, isDarkMode }) => {
  const total = vacations.reduce(
    (total, resultado) => total + Number(resultado.dias),
    0,
  )
  return (
    <View
      style={{
        paddingHorizontal: 10,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 4,
        }}
      >
        <Text
          style={{
            marginVertical: 8,
            fontSize: 18,
            fontWeight: 'bold',
            color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
          }}
        >
          Programación: {GESTION}{' '}
        </Text>
        <Text
          style={{
            marginVertical: 8,
            fontSize: 18,
            fontWeight: 'bold',
            color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
          }}
        >
          {total} días
        </Text>
      </View>

      <View
        style={{
          width: '100%',
        }}
      >
        <View
          style={[
            styles.modalView,
            {
              backgroundColor: 'transparent',
            },
          ]}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderTopWidth: 1,
              paddingVertical: 4,
              borderBottomColor: PRIMARY_COLOR,
              borderTopColor: PRIMARY_COLOR,
            }}
          >
            <View style={{}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                }}
              >
                FECHA INICIO
              </Text>
            </View>
            <View style={{}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                }}
              >
                FECHA FIN
              </Text>
            </View>
            <View style={{}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                }}
              >
                ESTADO
              </Text>
            </View>
            <View style={{}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                }}
              >
                DIAS
              </Text>
            </View>
          </View>
          <View style={{ height: 5 }}></View>
          {vacations.map((v, i) => (
            <View
              key={i}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
                marginVertical: 5,
                paddingBottom: 4,
              }}
            >
              <View style={{}}>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'left',
                    color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                  }}
                >
                  {v.fecha_ini}
                </Text>
              </View>
              <View style={{}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                  }}
                >
                  {v.fecha_fin}
                </Text>
              </View>
              <View style={{}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                  }}
                >
                  {v.estado_descripcion}
                </Text>
              </View>
              <View style={{}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                  }}
                >
                  {v.dias}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

export default ListVacations

const styles = StyleSheet.create({})
