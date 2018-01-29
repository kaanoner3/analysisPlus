import { combineReducers } from "redux";
import { auth, app, user,profile,instagramUsers } from './ducks';


export default combineReducers({
  app,
  auth,
  user,
  profile,
  instagramUsers
});
