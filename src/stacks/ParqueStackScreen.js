import React, { useState, useRef } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import HomeParque from '../screens/parque/HomeParque'
//import AlmacenDetalleScreen from '../screens/AlmacenDetalle'

const ParqueStack = createStackNavigator()
const ParqueStackScreen = () => {
  return (
    <ParqueStack.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: false,
      })}
      initialRouteName="HomeParque"
    >
      <ParqueStack.Screen name="HomeParque" component={HomeParque} />
      {/*  <ParqueStack.Screen name="Detalle" component={AlmacenDetalleScreen} /> */}
    </ParqueStack.Navigator>
  )
}

export default ParqueStackScreen
