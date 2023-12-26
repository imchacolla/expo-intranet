import {View, StatusBar} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import LogoSplash from '../components/LogoSplash';
import {useColorScheme} from 'react-native';

import {
  BACKGROUND_DARK,
  BACKGROUND_LIGHT,
  PRIMARY_TEXT_LIGHT,
  PRIMARY_TEXT_DARK,
  PRIMARY_COLOR,
} from '../utils/constants';

const SplashScreen = () => {
  const scheme = useColorScheme();

  // const isDarkMode = useSelector(state => state.auth.isDarkMode);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        //backgroundColor: scheme === 'dark' ? BACKGROUND_DARK : BACKGROUND_LIGHT,
        backgroundColor: PRIMARY_COLOR,
      }}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {/* <LottieView source={require('./30206-loading.json')} autoPlay loop /> */}
        <LogoSplash
          //color={scheme === 'dark' ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT}
          color="#FFFFFF"
        />
        {/* <View style={{height: 10}}></View> */}
        {/* <Text
          style={{
            color:
              scheme === 'dark' ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
          }}>
          Plataforma Integral{' '}
        </Text>
        <Text
          style={{
            color:
              scheme === 'dark' ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
          }}>
          v1.0{' '}
        </Text> */}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default SplashScreen;
