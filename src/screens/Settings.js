import React, { useEffect, useState } from 'react';
//import react redux
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  ActivityIndicator,
  Text,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  PRIMARY_COLOR,
  PRIMARY_TEXT_DARK,
  PRIMARY_TEXT_LIGHT,
  BACKGROUND_DARK,
  BACKGROUND_LIGHT,
} from '../utils/constants';
import { windowHeight } from '../utils/Dimentions';
import { setTheme, logout } from '../store/auth';
import Title from '../components/Title';
const { width, height } = Dimensions.get('window');
const SPACING = 5;
const ITEM_SIZE = 140;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const SettingScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isDarkMode, loadingTheme } = useSelector(state => state.auth);
  const [checked, setChecked] = useState(isDarkMode);
  const [isLoading, setIsLoading] = useState(false);

  const onCheckedChange = isChecked => {
    setChecked(isChecked);
    dispatch(setTheme({ checked: isChecked }));
  };
  const userLogout = () => {
    dispatch(logout());
  };

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

  if (isLoading) {
    <View style={StyleSheet.absoluteFill}>
      <ActivityIndicator color={PRIMARY_COLOR} />
    </View>;
  }
  const scrollX = React.useRef(new Animated.Value(0)).current;
  //const scrollX = new Animated.Value (0);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? BACKGROUND_DARK : BACKGROUND_LIGHT,
      }}>
      <View
        style={[
          {
            flex: 1,
            backgroundColor: isDarkMode ? BACKGROUND_DARK : BACKGROUND_LIGHT,
          },
        ]}>
        <Title title="Settings" navigation={navigation} />
        <View

          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              //width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                marginRight: 10,
              }}>
              Theme Dark:
            </Text>
            {/* <Toggle checked={checked} onChange={setDarkMode}>
            {`${isDarkMode ? 'Dark' : 'Light'}`}
          </Toggle> */}

            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={checked ? PRIMARY_COLOR : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setDarkMode}
              value={checked}
            />
          </View>
          {isLoading ?
            <ActivityIndicator color={PRIMARY_COLOR} /> : null}
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              marginTop: 30,
            }}>
            <Text
              style={{
                color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  nombre: {
    fontSize: 26,
    fontWeight: '500',
    marginLeft: 5,
    //color: TERTIARY_COLOR,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 25,
    //color: PRIMARY_COLOR,
    marginLeft: 5,
  },
  description: {
    marginTop: 5,
    //marginBottom: 5,
    flexDirection: 'column',
    //alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
    paddingBottom: 5,
  },
  itemNombre: {
    fontSize: 12,
    fontWeight: '400',
    marginLeft: 5,
    // color: TERTIARY_COLOR,
  },
  item: {
    marginHorizontal: 10,
    padding: 10,
    //alignItems: 'center',
    // backgroundColor: 'white',
    borderRadius: 10,
  },
  itemText: {
    fontSize: 16,
    // color: '#222222',
  },
  itemFecha: {
    fontSize: 14,
    //color: '#777',
    textAlign: 'center',
    fontWeight: 'bold',
    //backgroundColor: '#EFEFEF',
    paddingHorizontal: 15,
    // color: TERTIARY_COLOR,
    //borderRadius: 15,
    borderTopWidth: 2,
    borderTopColor: PRIMARY_COLOR,
    paddingTop: 10,
  },
});

export default SettingScreen;
