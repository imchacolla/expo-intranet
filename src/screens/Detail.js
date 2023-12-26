import React from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  ImageBackground,
  Pressable,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
//IMPOERT REACT REDUX
import {useSelector} from 'react-redux';
import {windowWidth, windowHeight} from '../utils/Dimentions';
//import {SharedElement} from 'react-navigation-shared-element'; //CONSTANTS COLORS
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { MotiView, MotiText } from 'moti'
//CONSTANTS COLORS
import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  TERTIARY_COLOR,
  PRIMARY_BACKGROUND,
  //PRIMARY_TEXT,
  BACKGROUND_PRIMARY_DARK,
  BACKGROUND_PRIMARY_LIGHT,
  PRIMARY_TEXT_DARK,
  PRIMARY_TEXT_LIGHT,
  BACKGROUND_DARK,
  BACKGROUND_LIGHT,
} from '../utils/constants';
import {SafeAreaView} from 'react-native-safe-area-context';

//import * as Animatable from 'react-native-animatable';
//const AnimatableScrollView = Animatable.createAnimatableComponent(ScrollView);

const animation = {
  0: {opacity: 0, translateX: 20},
  1: {opacity: 1, translateX: 0},
};

const DetailScreen = ({route, navigation}) => {
  const {
    nombre,
    cargo,
    ci,
    e_mail_inst,
    estado,
    departamento,
    denominacion,
    gerencia,
    sueldo,
    fecha_baja,
    fecha_nac,
    id,
  } = route.params.item;
  const item = route.params.item;
  const {isDarkMode, rol, user} = useSelector(state => state.auth);  

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? BACKGROUND_DARK : BACKGROUND_LIGHT,
      }}>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginTop: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              width: 40,
              height: 40,
              padding: 0,
              marginLeft: Dimensions.get('window').width - 60,
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <AntDesign
              name="close"
              size={32}
              color={isDarkMode ? '#EFEFEF' : '#333'}
            />
          </TouchableOpacity>

          <Text
            style={{
              textAlign: 'center',
              color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
            }}
          />
        </View>
        <MotiView
          from={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{
            type: 'timing',
            duration: 1350,
          }}
          style={styles.perfil}>
          <Image
            source={{
              uri: 'https://rrhh.miteleferico.bo/api/foto?c=' + ci,
            }}
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
              marginRight: 5,
              alignSelf: 'center',
            }}
          />
          <View
            style={{
              position: 'absolute',
              top: 145,
              left: 270,
              backgroundColor: estado > 0 ? '#37A36B' : '#C04545',
              width: 20,
              height: 20,
              borderRadius: 10,
            }}
          />
          <Text
            style={[
              styles.nombre,
              {color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT},
            ]}>
            {nombre}
          </Text>
          <Text
            style={[
              styles.cargo,
              {
                color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
              },
            ]}>
            {cargo}
          </Text>
          <Text
            style={[
              styles.email,
              {
                color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                top: item.nombre.length > 26 ? 270 : 250,
              },
            ]}>
            {e_mail_inst}
          </Text>
        </MotiView>

        <MotiView
          from={{translateX: -50}}
          animate={{translateX: 0}}
          transition={{
            type: 'timing',
            duration: 600,
          }}
          style={styles.description}>
          {user.rol_app > 5 && (
            <View style={styles.item}>
              <Text
                style={[
                  styles.subtitle,
                  {color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT},
                ]}>
                CI
              </Text>
              <Text
                style={[
                  styles.value,
                  {color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT},
                ]}>
                {ci}
              </Text>
            </View>
          )}
          {user.rol_app > 5 && (
            <View
              style={[
                styles.item,
                {color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT},
              ]}>
              <Text
                style={[
                  styles.subtitle,
                  {color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT},
                ]}>
                FECHA NACIMIENTO
              </Text>
              <Text
                style={[
                  styles.value,
                  {color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT},
                ]}>
                {fecha_nac}
              </Text>
            </View>
          )}
          {estado > 0 ? null : (
            <View style={styles.item}>
              <Text
                style={[
                  styles.subtitle,
                  {color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT},
                ]}>
                FECHA BAJA
              </Text>
              <Text
                style={[
                  styles.value,
                  {color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT},
                ]}>
                {fecha_baja}
              </Text>
            </View>
          )}
          <View style={styles.item}>
            <Text
              style={[
                styles.subtitle,
                {color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT},
              ]}>
              GERENCIA
            </Text>
            <Text
              style={[
                styles.value,
                {color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT},
              ]}>
              {gerencia}
            </Text>
          </View>
          <View style={styles.item}>
            <Text
              style={[
                styles.subtitle,
                {color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT},
              ]}>
              DEPARTAMENTO
            </Text>
            <Text
              style={[
                styles.value,
                {color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT},
              ]}>
              {departamento}
            </Text>
          </View>
          <View style={styles.item}>
            <Text
              style={[
                styles.subtitle,
                {color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT},
              ]}>
              DENOMINACION
            </Text>
            <Text
              style={[
                styles.value,
                {color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT},
              ]}>
              {denominacion}
            </Text>
          </View>
          {user.rol_app > 5 && (
            <View style={styles.item}>
              <Text
                style={[
                  styles.subtitle,
                  {color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT},
                ]}>
                SUELDO
              </Text>
              <Text
                style={[
                  styles.value,
                  {color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT},
                ]}>
                {sueldo}
              </Text>
            </View>
          )}
        </MotiView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },

  perfil: {
    width: windowWidth,
    position: 'absolute',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    top: 45,
  },
  foto: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  nombre: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    position: 'absolute',
    top: 210,
    alignSelf: 'center',
  },
  cargo: {
    fontSize: 14,
    textAlign: 'center',
    position: 'absolute',
    top: 235,
    alignSelf: 'center',
  },
  email: {
    fontSize: 14,
    fontWeight: '300',
    textAlign: 'center',
    position: 'absolute',
    position: 'absolute',
    //top: 260,
    alignSelf: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    width: windowWidth,
    height: 255,
  },
  status: {
    backgroundColor: 'red',
    width: windowWidth,
    height: 5,
    marginTop: 0,
  },
  description: {
    marginTop: 280,
    marginLeft: 20,
    width: windowWidth-50,
    paddingRight: 40,
    //justifyContent: 'flex-start',
  },
  item: {
    width: windowWidth,
    flexDirection: 'column',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default DetailScreen;
