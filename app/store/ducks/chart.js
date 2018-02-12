const initialState = {
   errorMessage: null,
   isFetching: false,
   chartStatisticData: null
}

export const CHART_STATISTIC_REQUEST = "chart/CHART_STATISTIC_REQUEST"

export const FOLLOWERS_CHART_STATISTIC_FAIL = "chart/FOLLOWERS_CHART_STATISTIC_FAIL"
export const FOLLOWERS_CHART_STATISTIC_SUCCESS = "chart/FOLLOWERS_CHART_STATISTIC_SUCCESS"

export const GAINED_CHART_STATISTIC_SUCCESS = "chart/GAINED_CHART_STATISTIC_SUCCESS"
export const GAINED_CHART_STATISTIC_FAIL = "chart/GAINED_CHART_STATISTIC_FAIL"

export default function(state = initialState, action = {}) {
   switch (action.type) {
      case CHART_STATISTIC_REQUEST: {
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
         return {
            ...state,
            chartData: data,
            isFetching: false
         }
      }
      case GAINED_CHART_STATISTIC_SUCCESS: {
         const data = action.formattedData
         return {
            ...state,
            gainedData: data,
            isFetching: false
         }
      }
      case GAINED_CHART_STATISTIC_FAIL: {
         return {
            ...state,
            errorMessage: action.errorMessage
         }
      }
      default:
         return state
   }
}

export function chartStatisticRequest(token, serviceType) {
   return { type: CHART_STATISTIC_REQUEST, token, serviceType }
}

export function chartStatisticFail(errorMessage) {
   return { type: FOLLOWERS_CHART_STATISTIC_FAIL, errorMessage }
}

export function followersChartStatisticSuccess(formattedData) {
   return { type: FOLLOWERS_CHART_STATISTIC_SUCCESS, formattedData }
}
export function gainedChartStatisticFail(errorMessage) {
   return { type: GAINED_CHART_STATISTIC_FAIL, errorMessage }
}

export function gainedChartStatisticSuccess(formattedData) {
   return { type: GAINED_CHART_STATISTIC_SUCCESS, formattedData }
}
