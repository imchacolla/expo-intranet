import React, { useEffect, useState } from 'react'
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native'

import axios from 'axios'

// solution that worked for me:
// npm install punycode --save

// and then in node_modules go to the directory tr46 > index.js

// // Replace this:
// const punycode = require('punycode');
// // With this:
// const punycode = require('punycode/');

// basically just add a trailing forward slash

import Markdown from 'react-native-markdown-display'
import AntDesign from 'react-native-vector-icons/AntDesign'

import {
  BACKGROUND_DARK,
  BACKGROUND_LIGHT,
  PRIMARY_COLOR,
  PRIMARY_TEXT_DARK,
  PRIMARY_TEXT_LIGHT,
} from '../utils/constants'

const Editor = ({ route, navigation }) => {
  const { id, user, isDarkMode } = route.params
  const [edit, setEdit] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const fetchDescription = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`/intranet/comunicados/${id}`)
      if (response.data?.data) {
        setTitle(response.data.data.titulo)
        setDescription(response.data.data.contenido)
      }
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
    }
  }
  //traer description comunicado
  useEffect(() => {
    fetchDescription()
  }, [])
  const markDownStyles = {
    body: {
      color: isDarkMode ? '#DADADA' : '#111',
    },
    // Headings
    heading1: {
      flexDirection: 'row',
      fontSize: 32,
    },
    heading2: {
      flexDirection: 'row',
      fontSize: 24,
    },
    heading3: {
      flexDirection: 'row',
      fontSize: 18,
    },
    heading4: {
      flexDirection: 'row',
      fontSize: 16,
    },
    heading5: {
      flexDirection: 'row',
      fontSize: 13,
    },
    heading6: {
      flexDirection: 'row',
      fontSize: 11,
    },

    // Horizontal Rule
    hr: {
      backgroundColor: '#4E4E4E',
      height: 1,
    },

    // Emphasis
    strong: {
      fontWeight: 'bold',
    },
    em: {
      fontStyle: 'italic',
    },
    s: {
      textDecorationLine: 'line-through',
    },

    // Blockquotes
    blockquote: {
      backgroundColor: '#F5F5F5',
      borderColor: '#CCC',
      borderLeftWidth: 4,
      marginLeft: 5,
      paddingHorizontal: 5,
    },

    // Lists
    bullet_list: {},
    ordered_list: {},
    list_item: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    // @pseudo class, does not have a unique render rule
    bullet_list_icon: {
      marginLeft: 10,
      marginRight: 10,
    },
    // @pseudo class, does not have a unique render rule
    bullet_list_content: {
      flex: 1,
    },
    // @pseudo class, does not have a unique render rule
    ordered_list_icon: {
      marginLeft: 10,
      marginRight: 10,
    },
    // @pseudo class, does not have a unique render rule
    ordered_list_content: {
      flex: 1,
    },

    // Tables
    table: {
      borderWidth: 1,
      borderColor: '#232222',
      borderRadius: 3,
    },
    thead: {},
    tbody: {},
    th: {
      flex: 1,
      padding: 5,
    },
    tr: {
      borderBottomWidth: 1,
      borderColor: '#232222',
      flexDirection: 'row',
    },
    td: {
      flex: 1,
      padding: 5,
    },

    // Links
    link: {
      textDecorationLine: 'underline',
    },
    blocklink: {
      flex: 1,
      borderColor: '#666',
      borderBottomWidth: 1,
    },

    // Images
    image: {
      flex: 1,
    },

    // Text Output
    text: {},
    textgroup: {},
    paragraph: {
      marginTop: 10,
      marginBottom: 10,
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      width: '100%',
    },
    hardbreak: {
      width: '100%',
      height: 1,
    },
    softbreak: {},

    // Believe these are never used but retained for completeness
    pre: {},
    inline: {},
    span: {},
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
          backgroundColor: isDarkMode ? BACKGROUND_DARK : BACKGROUND_LIGHT,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}
          style={{
            padding: 0,
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          <AntDesign
            name="left"
            size={32}
            color={isDarkMode ? '#EFEFEF' : '#333'}
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 5,
          }}
        >
          {/* <Pressable
            style={{
              backgroundColor: PRIMARY_COLOR,
              padding: 5,
              borderRadius: 20,
              width: 70,
            }}
          >
            <Text
              style={{
                color: '#f2f2f2',
                textAlign: 'center',
              }}
            >
              Guardar
            </Text>
            </Pressable> */}
          {/* {edit ? (
            <Pressable
              onPress={() => {
                setEdit(false)
              }}
              style={{
                backgroundColor: isDarkMode ? '#f2f2f2' : '#222',
                padding: 5,
                borderRadius: 20,
                width: 70,
              }}
            >
              <Text
                style={{
                  color: isDarkMode ? '#222' : '#f2f2f2',
                  textAlign: 'center',
                }}
              >
                Preview
              </Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                setEdit(true)
              }}
              style={{
                backgroundColor: isDarkMode ? '#f2f2f2' : '#222',
                padding: 5,
                borderRadius: 20,
                width: 70,
              }}
            >
              <Text
                style={{
                  color: isDarkMode ? '#222' : '#f2f2f2',
                  textAlign: 'center',
                }}
              >
                Editar
              </Text>
            </Pressable>
              )} */}
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 5,
          paddingBottom: 10,
          paddingTop: 5,
        }}
      >
        {edit ? (
          <TextInput
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: isDarkMode ? '#F5F5F5' : '#141414',
            }}
            placeholder="Titulo"
            placeholderTextColor={
              isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT
            }
            onChangeText={(text) => setTitle(text)}
            value={title}
          />
        ) : (
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: isDarkMode ? '#F5F5F5' : '#141414',
            }}
          >
            {title}
          </Text>
        )}
      </View>

      <ScrollView
        //contentInsetAdjustmentBehavior="automatic"
        style={{
          paddingHorizontal: 5,
          flex: 1,
        }}
      >
        {edit ? (
          <TextInput
            style={{
              color: isDarkMode ? '#F5F5F5' : '#141414',
              flex: 1,
            }}
            multiline
            numberOfLines={50}
            onChangeText={(text) => setDescription(text)}
            value={description}
          />
        ) : (
          <Markdown style={markDownStyles}>{description}</Markdown>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Editor

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
