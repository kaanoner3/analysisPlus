import { call, put, take } from "redux-saga/effects"
import { USER_DATA_FETCH_REQUEST, getUserDataSuccess, getUserDataFail } from "ducks/instagramUsers"
import { getUsers as getUserDataService } from "services"
import { getUserDataRequest } from "../ducks/instagramUsers";

export function* getUserList() {
   while (true) {
      try {
         const action = yield take(USER_DATA_FETCH_REQUEST)
         const responseData = yield call(getUserDataService, action.token, action.serviceType)
         yield put(getUserDataSuccess(responseData.data.result))
      } catch (error) {
         console.log(error)
         yield put(getUserDataFail(error))
      }
   }
}
