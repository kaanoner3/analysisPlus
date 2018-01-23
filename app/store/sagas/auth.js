import {
  call,
  put,
  takeEvery,
  takeLatest,
  all,
  take
} from "redux-saga/effects";
import { SignInService } from "services/LoginService";
import { accessToken as accessTokenService } from "services";
import { INSTAGRAM_LOGIN_REQUEST, instagramLoginSuccess } from "ducks/auth";
import { startHomeScreen, startLoginScreen } from "services/appStartHelper";
import { setUserIdentity } from "ducks/user";
//import { switchToUser, changeAppState } from "ducks/app";
import {
  revive, //get
  clear,
  persist //set
} from "services/LoginStorageService";

export function* login() {
  while (true) {
    try {
      const { token } = yield take(INSTAGRAM_LOGIN_REQUEST);
      console.log(token)
      const loginResponse = yield call(SignInService, token);
      console.log("responsee", loginResponse);
      const tokenData = yield call(
        accessTokenService,
        loginResponse.data.grant_type,
        loginResponse.data.client_id,
        loginResponse.data.client_secret,
        token
      );

      const succesfullLoginData = {
        instagram_token: token, //instagrama istek atarken
        main_token: tokenData.data.access_token, // servise istek atarken
        refresh_token: tokenData.data.refresh_token,
        instagram_id: loginResponse.data.instagram_id,
        clientID: loginResponse.data.client_id,
        clientSecret: loginResponse.data.client_secret
      };
      yield put(instagramLoginSuccess(succesfullLoginData));

      const user_id = loginResponse.data.instagram_id.toString();
      const app_token = tokenData.data.access_token.toString();
      persist({
        user_id,
        app_token
      });
      yield put(setUserIdentity(app_token, user_id));
      yield call(startHomeScreen);
    } catch (error) {
      console.log(error);
    }
  }
}
