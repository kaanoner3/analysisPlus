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

export function* login() {
  while (true) {
    try {
      const { token } = yield take(INSTAGRAM_LOGIN_REQUEST);
      const loginResponse = yield call(SignInService, token);

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
      yield put(instagramLoginSuccess,succesfullLoginData)
    } catch (error) {
      console.log(error);
    }
  }
}
