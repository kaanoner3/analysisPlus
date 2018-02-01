export const USER_DETAIL_REQUEST = "userDetail/USER_DETAIL_REQUEST"
export const USER_DETAIL_SUCCESS = "userDetail/USER_DETAIL_SUCCESS"
export const USER_DETAIL_FAIL = "userDetail/USER_DETAIL_FAIL"
export const USER_BASE_DETAIL_SUCCESS = "userDetail/USER_BASE_DETAIL_SUCCESS"
export const USER_BASE_DETAIL_FAIL = "userDetail/USER_BASE_DETAIL_FAIL"
export const USER_MEDIA_DATA_SUCCESS = "userDetail/USER_MEDIA_DATA_SUCCESS"
export const USER_MEDIA_DATA_FAIL = "userDetail/USER_MEDIA_DATA_FAIL"
export const USER_ADD_MEDIA_DATA = "userDetail/USER_ADD_MEDIA_DATA"
export const USER_LIKES_DATA_SUCCESS = "userDetail/USER_LIKES_DATA_SUCCESS"

const initialState = {
   errorMessage: null,
   isFetching: null,
   relationshipToSelf: null
}
export default function(state = initialState, action = {}) {
   switch (action.type) {
      case USER_DETAIL_REQUEST:
         return {
            ...state,
            isFetching: true
         }
      case USER_BASE_DETAIL_SUCCESS: {
         const { baseData, relationshipData } = action
         return {
            ...state,
            userBaseDetail: baseData,
            relationshipToSelf: relationshipData
         }
      }
      case USER_LIKES_DATA_SUCCESS: {
         return {
            ...state,
            userLikesData: action.data
         }
      }
      case USER_DETAIL_SUCCESS: {
         return {
            ...state,
            isFetching: false
         }
      }
      case USER_MEDIA_DATA_SUCCESS: {
         const { mediaData, pagination } = action
         return {
            ...state,
            userMediaData: mediaData,
            pagination: pagination
         }
      }
      default:
         return state
   }
}

export function userDetailRequest(id, token) {
   return { type: USER_DETAIL_REQUEST, id, token }
}
export function userBaseDetailSuccess(baseData, relationshipData) {
   return { type: USER_BASE_DETAIL_SUCCESS, baseData, relationshipData }
}
export function userMediaDataSuccess(mediaData, pagination) {
   return { type: USER_MEDIA_DATA_SUCCESS, mediaData, pagination }
}
export function addMediaData(data) {
   return { type: USER_ADD_MEDIA_DATA, data }
}
export function userLikesDataSuccess(data) {
   return { type: USER_LIKES_DATA_SUCCESS, data }
}
export function userDetailSuccess() {
   return { type: USER_DETAIL_SUCCESS }
}
