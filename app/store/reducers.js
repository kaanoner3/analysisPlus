import { combineReducers } from "redux"
import { auth, app, user, profile, instagramUsers, userDetail,interactions } from "./ducks"

export default combineReducers({
   app,
   auth,
   user,
   profile,
   instagramUsers,
   userDetail,
   interactions
})
