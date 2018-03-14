import { call, put, take } from "redux-saga/effects"
import { PROFILE_DATA_FETCH_REQUEST, getProfileDataSuccess, getProfileDataFail } from "ducks/profile"
import { getProfileData as getProfileDataService } from "services"
import { PROFILE_DATA_FETCH_REQEUST, calculateDiff } from "../ducks/profile"
import store from "store"
import { setUser } from "../ducks/user"
import { Crashlytics } from "react-native-fabric"
import { transactionHandler } from "utils"
import { AsyncStorage } from "react-native"
import axios from "utils/axios"
//var { Crashlytics } = fabric

export function* getProfileData() {
   while (true) {
      try {
         const { token } = yield take(PROFILE_DATA_FETCH_REQEUST)
         const responseData = yield call(getProfileDataService, token)
         //         yield call(transactionHandler.handleUnfinishedTransactions)
         Crashlytics.setUserIdentifier(String(responseData.data.user.id))
         const currentStatistic = store.getState().profile.profileData.statistic
         if (
            currentStatistic.not_follow_me !== 0 ||
            currentStatistic.not_follow_by_me !== 0 ||
            currentStatistic.losted_followers !== 0 ||
            currentStatistic.gained_followers !== 0
         ) {
            yield put(calculateDiff(responseData.data.statistic))
         }
         yield put(getProfileDataSuccess(responseData.data))
      } catch (error) {
         console.log(error)
         yield put(getProfileDataFail(error))
      }
   }
}
