import { call, put, takeEvery, takeLatest,all } from 'redux-saga/effects'
import { SignInService } from "services/LoginService"
import {
    INSTAGRAM_LOGIN
  } from 'ducks/auth';
export function* login() {
    while(true) {
        try {
            const {token} = take(INSTAGRAM_LOGIN) 
            const loginResponse = yield call(SignInService(token))
            console.log(loginResponse)
        } catch (error) {
            
        }
    }

}

