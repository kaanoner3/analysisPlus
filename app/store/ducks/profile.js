import { actionChannel } from "redux-saga/effects"

// ACTION TYPES
export const PROFILE_DATA_FETCH_REQEUST = "profile/PROFILE_DATA_FETCH_REQEUST"
export const PROFILE_DATA_FETCH_SUCCESS = "profile/PROFILE_DATA_FETCH_SUCCESS"
export const PROFILE_DATA_FETCH_FAIL = "profile/PROFILE_DATA_FETCH_FAIL"
export const PROFILE_DATA_DIFF_STATISTIC = "profile/PROFILE_DATA_DIFF_STATISTIC"

const initialState = {
   accessToken: null,
   errorMessage: null,
   isFetching: null,
   profileData: null,
   diff: null
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
            profileData: { user: { ...user }, statistic: { ...statistic } },
            isFetching: false
         }
      }
      case PROFILE_DATA_FETCH_FAIL: {
         return {
            ...state,
            error: action.errorMessage
         }
      }
      case PROFILE_DATA_DIFF_STATISTIC: {
         const copyState = Object.assign({}, state.profileData.statistic)

         return {
            ...state,
            diff: {
               not_follow_by_me: copyState.not_follow_by_me - action.newData.not_follow_by_me,
               not_follow_me: copyState.not_follow_me - action.newData.not_follow_me,
               gained_followers: copyState.gained_followers - action.newData.gained_followers,
               losted_followers: copyState.losted_followers - action.newData.losted_followers,
               deleted_comments: copyState.deleted_comments - action.newData.deleted_comments,
               profile_visitors: copyState.profile_visitors - action.newData.profile_visitors,
               stalkers: copyState.stalkers - action.newData.stalkers,
               user_blocking_me: copyState.user_blocking_me - action.newData.user_blocking_me
            }
         }
      }
      default:
         return state
   }
}
// ACTIONS
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
export function calculateDiff(newData) {
   return {
      type: PROFILE_DATA_DIFF_STATISTIC,
      newData
   }
}
