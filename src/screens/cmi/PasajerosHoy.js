import { StyleSheet, Text, View } from 'react-native';
import SocketLine from '../../components/SocketLine';

import { useSelector } from 'react-redux';
import Title from '../../components/Title';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  BACKGROUND_DARK,
  BACKGROUND_LIGHT,
  BACKGROUND_PRIMARY_DARK,
  BACKGROUND_PRIMARY_LIGHT,
  PRIMARY_TEXT_LIGHT,
} from '../../utils/constants';
import SocketPasajerosHoy from '../../components/SocketPasajerosHoy';
const PasajerosHoy = ({ navigation }) => {
  const { isDarkMode } = useSelector(state => state.auth);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? BACKGROUND_DARK : BACKGROUND_LIGHT,
      }}>
      <View>
        <Title title={'Pasajeros hoy'} navigation={navigation} />
        <View
          style={{
            /* backgroundColor: isDarkMode
              ? BACKGROUND_PRIMARY_DARK
              : "#ddd", */
            marginHorizontal: 60,
            borderRadius: 10,
            alignContent: 'center',
            alignItems: 'center',
            marginTop: -20,
          }}>

          <SocketPasajerosHoy />
        </View>
        <SocketLine />
      </View>
    </SafeAreaView>
  );
};

export default PasajerosHoy;

const styles = StyleSheet.create({});
