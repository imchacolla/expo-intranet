import { Text, View } from 'react-native'
import React, { useState, useRef } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

//screens
import HomeScreen from '../screens/Home'
import DetailScreen from '../screens/Detail'
import Users from '../screens/Users'
import DocumentsScreen from '../screens/Documents'
import LicensesScreen from '../screens/Licenses'
import Calendars from '../screens/Calendars'
import PDFScreen from '../screens/PDFReader'
import BoletaScreen from '../screens/Boleta'
import CalendarPerfil from '../screens/CalendarPerfil'
import Editor from '../screens/Editor'
import { useSelector } from 'react-redux'
import { PRIMARY_COLOR, PRIMARY_TEXT_DARK_LIGHT } from '../utils/constants'

//ICONS
import Ionicons from 'react-native-vector-icons/Ionicons'
import { StatusBar, TouchableOpacity, StyleSheet } from 'react-native'

//Navigator v6
const HomeStack = createStackNavigator()
const Tab = createBottomTabNavigator()

const TabArr = [
  {
    route: 'Permision',
    activeIcon: 'hand-right',
    inActiveIcon: 'hand-right-outline',
    component: LicensesScreen,
    name: 'Permisos',
  },
  {
    route: 'Personal',
    activeIcon: 'people-sharp',
    inActiveIcon: 'people-outline',
    component: Users,
    name: 'Personal',
  },
  {
    route: 'Home',
    activeIcon: 'home-sharp',
    inActiveIcon: 'home-outline',
    component: HomeScreen,
    name: 'Inicio',
  },
  {
    route: 'Event',
    activeIcon: 'ios-calendar-sharp',
    inActiveIcon: 'ios-calendar-outline',
    //component: Calendars,
    component: Calendars,
    name: 'Marcaciones',
  },
  {
    route: 'Document',
    activeIcon: 'ios-folder-open-sharp',
    inActiveIcon: 'ios-folder-open-outline',
    component: DocumentsScreen,
    name: 'Normativa',
  },
]
const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {},
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />,
            }}
          />
        )
      })}
    </Tab.Navigator>
  )
}
const TabButton = ({ item, onPress, accessibilityState }) => {
  const { isDarkMode } = useSelector((state) => state.auth)

  const focused = accessibilityState.selected
  const viewRef = useRef(null)
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
      ]}
    >
      <View
        style={{
          width: 30,
          height: 1,
          //borderRadius: 2,
          backgroundColor: focused ? PRIMARY_COLOR : 'transparent',
          marginBottom: 3,
        }}
      ></View>
      <View ref={viewRef} duration={500} style={styles.container}>
        <Ionicons
          name={focused ? item.activeIcon : item.inActiveIcon}
          color={
            focused
              ? PRIMARY_COLOR
              : isDarkMode
              ? PRIMARY_TEXT_DARK_LIGHT
              : '#111'
          }
          size={26}
        />
        <Text
          style={{
            color: focused
              ? PRIMARY_COLOR
              : isDarkMode
              ? PRIMARY_TEXT_DARK_LIGHT
              : '#111',
            fontSize: 11,
            fontWeight: '500',
          }}
        >
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: false,
      })}
      initialRouteName="Tabs"
    >
      <HomeStack.Screen name="Tabs" component={HomeTabs} />
      <HomeStack.Screen name="Detail" component={DetailScreen} />
      <HomeStack.Screen name="PDF" component={PDFScreen} />
      <HomeStack.Screen name="Boleta" component={BoletaScreen} />
      <HomeStack.Screen name="CalendarPerfil" component={CalendarPerfil} />
      <HomeStack.Screen name="Editor" component={Editor} />
      {/** <HomeStack.Screen name="html" component={RenderPage} />*/}
    </HomeStack.Navigator>
  )
}

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
})

export default HomeStackScreen
