import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
const AuthContext = createContext()
const TOKEN_KEY = 'app-token'
const API_URL = 'https://cmisocket.miteleferico/api/v1'


export const useAuth = () => {
  return useContext(AuthContext)
}
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    authenticated: null,
  })
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadToken = async () => {
      setLoading(true)
      const token = await SecureStore.getItemAsync(TOKEN_KEY)
      if (token) {


        setAuthState({
          token: token,
          authenticated: true,

        })
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        const response = await axios.post(`/auth/me`)
        if (response?.data?.data) {
          setUser(response.data.user)
        } else {
          setAuthState({
            token: null,
            authenticated: false,

          })
        }

      }

      setLoading(false)
    }
    loadToken()
  }, [])

  const login = async (email, password) => {
    try {
      setLoading(true)
      const response = await axios.post(`/auth/login`, {
        email,
        password,
        oneSignalId: '',
      })
      console.log(response?.data)
      setAuthState({
        token: response.data.token,
        authenticated: true,
      })
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${response.data.token}`
      await SecureStore.setItemAsync(TOKEN_KEY, response.data.token)

      setLoading(false)
    } catch (e) {
      console.log(e)
      setLoading(false)
      return { error: true, msg: e.response?.data.error }
    }
  }

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY)
    axios.defaults.headers.common['Authorization'] = ''
    setAuthState({
      token: null,
      authenticated: false,
    })
  }

  const value = {
    onLogin: login,
    onLogout: logout,
    isLoading: loading,
    authState,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
