import { actionChannel } from "redux-saga/effects";

// ACTION TYPES
<<<<<<< HEAD
export const INSTAGRAM_LOGIN_REQUEST = "auth/INSTAGRAM_LOGIN";
export const INSTAGRAM_LOGIN_SUCCESS = "auth/INSTAGRAM_LOGIN_SUCCESS";
export const INSTAGRAM_LOGIN_FAIL = "auth/INSTAGRAM_LOGIN_FAIL";
export const REFRESH_TOKEN = "auth/REFRESH_TOKEN";

const initialState = {
  accessToken: null,
  errorMessage: null
};

// REDUCER
export default function (state = initialState, action = {}) {
  switch (action.type) {
    case INSTAGRAM_LOGIN_REQUEST: {
      return {
        ...state,
        accessToken: action.token,
        isFetching: true
      };
    }
    case INSTAGRAM_LOGIN_SUCCESS: {
      const { data } = action;
      return {
        ...state,
        data,
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
=======
export const INSTAGRAM_LOGIN = "auth/INSTAGRAM_LOGIN"
export const INSTAGRAM_LOGIN_SUCCESS = "auth/INSTAGRAM_LOGIN_SUCCESS"
export const INSTAGRAM_LOGIN_FAIL = "auth/INSTAGRAM_LOGIN_FAIL"
export const REFRESH_TOKEN = "auth/REFRESH_TOKEN"

const initialState = {
    accessToken: null,
    errorMessage: null
}

// REDUCER
export default function(state = initialState, action = {}) {
    switch (action.type) {
        case INSTAGRAM_LOGIN: {
            return {
                ...state,
                token,
                isFetching: true
            }
        }
        default:
            return state
>>>>>>> 4793eb0842ac953cb2149b947f407f53e2dd2cde
    }
}

// ACTION CREATORS
export function doInstagramLogin(token) {
<<<<<<< HEAD
  return { type: INSTAGRAM_LOGIN_REQUEST, token };
}
export function instagramLoginSuccess(data) {
  return { type: INSTAGRAM_LOGIN_SUCCESS, data };
=======
    console.log("geldi", token)
    return {
        type: INSTAGRAM_LOGIN,
        token
    }
>>>>>>> 4793eb0842ac953cb2149b947f407f53e2dd2cde
}
export function doRefreshToken(accessToken, refreshToken) {
<<<<<<< HEAD
  return {
    type: REFRESH_TOKEN,
    accessToken,
    refreshToken
  };
=======
    return {
        type: REFRESH_TOKEN,
        accessToken,
        refreshToken
    }
>>>>>>> 4793eb0842ac953cb2149b947f407f53e2dd2cde
}
