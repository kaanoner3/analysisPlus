import { call, put, takeEvery, takeLatest, all, take } from "redux-saga/effects"
import {
   getChartStatisticFollowersData as followersStatistic,
   getChartStatisticGainedData as gainedStatistic,
   getChartStatisticLostedData as lostedStatistic
} from "services"
import {
   CHART_STATISTIC_REQUEST,
   chartStatisticRequest,
   followersChartStatisticSuccess,
   gainedChartStatisticSuccess,
   GAINED_CHART_STATISTIC_REQUEST,
   followersChartStatisticFail,
   gainedChartStatisticFail,
   lostedChartStatisticFail,
   lostedChartStatisticSuccess,
   LOSTED_CHART_STATISTIC_REQUEST
} from "ducks/chart"
import store from "store"
import { setToken } from "utils/axios"

export function* chartStatistic() {
   while (true) {
      try {
         const { serviceType } = yield take(CHART_STATISTIC_REQUEST)
         const responseData = yield call(followersStatistic, serviceType)
         const dates = responseData.data.reverse()
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
                  domainYMax = Math.max(...count)
                  domainYMin = Math.min(...count)

                  for (var i = 0; i < arrayLength; i++) {
                     followersChartData.push({
                        x: i + 1,
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
         if (serviceType === "monthly") {
            var day = []
            var month = []
            var year = []
            var count = []
            var indexArray = []
            var followersChartData = []

            formattedData = dates.map((value, index) => {
               var date = value.date
               var splitValue = date.split(".")
               if (index % 7 === 0 || index === 0) {
                  day.push(parseInt(splitValue[0]))
                  month.push(parseInt(splitValue[1]))
                  year.push(parseInt(splitValue[2]))
                  count.push(value.count)
               }
               if (index === arrayLength - 1) {
                  var countLegth = count.length

                  domainYMax = Math.max(...count)
                  domainYMin = Math.min(...count)

                  for (var i = 0; i < countLegth; i++) {
                     followersChartData.push({
                        x: i + 1,
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
         const { serviceType } = yield take(GAINED_CHART_STATISTIC_REQUEST)
         const responseData = yield call(gainedStatistic, serviceType)
         const dates = responseData.data.reverse()
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
                  domainYMax = Math.max(...count)
                  domainYMin = Math.min(...count)

                  for (var i = 0; i < arrayLength; i++) {
                     gainedChartData.push({
                        x: i + 1,
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
         if (serviceType === "monthly") {
            var day = []
            var month = []
            var year = []
            var count = []
            var indexArray = []
            var gainedChartData = []

            gainedFormatted = dates.map((value, index) => {
               var date = value.date
               var splitValue = date.split(".")
               if (index % 7 === 0 || index === 0) {
                  day.push(parseInt(splitValue[0]))
                  month.push(parseInt(splitValue[1]))
                  year.push(parseInt(splitValue[2]))
                  count.push(value.count)
               }
               if (index === arrayLength - 1) {
                  var countLegth = count.length

                  domainYMax = Math.max(...count)
                  domainYMin = Math.min(...count)

                  for (var i = 0; i < countLegth; i++) {
                     gainedChartData.push({
                        x: i + 1,
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

export function* lostedFollowersStatistic() {
   while (true) {
      try {
         const { serviceType } = yield take(LOSTED_CHART_STATISTIC_REQUEST)
         console.log('deneme')
         const responseData = yield call(lostedStatistic, serviceType)
         const dates = responseData.data.reverse()
         console.log("chart sagaa", dates)
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
            var lostedChartData = []

            lostedFormatted = dates.map((value, index) => {
               var date = value.date
               var splitValue = date.split(".")
               //reverse  olayını optimize etmeye çalış

               day.push(parseInt(splitValue[0]))
               month.push(parseInt(splitValue[1]))
               year.push(parseInt(splitValue[2]))
               count.push(value.count)
               if (index === arrayLength - 1) {
                  domainYMax = Math.max(...count)
                  domainYMin = Math.min(...count)

                  for (var i = 0; i < arrayLength; i++) {
                     lostedChartData.push({
                        x: i + 1,
                        y: count[i]
                     })
                  }
               }

               var formattedValues = {
                  day,
                  month,
                  year,
                  lostedChartData,
                  domainY: { maxValue: domainYMax, minValue: domainYMin }
               }
               return formattedValues
            })
         }
         if (serviceType === "monthly") {
            var day = []
            var month = []
            var year = []
            var count = []
            var indexArray = []
            var lostedChartData = []

            lostedFormatted = dates.map((value, index) => {
               var date = value.date
               var splitValue = date.split(".")
               if (index % 7 === 0 || index === 0) {
                  day.push(parseInt(splitValue[0]))
                  month.push(parseInt(splitValue[1]))
                  year.push(parseInt(splitValue[2]))
                  count.push(value.count)
               }
               if (index === arrayLength - 1) {
                  var countLegth = count.length

                  domainYMax = Math.max(...count)
                  domainYMin = Math.min(...count)

                  for (var i = 0; i < countLegth; i++) {
                     lostedChartData.push({
                        x: i + 1,
                        y: count[i]
                     })
                  }
               }

               var formattedValues = {
                  day,
                  month,
                  year,
                  lostedChartData,
                  domainY: { maxValue: domainYMax, minValue: domainYMin }
               }
               return formattedValues
            })
         }
         console.log("gained chart data", lostedFormatted[dates.length - 1])
         yield put(lostedChartStatisticSuccess(lostedFormatted[dates.length - 1]))
      } catch (error) {
         yield put(lostedChartStatisticFail(error))
      }
   }
}
