import { useState, useEffect, useRef } from 'react'
import { Platform } from 'react-native'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'

export const usePushNotification = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  })

  const [expoPushToken, setExpoPushToken] = useState(undefined)
  const [notification, setNotification] = useState(undefined)
  const notificationListener = useRef(null)
  const responseListener = useRef(null)

  async function registerForPushNotificationAsync() {
    let token
    if (Device.isDevice) {
      const {
        status: existingStatus,
      } = await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        alert('failed to het push token for push notification')
        return
      }
      console.log('project id', Constants.expoConfig?.extra?.eas.projectId)
      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas.projectId,
      })
      //console.log('token', token)
    } else {
      alert('Must use physical device for push notification')
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#392ED47C',
      })
    }
    return token
  }
  useEffect(() => {
    registerForPushNotificationAsync().then((token) => {
      setExpoPushToken(token)
    })
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification)
      },
    )

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response)
      },
    )

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])
  return {
    expoPushToken,
    notification,
  }
}
