import { combineReducers } from "redux"
import { auth, app, user, profile, instagramUsers, userDetail,interactions,chart } from "./ducks"

export default combineReducers({
   app,
   auth,
   user,
   profile,
   instagramUsers,
   userDetail,
   interactions,
   chart
})
