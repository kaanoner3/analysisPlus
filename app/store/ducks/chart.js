const initialState = {
   errorMessage: null,
   isFetching: false,
   chartStatisticData: null
}

export const FOLLOWERS_CHART_STATISTIC_REQUEST = "chart/FOLLOWERS_CHART_STATISTIC_REQUEST"
export const FOLLOWERS_CHART_STATISTIC_FAIL = "chart/FOLLOWERS_CHART_STATISTIC_FAIL"
export const FOLLOWERS_CHART_STATISTIC_SUCCESS = "chart/FOLLOWERS_CHART_STATISTIC_SUCCESS"


export default function(state = initialState, action = {}) {
   switch (action.type) {
      case FOLLOWERS_CHART_STATISTIC_REQUEST: {
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
         const data = action.formattedData
         const dateArray = []
         return {
            ...state,
            chartData: data,
            isFetching: false
         }
      }
      default:
         return state
   }
}

export function chartStatisticRequest(token, serviceType) {
   return { type: FOLLOWERS_CHART_STATISTIC_REQUEST, token, serviceType }
}

export function chartStatisticFail(errorMessage) {
   return { type: FOLLOWERS_CHART_STATISTIC_FAIL, errorMessage }
}

export function chartStatisticSuccess(formattedData) {
   return { type: FOLLOWERS_CHART_STATISTIC_SUCCESS, formattedData }
}
