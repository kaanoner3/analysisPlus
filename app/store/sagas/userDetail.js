import { call, put, takeEvery, takeLatest, all, take } from "redux-saga/effects"
import { SignInService } from "services/LoginService"
import { accessToken as accessTokenService } from "services"
import { INSTAGRAM_LOGIN_REQUEST, instagramLoginSuccess } from "ducks/auth"
import { getUserBaseDetail, getUserMediaData, getMediaLikesData,getRelationshipStatus } from "services"
import {
   USER_DETAIL_REQUEST,
   userBaseDetailSuccess,
   userMediaDataSuccess,
   userDetailSuccess
} from "ducks/userDetail"
import store from "store"
//import { switchToUser, changeAppState } from "ducks/app";

export function* userDetail() {
   while (true) {
      try {
         const { id, token } = yield take(USER_DETAIL_REQUEST)
         const userBaseDetailResponse = yield call(getUserBaseDetail, token, id)
         console.log('sagaaa',userBaseDetailResponse)

         const relationShipStatus = yield call(getRelationshipStatus,token,id)
         console.log('sagaaa2',relationShipStatus)

         yield put(userBaseDetailSuccess(userBaseDetailResponse.data.data,relationShipStatus.data.data))
         const userMediaResponse = yield call(getUserMediaData, token, id)
         console.log('sagaa3',userMediaResponse)
         yield put(userMediaDataSuccess(userMediaResponse.data.data,userMediaResponse.data.pagination))
         
         //alttaki call hazır degil
         //const userToken = store.getState().user.token
         //const userLikesResponse = yield call(getMediaLikesData, userToken, id)
         yield put(userDetailSuccess())
      } catch (error) {
         console.log(error)
      }
   }
}
