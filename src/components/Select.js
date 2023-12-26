import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  PRIMARY_TEXT,
  PRIMARY_COLOR,
  PRIMARY_TEXT_DARK,
  PRIMARY_TEXT_LIGHT,
  PRIMARY_TEXT_DARK_LIGHT,
  BACKGROUND_DARK,
  BACKGROUND_LIGHT,
  BACKGROUND_PRIMARY_DARK,
  BACKGROUND_PRIMARY_LIGHT,
} from '../utils/constants';

const Select = ({data, isDarkMode, setSelectValue, value}) => {
  const [isFocus, setIsFocus] = useState(false);

  const renderItem = (item, index) => {
    return (
      <View style={styles.item}>
        <Text
          style={[
            styles.textItem,
            {
              color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
            },
          ]}>
          {item.label}
        </Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color={PRIMARY_COLOR}
            name="check"
            size={20}
          />
        )}
      </View>
    );
  };
  return (
    <View>
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && {
            borderColor: 'blue',
            color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
          },
        ]}
        autoScroll
        placeholderStyle={{
          color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
          left: 10,
        }}
        selectedTextStyle={{
          color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
          textAlign: 'left',
          //left: 10,
        }}
        containerStyle={{
          backgroundColor: isDarkMode
            ? BACKGROUND_PRIMARY_DARK
            : BACKGROUND_PRIMARY_LIGHT,
          color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
        }}
        itemContainerStyle={{
          backgroundColor: isDarkMode
            ? BACKGROUND_PRIMARY_DARK
            : BACKGROUND_PRIMARY_LIGHT,
        }}
        renderItem={renderItem}
        itemTextStyle={{
          color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
        }}
        activeColor={{
          color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
        }}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        //search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setSelectValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  groupInput: {
    marginTop: 20,
  },
  groupDateTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textItem: {
    marginVertical: 1,
    marginLeft: 5,
  },
  textBtn: {
    width: Dimensions.get('window').width - 40,
    alignSelf: 'center',
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});
