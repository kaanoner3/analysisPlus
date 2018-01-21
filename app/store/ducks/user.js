// Axios
import axios from "axios"

// Login service
import { LoginStorageService } from "services"

const ACTION_SET_TOKEN = "set_token"
const ACTION_GET_TOKEN = "get_token"

export default function(state = {}, action = {}) {
    switch (action.type) {
        case ACTION_SET_TOKEN:
            return {
                ...state,
                token: action.token,
                id: action.id
            }
        default:
            return state
    }
}

export function setUserIdentity(token, id) {
    return { type: ACTION_SET_TOKEN, token, id }
}

export function login(email, password) {
    return function(dispatch) {
        return axios
            .post("auth/login", {
                email,
                password
            })
            .then(response => {
                // Sign the user in.
                dispatch(
                    setUserIdentity(
                        response.data.user.token,
                        response.data.user._id
                    )
                )

                // Persist it to storage.
                LoginStorageService.persist({
                    app_token: response.data.user.token,
                    user_id: response.data.user._id
                })

                // Return only user information. Components do not have to
                // know about response details.
                return response.data.user
            })
    }
}

export function logout() {
    return function(dispatch) {
        // Persist it to storage.
        LoginStorageService.clear()

        //
        dispatch(setUserIdentity(null, null))

        return Promise.resolve()
    }
}
