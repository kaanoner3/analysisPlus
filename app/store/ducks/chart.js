const initialState = {
   errorMessage: null,
   isFetching: null,
   chartStatisticData: null,
   chartData: [],
   gainedData: []
}

export const CHART_STATISTIC_REQUEST = "chart/CHART_STATISTIC_REQUEST"
export const FOLLOWERS_CHART_STATISTIC_FAIL = "chart/FOLLOWERS_CHART_STATISTIC_FAIL"
export const FOLLOWERS_CHART_STATISTIC_SUCCESS = "chart/FOLLOWERS_CHART_STATISTIC_SUCCESS"

export const GAINED_CHART_STATISTIC_REQUEST = "chart/GAINED_CHART_STATISTIC_REQUEST"
export const GAINED_CHART_STATISTIC_SUCCESS = "chart/GAINED_CHART_STATISTIC_SUCCESS"
export const GAINED_CHART_STATISTIC_FAIL = "chart/GAINED_CHART_STATISTIC_FAIL"

export const LOSTED_CHART_STATISTIC_REQUEST = "chart/LOSTED_CHART_STATISTIC_REQUEST"
export const LOSTED_CHART_STATISTIC_SUCCESS = "chart/LOSTED_CHART_STATISTIC_SUCCESS"
export const LOSTED_CHART_STATISTIC_FAIL = "chart/LOSTED_CHART_STATISTIC_FAIL"

export default function(state = initialState, action = {}) {
   switch (action.type) {
      case CHART_STATISTIC_REQUEST: {
         return {
            ...state,
            isFetching: true,
            followersFetching: true
         }
      }
      case FOLLOWERS_CHART_STATISTIC_FAIL: {
         return {
            ...state,
            followersFlag: true
         }
      }
      case FOLLOWERS_CHART_STATISTIC_SUCCESS: {
         const data = action.formattedData
         return {
            ...state,
            chartData: data,
            isFetching: false,
            followersFlag: false,
            followersFetching: false
         }
      }
      case GAINED_CHART_STATISTIC_REQUEST: {
         return {
            ...state,
            gainedFetching: true
         }
      }
      case GAINED_CHART_STATISTIC_SUCCESS: {
         const data = action.formattedData
         return {
            ...state,
            gainedData: data,
            isFetching: false,
            gainedFlag: false,
            gainedFetching: false
         }
      }
      case GAINED_CHART_STATISTIC_FAIL: {
         return {
            ...state,
            errorMessage: action.errorMessage,
            gainedFlag: true
         }
      }
      case LOSTED_CHART_STATISTIC_REQUEST: {
         return {
            ...state,
            lostedFetching: true
         }
      }
      case LOSTED_CHART_STATISTIC_SUCCESS: {
         const data = action.formattedData
         return {
            ...state,
            lostedData: data,
            isFetching: false,
            lostedFetching: false,
            lostedFlag: false
         }
      }
      case LOSTED_CHART_STATISTIC_FAIL: {
         return {
            ...state,
            errorMessage: action.errorMessage,
            lostedFlag: true
         }
      }
      default:
         return state
   }
}

export function chartStatisticRequest(serviceType) {
   return { type: CHART_STATISTIC_REQUEST, serviceType }
}

export function gainedChartStatisticRequest(serviceType) {
   return { type: GAINED_CHART_STATISTIC_REQUEST, serviceType }
}
export function followersChartStatisticFail(errorMessage) {
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
export function lostedChartStatisticRequest(serviceType) {
   return { type: LOSTED_CHART_STATISTIC_REQUEST, serviceType }
}
export function lostedChartStatisticFail(errorMessage) {
   return { type: LOSTED_CHART_STATISTIC_FAIL, errorMessage }
}
export function lostedChartStatisticSuccess(formattedData) {
   return { type: LOSTED_CHART_STATISTIC_SUCCESS, formattedData }
}
