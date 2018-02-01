export const INTERACTION_DETAIL_REQUEST = "interactionDetail/INTERACTION_DETAIL_REQUEST"
export const INTERACTION_DETAIL_SUCCESS = "interactionDetail/INTERACTION_DETAIL_SUCCESS"
export const INTERACTION_DETAIL_FAIL = "interactionDetail/INTERACTION_DETAIL_FAIL"
export const ADD_DATA_TO_INTERACTION_LIST = "interactionDetail/ADD_DATA_TO_INTERACTION_LIST"
const initialState = {
   errorMessage: null,
   isFetching: null,
   relationshipToSelf: null
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
         return {
            ...state,
            interactionList: data,
            flatlistData: sliceData,
            isFetching: false
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
      default:
         return state
   }
}

export function interactionDetailRequest(token, serviceType) {
   return { type: INTERACTION_DETAIL_REQUEST, token, serviceType }
}
export function interactionDetailSuccess(data) {
   return { type: INTERACTION_DETAIL_SUCCESS, data }
}

export function interactionDetailfail(errorMessage) {
   return { type: INTERACTION_MEDIA_DATA_SUCCESS, errorMessage }
}
export function addDataToInteractionlist(page) {
   return { type: ADD_DATA_TO_INTERACTION_LIST, page }
}
