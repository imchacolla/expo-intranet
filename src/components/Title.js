import React, { memo, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authLogin, logout, setModeDark } from '../store/auth'
import {
  StyleSheet,
  View,
  Pressable,
  Image,
  Text,
  Platform,
} from 'react-native'

//CONSTANTS
import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  TERTIARY_COLOR,
  PRIMARY_TEXT,
  PRIMARY_BACKGROUND,
  PRIMARY_TEXT_DARK,
  PRIMARY_BACKGROUND_DARK,
  PRIMARY_TEXT_LIGHT,
  PRIMARY_TEXT_DARK_LIGHT,
} from '../utils/constants'
import { TouchableOpacity } from 'react-native-gesture-handler'
import IonIcons from 'react-native-vector-icons/Ionicons'

const Title = ({ title, subtitle = '', navigation }) => {
  const ci = useSelector((state) => state.auth.ci)
  const isDarkMode = useSelector((state) => state.auth.isDarkMode)
  return (
    <View style={styles.title}>
      <View
        style={{
          marginLeft: 10,
          width: 35,
          height: 35,
          //marginTop: Platform.OS === 'android' ? 0 : 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer()
          }}
        >
          <IonIcons
            name="menu-outline"
            size={30}
            color={isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT}
          />
        </TouchableOpacity>
      </View>
      <View style={{ marginLeft: 5 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: isDarkMode ? PRIMARY_TEXT_DARK : PRIMARY_TEXT,
          }}
        >
          {title}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={styles.avatarBorder}>
          <Image
            size="small"
            style={{ width: 32, height: 32, borderRadius: 16 }}
            source={{ uri: 'https://rrhh.miteleferico.bo/api/foto?c=' + ci }}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    paddingRight: 10,
    paddingBottom: 10,
  },
  avatarBorder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    padding: 5,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
  },
})
export default memo(Title)
