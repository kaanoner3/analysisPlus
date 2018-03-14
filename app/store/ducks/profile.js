import { actionChannel } from "redux-saga/effects"

// ACTION TYPES
export const PROFILE_DATA_FETCH_REQEUST = "profile/PROFILE_DATA_FETCH_REQEUST"
export const PROFILE_DATA_FETCH_SUCCESS = "profile/PROFILE_DATA_FETCH_SUCCESS"
export const PROFILE_DATA_FETCH_FAIL = "profile/PROFILE_DATA_FETCH_FAIL"
export const PROFILE_DATA_DIFF_STATISTIC = "profile/PROFILE_DATA_DIFF_STATISTIC"

const initialState = {
   error: false,
   isFetching: null,
   profileData: {
      user: {
         bio: "",
         backgroundPic: "",
         counts: {
            media: 0,
            follows: 0,
            followed_by: 0
         },
         full_name: "",
         id: "",
         profile_picture: "",
         username: ""
      },
      vipData: {
         isVip: false,
         vipData: null
      },
      statistic: {
         deleted_comments: 0,
         gained_followers: 0,
         losted_followers: 0,
         not_follow_by_me: 0,
         not_follow_me: 0,
         profile_visitors: 0,
         stalkers: 0,
         user_blocking_me: 0
      }
   },
   diff: {
      not_follow_by_me: 0,
      not_follow_me: 0,
      gained_followers: 0,
      losted_followers: 0,
      deleted_comments: 0,
      profile_visitors: 0,
      stalkers: 0,
      user_blocking_me: 0
   }
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
         const { instagram_user, statistic, lastest_media, user } = action.data
         if (user.vip_time > 0) {
            isVip = true
         } else {
            isVip = false
         }
         return {
            ...state,
            profileData: {
               user: { ...instagram_user, backgroundPic: lastest_media.images.standard_resolution.url },
               statistic: { ...statistic },
               vipData: { ...user, isVip }
            },
            error: false,
            isFetching: false
         }
      }
      case PROFILE_DATA_FETCH_FAIL: {
         return {
            ...state,
            error: action.error,
            isFetching: false
         }
      }
      case PROFILE_DATA_DIFF_STATISTIC: {
         if (
            state.profileData.statistic.gained_followers === 0 &&
            state.profileData.statistic.losted_followers === 0 &&
            state.profileData.statistic.not_follow_by_me === 0 &&
            state.profileData.statistic.not_follow_me === 0
         ) {
            return {
               ...state,
               diff: {
                  not_follow_by_me: 0,
                  not_follow_me: 0,
                  gained_followers: 0,
                  losted_followers: 0,
                  deleted_comments: 0,
                  profile_visitors: 0,
                  stalkers: 0,
                  user_blocking_me: 0
               }
            }
         } else {
            const copyState = Object.assign({}, state.profileData)
            return {
               ...state,
               diff: {
                  not_follow_by_me: copyState.statistic.not_follow_by_me - action.newData.not_follow_by_me,
                  not_follow_me: copyState.statistic.not_follow_me - action.newData.not_follow_me,
                  gained_followers: copyState.statistic.gained_followers - action.newData.gained_followers,
                  losted_followers: copyState.statistic.losted_followers - action.newData.losted_followers,
                  deleted_comments: copyState.statistic.deleted_comments - action.newData.deleted_comments,
                  profile_visitors: copyState.statistic.profile_visitors - action.newData.profile_visitors,
                  stalkers: copyState.statistic.stalkers - action.newData.stalkers,
                  user_blocking_me: copyState.statistic.user_blocking_me - action.newData.user_blocking_me
               }
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
