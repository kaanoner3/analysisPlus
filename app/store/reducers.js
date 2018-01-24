import { combineReducers } from "redux";
import { auth, app, user } from './ducks';


export default combineReducers({
  app,
  auth,
  user
});
