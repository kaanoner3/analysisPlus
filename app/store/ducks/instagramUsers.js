import { actionChannel } from "redux-saga/effects"

// ACTION TYPES
export const USER_DATA_FETCH_REQUEST = "instagramUser/USER_DATA_FETCH_REQUEST"
export const USER_DATA_FETCH_SUCCESS = "instagramUser/USER_DATA_FETCH_SUCCESS"
export const USER_DATA_FETCH_FAIL = "instagramUser/USER_DATA_FETCH_FAIL"
export const USER_RELATIONSHIP_TO_OTHER_REQUEST = "instagramUser/USER_RELATIONSHIP_TO_OTHER_REQUEST"
export const USER_RELATIONSHIP_TO_OTHER_SUCCESS = "instagramUser/USER_RELATIONSHIP_TO_OTHER_SUCCESS"

const initialState = {
   errorMessage: null,
   isFetching: null
}

// REDUCER
export default function(state = initialState, action = {}) {
   switch (action.type) {
      case USER_DATA_FETCH_REQUEST: {
         return {
            ...state,
            isFetching: true
         }
      }
      case USER_DATA_FETCH_SUCCESS: {
         return {
            ...state,
            userList: action.data,
            isFetching: false
         }
      }
      case USER_DATA_FETCH_FAIL: {
         return {
            ...state,
            errorMessage: action.errorMessage
         }
      }
      case USER_RELATIONSHIP_TO_OTHER_REQUEST: {
          return {
              ...state,
              relationFetch: true
          }
      }
      case USER_RELATIONSHIP_TO_OTHER_SUCCESS: {
          return {
              ...state
          }
      }
      default:
         return state
   }
}
// ACTIONS
export function getUserDataRequest(token, serviceType) {
   return { type: USER_DATA_FETCH_REQUEST, token, serviceType }
}

export function getUserDataSuccess(data) {
   return { type: USER_DATA_FETCH_SUCCESS, data }
}

export function getUserDataFail(errorMessage) {
   return {
      type: USER_DATA_FETCH_FAIL,
      error: errorMessage
   }
}
export function ralationshipRequest(token,id){
    
}