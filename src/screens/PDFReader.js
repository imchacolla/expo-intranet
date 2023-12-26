import React from 'react';
//import react-redux
import {useDispatch, useSelector} from 'react-redux';
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Pdf from 'react-native-pdf';
import {
  BACKGROUND_PRIMARY_DARK,
  BACKGROUND_DARK,
  BACKGROUND_LIGHT,
  BACKGROUND_PRIMARY_LIGHT,
  PRIMARY_COLOR,
  PRIMARY_TEXT_DARK,
  PRIMARY_TEXT_LIGHT,
} from '../utils/constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
const PDFScreen = ({route, navigation}) => {
  const [isComplete, setIsComplete] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [total, setTotal] = React.useState(1);
  const {link, id} = route.params.item;
  const isDarkMode = useSelector(state => state.auth.isDarkMode);
  const [data, setData] = React.useState(null);

  /*  const getData = async () => {
    setIsComplete(false);
    try {
      const response = await axios.get('/intranet/download/' + id);
      //const newData = data.concat (response.data.data);
      setData(response.data);
      setIsComplete(true);
    } catch (error) {
      console.log(error);
      setIsComplete(false);
    }
    setIsComplete(false);
  };

  React.useEffect(() => {
    console.log('traer datos');
    //getData();
  }, []); */

  /* const source = {
    uri: 'data:application/pdf;base64,' + data,
    cache: true,
  };  */
  const source = {
    uri: 'https://cmisocket.miteleferico.bo/api/v1/intranet/download/' + id,
    cache: true,
  };
  //const source = require('./test.pdf');  // ios only
  //const source = {uri:'bundle-assets://test.pdf' };
  //const source = {uri:'file:///sdcard/test.pdf'};
  //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};
  //const source = {uri:"content://com.example.blobs/xxxxxxxx-...?offset=0&size=xxx"};
  //const source = {uri:"blob:xxxxxxxx-...?offset=0&size=xxx"};

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
          },
        ]}>
        {isComplete ? (
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
                color={isDarkMode ? '#EFEFEF' : '#333'}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
              }}>
              Página: {page}/{total}
            </Text>
          </View>
        ) : (
          <View
            style={
              {
                /* flex: 1,
              justifyContent: 'center',
              alignItems: 'center', */
              }
            }>
            {/* <Text
              style={{
                color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
              }}>
              Cargando...
            </Text> */}
            {/*  <ActivityIndicator size="large" color={PRIMARY_COLOR} /> */}
          </View>
        )}
        <Pdf
          trustAllCerts={false}
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            setTotal(numberOfPages);
            setIsComplete(true);
            console.log('Complete');
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            setPage(page);
            console.log(`Current page: ${page}`);
          }}
          onError={error => {
            Alert.alert('ERROR', error.toString());
            navigation.goBack();
            console.log(error);
          }}
          onPressLink={uri => {
            console.log(`Link pressed: ${uri}`);
          }}
          enablePaging={true}
          onLoadProgress={percent => {
            //console.log(percent);
          }}
          renderActivityIndicator={percent => {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
                    marginBottom: 10,
                  }}>
                  Cargando ...
                </Text>
                <ActivityIndicator size="large" color={PRIMARY_COLOR} />
              </View>
            );
          }}
          style={[
            styles.pdf,
            {
              backgroundColor: isDarkMode ? BACKGROUND_DARK : BACKGROUND_LIGHT,
            },
          ]}
        />
      </View>
    </SafeAreaView>
  );
};

export default PDFScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('screen').width,
  },
});
