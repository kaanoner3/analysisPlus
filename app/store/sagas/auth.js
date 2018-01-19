import { call, put, takeEvery, takeLatest,all } from 'redux-saga/effects'
import { SignInService } from "services/LoginService"

export function* login() {
    while(true) {
        try {
           // const {token} = take() 
           // const loginResponse = yield call(SignInService(token))
           // console.log(loginResponse)
        } catch (error) {
            
        }
    }

}

