const initialState = {
   errorMessage: null,
   isFetching: null,
   chartStatisticData: null,

   chartData: [],
   gainedData: [],
   lostedData: [],

   lostedFetching: false,
   gainedFetching: false,
   followersFetching: false,

   followersFlag: false,
   gainedFlag: false,
   lostedFlag: false
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
            followersFetching: true
         }
      }
      case FOLLOWERS_CHART_STATISTIC_FAIL: {
         return {
            ...state,
            followersFlag: true,
            followersFetching: false
         }
      }
      case FOLLOWERS_CHART_STATISTIC_SUCCESS: {
         const data = action.formattedData
         if (data !== undefined) {
            return {
               ...state,
               chartData: data,
               followersFlag: false,
               followersFetching: false
            }
         } else {
            return {
               ...state,
               followersFlag: false,
               followersFetching: false
            }
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
         if (data !== undefined) {
            return {
               ...state,
               gainedData: data,
               gainedFlag: false,
               gainedFetching: false
            }
         } else {
            return {
               ...state,
               gainedFlag: false,
               gainedFetching: false
            }
         }
      }
      case GAINED_CHART_STATISTIC_FAIL: {
         return {
            ...state,
            errorMessage: action.errorMessage,
            gainedFetching: false,
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
         if (data !== undefined) {
            return {
               ...state,
               lostedData: data,
               lostedFetching: false,
               lostedFlag: false
            }
         } else {
            return {
               ...state,
               lostedFetching: false,
               lostedFlag: false
            }
         }
      }
      case LOSTED_CHART_STATISTIC_FAIL: {
         return {
            ...state,
            errorMessage: action.errorMessage,
            lostedFlag: true,
            lostedFetching: false
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
