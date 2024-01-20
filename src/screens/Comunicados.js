import React, { useEffect, useCallback, useState } from 'react'
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Pressable,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
  FlatList,
} from 'react-native'
import { useSelector } from 'react-redux'
import debounce from 'lodash/debounce'
import _ from 'lodash'
//import use query
import { useQuery } from '@tanstack/react-query'

import axios from 'axios'
import { useDispatch } from 'react-redux'
import Title from '../components/Title'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  PRIMARY_TEXT_DARK,
  PRIMARY_TEXT_LIGHT,
  BACKGROUND_DARK,
  BACKGROUND_LIGHT,
  BACKGROUND_PRIMARY_DARK,
  BACKGROUND_PRIMARY_LIGHT,
  PRIMARY_TEXT_DARK_LIGHT,
  TERTIARY_COLOR,
} from '../utils/constants'
//import dispatch
import { setRefreshPage } from '../store/auth'
import moment from 'moment'
const Comunicados = ({ route, navigation }) => {
  const dispatch = useDispatch()
  const refTextInputSearch = React.createRef()
  const [refresh, onRefresh] = React.useState(false)
  const { isDarkMode, refreshPage, user } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  //const [data, setData] = useState([]);
  const [filterData, setFilterData] = React.useState([])
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(100)
  const [q, setQ] = useState('')
  const [total, setTotal] = useState(0)
  const [uuid, setUuid] = useState(new Date())

  const getComunicados = async () => {
    const response = await axios.get('/intranet/comunicados')
    //console.log('response', response.data.data)
    return response.data.data
  }
  const queryLicenses = useQuery({
    queryKey: ['comunicados', refreshPage],
    queryFn: getComunicados,
  })
  useEffect(() => {
    if (queryLicenses.isSuccess) {
      setFilterData(queryLicenses?.data)
    }
  }, [queryLicenses?.data])

  const onEndReached = () => {
    if (page * perPage < total) {
      setPage(page + 1)
    }
    console.log('end reached')
  }

  const handleResetSearch = () => {
    //setData([]);
    setQ('')
    refTextInputSearch.current.clear()
  }

  const changeHandler = (q) => {
    setQ(q)
  }

  const debouncedChangeHandler = useCallback(debounce(changeHandler, 800), [])
  const getItem = (data, index) => {
    return data[index]
  }
  const emptyView = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
          }}
        >
          no se encontraron comunicados
        </Text>
      </View>
    )
  }
  const renderItem = ({ item, index }) => {
    return (
      <View
        key={index}
        style={{
          flexDirection: 'col',
          //alignContent: 'center',
          justifyContent: 'space-between',
          backgroundColor: isDarkMode
            ? BACKGROUND_PRIMARY_DARK
            : BACKGROUND_PRIMARY_LIGHT,
          padding: 8,
          marginVertical: 5,
          marginHorizontal: 5,
          borderRadius: 10,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('editor-comunicado', {
              id: item.id,
              user,
              isDarkMode,
            })
          }
        >
          <View style={styles.description}>
            <Text
              style={[
                styles.nombre,
                { color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT_LIGHT },
              ]}
            >
              {item.titulo}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 5,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 5,
                }}
              >
                <IonIcons
                  name="calendar-outline"
                  size={20}
                  color={isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : '#333'}
                />
                <Text
                  style={{
                    fontSize: 16,
                    marginLeft: 4,

                    color: isDarkMode
                      ? PRIMARY_TEXT_DARK_LIGHT
                      : PRIMARY_TEXT_LIGHT,
                  }}
                >
                  {moment(item.fecha).format('DD MMM YYYY')}
                </Text>
              </View>
              <View
                style={
                  {
                    // width: '100%',
                    //alignSelf: 'right',
                  }
                }
              >
                <Text
                  style={[
                    styles.fecha,
                    {
                      fontSize: 16,
                      textAlign: 'right',
                      color: isDarkMode
                        ? PRIMARY_TEXT_DARK_LIGHT
                        : PRIMARY_TEXT_LIGHT,
                    },
                  ]}
                >
                  {item.gerencia}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  const onRefreshHandle = () => {
    dispatch(setRefreshPage(new Date().toString()))
  }
  //busqueda
  useEffect(() => {
    if (queryLicenses.isSuccess) {
      const searchData = _.filter(queryLicenses.data, (item) => {
        return item.titulo.toLowerCase().includes(q.toLowerCase())
      })
      setFilterData(searchData)
    }
    //console.log('cantidad encontrada:', searchData.length)
  }, [q])
  const footerList = () => {
    return <View style={{ height: 75 }} />
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? BACKGROUND_DARK : BACKGROUND_LIGHT,
      }}
    >
      <View style={{ flex: 1 }}>
        <Title title="Comunicados" navigation={navigation} />
        <View
          style={[
            styles.viewSearch,
            {
              flexDirection: 'row',
            },
          ]}
        >
          <View
            style={{
              height: 40,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              margin: 0,
              backgroundColor: isDarkMode
                ? BACKGROUND_PRIMARY_DARK
                : BACKGROUND_PRIMARY_LIGHT,
              width: Dimensions.get('window').width - 25,
              padding: 10,
              borderRadius: 20,
            }}
          >
            <IonIcons color={TERTIARY_COLOR} name="search" size={20} />
            <TextInput
              ref={refTextInputSearch}
              style={styles.search}
              label="Buscar"
              placeholder="Buscar"
              placeholderTextColor={'#9c9c9c'}
              onChangeText={debouncedChangeHandler}
            />
            {q.length > 0 ? (
              <Pressable style={styles.btnSearch} onPress={handleResetSearch}>
                <IonIcons name="close-circle" color={'#9c9c9c'} size={26} />
              </Pressable>
            ) : null}
          </View>
        </View>

        {queryLicenses.isLoading ? (
          <ActivityIndicator
            size="large"
            color={PRIMARY_COLOR}
            style={styles.loader}
          />
        ) : (
          <FlatList
            data={filterData}
            initialNumToRender={10}
            renderItem={({ item, index }) => renderItem({ item, index })}
            keyExtractor={(item) => item.id}
            onEndReached={onEndReached}
            ListFooterComponent={footerList}
            ListEmptyComponent={emptyView}
            refreshing={refresh}
            onRefresh={onRefreshHandle}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

export default Comunicados

const styles = StyleSheet.create({
  loader: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  dataContainer: {
    flexDirection: 'row',
  },
  avatar: {
    marginRight: 5,
    marginLeft: 0,
  },
  nombre: {
    fontSize: 15,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  cargo: {
    fontSize: 12,
  },
  celular: {
    fontSize: 10,
    textAlign: 'center',
  },

  estadoText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  viewSearch: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  search: {
    height: 36,
    margin: 5,
    width: '89%',
    //borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    //backgroundColor: '#efefef',
    color: '#a7a7a7',
  },
  viewSearchInput: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    //backgroundColor: '#FFFFFF',
    margin: 5,
    borderRadius: 25,
    width: '80%',
    padding: 5,
  },

  btnSearch: {
    backgroundColor: 'transparent',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    marginLeft: -18,
    padding: 0,
  },
  totalText: {
    fontSize: 10,
  },
  description: {
    //flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    //alignItems: 'flex-start',
    //width: Dimensions.get('window').width - 20,
  },
  email: {
    fontSize: 10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {
      width: -4,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  interno: {
    fontSize: 10,
    fontWeight: '100',
    textAlign: 'center',
  },
  icon: {
    width: 26,
    height: 26,
  },
  tipo: {
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'left',
    color: SECONDARY_COLOR,
  },
  hora: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
})
