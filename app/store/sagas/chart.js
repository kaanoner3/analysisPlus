import { call, put, takeEvery, takeLatest, all, take } from "redux-saga/effects"
import {
   getChartStatisticFollowersData as followersStatistic,
   getChartStatisticGainedData as gainedStatistic
} from "services"
import {
   CHART_STATISTIC_REQUEST,
   chartStatisticRequest,
   followersChartStatisticSuccess,
   gainedChartStatisticSuccess,
   GAINED_CHART_STATISTIC_REQUEST,
   followersChartStatisticFail,
   gainedChartStatisticFail
} from "ducks/chart"
import store from "store"
import { setToken } from "utils/axios"

export function* chartStatistic() {
   while (true) {
      try {
         const { token, serviceType } = yield take(CHART_STATISTIC_REQUEST)
         const responseData = yield call(followersStatistic, token, serviceType)
         const dates = responseData.data
         const arrayLength = dates.length
         const formattedData = []
         var domainYMax = null
         var domainYMin = null

         if (serviceType === "weekly") {
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

                  domainYMax = count[0]
                  domainYMin = count[0]

                  for (var i = 0; i < arrayLength; i++) {
                     if (domainYMax < count[i + 1]) {
                        domainYMax = count[i + 1]
                     }
                     if (domainYMin > count[i + 1]) {
                        domainYMin = count[i + 1]
                     }

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
                  followersChartData,
                  domainY: { maxValue: domainYMax, minValue: domainYMin }
               }
               return formattedValues
            })
         }
         
         yield put(followersChartStatisticSuccess(formattedData[dates.length - 1]))
      } catch (error) {
         yield put(followersChartStatisticFail(error))
      }
   }
}

export function* gainedFollowersStatistic() {
   while (true) {
      try {
         const { token, serviceType } = yield take(GAINED_CHART_STATISTIC_REQUEST)
         const responseData = yield call(gainedStatistic, token, serviceType)
         const dates = responseData.data
         const arrayLength = dates.length
         const formattedData = []
         var domainYMax = null
         var domainYMin = null

         if (serviceType === "weekly") {
            var day = []
            var month = []
            var year = []
            var count = []
            var indexArray = []
            var gainedChartData = []

            gainedFormatted = dates.map((value, index) => {
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

                  domainYMax = count[0]
                  domainYMin = count[0]

                  for (var i = 0; i < arrayLength; i++) {
                     if (domainYMax < count[i + 1]) {
                        domainYMax = count[i + 1]
                     }
                     if (domainYMin > count[i + 1]) {
                        domainYMin = count[i + 1]
                     }
                     gainedChartData.push({
                        x: day[i],
                        y: count[i]
                     })
                  }
               }

               var formattedValues = {
                  day,
                  month,
                  year,
                  gainedChartData,
                  domainY: { maxValue: domainYMax, minValue: domainYMin }
               }
               return formattedValues
            })
         }
         yield put(gainedChartStatisticSuccess(gainedFormatted[dates.length - 1]))
      } catch (error) {
         yield put(gainedChartStatisticFail(error))
      }
   }
}
