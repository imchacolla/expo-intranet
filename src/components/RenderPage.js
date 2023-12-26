/* import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import {SafeAreaView} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Title from './Title';
import {
  PRIMARY_COLOR,
  PRIMARY_TEXT_DARK,
  PRIMARY_TEXT_LIGHT,
  BACKGROUND_DARK,
  BACKGROUND_LIGHT,
} from '../utils/constants';
import {Appearance} from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const RenderPage = ({route, navigation}) => {
  const anuncio = route.params.html;
  const source = {
    html:
      `<div style='color: '#000'; line-height: normal !important; >` +
      anuncio.attributes.contenido +
      `</div>`,
  };
  const colorScheme = Appearance.getColorScheme();

  const {width, height} = useWindowDimensions();
  const {isDarkMode, loadingTheme} = useSelector(state => state.auth);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: BACKGROUND_LIGHT,
      }}>
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 10,
          paddingBottom: 4,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            width: 40,
            height: 40,
            padding: 0,
            //marginLeft: Dimensions.get('window').width - 80,
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <AntDesign
            name="left"
            size={32}
            color={colorScheme === 'dark' ? '#EFEFEF' : '#333'}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={[
          {
            flex: 1,
            paddingHorizontal: 10,
            backgroundColor: 'white',
          },
        ]}>
        <View>
          <RenderHtml
            contentWidth={width}
            contentHeight={height}
            source={source}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

 
export default RenderPage; */