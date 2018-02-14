import axios from "axios"
import config from "config"
import { doRefreshToken } from "ducks/auth"
import { persist } from "./../store"
import store from "store"
import { refreshTokenService } from "services"
import { Navigation } from "react-native-navigation"

//axios.defaults.baseURL = config.axios.baseURL
const instance = axios.create({
   baseURL: "http://analysisplusapp.com/",
   timeout: 10000
})
instance.defaults.headers.common.Authorization = ""
instance.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"
instance.defaults.timeout = 10000

instance.interceptors.response.use(undefined, error => {
   // Do something with request error
   const originalRequest = error.config
   if (error.response) {
      if (error.response.status === 401 && !originalRequest._retry) {
         originalRequest._retry = true
         return refreshTokenService()
            .then(({ data }) => {
               console.log("data aq", data)
               store.dispatch(doRefreshToken(data.access_token, data.refresh_token))
               instance.defaults.headers.common.Authorization = `Bearer ${data.access_token}`
               console.log(`Bearer ${data.access_token}`)
               originalRequest.headers.Authorization = `Bearer ${data.access_token}`
               return axios(originalRequest)
            })
            .catch(err => {
               console.log("burası catch burdan cıkıs yok",err)
               persist.purge()
               Navigation.startSingleScreenApp({
                  screen: {
                     screen: "LoginScreen",
                     navigatorStyle: {
                        statusBarTextColorScheme: "light",
                        navBarHidden: true
                        //screenBackgroundColor: colors.mainColor,
                     }
                  }
               })
               // console.warn(err);
            })
      }
   }

   return Promise.reject(error)
})
export default instance

export function setToken(token) {
   instance.defaults.headers.common.Authorization = `Bearer ${token}`
}
