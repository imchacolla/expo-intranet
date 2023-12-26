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
import Ionicons from 'react-native-vector-icons/Ionicons';
const LineSelect = ({setLineValue, selected = 0, data, isDarkMode}) => {
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
              key={item.id}
              style={{
                // width: 20,
                // height: 20,
                margin: 3,
                //padding: 3,
                //backgroundColor: item.color,
                //opacity: 0.7,
                //borderColor: item.color,
                //borderColor: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : 'black',
                //borderWidth: selected === item.id ? 0 : 1,
                borderRadius: 13,
                padding: 2,
                backgroundColor:
                  selected === item.id
                    ? isDarkMode
                      ? PRIMARY_COLOR
                      : PRIMARY_COLOR
                    : 'transparent',
              }}
              onPress={() => {
                setLineValue(item.id);
                //bottomSheetRef.current?.close();
              }}>
              <Ionicons name="radio-button-on" size={20} color={item.color} />
              {/* <Text
                style={{
                  color:
                    selected === item.id
                      ? isDarkMode
                        ? PRIMARY_TEXT_DARK
                        : 'white'
                      : item.color,
                  fontSize: 10,
                  fontWeight: selected === item.id ? '500' : '400',
                  textAlign: 'center',
                }}>
                {item.name}
              </Text> */}
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

export default LineSelect;
