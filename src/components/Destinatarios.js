import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Appearance,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  BACKGROUND_PRIMARY_DARK,
  BACKGROUND_PRIMARY_LIGHT,
  PRIMARY_COLOR,
  PRIMARY_TEXT_DARK,
  PRIMARY_TEXT_DARK_LIGHT,
  PRIMARY_TEXT_LIGHT,
} from '../utils/constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
//import lodash
import _ from 'lodash';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {xorBy} from 'lodash';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {BACKGROUND_DARK, BACKGROUND_LIGHT} from '../utils/constants';

import Icon from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

const Destinatarios = ({ data, event, selectedItems, isDarkMode }) => {

  //const [selectedItems, setSelectedItems] = useState([]);

  const items = [
    // this is the parent or 'item'
    {
      name: '¿Quien(es) autorizará(n) el permiso?',
      id: 0,
      // these are the children or 'sub items'
      children: data,
    },
  ];  
  return (
    <SafeAreaView>
    <View style={{ marginLeft: -10, borderBottomWidth: 1, borderBottomColor: "#666" }}>
      <SectionedMultiSelect
        items={items}
        IconRenderer={Icon}
        uniqueKey="id"
        subKey="children"
        selectText="Aprobador"
        selectedText="seleccionados"
        confirmText="Aceptar"
        showDropDowns={false}
        single={data.length < 2}
        onSelectedItemsChange={event}
        selectedItems={selectedItems}
        showCancelButton={true}
        readOnlyHeadings={true}
        searchPlaceholderText="Buscar destinatario"
        //searchIconComponent=
        hideSearch
        highlightChildren
        //renderSelectText={renderSelectText}
        colors={{

          primary: PRIMARY_COLOR,
          subItemBackground: isDarkMode
            ? BACKGROUND_PRIMARY_DARK
            : BACKGROUND_PRIMARY_LIGHT,
          searchPlaceholderTextColors: isDarkMode
            ? PRIMARY_COLOR
            : PRIMARY_TEXT_LIGHT,
          searchSelectionColor: isDarkMode
            ? PRIMARY_COLOR
            : PRIMARY_TEXT_LIGHT,
          chipColor: isDarkMode ? '#ccc' : '#333',

          itemBackground: isDarkMode ? '#111111' : BACKGROUND_PRIMARY_LIGHT,
          selectToggleTextColor: isDarkMode ? 'white' : '#333',
        }}
        styles={{
          container: {
            backgroundColor: isDarkMode
              ? BACKGROUND_PRIMARY_DARK
              : BACKGROUND_PRIMARY_LIGHT,
          },
          searchTextInput: {
            color: isDarkMode ? '#efefef' : '#333',
          },
          chipText: {
            maxWidth: Dimensions.get('screen').width - 90,
          },
          itemText: {
            color: isDarkMode ? '#ccc' : 'black',
          },
          selectedItemText: {
            color: isDarkMode ? 'white' : 'black',
          },
          subItemText: {
            color: isDarkMode ? '#ccc' : 'black',
          },
          item: {
            paddingHorizontal: 10,
          },
          subItem: {
            paddingHorizontal: 10,
          },
          selectedItem: {
            backgroundColor: '#c04c4c',
          },
          selectedSubItem: {
            backgroundColor: 'rgba(0,0,0,0.1)',
          },
          selectedSubItemText: {
            color: isDarkMode ? 'white' : 'black',
            fontWeight: 'bold',
          },
          scrollView: {paddingHorizontal: 0},
          searchBar: {
            backgroundColor: isDarkMode ? BACKGROUND_PRIMARY_DARK : BACKGROUND_PRIMARY_LIGHT,
            borderBottomColor: isDarkMode ? "#444" : "#ccc",
            borderBottomWidth: 1
          }
        }}
      />
    </View>
    </SafeAreaView>
  );
};

export default Destinatarios;
