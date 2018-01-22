// ACTION TYPES
export const INSTAGRAM_LOGIN_REQUEST = "auth/INSTAGRAM_LOGIN";
export const INSTAGRAM_LOGIN_SUCCESS = "auth/INSTAGRAM_LOGIN_SUCCESS";
export const INSTAGRAM_LOGIN_FAIL = "auth/INSTAGRAM_LOGIN_FAIL";
export const REFRESH_TOKEN = "auth/REFRESH_TOKEN";

const initialState = {
  accessToken: null,
  errorMessage: null
};

// REDUCER
export default function(state = initialState, action = {}) {
  switch (action.type) {
    case INSTAGRAM_LOGIN_REQUEST: {
      return {
        ...state,
        accessToken: action.token,
        isFetching: true
      };
    }
    default:
      return state;
  }
}

// ACTION CREATORS
export function doInstagramLogin(token) {
  return {
    type: INSTAGRAM_LOGIN_REQUEST,
    token
  };
}

export function doRefreshToken(accessToken, refreshToken) {
  return {
    type: REFRESH_TOKEN,
    accessToken,
    refreshToken
  };
}
