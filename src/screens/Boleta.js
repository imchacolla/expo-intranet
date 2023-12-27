import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  BACKGROUND_PRIMARY_DARK,
  BACKGROUND_PRIMARY_LIGHT,
  PRIMARY_COLOR,
  PRIMARY_TEXT_DARK,
  PRIMARY_TEXT_DARK_LIGHT,
  PRIMARY_TEXT_LIGHT,
} from '../utils/constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
//import lodash
import _ from 'lodash';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';

import { xorBy } from 'lodash';
//import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

//other dattimepicker
//import DatePicker from 'react-native-date-picker';
import 'moment';
import 'moment/locale/es';
import moment from 'moment-timezone';
import { BACKGROUND_DARK, BACKGROUND_LIGHT } from '../utils/constants';

import Ionicons from 'react-native-vector-icons/Ionicons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Destinatarios from '../components/Destinatarios';

import { Dropdown } from 'react-native-element-dropdown';
import { setRefreshPage } from '../store/auth';
// import components
import SelectBoleta from '../components/SelectBoleta';

const BoletaScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector(state => state.auth);
  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [date3, setDate3] = useState(new Date());
  const [date4, setDate4] = useState(new Date());

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  //
  //validation to hidden or show inputs
  const [esVacacion, setEsVacacion] = useState(0);
  const [tieneLugar, setTieneLugar] = useState(0);
  const [tieneHorario, setTieneHorario] = useState(0);
  const [dataDestinatarios, setDataDestinatarios] = useState([]);
  const [typeOption, setTypeOption] = useState({});
  const [justificacion, setJustificacion] = useState('');
  const [lugar, setLugar] = useState('');
  const [fechaInicio, setFechaInicio] = useState(moment().format('DD-MM-YYYY'));
  const [fechaFin, setFechaFin] = useState(moment().format('DD-MM-YYYY'));
  const [horaInicio, setHoraInicio] = useState(moment().format('HH:mm'));
  const [horaFin, setHoraFin] = useState(moment().format('HH:mm'));

  //selected tipo permisos
  const [selectedItems, setSelectedItems] = useState([]);

  const [selectDestinatarios, setSelectDestinatarios] = useState([]);

  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  ///DROPDOWN - value = tipeLicencies
  const [value, setValue] = useState(null);
  //functions

  const onSelectedDestinatariosChange = selectedItems => {
    setSelectDestinatarios(selectedItems);
  };

  //get type permisions
  const getTypeLicenses = async () => {
    const response = await axios.get('/rrhh/tipo-permisos');
    return response.data.data;
  };
  const queryLicenses = useQuery({
    queryKey: ['licenses'],
    queryFn: getTypeLicenses,
  });

  const setTypeValue = value => {
    setValue(value);
    if (value > 0) {
      const typeSelect = _.find(queryLicenses.data, function (item) {
        return item.id === value;
      });
      if (typeSelect.vacacion) {
        let justificacion = '';
        if (queryVacations?.data.length > 0) {
          if (queryVacations?.data[0]?.total_dias > 0) {
            justificacion = queryVacations?.data[0].gestion_ini + '-' + queryVacations?.data[0].gestion_fin;
          } else {
            justificacion = queryVacations?.data[1].gestion_ini + '-' + queryVacations?.data[1].gestion_fin;
          }
          setJustificacion(justificacion.toString());
        }
      }
      //console.log(typeSelect);
      setTypeOption(typeSelect);
    }
  };

  //traer vacaciones solo una vez
  const getVacationQuery = async () => {
    const response = await axios.get('/rrhh/vacations');
    return response.data.data;
  };
  const queryVacations = useQuery({
    queryKey: ['vacations'],
    queryFn: getVacationQuery,
  });

  const getDestinatariosQuery = async () => {
    const response = await axios.get(`/rrhh/destinatarios/${value}`);
    return response.data.data;
  };
  const queryDestinatarios = useQuery({
    queryKey: ['destinatarios', typeOption],
    queryFn: getDestinatariosQuery,
  });

  //simar total vacaciones disponibles
  const totalVacations = data => {
    return _.sumBy(data, 'total_dias');
  };

  //Validar Formulario
  const validarForm = async () => {
    //getDestinatarios();
    try {
      setIsLoading(true);
      if (_.isEmpty(typeOption)) {
        Alert.alert('Seleccione tipo de permiso');
        setIsLoading(false);
        return false;
      }
      if (justificacion.trim() === '') {
        Alert.alert('Escriba una justificación');
        setIsLoading(false);
        return false;
      }
      const response = await axios.post(
        '/rrhh/validar-boleta',
        {
          id_controlexcepcion: typeOption.id,
          justificacion,
          fecha_ini: fechaInicio,
          fecha_fin: fechaFin,
          hora_ini: horaInicio,
          hora_fin: horaFin,
          destino: lugar,
        },
        { headers: { 'Content-Type': 'application/json' } },
      );

      if (response.data?.data?.result > 0) {
        const id = response.data.data;
        console.log('response', response.data.data.return);
        //getDestinatarios();
        setIsValid(true);
        setIsLoading(false);
        //await guardarBoleta();
        //}
      } else {
        Alert.alert('Error de validación', response?.data?.data?.msj);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', error.toString());
      setIsLoading(false);
    }

    //console.log(response.data);
  };

  const cancelBtn = () => {
    setIsValid(false);
  };
  //guardar boleta
  const guardarBoleta = async () => {
    setIsLoading(true);
    /*FIXME: si la data destinatario es mas de uno entonces enviamos destinatarios de lo contrario enviamos solo el destinatario*/
    if (selectDestinatarios?.length === 0) {
      Alert.alert('Escoja al menos un aprobador del permiso solicitado.');
      setIsLoading(false);
      return false;
    }

    try {
      const response = await axios.post(
        '/rrhh/guardar-boleta',
        {
          id_controlexcepcion: typeOption.id,
          justificacion,
          fecha_ini: fechaInicio,
          fecha_fin: fechaFin,
          hora_ini: horaInicio,
          hora_fin: horaFin,
          destino: lugar,
          destinatarios: selectDestinatarios,
        },
        { headers: { 'Content-Type': 'application/json' } },
      );
      console.log(response.data.data);
      if (response.data?.data?.result > 0) {
        Alert.alert('', response.data?.data?.msj_save?.msj);
        setIsLoading(false);
        dispatch(setRefreshPage(new Date().toString()));
        navigation.goBack();
      } else {
        Alert.alert('Mensaje', response.data.data.msj);
        setIsLoading(false);
      }
    } catch (error) {
      Alert.alert(error.toString());
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!_.isEmpty(typeOption)) {
      setEsVacacion(typeOption.vacacion);
      setTieneLugar(typeOption.lugar);
      setTieneHorario(typeOption.horario);
    }
  }, [typeOption]);

  const onChangeFechaInicio = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setOpen(false);
    setDate(currentDate);
    const fechaInicio = moment(currentDate);
    setFechaInicio(fechaInicio.format('DD-MM-YYYY'));
  }
  const onChangeHoraInicio = (event, selectedDate) => {
    const currentDate = selectedDate || date3;
    setOpen3(false);
    setDate3(currentDate);
    const horaInicio = moment(currentDate);
    setHoraInicio(horaInicio.format('HH:mm'));
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? BACKGROUND_DARK : BACKGROUND_LIGHT,
      }}>
      {queryLicenses.isLoading ? (
        <View
          style={{
            flex: 1,
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color={PRIMARY_COLOR} />
        </View>
      ) : (
        <View style={{ flex: 1, marginHorizontal: 20 }}>
          {/*TITULO*/}
          <View
            style={{
              flexDirection: 'row',
              //width: '100%',
              alignItems: 'center',
              justifyContent: 'flex-start',
              alignContent: 'center',
              //marginBottom: 20,
              //borderBottomWidth: 1,
              // borderBottomColor: isDarkMode ? '#333' : '#666',
              //paddingBottom: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{
                width: 40,
                height: 40,
                //marginLeft: Dimensions.get('window').width - 60,
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <AntDesign
                name="left"
                size={24}
                color={isDarkMode ? '#EFEFEF' : '#333'}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                fontWeight: 'bold',
                fontSize: 20,
                // marginLeft: -20,
              }}>
              Formulario de solicitud
            </Text>
          </View>

          {isValid ? (
            <View
              style={{
                marginTop: 15,
              }}>
              <View
                style={{
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  //width: '100%',
                }}>
                <Text
                  style={{
                    color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                    fontWeight: '600',
                  }}>
                  Paso 2/2
                </Text>
              </View>
              <Text
                style={[
                  styles.label,
                  {
                    color: isDarkMode
                      ? PRIMARY_TEXT_DARK_LIGHT
                      : PRIMARY_TEXT_LIGHT,
                  },
                ]}>
                Superior(es) aprobador(es):
              </Text>
              {queryDestinatarios?.data ? (
                <Destinatarios
                  data={queryDestinatarios.data}
                  event={onSelectedDestinatariosChange}
                  selectedItems={selectDestinatarios}
                  isDarkMode={isDarkMode}
                />
              ) : null}
              <View style={styles.btnNext}>
                {isLoading ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: Dimensions.get('screen').width - 40,

                    }}>
                    <Text style={styles.textBtn}>Guardando
                    </Text>
                    <ActivityIndicator size="large" color="#efefef" />
                  </View>
                ) : (
                  <TouchableOpacity onPress={guardarBoleta}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: Dimensions.get('screen').width - 40,

                      }}>
                      <Text style={styles.textBtn}>Solicitar permiso</Text>
                      {/* <Ionicons name='ios-paper-plane' size={16} /> */}
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.btnCancel}>
                <TouchableOpacity onPress={cancelBtn}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                    }}>
                    <AntDesign
                      name="arrowleft"
                      size={16}
                      color={isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_COLOR}
                    />
                    <Text
                      style={[
                        styles.textBtn,
                        {
                          color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_COLOR,
                          marginLeft: 5,
                        },
                      ]}>
                      Atras
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <ScrollView>
              <View
                style={{
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}>
                <Text
                  style={{
                    color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                    fontWeight: '600',
                  }}>
                  Paso 1/2
                </Text>
              </View>

              <View>
                <Text
                  style={[
                    styles.label,
                    {
                      color: isDarkMode
                        ? PRIMARY_TEXT_DARK_LIGHT
                        : PRIMARY_TEXT_LIGHT,
                    },
                  ]}>
                  Tipo permiso:
                </Text>
              </View>
              {queryLicenses.isSuccess && (
                <SelectBoleta
                  data={queryLicenses.data}
                  setSelectValue={setTypeValue}
                  isDarkMode={isDarkMode}
                  value={value}
                />
              )}
              <View style={styles.groupInput}>
                <Text
                  style={[
                    styles.label,
                    {
                      color: isDarkMode
                        ? PRIMARY_TEXT_DARK_LIGHT
                        : PRIMARY_TEXT_LIGHT,
                    },
                  ]}>
                  Motivo/justificación:
                </Text>
                <TextInput
                  placeholder="Descripción"
                  placeholderTextColor="#666"
                  textAlign="left"
                  multiline
                  numberOfLines={3}
                  value={justificacion}
                  onChangeText={text => setJustificacion(text)}
                  style={[
                    styles.inputText,
                    {
                      color: isDarkMode
                        ? PRIMARY_TEXT_DARK
                        : PRIMARY_TEXT_LIGHT,
                    },
                  ]}
                />
              </View>
              {tieneLugar > 0 ? (
                <View style={styles.groupInput}>
                  <Text
                    style={[
                      styles.label,
                      {
                        color: isDarkMode
                          ? PRIMARY_TEXT_DARK_LIGHT
                          : PRIMARY_TEXT_LIGHT,
                      },
                    ]}>
                    Lugar/destino:
                  </Text>

                  <TextInput
                    placeholder="Lugar"
                    placeholderTextColor="#666"
                    value={lugar}
                    onChangeText={text => setLugar(text)}
                    style={[
                      styles.inputText,
                      {
                        color: isDarkMode
                          ? PRIMARY_TEXT_DARK
                          : PRIMARY_TEXT_LIGHT,
                      },
                    ]}
                  />
                </View>
              ) : null}
              <View style={styles.groupDateTime}>
                <View style={styles.groupInput}>
                  <Text
                    style={[
                      styles.label,
                      {
                        color: isDarkMode
                          ? PRIMARY_TEXT_DARK_LIGHT
                          : PRIMARY_TEXT_LIGHT,
                      },
                    ]}>
                    Fecha Inicio:
                  </Text>
                  <TouchableOpacity onPress={() => setOpen(true)}>
                    <View style={[styles.datetime, {}]}>
                      <AntDesign name="calendar" size={20} color="#666" />
                      <Text
                        style={[
                          styles.txtDateTime,
                          {
                            color: isDarkMode
                              ? PRIMARY_TEXT_DARK
                              : PRIMARY_TEXT_LIGHT,
                          },
                        ]}>
                        {fechaInicio}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {open && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      onChange={onChangeFechaInicio}
                      themeVariant={isDarkMode ? "dark" : "light"}
                    />
                  )}
                  {/* <DatePicker
                    key="fecha_ini"
                    title={'Fecha inicio:'}
                    confirmText="Aceptar"
                    cancelText="Cancelar"
                    modal
                    open={open}
                    date={date}
                    onConfirm={date => {
                      setOpen(false);
                      setDate(date);
                      const fechaInicio = moment(date);
                      setFechaInicio(fechaInicio.format('DD-MM-YYYY'));
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                    locale="es"
                    mode="date"
                    theme={isDarkMode ? 'dark' : 'light'}
                    textColor={
                      isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT
                    }
                  /> */}
                </View>

                {tieneHorario > 0 ? (
                  <View style={styles.groupInput}>
                    <Text
                      style={[
                        styles.label,
                        {
                          color: isDarkMode
                            ? PRIMARY_TEXT_DARK_LIGHT
                            : PRIMARY_TEXT_LIGHT,
                        },
                      ]}>
                      Hora Inicio:
                    </Text>
                    <TouchableOpacity onPress={() => setOpen3(true)}>
                      <View style={[styles.datetime, {}]}>
                        <AntDesign name="clockcircleo" size={20} color="#666" />
                        <Text
                          style={[
                            styles.txtDateTime,
                            {
                              color: isDarkMode
                                ? PRIMARY_TEXT_DARK
                                : PRIMARY_TEXT_LIGHT,
                            },
                          ]}>
                          {horaInicio}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    {open3 && (
                      <DateTimePicker
                        testID="hora_inicio"
                        value={new Date()}
                        onChange={onChangeHoraInicio}
                        mode='time'
                        is24Hour={true}
                        themeVariant={isDarkMode ? "dark" : "light"}
                      />
                    )}
                    {/* <DatePicker
                      key="hora_inicio"
                      title={'Hora inicio:'}
                      confirmText="Aceptar"
                      cancelText="Cancelar"
                      modal
                      open={open3}
                      date={date3}
                      onConfirm={date => {
                        setOpen3(false);
                        setDate3(date);
                        const horaInicio = moment(date);
                        setHoraInicio(horaInicio.format('HH:mm'));
                      }}
                      onCancel={() => {
                        setOpen3(false);
                      }}
                      mode="time"
                      is24hourSource
                      minuteInterval={5}
                      locale="es"
                      style={{
                        backgroundColor: isDarkMode
                          ? BACKGROUND_PRIMARY_DARK
                          : BACKGROUND_PRIMARY_LIGHT,
                      }}
                      theme={isDarkMode ? 'dark' : 'light'}
                      textColor={
                        isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT
                      }
                    /> */}
                  </View>
                ) : null}
              </View>
              {tieneHorario != 2 ? (
                <View style={styles.groupDateTime}>
                  <View style={styles.groupInput}>
                    <Text
                      style={[
                        styles.label,
                        {
                          color: isDarkMode
                            ? PRIMARY_TEXT_DARK_LIGHT
                            : PRIMARY_TEXT_LIGHT,
                        },
                      ]}>
                      Fecha Fin:
                    </Text>

                    <TouchableOpacity onPress={() => setOpen2(true)}>
                      <View style={[styles.datetime, {}]}>
                        <AntDesign name="calendar" size={20} color="#666" />
                        <Text
                          style={[
                            styles.txtDateTime,
                            {
                              color: isDarkMode
                                ? PRIMARY_TEXT_DARK
                                : PRIMARY_TEXT_LIGHT,
                            },
                          ]}>
                          {fechaFin}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    {/*  <DatePicker
                      key="fecha_fin"
                      title={'Fecha fin:'}
                      confirmText="Aceptar"
                      cancelText="Cancelar"
                      modal
                      open={open2}
                      date={date2}
                      onConfirm={date => {
                        setOpen2(false);
                        setDate2(date);
                        const fechaFin = moment(date);
                        setFechaFin(fechaFin.format('DD-MM-YYYY'));
                      }}
                      onCancel={() => {
                        setOpen2(false);
                      }}
                      mode="date"
                      locale="es"
                      theme={isDarkMode ? 'dark' : 'light'}
                      textColor={
                        isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT
                      }
                    /> */}
                  </View>
                  {tieneHorario > 0 ? (
                    <View style={styles.groupInput}>
                      <Text
                        style={[
                          styles.label,
                          {
                            color: isDarkMode
                              ? PRIMARY_TEXT_DARK_LIGHT
                              : PRIMARY_TEXT_LIGHT,
                          },
                        ]}>
                        Hora Fin:
                      </Text>
                      <TouchableOpacity onPress={() => setOpen4(true)}>
                        <View style={[styles.datetime]}>
                          <AntDesign
                            name="clockcircleo"
                            size={20}
                            color="#666"
                          />
                          <Text
                            style={[
                              styles.txtDateTime,
                              {
                                color: isDarkMode
                                  ? PRIMARY_TEXT_DARK
                                  : PRIMARY_TEXT_LIGHT,
                              },
                            ]}>
                            {horaFin}
                          </Text>
                        </View>
                      </TouchableOpacity>
                      {/* <DatePicker
                        key="hora_fin"
                        title={'Hora fin:'}
                        confirmText="Aceptar"
                        cancelText="Cancelar"
                        modal
                        open={open4}
                        date={date4}
                        is24hourSource
                        onConfirm={date => {
                          setOpen4(false);
                          setDate4(date);
                          const fechaFin = moment(date);
                          setHoraFin(fechaFin.format('HH:mm'));
                        }}
                        onCancel={() => {
                          setOpen4(false);
                        }}
                        minuteInterval={5}
                        mode="time"
                        locale="es"
                        theme={isDarkMode ? 'dark' : 'light'}
                        textColor={
                          isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT
                        }
                      /> */}
                    </View>
                  ) : null}
                </View>
              ) : null}
              <View style={styles.btnNext}>
                {isLoading ? (
                  <ActivityIndicator size="large" color="#efefef" />
                ) : (
                  <TouchableOpacity onPress={validarForm}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: Dimensions.get('screen').width - 40,
                      }}>
                      <Text style={styles.textBtn}>Siguiente </Text>
                      <AntDesign
                        size={16}
                        name={'arrowright'}
                        color={'white'}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              <View>
                {esVacacion > 0 ? (
                  <View style={{
                    marginBottom: 10
                  }}>
                    <Text style={{
                      color: isDarkMode
                        ? PRIMARY_TEXT_DARK
                        : PRIMARY_TEXT_LIGHT,
                      fontWeight: '600'
                    }} >
                      Vacaciones disponibles:
                    </Text>
                    {esVacacion && queryVacations?.data.length > 0 ? (
                      <View
                        style={{
                          flexDirection: 'column',
                        }}>
                        {queryVacations.data?.map((v, i) => (
                          <View
                            key={i}
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              padding: 10,
                              borderBottomWidth: 1,
                              borderBottomColor: isDarkMode
                                ? "#666"
                                : '#ccc',
                            }}>
                            <Text
                              style={{
                                color: isDarkMode
                                  ? PRIMARY_TEXT_DARK
                                  : PRIMARY_TEXT_LIGHT,
                              }}>
                              {v.gestion_ini}-{v.gestion_fin}
                            </Text>
                            <Text
                              style={{
                                color: isDarkMode
                                  ? PRIMARY_TEXT_DARK
                                  : PRIMARY_TEXT_LIGHT,
                              }}>
                              {v.total_dias}
                            </Text>
                          </View>
                        ))}
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            padding: 10,
                          }}>
                          <Text
                            style={{
                              color: isDarkMode
                                ? PRIMARY_TEXT_DARK
                                : PRIMARY_TEXT_LIGHT,
                            }}></Text>
                          <Text
                            style={{
                              color: isDarkMode
                                ? PRIMARY_TEXT_DARK
                                : PRIMARY_TEXT_LIGHT,
                              fontWeight: 'bold',
                            }}>
                            Total: {totalVacations(queryVacations.data)}
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <Text
                        style={{
                          color: isDarkMode
                            ? PRIMARY_TEXT_DARK
                            : PRIMARY_TEXT_LIGHT,
                          marginVertical: 10,
                          marginLeft: 10
                        }}>
                        - No cuenta con vacaciones disponibles
                      </Text>
                    )}
                  </View>
                ) : null}
              </View>
            </ScrollView>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  groupInput: {
    marginTop: 23,
  },
  groupDateTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 11,
    marginBottom: 3,
  },
  inputText: {
    borderBottomColor: '#666',
    borderBottomWidth: 1,
    height: 40,
    paddingLeft: 5,
    paddingTop: 5,
  },
  datetime: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 150,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#666',
  },
  btnNext: {
    width: Dimensions.get('window').width - 40,
    backgroundColor: PRIMARY_COLOR,
    marginVertical: 20,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  btnCancel: {
    width: Dimensions.get('window').width - 40,
    borderColor: PRIMARY_COLOR,
    borderWidth: 1,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  textBtn: {
    marginRight: 5,
    alignSelf: 'center',
    textAlign: 'center',
    color: '#fefefe',
    fontWeight: 'bold',
  },
});
export default BoletaScreen;
