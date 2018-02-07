/*
|------------------------------------------------------------------------------
| Initial state.
|------------------------------------------------------------------------------
*/
const initialState = {
   errorMessage: null,
   isFetching: false,
   chartStatisticData: null
}

export const FOLLOWERS_CHART_STATISTIC_REQUEST = "chart/FOLLOWERS_CHART_STATISTIC_REQUEST"
export const FOLLOWERS_CHART_STATISTIC_FAIL = "chart/FOLLOWERS_CHART_STATISTIC_FAIL"
export const FOLLOWERS_CHART_STATISTIC_SUCCESS = "chart/FOLLOWERS_CHART_STATISTIC_SUCCESS"

/*
  |------------------------------------------------------------------------------
  | Reducer.
  |------------------------------------------------------------------------------
  */
export default function(state = initialState, action = {}) {
   switch (action.type) {
      case FOLLOWERS_CHART_STATISTIC_REQUEST: {
        console.log("reducer")
         return {
            ...state,
            isFetching: true
         }
      }
      case FOLLOWERS_CHART_STATISTIC_FAIL: {
         return {
            ...state
         }
      }
      case FOLLOWERS_CHART_STATISTIC_SUCCESS: {
         return {
            ...state,
            chartStatisticData: action.data,
            isFetching: false
         }
      }
      default:
         return state
   }
}

/*
  |------------------------------------------------------------------------------
  | Action creators.
  |------------------------------------------------------------------------------
  */

/*
  |------------------------------------------------------------------------------
  | Actions.
  |------------------------------------------------------------------------------
  */

export function chartStatisticRequest(token, serviceType) {
    console.log("action")
   return { type: FOLLOWERS_CHART_STATISTIC_REQUEST, token, serviceType }
}

export function chartStatisticFail(errorMessage) {
   return { type: FOLLOWERS_CHART_STATISTIC_FAIL, errorMessage }
}

export function chartStatisticSuccess(data) {
   return { type: FOLLOWERS_CHART_STATISTIC_SUCCESS, data }
}
