import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimentions';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {PRIMARY_COLOR} from '../utils/constants';
const FormInput = ({
  labelValue,
  placeholderText,
  color,
  inputColor,
  iconType,
  ...rest
}) => {
  return (
    <View style={[styles.inputContainer, {backgroundColor: color}]}>
      <View style={styles.iconStyle}>
        <AntDesign name={iconType} size={22} color={PRIMARY_COLOR} />
      </View>
      <TextInput
        value={labelValue}
        style={[styles.input, {color: inputColor}]}
        numberOfLines={1}
        placeholder={placeholderText}
        placeholderTextColor="#666"
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: windowHeight / 20,
    //borderColor: '#ccc',
    borderRadius: windowHeight / 40,
    //borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    padding: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    //borderRightColor: '#ccc',
    //borderRightWidth: 1,
    width: 50,
    // backgroundColor: '#3e4386',
    color: '#3e4386',
    borderRadius: 25,
  },
  input: {
    padding: 6,
    flex: 1,
    fontSize: 16,

    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});

export default FormInput;
