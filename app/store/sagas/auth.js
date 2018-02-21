import { call, put, takeEvery, takeLatest, all, take } from "redux-saga/effects"
import { SignInService } from "services/LoginService"
import { accessToken as accessTokenService } from "services"
import { INSTAGRAM_LOGIN_REQUEST, instagramLoginSuccess, CHANGE_USER } from "ducks/auth"
//import { startHomeScreen, startLoginScreen } from "./../../../bootstrap/App";
import { setUser } from "ducks/user"
import { startHomeScreen, startLoginScreen } from "services/appStartHelper"
import { switchToUser } from "ducks/app"
import { setToken } from "utils/axios"
//import { switchToUser, changeAppState } from "ducks/app";
import {
   revive, //get
   clear,
   persist //set
} from "services/LoginStorageService"

export function* login() {
   while (true) {
      try {
         const { token, result } = yield take(INSTAGRAM_LOGIN_REQUEST)
         const loginResponse = yield call(SignInService, token, result)
         const tokenData = yield call(
            accessTokenService,
            loginResponse.data.grant_type,
            loginResponse.data.client_id,
            loginResponse.data.client_secret,
            token
         )

         const succesfullLoginData = {
            instagram_token: token, //instagrama istek atarken
            main_token: tokenData.data.access_token, // servise istek atarken
            refresh_token: tokenData.data.refresh_token,
            instagram_id: loginResponse.data.instagram_id,
            clientID: loginResponse.data.client_id,
            clientSecret: loginResponse.data.client_secret
         }
         yield put(instagramLoginSuccess(succesfullLoginData))

         const user_id = loginResponse.data.instagram_id.toString()
         const app_token = tokenData.data.access_token.toString()
         persist({
            user_id,
            app_token
         })
         yield put(
            setUser(
               loginResponse.data.instagram_id,
               token,
               tokenData.data.access_Token,
               result.username,
               result.password
            )
         )

         yield call(setToken, tokenData.data.access_token)
         yield call(startHomeScreen)
      } catch (error) {
         console.log(error)
      }
   }
}
export function* changeUser() {
   while (true) {
      try {
         const { instagram_token, username, password } = yield take(CHANGE_USER)
         const result = { username, password }
         const loginResponse = yield call(SignInService, instagram_token, result)
         const tokenData = yield call(
            accessTokenService,
            loginResponse.data.grant_type,
            loginResponse.data.client_id,
            loginResponse.data.client_secret,
            instagram_token
         )

         const succesfullLoginData = {
            instagram_token: instagram_token, //instagrama istek atarken
            main_token: tokenData.data.access_token, // servise istek atarken
            refresh_token: tokenData.data.refresh_token,
            instagram_id: loginResponse.data.instagram_id,
            clientID: loginResponse.data.client_id,
            clientSecret: loginResponse.data.client_secret
         }
         yield put(instagramLoginSuccess(succesfullLoginData))

         const user_id = loginResponse.data.instagram_id.toString()
         const app_token = tokenData.data.access_token.toString()
         persist({
            user_id,
            app_token
         })
         yield call(setToken, tokenData.data.access_token)
         yield call(startHomeScreen)
      } catch (error) {
         console.log(error)
      }
   }
}
