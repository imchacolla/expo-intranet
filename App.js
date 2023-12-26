import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch, Provider } from 'react-redux';
import axios from 'axios'
import { store } from './src/store';
//providers
import SocketContext from './src/contexts/SocketContext'
import { AuthProvider, useAuth } from './src/contexts/AuthContext'
//navigation
import DrawerMenu from './src/navigation/DrawerMenu';

axios.defaults.baseURL = 'https://cmisocket.miteleferico.bo/api/v1'

export default function App() {

  const InitialLayout = () => {
    const { authState, isLoading } = useAuth()
    useEffect(() => {

      if (authState.authenticated) {
        console.log('authenticated')
        //router.replace('home')
      } else if (!authState.authenticated) {
        console.log('not authenticated')
        //router.replace('/login')
      }
    }, [authState.authenticated])

    return <View ><Text>App</Text></View>
  }

  return (
    <Provider store={store}>
      <AuthProvider>
        <InitialLayout />
      </AuthProvider>
      <StatusBar style="auto" />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
