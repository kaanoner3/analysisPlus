import { call, put, take } from "redux-saga/effects"
import { USER_DATA_FETCH_REQUEST, getUserDataSuccess, getUserDataFail } from "ducks/instagramUsers"
import { getUsers as getUserDataService } from "services"
import { getUserDataRequest } from "../ducks/instagramUsers"
import { addRelationToObject } from "services"
import store from "store"

export function* getUserList() {
   while (true) {
      try {
         const action = yield take(USER_DATA_FETCH_REQUEST)
         const responseData = yield call(getUserDataService, action.serviceType)
         //servis ekle relationship datasını koy sonra putla.
         /*
         console.log("saga data", responseData.data, "   serviceType", action.serviceType)
         const { accessToken } = store.getState().auth
         const objectWithRelation = yield call(addRelationToObject, responseData.data, accessToken)
        */
         yield put(getUserDataSuccess(responseData.data))
      } catch (error) {
         console.log(error)
         yield put(getUserDataFail(error))
      }
   }
}
