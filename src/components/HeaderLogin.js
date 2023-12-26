import React from 'react';

import {View, StyleSheet} from 'react-native';
import Svg, {Path, Image} from 'react-native-svg';
import {windowHeight, windowWidth} from '../utils/Dimentions';

import {
  BACKGROUND_DARK,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
} from '../utils/constants';
const HeaderLogin = ({background}) => {
  return (
    <View>
      <View style={styles.circle1} />
      <View style={styles.circle2} />
      <View style={[styles.shape, {backgroundColor: background}]}></View>
    </View>
  );
};
const styles = StyleSheet.create({
  shape: {
    width: windowWidth * 1.5,
    height: windowHeight * 1.8,

    position: 'absolute',
    top: windowHeight * -1.35312943,
    left: windowWidth * -0.54975,
    transform: [{rotateZ: '-20deg'}],
    borderRadius: windowWidth * 0.544935218,
  },
  circle1: {
    width: windowHeight * 0.15,
    height: windowHeight * 0.15,
    borderRadius: windowHeight * 0.075,
    backgroundColor: '#C460FF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 70,
    right: -70,
    zIndex: -1,
  },
  circle2: {
    width: windowHeight * 0.22,
    height: windowHeight * 0.22,
    borderRadius: windowHeight * 0.11,
    backgroundColor: PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -50,
    right: -60,
    zIndex: -1,
  },
});
export default HeaderLogin;
