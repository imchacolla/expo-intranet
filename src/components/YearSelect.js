import React, {useState} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import {
  BACKGROUND_PRIMARY_LIGHT,
  PRIMARY_COLOR,
  PRIMARY_TEXT_DARK_LIGHT,
  PRIMARY_TEXT_DARK,
  PRIMARY_TEXT_LIGHT,
  SECONDARY_COLOR,
} from '../utils/constants';
import {FlatList} from 'react-native';

const YearSelect = ({setYearValue, selected = 0, data, isDarkMode}) => {
  return (
    <View
      style={{
        //backgroundColor: "white",
        padding: 5,
        /* margin: 5,
        borderRadius: 10, */
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
                margin: 5,
                padding: 3,
                //borderBottomColor: isDarkMode ? 'white' : 'black',
                borderColor: isDarkMode ? '#696969' : '#818181',
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
                setYearValue(item.value);
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
      {/* <FlatList
        data={data}
        horizontal
        initialNumToRender={5}
        renderItem={({item, index}) => renderItem({item, index})}
        keyExtractor={item => item.value}
        showsHorizontalScrollIndicator={false}
      /> */}
    </View>
  );
};

export default YearSelect;
