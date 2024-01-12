import React, { useState, useRef } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import HomeOruro from '../screens/oruro/homeOruro'
//import AlmacenDetalleScreen from '../screens/AlmacenDetalle'

const OruroStack = createStackNavigator()
const OruroStackScreen = () => {
  return (
    <OruroStack.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: false,
      })}
      initialRouteName="HomeOruro"
    >
      <OruroStack.Screen name="HomeOruro" component={HomeOruro} />
      {/*  <OruroStack.Screen name="Detalle" component={AlmacenDetalleScreen} /> */}
    </OruroStack.Navigator>
  )
}

export default OruroStackScreen
