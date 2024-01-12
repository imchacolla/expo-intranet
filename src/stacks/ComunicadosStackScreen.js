import React, { useState, useRef } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Comunicados from '../screens/Comunicados'
import Editor from '../screens/Editor'

//import AlmacenDetalleScreen from '../screens/AlmacenDetalle'

const ComunicadosStack = createStackNavigator()
const ComunicadosStackScreen = () => {
  return (
    <ComunicadosStack.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: false,
      })}
      initialRouteName="ComunicadosHome"
    >
      <ComunicadosStack.Screen name="ComunicadosHome" component={Comunicados} />
      <ComunicadosStack.Screen name="editor-comunicado" component={Editor} />
    </ComunicadosStack.Navigator>
  )
}

export default ComunicadosStackScreen
