import "core-js/stable/atob";
// In App.js in a new project

import React, { useEffect, useRef } from 'react';

import {
  NavigationContainer,
  LightTheme,
  DarkTheme,
} from '@react-navigation/native';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { store } from './src/store';
//redux
import { useSelector, useDispatch, Provider } from 'react-redux';
//auth
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setUser, setOneSignalId } from './src/store/auth';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


//socket
import { SocketContext, socket } from './src/contexts/SocketContext';


//axios
import axios from 'axios';
axios.defaults.baseURL = 'https://cmisocket.miteleferico.bo/api/v1';
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

import { createDrawerNavigator } from '@react-navigation/drawer';

//screens
import HomeScreen from './src/screens/Home';
import Users from './src/screens/Users';
import Calendar from './src/screens/Calendar';
import LoginScreen from './src/screens/Login';
import DocumentsScreen from './src/screens/Documents';
import LicensesScreen from './src/screens/Licenses';
import SplashScreen from './src/screens/Splash';

//ICONS
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StatusBar, TouchableOpacity, StyleSheet } from 'react-native';

//One Signal


import {
  BACKGROUND_DARK,
  BACKGROUND_LIGHT,
  PRIMARY_COLOR,
  PRIMARY_TEXT_DARK_LIGHT,
} from './src/utils/constants';
import DrawerMenu from './src/navigation/DrawerMenu';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const StackList = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();



const App = () => {


  //OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  /*   OneSignal.initialize("21fcaba8-c1d4-4ff9-bc5b-aecc55946b24");
  
    // Also need enable notifications to complete OneSignal setup
    OneSignal.Notifications.requestPermission(true);
  
   */
  const RootNavigation = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = React.useState(true);
    const { loadingToken, isDarkMode, isLogged } = useSelector(
      state => state.auth,
    );
    //const scheme = useColorScheme();

    React.useEffect(() => {
      //register OneSignalId
      /*  OneSignal.getDeviceState().then(function (externalUserId) {
         dispatch(setOneSignalId(externalUserId.userId));
         //userID = externalUserId.userId;
         //console.log('userID: ', externalUserId.userId);
       }); */

      //dispatch(setOneSignalId(userId));

      const refreshToken = async token => {
        try {
          const response = await axios.post(
            '/auth/refresh',
            {},
            {
              headers: {
                Authorization: 'Bearer ' + token,
              },
            },
          );
          dispatch(setUser(response.data));
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          console.log(error);
        }
      };
      AsyncStorage.getItem('token').then(token => {
        //si el token es diferente de null entonces hacemos un refresh token
        if (token) {
          refreshToken(token);
        } else {
          setIsLoading(false);
        }
      });
    }, []);

    return (
      <>
        <StatusBar
          backgroundColor={
            isLogged
              ? isDarkMode
                ? BACKGROUND_DARK
                : BACKGROUND_LIGHT
              : PRIMARY_COLOR
          }
          //hidden={isLogged ? false : true}
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
        <NavigationContainer theme={isDarkMode ? DarkTheme : LightTheme}>
          {isLoading ? (
            <LoadingStack />
          ) : isLogged ? (
            <DrawerMenu />
          ) : (
            <AuthStack />
          )}
        </NavigationContainer>
      </>
    );
  };


  const AuthStack = () => {
    return (
      <StackList.Navigator
        screenOptions={({ navigation }) => ({
          headerShown: false,
        })}>
        <StackList.Screen name="Login" component={LoginScreen} />
      </StackList.Navigator>
    );
  };
  const LoadingStack = () => {
    return (
      <StackList.Navigator
        screenOptions={({ navigation }) => ({
          headerShown: false,
        })}>
        <StackList.Screen name="Splash" component={SplashScreen} />
      </StackList.Navigator>
    );
  };

  /*  useEffect(() => {
     OneSignal.setLogLevel(6, 0);
     OneSignal.setAppId('21fcaba8-c1d4-4ff9-bc5b-aecc55946b24');
     //END OneSignal Init Code
 
     //Prompt for push on iOS
     OneSignal.promptForPushNotificationsWithUserResponse(response => {
       console.log('Prompt response:', response);
     });
 
     //Method for handling notifications received while app in foreground
     OneSignal.setNotificationWillShowInForegroundHandler(
       notificationReceivedEvent => {
         console.log(
           'OneSignal: notification will show in foreground:',
           notificationReceivedEvent,
         );
         let notification = notificationReceivedEvent.getNotification();
         console.log('notification: ', notification);
         const data = notification.additionalData;
         console.log('additionalData: ', data);
         notificationReceivedEvent.complete(notification);
       },
     );
 
     //Method for handling notifications opened
     OneSignal.setNotificationOpenedHandler(notification => {
       console.log('OneSignal: notification opened:', notification);
     });
 
     //identificar el uid
     let userID = null;
     OneSignal.getDeviceState().then(function (externalUserId) {
       //dispatch(setOneSignalId(externalUserId.userId));
       userID = externalUserId?.userId;
       console.log('externalUserId: ', externalUserId?.userId);
     });
   }, []);
  */
  /* 
  const oneSignalConnect = () => {
    const dispatch =
      //OneSignal Init Code
      OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId('21fcaba8-c1d4-4ff9-bc5b-aecc55946b24');
    //END OneSignal Init Code

    //Prompt for push on iOS
    OneSignal.promptForPushNotificationsWithUserResponse(response => {
      console.log('Prompt response:', response);
    });

    //Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler(
      notificationReceivedEvent => {
        console.log(
          'OneSignal: notification will show in foreground:',
          notificationReceivedEvent,
        );
        let notification = notificationReceivedEvent.getNotification();
        console.log('notification: ', notification);
        const data = notification.additionalData;
        console.log('additionalData: ', data);
        notificationReceivedEvent.complete(notification);
      },
    );

    //Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log('OneSignal: notification opened:', notification);
    });

    //identificar el uid
    let userID = null;
    OneSignal.getDeviceState().then(function (externalUserId) {
      //dispatch(setOneSignalId(externalUserId.userId));
      userID = externalUserId.userId;
      console.log('externalUserId: ', externalUserId.userId);
    });
  };
  
  //oneSiqueryClientgnalConnect(); */

  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <SocketContext.Provider value={socket}>
        <QueryClientProvider client={queryClient}>

          <SafeAreaProvider>
            <RootNavigation />
          </SafeAreaProvider>
        </QueryClientProvider>

      </SocketContext.Provider>
    </Provider>
  );
};;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 16,
  },
});

export default App;

