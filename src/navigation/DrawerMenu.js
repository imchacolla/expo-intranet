import { Text, View, Dimensions, Image, TouchableOpacity, Switch } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import axios from 'axios'
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
//store
import { logout } from '../store/auth';
import {
  PRIMARY_COLOR,
  PRIMARY_TEXT_DARK_LIGHT,
  BACKGROUND_DARK,
  BACKGROUND_LIGHT,
  BACKGROUND_PRIMARY_DARK,
  PRIMARY_TEXT_LIGHT,
  PRIMARY_TEXT_DARK,
  BACKGROUND_PRIMARY_LIGHT,
  BACKGROUND_PRIMARY_DARK_LIGHT,
} from '../utils/constants';

//import stacks
import HomeStackScreen from '../stacks/HomeStackScreen';
import SigecStackScreen from '../stacks/SigecStackScreen';
import AlmacenStackScreen from '../stacks/AlmacenStackScreen';
import SettingStackScreen from '../stacks/SettingStackScreen';
import LicenseStackScreen from '../stacks/LicenseStackScreen';
import CmiStackScreen from '../stacks/CmiStackScreen';
//ICONS
import { setTheme } from '../store/auth';
const Drawer = createDrawerNavigator();

const MENUs = [
  {
    name: 'HomeTabs',
    label: 'Inicio',
    rol: [1, 2, 3, 4, 5, 6, 7],
    id: 1,
    icon: 'home-outline',
  },
  {
    name: 'CMI',
    label: 'Pasajeros e Ingresos',
    rol: [4, 5, 6, 7],
    id: 2,
    icon: 'ios-bar-chart-outline',
  },
  {
    name: 'Sigec',
    label: 'Correspondencia',
    rol: [1, 2, 3, 4, 5, 6, 7],
    id: 3,
    icon: 'ios-document-attach-outline',
  },
  {
    name: 'Approve',
    label: 'Aprobar permisos',
    rol: [2, 3, 4, 5, 6, 7],
    id: 4,
    icon: 'checkmark-circle-outline',
  },
  /* {
    name: 'Almacen',
    label: 'Solicitudes de almacen',
    rol: [2, 3, 4, 5, 6, 7],
    id: 5,
    icon: 'cart-outline',
  }, */
];

const DrawerMenu = props => {
  const { ci, user, rol, isDarkMode } = useSelector(state => state.auth);
  console.log(rol)
  const [checked, setChecked] = useState(isDarkMode);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const setDarkMode = async isChecked => {
    setIsLoading(true);
    setChecked(isChecked);
    const response = await axios.post('/users/theme', { theme: isChecked });
    if (response.status == 200) {
      dispatch(setTheme(isChecked));
      setIsLoading(false);
    }
    setIsLoading(false);
  };
  const CustomDrawercontent = ({
    navigation,
    isDarkMode,
    checked,
    ci,
    user,
    rol,
  }) => {
    const dispatch = useDispatch();
    const [activeIndex, setActiveIndex] = React.useState(0);
    return (
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <View style={{ flex: 1 }}>
          {/* Header */}
          <View
            style={{
              width: '90%',
              height: 107,
              borderBottomEndRadius: 25,
              backgroundColor: isDarkMode ? BACKGROUND_DARK : BACKGROUND_LIGHT,
              justifyContent: 'center',
              paddingLeft: 20,
              // alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <View
                style={{
                  marginRight: 10,
                }}>
                <View
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 23,
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'center',
                    padding: 3,
                    borderWidth: 1,
                    borderColor: PRIMARY_COLOR,
                  }}>
                  <Image
                    size="small"
                    style={{ width: 40, height: 40, borderRadius: 20 }}
                    source={{
                      uri: 'https://rrhh.miteleferico.bo/api/foto?c=' + ci,
                    }}
                  />
                </View>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                  }}>
                  {user?.nombres}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: isDarkMode
                      ? PRIMARY_TEXT_DARK_LIGHT
                      : PRIMARY_TEXT_LIGHT,
                  }}>
                  {user?.username}
                </Text>
              </View>
            </View>
          </View>
          {/* DraweItems */}
          <DrawerContentScrollView
            scrollEnabled={false}
            style={{ backgroundColor: 'transparent' }}
          //contentContainerStyle={{backgroundColor: 'transparent'}}
          >
            {MENUs?.map((menu, index) => {
              if (menu.rol.includes(user.rol_app))
                return (
                  <DrawerItem
                    activeTintColor={PRIMARY_COLOR}
                    key={menu.id}
                    focused={activeIndex === index}
                    style={{
                      backgroundColor:
                        activeIndex === index
                          ? isDarkMode
                            ? BACKGROUND_DARK
                            : BACKGROUND_LIGHT
                          : 'transparent',
                      marginLeft: -8,
                    }}
                    onPress={() => {
                      navigation.navigate(menu.name);
                      setActiveIndex(index);
                    }}
                    label={({ focused }) => {
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              width: 6,
                              height: 24,
                              marginRight: 15,
                              borderBottomRightRadius: 2,
                              borderTopRightRadius: 2,
                              backgroundColor: focused
                                ? PRIMARY_COLOR
                                : 'transparent',
                            }}></View>
                          <Ionicons
                            name={menu.icon}
                            color={
                              isDarkMode
                                ? focused
                                  ? PRIMARY_COLOR
                                  : PRIMARY_TEXT_DARK_LIGHT
                                : PRIMARY_TEXT_LIGHT
                            }
                            size={18}
                          />
                          <Text
                            style={{
                              fontWeight: focused ? '500' : '400',
                              marginLeft: 5,
                              color: isDarkMode
                                ? focused
                                  ? PRIMARY_COLOR
                                  : PRIMARY_TEXT_DARK_LIGHT
                                : PRIMARY_TEXT_LIGHT,
                            }}>
                            {menu.label}
                          </Text>
                        </View>
                      );
                    }}></DrawerItem>
                );
            })}
          </DrawerContentScrollView>

          <View
            style={{
              marginBottom: 20,
              paddingHorizontal: 20,
              borderTopColor: isDarkMode ? '#3f3f3f' : '#eee',
              borderTopWidth: 1,
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingRight: 20,
                marginVertical: 10,
              }}>
              <Text
                style={{
                  color: isDarkMode
                    ? PRIMARY_TEXT_DARK_LIGHT
                    : PRIMARY_TEXT_LIGHT,
                }}>
                Modo oscuro
              </Text>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={checked ? PRIMARY_COLOR : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setDarkMode}
                value={checked}
              />
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                paddingRight: 20,
                marginVertical: 10,
              }}>
              <TouchableOpacity
                onPress={async () => {
                  await navigation.closeDrawer();
                  dispatch(logout());
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <AntDesign
                    name="logout"
                    size={24}
                    color={
                      isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT
                    }
                  />
                  <Text
                    style={{
                      marginLeft: 5,
                      fontWeight: '600',
                      color: isDarkMode
                        ? PRIMARY_TEXT_DARK_LIGHT
                        : PRIMARY_TEXT_LIGHT,
                    }}>
                    Salir
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {/*  <View>
              <Text
                style={{
                  marginTop: 30,
                  fontSize: 11,
                  color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : '#999',
                }}>
                V 1.0.1
              </Text>
            </View> */}
          </View>
        </View>
      </SafeAreaView>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? BACKGROUND_PRIMARY_DARK : '#E0E0E0',
      }}>
      <Drawer.Navigator
        hideStatusBar={true}
        screenOptions={{
          headerShown: false,
          hideStatusBar: true,
          drawerStyle: {
            flex: 1,
            backgroundColor: isDarkMode ? BACKGROUND_PRIMARY_DARK : '#FFFFFF',
            //backgroundColor: PRIMARY_COLOR,
            width: '70%',
          },
          //drawerType: 'slide',
          //overlayColor: 'transparent',
          sceneContainerStyle: {
            backgroundColor: 'transparent',
          },
          drawerActiveBackgroundColor: '#aa18ea',
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#333',
        }}
        initialRouteName="HomeTabs"
        //useLegacyImplementation
        drawerContent={props => {
          return (
            <CustomDrawercontent
              navigation={props.navigation}
              isDarkMode={isDarkMode}
              ci={ci}
              user={user}
              rol={rol}
              checked={checked}
            />
          );
        }}>
        <Drawer.Screen name="HomeTabs">
          {props => <HomeStackScreen  {...props} />}
        </Drawer.Screen>
        <Drawer.Screen name="Sigec">
          {props => <SigecStackScreen {...props} />}
        </Drawer.Screen>
        <Drawer.Screen name="CMI">
          {props => <CmiStackScreen {...props} />}
        </Drawer.Screen>
        <Drawer.Screen name="Almacen">
          {props => <AlmacenStackScreen {...props} />}
        </Drawer.Screen>
        <Drawer.Screen name="Approve">
          {props => <LicenseStackScreen {...props} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  );
};
export default DrawerMenu;
