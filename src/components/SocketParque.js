import { useContext, useState, useEffect, useCallback } from 'react'

import { SocketContext } from '../contexts/SocketContext'
import { View, StyleSheet, Text } from 'react-native'

import { useSelector } from 'react-redux'

import round from 'lodash/round'
import { PRIMARY_TEXT_DARK, PRIMARY_TEXT_LIGHT } from '../utils/constants'

const SocketParque = ({ navigation }) => {
  const socket = useContext(SocketContext)
  const { ci, user, isDarkMode } = useSelector((state) => state.auth)
  const [pasajerosTodo, setPasajerosTodo] = useState('0')
  const [pasajerosHoy, setPasajerosHoy] = useState('0')
  const [ingresosHoy, setIngresosHoy] = useState('0')

  //Socket function
  const socketPasajeros = useCallback((v) => {
    setPasajerosTodo(v)
  }, [])
  const socketPasajerosHoy = useCallback((v) => {
    setPasajerosHoy(v)
  }, [])
  const socketIngresosHoy = useCallback((v) => {
    setIngresosHoy(v)
  }, [])

  useEffect(() => {
    socket.on('pasajeros-parque-todo', socketPasajeros)
    socket.on('pasajeros-parque-hoy', socketPasajerosHoy)
    socket.on('ingresos-parque-hoy', socketIngresosHoy)
    return () => {
      socket.off('pasajeros-parque-todo')
      socket.off('pasajeros-parque-hoy')
      socket.off('ingresos-parque-hoy')
    }
  }, [socket])

  return (
    <>
      <View
        style={{
          marginTop: -15,
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: isDarkMode ? '#999' : '#673400ff',
          }}
        >
          Visitantes
        </Text>
        <Text
          style={{
            fontSize: 36,
            textAlign: 'center',
            fontWeight: '600',
            color: isDarkMode ? PRIMARY_TEXT_DARK : '#673400ff',
          }}
        >
          {new Intl.NumberFormat('es-ES').format(round(pasajerosTodo, 0))}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 50,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 12,
              textAlign: 'center',
              color: isDarkMode ? '#999' : PRIMARY_TEXT_LIGHT,
            }}
          >
            Visitantes hoy
          </Text>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
            }}
          >
            {new Intl.NumberFormat('es-ES').format(round(pasajerosHoy, 0))}
          </Text>
        </View>

        <View>
          <Text
            style={{
              fontSize: 12,
              color: isDarkMode ? '#999' : PRIMARY_TEXT_LIGHT,
            }}
          >
            Ingresos hoy(Bs)
          </Text>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
            }}
          >
            {new Intl.NumberFormat('es-ES').format(round(ingresosHoy, 0))}
          </Text>
        </View>
      </View>
    </>
  )
}

export default SocketParque

const styles = StyleSheet.create({})
