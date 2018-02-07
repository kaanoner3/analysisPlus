import { call, put, takeEvery, takeLatest, all, take } from "redux-saga/effects"
import { getChartStatisticFollowersData as followersStatistic } from "services"
import { FOLLOWERS_CHART_STATISTIC_REQUEST, chartStatisticSuccess } from "ducks/chart"
import store from "store"
//import { switchToUser, changeAppState } from "ducks/app";

export function* chartStatistic() {
   while (true) {
      try {
         const { token, serviceType } = yield take(FOLLOWERS_CHART_STATISTIC_REQUEST)
         const responseData = yield call(followersStatistic, token, serviceType)
         //      console.log(responseData.data)
         const dates = responseData.data
         const formattedData = []
         if (serviceType === "weekly") {
            // varaibles for reducers 
            var day = []
            var month = []
            var year = []
            var count = []
            formattedData = dates.map((value, index) => {
               var date = value.date
               var splitValue = date.split(".")
               //reverse  olayını optimize etmeye çalış
               day.push(parseInt(splitValue[0]))
               day.reverse()
               month.push(parseInt(splitValue[1]))
               month.reverse()
               year.push(parseInt(splitValue[2]))
               year.reverse()
               count.push(value.count)
               count.reverse()

               var formattedValues = { day, month, year, count }
               console.log(formattedValues)
               return formattedValues
            })
         }
         
         yield put(chartStatisticSuccess(formattedData[dates.length -1 ]))
      } catch (error) {
         console.log(error)
      }
   }
}
