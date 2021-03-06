import { actionChannel } from "redux-saga/effects"
export const USER_DATA_FETCH_REQUEST = "instagramUser/USER_DATA_FETCH_REQUEST"
export const USER_DATA_FETCH_SUCCESS = "instagramUser/USER_DATA_FETCH_SUCCESS"
export const USER_DATA_FETCH_FAIL = "instagramUser/USER_DATA_FETCH_FAIL"
export const USER_RELATIONSHIP_TO_OTHER_SUCCESS = "instagramUser/USER_RELATIONSHIP_TO_OTHER_SUCCESS"
export const USER_RELATIONSHIP_TO_OTHER_REQUEST = "instagramUser/USER_RELATIONSHIP_TO_OTHER_REQUEST"
export const ADD_DATA_TO_USER_LIST = "instagramUser/ADD_DATA_TO_USER_LIST"

const initialState = {
   errorMessage: null,
   isFetching: null,
   errorPage: false
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
         const { data } = action
         const sliceData = []
         if (Object.keys(data).length === 0 && data.constructor === Object) {
         } else {
            sliceData = data.slice(0, 20)
         }

         if (data) {
            errorPage = false
         } else {
            errorPage = true
         }
         return {
            ...state,
            userList: action.data,
            flatlistData: sliceData,
            isFetching: false,
            errorPage
         }
      }
      case ADD_DATA_TO_USER_LIST: {
         const { page } = action
         const copyUserList = Object.assign([], state.userList)
         const copyFlatlistData = Object.assign([], state.flatlistData)
         const extraData = copyUserList.slice(page * 20, (page + 1) * 20)
         const newflatlistData = copyFlatlistData.concat(extraData)
         return {
            ...state,
            flatlistData: newflatlistData
         }
      }
      case USER_DATA_FETCH_FAIL: {
         const { error } = action
         if (error.response !== undefined) {
            if (error.response.status !== 200) {
               errorPage = true
            } else {
               errorPage = false
            }
         } else {
            errorPage = true
         }

         return {
            ...state,
            errorMessage: action.errorMessage,
            errorPage,
            isFetching: false
         }
      }
      case USER_RELATIONSHIP_TO_OTHER_REQUEST: {
         return {
            ...state,
            relationFetch: true
         }
      }
      case USER_RELATIONSHIP_TO_OTHER_SUCCESS: {
         const { user_id } = action
         const data = action.data.data
         const copyUserList = Object.assign([], state.userList)
         const index = copyUserList.findIndex(u => u.id == user_id)
         const currentUser = copyUserList[index]
         const newUserList = state.userList.slice(0)
         if (data.outgoing_status === "none" && data.incoming_status === "followed_by") {
            currentUser["relationship"] = "none_followed_by"
            newUserList.splice(index, 1, currentUser)
         } else if (data.outgoing_status === "follows" && data.incoming_status === "none") {
            currentUser["relationship"] = "follows_none"
            newUserList.splice(index, 1, currentUser)
         } else if (data.outgoing_status === "follows" && data.incoming_status === "followed_by") {
            currentUser["relationship"] = "follows_followed_by"
            newUserList.splice(index, 1, currentUser)
         } else if (data.outgoing_status === "requested" && data.incoming_status === "none") {
            currentUser["relationship"] = "requested_none"
            newUserList.splice(index, 1, currentUser)
         } else if (data.outgoing_status === "follows" && data.incoming_status === "requsted_by") {
            currentUser["relationship"] = "follows_requested_by"
            newUserList.splice(index, 1, currentUser)
         } else if (data.outgoing_status === "requested" && data.incoming_status === "followed_by") {
            currentUser["relationship"] = "requested_followed_by"
            newUserList.splice(index, 1, currentUser)
         } else if (data.outgoing_status === "follows" && data.incoming_status === "requsted_by") {
            currentUser["relationship"] = "follows_requested_by"
            newUserList.splice(index, 1, currentUser)
         } else if (data.outgoing_status === "none" && data.incoming_status === "none") {
            currentUser["relationship"] = "none_none"
            newUserList.splice(index, 1, currentUser)
         }
         return {
            ...state,
            userList: newUserList
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

export function getUserDataFail(error) {
   return {
      type: USER_DATA_FETCH_FAIL,
      error
   }
}
export function ralationshipAnalysis(data, user_id) {
   return {
      type: USER_RELATIONSHIP_TO_OTHER_SUCCESS,
      data,
      user_id
   }
}
export function addDataToUserlist(page) {
   return {
      type: ADD_DATA_TO_USER_LIST,
      page
   }
}
