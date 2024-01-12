import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { jwtDecode } from 'jwt-decode'
const TOKEN_KEY = 'token'
export const authLogin = createAsyncThunk(
  'auth/authLogin',
  async (params, { dispatch, getState }) => {
    const { email, password, expo } = params
    const { oneSignalId } = getState().auth
    const response = await axios.post('/auth/login', {
      email,
      password,
      oneSignalId,
      expo,
    })

    //console.log(oneSignalId)
    console.log(oneSignalId)
    console.log(response.data)
    if (response.status === 200) {
      //usuario autenticado
      if (response.data.success) {
        await AsyncStorage.setItem('token', response.data.token)

        //console.log(value)
        //await AsyncStorage.setItem ('user', JSON.stringify (response.data.user));
      } else {
        //usuario no autenticado
        console.log(response.data.error)
      }
    }

    return response.data
  },
)
export const authRecovery = createAsyncThunk(
  'auth/authRecovery',
  async (params, { dispatch, getState }) => {
    const { emailRecovery } = params
    const response = await axios.post('/auth/forgotpassword', {
      email: emailRecovery,
    })

    if (response.status == 200) {
      //usuario autenticado
      if (response.data.success) {
      } else {
        //usuario no autenticado
        console.log(response.data.error)
      }
    }

    return response.data
  },
)

export const refresh = createAsyncThunk(
  'auth/refresh',
  async (token, { dispatch, getState }) => {
    //mientras hac una llamada seteamos dark mode

    /* console.log ('token', token); */
    const response = await axios.post(
      '/auth/access-token',
      {},
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    )
    //console.log (response.data);
    return response.data
  },
)

export const authAdapter = createEntityAdapter()

const authSlice = createSlice({
  name: 'auth',
  initialState: authAdapter.getInitialState({
    loading: false,
    loadingToken: true,
    data: [],
    username: '',
    password: '',
    token: '',
    error: '',
    rol: '',
    id: 0,
    id_rrhh: 0,
    isLogged: false,
    ci: '',
    isDarkMode: false,
    loadingTheme: false,
    user: {
      rol_app: 6,
      e_mail_inst: '',
    },
    oneSignalId: '',
    refreshPage: null,
  }),
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload
    },
    setUser(state, action) {
      state.isLogged = true
      state.isDarkMode = action.payload.theme
      state.loadingToken = true
      state.id = action.payload.id
      state.ci = action.payload.ci
      state.rol = action.payload.rol
      state.user = jwtDecode(action.payload.token)
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + action.payload.token
    },
    setOneSignalId(state, action) {
      state.oneSignalId = action.payload
    },
    logout(state) {
      state.isLogged = false
      state.token = ''
      state.id = 0
      state.id_rrhh = 0
      state.username = ''
      state.password = ''
      state.rol = ''
      state.error = ''
      state.user = null
      console.log('logout')
      AsyncStorage.removeItem('token')
    },

    getUser(state, payload) {
      state.id = payload.id
      state.id_rrhh = payload.id_rrhh
      state.username = payload.username
    },
    setRefreshPage(state, action) {
      state.refreshPage = action.payload
    },
    setTheme(state, action) {
      // console.log(action);
      state.isDarkMode = action.payload
    },
    setModeDark(state) {
      state.isDarkMode = !state.isDarkMode
      console.log('cambiar schema')
      //AsyncStorage.setItem ('isDarkMode', state.isDarkMode.toString ());
    },

    checkModeDark(state) {
      AsyncStorage.getItemr('isDarkMode')
        .then((value) => {
          console.log('value', value)
          if (value == 'true') {
            state.isDarkMode = true
          }
        })
        .catch((error) => {
          state.isDarkMode = false
          console.log(error)
        })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authLogin.pending, (state) => {
      //console.log ('pending');
      state.loading = true
    })
    builder.addCase(authLogin.fulfilled, (state, action) => {
      state.isDarkMode = action.payload.theme
      state.loading = false
      state.isLogged = true
      state.id = action.payload.id
      state.id_rrhh = action.payload.id_rrhh
      state.token = action.payload.token
      state.ci = action.payload.ci
      state.rol = action.payload.rol_app
      state.user = jwtDecode(action.payload.token)
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + action.payload.token
    })
    builder.addCase(authLogin.rejected, (state) => {
      state.loading = false
    })
    //Recovery
    builder.addCase(authRecovery.pending, (state) => {
      state.loading = true
    })
    builder.addCase(authRecovery.fulfilled, (state, action) => {
      state.loading = false
    })

    builder.addCase(authRecovery.rejected, (state) => {
      state.loading = false
    })

    //TOKEN
    builder.addCase(refresh.pending, (state) => {
      //console.log ('pending');
      state.loadingToken = true
    })
    builder.addCase(refresh.fulfilled, (state, action) => {
      state.isDarkMode = action.payload.theme
      state.id = action.payload.id
      state.ci = action.payload.userData.ci
      state.token = action.payload.access_token
      state.rol = action.payload.rol_app
      state.loadingToken = false
      state.isLogged = true
      state.user = jwtDecode(action.payload.token)
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + action.payload.access_token
    })
    builder.addCase(refresh.rejected, (state) => {
      state.loadingToken = false
    })
  },
})

export const {
  //selectById: selectUserById,
  //selectIds: selectUserIds,
  //selectEntities: selectUserEntities,
  //selectAll: selectAllUsers,
  selectTotal: selectTotalUsers,
} = authAdapter.getSelectors((state) => state.auth)

//export reducers
export const {
  logout,
  checkModeDark,
  setModeDark,
  setTheme,
  setUser,
  setOneSignalId,
  setRefreshPage,
  //   setPageNumber,
  //   setTextSearch,
  //   setTextSearchEmpty,
} = authSlice.actions
export default authSlice.reducer
