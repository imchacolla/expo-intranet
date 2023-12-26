import React, {useState} from 'react';
import {Text, View, ActivityIndicator, useWindowDimensions} from 'react-native';
import {
  BACKGROUND_PRIMARY_LIGHT,
  PRIMARY_COLOR,
  PRIMARY_TEXT_DARK_LIGHT,
  PRIMARY_TEXT_DARK,
  SECONDARY_COLOR,
  BACKGROUND_PRIMARY_DARK,
  BACKGROUND_DARK,
} from '../utils/constants';
import {FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native';
//billetaje/chart-bar
const MonthSelect = ({setMonthValue, selected = 0, data, isDarkMode}) => {
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => setMonthValue(item.value)}>
        <View
          key={index}
          style={{
            backgroundColor:
              item.value === selected ? '#6634B6' : 'transparent',
            minWidth: 40,
            borderWidth: item.value === selected ? 0 : 1,
            borderColor: isDarkMode ? '#666' : '#6634B6',
            borderRadius: 16,
            marginHorizontal: 2,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 14,
              color:
                item.value === selected
                  ? 'white'
                  : isDarkMode
                  ? '#ccc'
                  : '#6634B6',
              fontWeight: item.value === selected ? '500' : '400',
              marginVertical: 3,
            }}>
            {item.label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        padding: 5,
      }}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginHorizontal: 5,
        }}>
        {data.map(item => {
          return (
            <TouchableOpacity
              key={item.value}
              style={{
                width: 48,
                margin: 2,
                padding: 3,
                //borderBottomColor: isDarkMode ? 'white' : 'black',
                borderColor: isDarkMode ? '#696969' : 'black',
                borderWidth: selected === item.value ? 0 : 1,
                borderRadius: 20,
                backgroundColor:
                  selected === item.value
                    ? isDarkMode
                      ? PRIMARY_COLOR
                      : PRIMARY_COLOR
                    : 'transparent',
              }}
              onPress={() => {
                setMonthValue(item.value);
                //bottomSheetRef.current?.close();
              }}>
              <Text
                style={{
                  color:
                    selected === item.value
                      ? isDarkMode
                        ? PRIMARY_TEXT_DARK
                        : 'white'
                      : isDarkMode
                      ? PRIMARY_TEXT_DARK
                      : '#525252',
                  fontSize: 14,
                  fontWeight: selected === item.value ? '500' : '400',
                  textAlign: 'center',
                }}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default MonthSelect;
