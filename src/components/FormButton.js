import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimentions';
import {backgroundPrimary, textPrimary} from '../utils/constants';
import {PRIMARY_COLOR} from '../utils/constants';

const FormButton = ({buttonTitle, ...rest}) => {
  const {disabled} = rest;
  console.log(disabled);
  return (
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
      {disabled ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <Text style={styles.buttonText}>{buttonTitle}</Text>
      )}
    </TouchableOpacity>
  );
};
export const FormButtonRecovery = ({buttonTitle, ...rest}) => {
  const {disabled} = rest;
  console.log(disabled);
  return (
    <TouchableOpacity style={styles.buttonContainerRecovery} {...rest}>
      {disabled ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <Text style={styles.buttonText}>{buttonTitle}</Text>
      )}
    </TouchableOpacity>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 15,
    width: windowWidth - 80,
    height: windowHeight / 18,
    backgroundColor: PRIMARY_COLOR,
    borderColor: '#ffffff',
    // borderWidth: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    //    borderRadius: 3,
    borderRadius: windowHeight / 30,
  },
  buttonContainerRecovery: {
    marginTop: 10,
    width: windowWidth - 60,
    height: windowHeight / 15,
    backgroundColor: '#42377c',
    borderColor: '#ffffff',
    borderWidth: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    //    borderRadius: 3,
    borderRadius: windowHeight / 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
