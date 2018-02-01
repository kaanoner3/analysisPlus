import { fork, all } from "redux-saga/effects";
import { login } from "./auth";
import { getProfileData } from './profile'
import { getUserList } from './instagramUsers'
import {userDetail}from './userDetail'
import {interactionDetail}from './interactions'

export default function* root() {
  yield all([
      fork(login),
      fork(getProfileData),
      fork(getUserList),
      fork(userDetail),
      fork(interactionDetail)
    ]);
}
