import { fork, all } from "redux-saga/effects";
import { login } from "./auth";
import { getProfileData } from './profile'
export default function* root() {
  yield all([
      fork(login),
      fork(getProfileData)
    ]);
}
