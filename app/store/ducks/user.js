// Axios
// Login service

const ACTION_SET_USER_IDENTITY = "ACTION_SET_USER_IDENTITY";

export default function (state = {}, action = {}) {
  switch (action.type) {
    case ACTION_SET_USER_IDENTITY:
      return {
        ...state,
        token: action.token,
        id: action.id
      };
    default:
      return state;
  }
}

export function setUserIdentity(token, id) {
  return { type: ACTION_SET_USER_IDENTITY, token, id };
}
