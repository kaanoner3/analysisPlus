import { call, put, takeEvery, takeLatest, all, take } from "redux-saga/effects"
import { getInteractionDetail } from "services"
import {
   INTERACTION_DETAIL_REQUEST,
   interactionDetailSuccess,
   interactionDetailfail,
   addInteractionData
} from "ducks/interactions"
import store from "store"
//import { switchToUser, changeAppState } from "ducks/app";

export function* interactionDetail() {
   while (true) {
      try {
         const { token, serviceType } = yield take(INTERACTION_DETAIL_REQUEST)
         const responseData = yield call(getInteractionDetail, token, serviceType)
         yield put(interactionDetailSuccess(responseData.data))
      } catch (error) {
         console.log(error)
      }
   }
}
