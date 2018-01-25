import { call, put, take } from "redux-saga/effects";
import {
  PROFILE_DATA_FETCH_REQUEST,
  getProfileDataSuccess,
  getProfileDataFail
} from "ducks/profile";
import { getProfileData as getProfileDataService } from "services";
import { PROFILE_DATA_FETCH_REQEUST } from "../ducks/profile";

export function* getProfileData() {
  while (true) {
    try {
      const { token } = yield take(PROFILE_DATA_FETCH_REQEUST);
      const responseData = yield call(getProfileDataService, token);
      yield put(getProfileDataSuccess(responseData.data));
    } catch (error) {
      console.log(error);
      yield put(getProfileDataFail(error));
    }
  }
}