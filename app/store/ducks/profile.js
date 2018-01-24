import { actionChannel } from "redux-saga/effects"

// ACTION TYPES
export const PROFILE_DATA_FETCH_REQEUST = "profile/PROFILE_DATA_FETCH_REQEUST"
export const PROFILE_DATA_FETCH_SUCCESS = "profile/PROFILE_DATA_FETCH_SUCCESS"
export const PROFILE_DATA_FETCH_FAIL = "profile/PROFILE_DATA_FETCH_FAIL"

const initialState = {
   accessToken: null,
   errorMessage: null,
   isFetching: null,
   profileData: []
}

// REDUCER
export default function(state = initialState, action = {}) {
   switch (action.type) {
      case PROFILE_DATA_FETCH_REQEUST: {
         return {
            ...state,
            isFetching: true
         }
      }
      case PROFILE_DATA_FETCH_SUCCESS: {
         const { user, statistic } = action.data
         return {
            ...state,
            profileData: { user: { ...user }, statitic: { ...statistic } },
            isFetching: false
         }
      }
      case PROFILE_DATA_FETCH_FAIL: {
         return {
            ...state,
            error: action.errorMessage
         }
      }
      default:
         return state
   }
}
// ACTION CREATORS
export function getProfileDataRequest(token) {
   return { type: PROFILE_DATA_FETCH_REQEUST, token }
}
export function getProfileDataSuccess(data) {
   return { type: PROFILE_DATA_FETCH_SUCCESS, data }
}
export function getProfileDataFail(errorMessage) {
   return {
      type: PROFILE_DATA_FETCH_FAIL,
      error: errorMessage
   }
}
