import { actionChannel } from "redux-saga/effects";

// ACTION TYPES
export const INSTAGRAM_LOGIN_REQUEST = "auth/INSTAGRAM_LOGIN";
export const INSTAGRAM_LOGIN_SUCCESS = "auth/INSTAGRAM_LOGIN_SUCCESS";
export const INSTAGRAM_LOGIN_FAIL = "auth/INSTAGRAM_LOGIN_FAIL";
export const REFRESH_TOKEN = "auth/REFRESH_TOKEN";

const initialState = {
  accessToken: null,
  errorMessage: null,
  main_token: null
};

// REDUCER
export default function (state = initialState, action = {}) {
  switch (action.type) {
    case INSTAGRAM_LOGIN_REQUEST: {
      return {
        ...state,
        isFetching: true
      };
    }
    case INSTAGRAM_LOGIN_SUCCESS: {
      const { data } = action;
      console.log('reducer',data)
      const {main_token} = data
      return {
        ...state,
        data,
        main_token,
        isFetching: false
      };
    }
    case REFRESH_TOKEN: {
      const { accessToken, refreshToken } = action;
      return {
        ...state,
        accessToken,
        refreshToken
      };
    }
    default:
    return state;
}
}
// ACTION CREATORS
export function doInstagramLogin(token,result) {
  return { type: INSTAGRAM_LOGIN_REQUEST, token,result };
}
export function instagramLoginSuccess(data) {
  return { type: INSTAGRAM_LOGIN_SUCCESS, data };
}
export function doRefreshToken(accessToken, refreshToken) {
  return {
    type: REFRESH_TOKEN,
    accessToken,
    refreshToken
  };
}
