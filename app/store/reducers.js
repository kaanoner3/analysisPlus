import { combineReducers } from "redux";
import { auth, app, user,profile } from './ducks';


export default combineReducers({
  app,
  auth,
  user,
  profile
});
