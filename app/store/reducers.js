import { combineReducers } from "redux"
import * as App from "./ducks/app"
import * as Auth from "./ducks/auth"

export default combineReducers({
    app: App.default,
    auth: Auth.default
})

export { App, Auth }
