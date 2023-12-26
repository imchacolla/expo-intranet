//import liraries
import React, { useRef } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  BACKGROUND_DARK,
  BACKGROUND_PRIMARY_DARK,
  PRIMARY_COLOR,
  PRIMARY_TEXT_DARK,
  PRIMARY_TEXT_DARK_LIGHT,
  PRIMARY_TEXT_LIGHT,
} from '../utils/constants';
const FilterPersons = ({
  handleSetGerencia,
  selected,
  bottomSheetRef,
  isDarkMode,
}) => {
  const gerencias = [
    {id: 1, name: 'TODO'},
    {id: 2, name: 'GE'},
    {id: 3, name: 'GGE'},
    {id: 4, name: 'GOM'},
    {id: 5, name: 'GDP'},
    {id: 6, name: 'GAF'},
    {id: 7, name: 'GSUCT'},
    {id: 8, name: 'GJ'},
  ];

  return (
    <View>
      <Text
        style={{
          marginLeft: 10,
          color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
        }}>
        Gerencia:
      </Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginHorizontal: 20,
        }}>
        {gerencias.map(gerencia => {
          return (
            <TouchableOpacity
              key={gerencia.id}
              style={{
                width: 75,
                margin: 5,
                padding: 3,
                //borderBottomColor: isDarkMode ? 'white' : 'black',
                borderColor: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : 'black',
                borderWidth: selected === gerencia.name ? 0 : 1,
                borderRadius: 20,
                backgroundColor:
                  selected === gerencia.name
                    ? isDarkMode
                      ? PRIMARY_COLOR
                      : PRIMARY_COLOR
                    : 'transparent',
              }}
              onPress={() => {
                handleSetGerencia(gerencia.name);
                bottomSheetRef.current?.close();
              }}>
              <Text
                style={{
                  color:
                    selected === gerencia.name
                      ? isDarkMode
                        ? PRIMARY_TEXT_DARK
                        : "white"
                      : isDarkMode?PRIMARY_TEXT_DARK:PRIMARY_TEXT_LIGHT,
                  fontSize: 16,
                  fontWeight: selected === gerencia.name ? '500' : '400',
                  textAlign: 'center',
                }}>
                {gerencia.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default FilterPersons;
