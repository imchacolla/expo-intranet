import {
  ImageBackground,
  StyleSheet,
  Linking,
  Dimensions,
  Pressable,
  Text,
  View,
  Alert,
} from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { useCallback } from 'react'
//import tanstack react query
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import axios from 'axios'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import {
  PRIMARY_COLOR,
  BACKGROUND_PRIMARY_DARK,
  BACKGROUND_PRIMARY_LIGHT,
  BACKGROUND_DARK,
  BACKGROUND_LIGHT,
} from '../utils/constants'
//const url = 'https://adminweb.miteleferico.bo/api/anuncios-pimt'
//const url = '/intranet/comunicados'

const CarouselHome = ({ navigation, pause, loading }) => {
  //get dark mode
  const user = useSelector((state) => state.auth.user)
  const isDarkMode = useSelector((state) => state.auth.isDarkMode)

  const getAnuncios = async () => {
    const response = await axios.get('/intranet/comunicados-publicados')
    return response.data.data
  }
  // Mutations
  const goPage = useCallback(async (data) => {
    navigation.navigate('Editor', {
      id: data,
      user,
      isDarkMode,
    })
  }, [])

  const { isLoading, isError, data, error, isSuccess } = useQuery({
    queryKey: ['anuncios', loading],
    queryFn: getAnuncios,
  })

  if (isLoading) {
    return <Text>Loading...</Text>
  }
  if (isError) {
    return <Text>Error: {isError}</Text>
  }

  const width = Dimensions.get('window').width
  return (
    <View style={{ flex: 1 }}>
      {isSuccess && (
        <Carousel
          loop
          width={width}
          //height={width / 2 - 20}
          height={107}
          autoPlay={pause}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          autoPlayInterval={3000}
          data={data}
          scrollAnimationDuration={2000}
          //onSnapToItem={(index) => console.log('current index:', index)}
          renderItem={({ attribures, index }) => (
            <View
              style={{
                backgroundColor: isDarkMode
                  ? BACKGROUND_PRIMARY_DARK
                  : BACKGROUND_PRIMARY_LIGHT,
                flex: 1,
                borderRadius: 10,
              }}
            >
              <View style={{ flexDirection: 'row', gap: 5 }}>
                <View
                  style={{
                    width: 100,
                  }}
                >
                  <View
                    style={{
                      justifyContent: 'center',
                      textAlign: 'center',
                      flexDirection: 'column',
                      backgroundColor: '#2F3240',
                      borderTopStartRadius: 10,
                      padding: 5,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="calendar"
                      size={36}
                      color={'#eee'}
                      style={{ textAlign: 'center' }}
                    />
                    <Text
                      style={{
                        color: '#ffff',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 16,
                        textTransform: 'uppercase',
                      }}
                    >
                      {moment(data[index].fecha).format('MMM DD')}
                    </Text>
                  </View>
                  <Pressable onPress={() => goPage(data[index].id)}>
                    <View
                      style={{
                        justifyContent: 'center',
                        textAlign: 'center',
                        flexDirection: 'column',
                        backgroundColor: '#2F3240',
                        borderBottomStartRadius: 10,
                        height: 40,
                      }}
                    >
                      <Text
                        style={{
                          color: '#efefef',
                          textAlign: 'center',
                          fontWeight: '400',
                          fontSize: 16,
                          marginVertical: 5,
                          textDecorationLine: 'underline',
                        }}
                      >
                        Leer mas
                      </Text>
                    </View>
                  </Pressable>
                </View>
                <View
                  style={[
                    styles.event,
                    {
                      width: Dimensions.get('screen').width - 110,
                    },
                  ]}
                >
                  <View>
                    <Text
                      style={[
                        styles.textTitle,
                        {
                          color: isDarkMode ? '#f2f2f2' : '#333',
                        },
                      ]}
                    >
                      {data[index].titulo}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'stretch',
    borderRadius: 20,
  },
  event: {
    //marginHorizontal: 10,
    //backgroundColor: PRIMARY_COLOR,
    opacity: 0.8,
    //marginVertical: 10,
    padding: 5,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
  },
  textTitle: {
    //color: '#FFFFFF',
    fontSize: 16,
    //lineHeight: 84,
    fontWeight: '600',
    textAlign: 'left',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  textDescription: {
    color: '#ebebeb',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',

    //width: Dimensions.get('screen').width - 60
  },
})
export default CarouselHome
