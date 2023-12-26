import { ImageBackground, StyleSheet, Linking, Dimensions, Pressable, Text, View, Alert } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useCallback } from 'react';
//import tanstack react query
import { useSelector } from 'react-redux';
import {
  useQuery
} from '@tanstack/react-query';
import moment from 'moment';
import {
  PRIMARY_COLOR,
  BACKGROUND_PRIMARY_DARK,
  BACKGROUND_PRIMARY_LIGHT,
} from '../utils/constants';
const url = 'https://adminweb.miteleferico.bo/api/anuncios-pimt';

const CarouselHome = ({ navigation, pause, loading }) => {
  //get dark mode
  const isDarkMode = useSelector(state => state.auth.isDarkMode);

  const getAnuncios = async () => {
    return await fetch(url)
      .then(response => response.json())
      .then(json => {
        return json.data;
      });
  };
  // Mutations

  const goPage = useCallback(async (data) => {
    const url = 'https://www.miteleferico.bo/intranet/' + data
    // Checking if the link is supported for links with custom URL scheme.

    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
    // by some browser in the mobile
    await Linking.openURL(url);

  }, [url]);

  const { isLoading, isError, data, error, isSuccess } = useQuery({
    queryKey: ['anuncios', loading],
    queryFn: getAnuncios,
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (isError) {
    return <Text>Error: {isError}</Text>;
  }
  const getFondo = (s) => {
    switch (s) {
      case 'aviso':
        return require('../../assets/anuncio.png')
        break;
      case 'capacitacion':
        return require('../../assets/capacitacion.png')
        break;
      case 'noticias':
        return require('../../assets/noticias.png')
        break;
      case 'curso':
        return require('../../assets/curso.png')
        break;
      case 'evento':
        return require('../../assets/evento.png')
        break;
      default:
        return require('../../assets/otros.png')
        break;
    }

  }
  const width = Dimensions.get('window').width;
  return (
    <View style={{ flex: 1 }}>
      {isSuccess && (
        <Carousel
          loop
          width={width}
          height={width / 2 + 80}
          autoPlay={pause}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          autoPlayInterval={2500}
          data={data}
          scrollAnimationDuration={2000}
          onSnapToItem={index => console.log('current index:', index)}
          renderItem={({ attribures, index }) => (
            <View
              style={{
                backgroundColor: isDarkMode ? BACKGROUND_PRIMARY_DARK : BACKGROUND_PRIMARY_LIGHT,
                flex: 1,
                borderRadius: 10,
              }}>
              <ImageBackground
                source={getFondo(data[index].attributes?.tipo)}
                resizeMode="cover"
                style={styles.image} >
                <View style={styles.event}>

                  <View >
                    <Text style={styles.textTitle}>
                      {data[index].attributes.titulo}
                    </Text>
                    <Text style={styles.textDescription}>
                      {data[index].attributes?.descripcion?.toString().substring(0, 100)}
                      {data[index].attributes?.descripcion?.toString().length > 100 ? '...' : ''}
                    </Text>
                  </View>
                  <Pressable onPress={() => goPage(data[index].attributes?.slug)}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        //borderColor: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_COLOR,
                        //borderWidth: 1,
                        padding: 2,
                        //borderRadius: 10,
                        marginTop: 8,
                        alignItems: 'center',

                      }}
                    >
                      <Text
                        style={{
                          color: 'white',
                        }}
                      >
                        {moment(data[index].attributes?.createdAt).format('DD/MM/YYYY')}
                      </Text >
                      <Text style={{
                        color: 'white',
                        borderBottomColor: 'white',
                        borderBottomWidth: 1
                      }}>Leer mas</Text>
                    </View>
                  </Pressable>
                </View>
              </ImageBackground>
            </View>
          )
          }
        />
      )}
    </View >
  );
};
const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    resizeMode: 'cover', // or 'stretch'
    borderRadius: 10
  },
  event: {
    //marginHorizontal: 10,
    backgroundColor: PRIMARY_COLOR,
    opacity: 0.80,
    //marginVertical: 10,
    padding: 10,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10

  },
  textTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    //lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5
  },
  textDescription: {
    color: '#ebebeb',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',

    //width: Dimensions.get('screen').width - 60
  },
});
export default CarouselHome;