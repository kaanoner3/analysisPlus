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
         const arrayLength = dates.length
         const formattedData = []
         if (serviceType === "weekly") {
            // varaibles for reducers
            var day = []
            var month = []
            var year = []
            var count = []
            var indexArray = []
            var followersChartData = []
            formattedData = dates.map((value, index) => {
               var date = value.date
               var splitValue = date.split(".")
               //reverse  olayını optimize etmeye çalış

               day.push(parseInt(splitValue[0]))
               month.push(parseInt(splitValue[1]))
               year.push(parseInt(splitValue[2]))
               count.push(value.count)

               if (index === arrayLength - 1) {
                  day.reverse()
                  month.reverse()
                  year.reverse()
                  count.reverse()
                  for (var i = 0; i < arrayLength; i++) {
                     followersChartData.push({
                        x: day[i],
                        y: count[i]
                     })
                  }
               }

               var formattedValues = {
                  day,
                  month,
                  year,
                  followersChartData
               }
               return formattedValues
            })
         }

         yield put(chartStatisticSuccess(formattedData[dates.length - 1]))
      } catch (error) {
         console.log(error)
      }
   }
}
