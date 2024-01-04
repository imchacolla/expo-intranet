import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import AntDesign from 'react-native-vector-icons/AntDesign'
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
} from '../utils/constants'

const SelectBoleta = ({ data, isDarkMode, setSelectValue, value }) => {
  const [isFocus, setIsFocus] = useState(false)
  const renderItem = (item, index) => {
    return (
      <View
        style={[
          styles.item,
          {
            borderBottomColor: isDarkMode ? '#222' : '#efefef',
            borderBottomWidth: 0,
            marginHorizontal: 5,
            backgroundColor:
              item.id === value
                ? isDarkMode
                  ? '#222'
                  : '#efefef'
                : 'transparent',
            borderRadius: 5,
            paddingVertical: 2,
            paddingHorizontal: 1,
            //borderBottomWidth: 1,
            //borderBottomColor: '#ccc',
          },
        ]}
      >
        <Text
          style={[
            styles.textItem,
            {
              color:
                item.id === value
                  ? isDarkMode
                    ? PRIMARY_TEXT_DARK
                    : PRIMARY_TEXT_LIGHT
                  : isDarkMode
                  ? PRIMARY_TEXT_DARK_LIGHT
                  : PRIMARY_TEXT_LIGHT,
              fontWeight: item.id === value ? '500' : '400',
            },
          ]}
        >
          {item.name}
        </Text>
        {/* {item.id === value && (
          <AntDesign
            style={styles.icon}
            color={PRIMARY_COLOR}
            name="check"
            size={20}
          />
        )} */}
      </View>
    )
  }
  return (
    <View
      style={{
        borderBottomColor: isDarkMode ? '#666' : PRIMARY_TEXT_LIGHT,
        borderBottomWidth: 1,
      }}
    >
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
          left: 5,
          maxHeight: 40,
        }}
        selectedTextStyle={{
          color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT,
          textAlign: 'left',
          maxHeight: 40,
          fontSize: 14,
        }}
        containerStyle={{
          backgroundColor: isDarkMode
            ? BACKGROUND_PRIMARY_DARK
            : BACKGROUND_PRIMARY_LIGHT,
          color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
          borderWidth: 0,
          padding: 3,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
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
        labelField="name"
        valueField="id"
        placeholder={!isFocus ? 'Seleccione' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setSelectValue(item.id)
          setIsFocus(false)
        }}
      />
    </View>
  )
}

export default SelectBoleta

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
    marginVertical: 5,
    marginLeft: 5,
  },
  //   textBtn: {
  //     width: Dimensions.get('window').width - 40,
  //     alignSelf: 'center',
  //     textAlign: 'center',
  //     color: 'white',
  //     fontWeight: 'bold',
  //   },
})
