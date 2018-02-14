import axios  from "utils/axios"
import store from "store"

async function refreshTokenService() {
   const currentStore = store.getState()
   console.log('CURRENT STOOORE',currentStore)
   console.log('REFRESH TOKEN SERVİSİ DOGRU OLAN',currentStore.auth.refreshToken)
   const params = {
      grant_type: "refresh_token",
      client_id: currentStore.auth.data.clientID,
      client_secret: currentStore.auth.data.clientSecret,
      refresh_token: currentStore.auth.refreshToken
   }
   const response =  axios.get("/oauth/v2/token", { params })
   return response
}

export default refreshTokenService
