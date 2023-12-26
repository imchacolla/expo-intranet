import React, {useState, useRef} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AlmacenScreen from '../screens/Almacen';
import AlmacenDetalleScreen from '../screens/AlmacenDetalle';

const AlmacenStack = createStackNavigator();
const AlmacenStackScreen = () => {
  return (
    <AlmacenStack.Navigator
      screenOptions={({navigation}) => ({
        headerShown: false,
      })}
      initialRouteName="AlmacenHome">
      <AlmacenStack.Screen name="AlmacenHome" component={AlmacenScreen} />
      <AlmacenStack.Screen name="Detalle" component={AlmacenDetalleScreen} />
    </AlmacenStack.Navigator>
  );
};

export default AlmacenStackScreen;
