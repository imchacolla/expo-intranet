import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
  Text,
  Dimensions,
  Animated,
  TextInput,
} from 'react-native';
import { StatusBar } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';

import FormInput from '../components/FormInput';
import FormButton, { FormButtonRecovery } from '../components/FormButton';
import LogoMt from '../components/Logo';
import { authLogin, setUser, authRecovery } from '../store/auth';
//import styles from "../utils/styleLogin";
import axios from 'axios';
//CONSTANTS
import {
  PRIMARY_COLOR,
  BACKGROUND_PRIMARY_LIGHT,
  PRIMARY_TEXT_LIGHT,
  PRIMARY_TEXT_DARK,
  PRIMARY_TEXT_DARK_LIGHT,
  BACKGROUND_DARK,
  BACKGROUND_PRIMARY_DARK,
  BACKGROUND_LIGHT,
  SECONDARY_COLOR,
} from '../utils/constants';
import Svg, { Image, Ellipse, ClipPath } from 'react-native-svg';

const { width, height } = Dimensions.get('screen');

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const { token, loading, error, isDarkMode, oneSignalId } = useSelector(
    state => state.auth,
  );
  //USE QUERY
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const LoadingIndicator = props => (
    <View style={[props.style, styles.indicator]}>
      <Spinner size="small" />
    </View>
  );

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  //login form
  const handleLoginForm = async data => {
    const { email, password } = data;

    dispatch(authLogin({ email: email.toLowerCase().trim(), password }))
      .unwrap()
      .then(originalPromiseResult => {
        if (originalPromiseResult.success) {
        }
      })
      .catch(errorAxios => {
        let error = 'Error desconocido, favor contactar al administrador';
        if (errorAxios.message == 'Request failed with status code 401') {
          error = 'El usuario proporcionado no existe';
        }
        if (errorAxios.message == 'Request failed with status code 402') {
          error = 'Contraseña incorrecta';
        }
        Alert.alert('Error', error);
      });
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? BACKGROUND_PRIMARY_DARK
            : BACKGROUND_PRIMARY_LIGHT,
        },
      ]}>
      <View
        style={{
          position: 'absolute',
          width: 180,
          height: 180,
          right: 50,
          top: Dimensions.get('screen').height - 200,
          backgroundColor: PRIMARY_COLOR,
          borderRadius: 90,
        }}></View>
      <View
        style={{
          position: 'absolute',
          width: 200,
          height: 200,
          right: -100,
          top: Dimensions.get('screen').height - 250,
          backgroundColor: SECONDARY_COLOR,
          borderRadius: 100,
        }}></View>

      {/*  <View style={[StyleSheet.absoluteFill]}>
        <Svg height={height + 100} width={width}>
          <Image
            href={require("../../assets/fondo.png")}
            width={width}
            height={height}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#clipPathId)"
          />
        </Svg>
      </View> */}
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <LogoMt color={isDarkMode ? '#7C7C7C' : PRIMARY_COLOR} />
          <Text
            style={{
              color: isDarkMode ? '#7C7C7C' : PRIMARY_COLOR,
              fontSize: 22,
              marginTop: 0,
            }}>
            Intranet
          </Text>
        </View>
        <View>
          <View style={[styles.bottomContainer]}>
            <View style={[styles.formInputContainer]}>
              <View
                style={{
                  //zIndex: -1,
                  paddingHorizontal: 30,
                  borderRadius: 10,
                  // backgroundColor: "#F2F2F2",
                  opacity: 0.9,
                }}>
                <View
                  style={[
                    styles.formGroup,
                    {
                      backgroundColor: isDarkMode
                        ? BACKGROUND_DARK
                        : BACKGROUND_LIGHT,
                    },
                  ]}>
                  <Ionicons
                    name="ios-person-outline"
                    size={22}
                    color={isDarkMode ? '#ccc' : PRIMARY_COLOR}
                    style={styles.iconInput}
                  />
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={[
                          styles.inputText,
                          {
                            color: isDarkMode
                              ? PRIMARY_TEXT_DARK
                              : PRIMARY_TEXT_LIGHT,
                          },
                        ]}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Usuario"
                        placeholderTextColor={
                          isDarkMode
                            ? PRIMARY_TEXT_DARK_LIGHT
                            : PRIMARY_TEXT_LIGHT
                        }
                      />
                    )}
                    name="email"
                  />
                </View>
                {errors.email && (
                  <Text style={styles.error}>Ingrese usuario</Text>
                )}
                <View
                  style={[
                    styles.formGroup,
                    {
                      backgroundColor: isDarkMode
                        ? BACKGROUND_DARK
                        : BACKGROUND_LIGHT,
                    },
                  ]}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={22}
                    color={isDarkMode ? '#ccc' : PRIMARY_COLOR}
                    style={styles.iconInput}
                  />
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={[
                          styles.inputText,
                          {
                            color: isDarkMode
                              ? PRIMARY_TEXT_DARK
                              : PRIMARY_TEXT_LIGHT,
                          },
                        ]}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        secureTextEntry={secureTextEntry}
                        value={value}
                        placeholder="Contraseña"
                        placeholderTextColor={
                          isDarkMode
                            ? PRIMARY_TEXT_DARK_LIGHT
                            : PRIMARY_TEXT_LIGHT
                        }
                      />
                    )}
                    name="password"
                  />

                  <TouchableOpacity onPress={toggleSecureEntry}>
                    <Ionicons
                      name={secureTextEntry ? 'eye-off' : 'eye'}
                      size={22}
                      style={[
                        styles.iconInput,
                        {
                          marginLeft: -10,
                        },
                      ]}
                      color="#666"
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text style={styles.error}>Ingrese contraseña</Text>
                )}
                <FormButton
                  buttonTitle="Ingresar"
                  onPress={handleSubmit(handleLoginForm)}
                  disabled={loading}
                  width={width}
                />
              </View>
            </View>
          </View>
          <Text style={{ marginTop: 50, color: '#BFC6CB', alignSelf: 'center' }}>
            Copyright (c) DTSI
          </Text>
        </View>
      </ScrollView>
      <StatusBar
        style="auto"
        backgroundColor={isDarkMode ? BACKGROUND_DARK : BACKGROUND_LIGHT}
      />
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    // marginTop: 100,
    marginHorizontal: 10,
    borderRadius: 20,
    paddingVertical: 10,
    marginTop: 40
  },
  formInputContainer: {
    marginTop: 20,
  },
  formGroup: {
    backgroundColor: 'white',
    height: 40,
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: 15,
    //borderWidth: 1,
    borderColor: '#ccc',
  },
  iconInput: {
    marginTop: 7,
    marginHorizontal: 10,
  },
  inputText: {
    width: width - 140,
    fontSize: 16,
  },
  error: {
    color: '#d72e2e',
    marginLeft: 40,
  },
});
