import { Text, View } from 'react-native';
import React, { useState, useRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//screens
import Home from '../screens/cmi/Home';
import PasajerosHoy from '../screens/cmi/PasajerosHoy';
import HalfHour from '../screens/cmi/HalfHour';

import Ingresos from '../screens/cmi/Ingresos';
import Velocidades from '../screens/cmi/Velocidades';

import { PRIMARY_COLOR, PRIMARY_TEXT_DARK_LIGHT } from '../utils/constants';

//ICONS
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StatusBar, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

//Navigator v6
const CmiStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabArr = [
  {
    route: 'Permision',
    activeIcon: 'md-repeat',
    inActiveIcon: 'md-repeat',
    component: Velocidades,
    name: 'Velocidades',
  },
  {
    route: 'Personal',
    activeIcon: 'md-logo-usd',
    inActiveIcon: 'md-logo-usd',
    component: Ingresos,
    name: 'Ingresos',
  },
  {
    route: 'Home',
    activeIcon: 'speedometer',
    inActiveIcon: 'speedometer-outline',
    component: Home,
    name: 'Inicio',
  },
  {
    route: 'Event',
    activeIcon: 'md-stats-chart',
    inActiveIcon: 'md-stats-chart-outline',
    //component: Calendars,
    component: HalfHour,
    name: 'Pasajeros',
  },
  {
    route: 'Document',
    activeIcon: 'md-reorder-four',
    inActiveIcon: 'md-reorder-four-outline',
    component: PasajerosHoy,
    name: 'Hoy',
  },
];
const HomeScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {},
      }}>
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: props => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};
const TabButton = ({ item, onPress, accessibilityState }) => {
  const { isDarkMode } = useSelector(state => state.auth);
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[
        styles.container,
        {
          // borderTopColor: PRIMARY_COLOR,
          // borderTopWidth: focused ? 5 : 0,
          // borderTopStartRadius: item.route == 'Permision' ? 15 : 0,
          // borderTopEndRadius: item.route == 'Document' ? 15 : 0,
        },
      ]}>
      <View
        style={{
          width: 28,
          height: 3,
          borderRadius: 2,
          backgroundColor: focused ? PRIMARY_COLOR : 'transparent',
          marginBottom: 3,
        }}></View>
      <View ref={viewRef} duration={500} style={styles.container}>
        <Ionicons
          name={focused ? item.activeIcon : item.inActiveIcon}
          color={focused ? PRIMARY_COLOR : isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : '#111'}
          size={26}
        />
        <Text
          style={{
            color: focused ? PRIMARY_COLOR : isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : '#111',
            fontSize: 11,
          }}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const CmiStackScreen = () => {
  return (
    <CmiStack.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: false,
      })}
      initialRouteName="Tabs">
      <CmiStack.Screen name="Tabs" component={HomeScreen} />
      <CmiStack.Screen name="PasajerosHoy" component={PasajerosHoy} />
      <CmiStack.Screen name="HalfHour" component={HalfHour} />
      <CmiStack.Screen name="Detail" component={Home} />
      <CmiStack.Screen name="PDF" component={Home} />
      <CmiStack.Screen name="Boleta" component={Home} />
      {/** <CmiStack.Screen name="html" component={RenderPage} />*/}
    </CmiStack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 16,
  },
});

export default CmiStackScreen;
