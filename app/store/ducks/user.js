// Axios
// Login service
import { LoginStorageService } from "services";

const ACTION_SET_USER_IDENTITY = "ACTION_SET_USER_IDENTITY";

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case ACTION_SET_USER_IDENTITY:
      console.log("reducer", action);
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
  console.log("action geldi");
  return { type: ACTION_SET_USER_IDENTITY, token, id };
}
