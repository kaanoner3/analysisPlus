export const INTERACTION_DETAIL_REQUEST = "interactionDetail/INTERACTION_DETAIL_REQUEST"
export const INTERACTION_DETAIL_SUCCESS = "interactionDetail/INTERACTION_DETAIL_SUCCESS"
export const INTERACTION_DETAIL_FAIL = "interactionDetail/INTERACTION_DETAIL_FAIL"
export const ADD_DATA_TO_INTERACTION_LIST = "interactionDetail/ADD_DATA_TO_INTERACTION_LIST"
const initialState = {
   errorMessage: null,
   isFetching: null,
   relationshipToSelf: null,
   errorPage: false
}
export default function(state = initialState, action = {}) {
   switch (action.type) {
      case INTERACTION_DETAIL_REQUEST:
         return {
            ...state,
            isFetching: true
         }
      case INTERACTION_DETAIL_SUCCESS: {
         const { data } = action
         const sliceData = data.slice(0, 20)
         if (data) {
            errorPage = false
         } else {
            errorPage = true
         }
         return {
            ...state,
            interactionList: data,
            flatlistData: sliceData,
            isFetching: false,
            errorPage
         }
      }
      case ADD_DATA_TO_INTERACTION_LIST: {
         const { page } = action
         const copyInteractionList = Object.assign([], state.interactionList)
         const copyFlatlistData = Object.assign([], state.flatlistData)
         const extraData = copyUserList.slice(page * 20, (page + 1) * 20)
         const newflatlistData = copyFlatlistData.concat(extraData)
         return {
            ...state,
            flatlistData: newflatlistData
         }
      }
      case INTERACTION_DETAIL_FAIL: {
         const { errorMessage } = action
         if (errorMessage.response.status !== 200) {
            errorPage = true
         } else {
            errorPage = false
         }
         return {
            ...state,
            errorMessage: errorMessage,
            errorPage,
            isFetching: false
         }
      }
      default:
         return state
   }
}

export function interactionDetailRequest(serviceType) {
   return { type: INTERACTION_DETAIL_REQUEST, serviceType }
}
export function interactionDetailSuccess(data) {
   return { type: INTERACTION_DETAIL_SUCCESS, data }
}

export function interactionDetailfail(errorMessage) {
   return { type: INTERACTION_DETAIL_FAIL, errorMessage }
}
export function addDataToInteractionlist(page) {
   return { type: ADD_DATA_TO_INTERACTION_LIST, page }
}
