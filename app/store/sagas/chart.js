import { call, put, takeEvery, takeLatest, all, take } from "redux-saga/effects"
import { getChartStatisticFollowersData as followersStatistic } from "services"
import { FOLLOWERS_CHART_STATISTIC_REQUEST } from "ducks/chart"
import store from "store"
//import { switchToUser, changeAppState } from "ducks/app";

export function* chartStatistic() {
   while (true) {
      try {
         const { token, serviceType } = yield take(FOLLOWERS_CHART_STATISTIC_REQUEST)
         const responseData = yield call(followersStatistic, token, serviceType)
         console.log(responseData.data)
      } catch (error) {
         console.log(error)
      }
   }
}
