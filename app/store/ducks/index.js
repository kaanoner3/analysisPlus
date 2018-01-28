
import app from "./app";
import auth from "./auth";
import user from "./user";
import profile from "./profile";
import instagramUsers from "./instagramUsers";

module.exports = {
  auth,
  app,
  user,
  profile,
  instagramUsers
};


/*
import { combineReducers } from "redux";
import * as App from "./ducks/app"
import * as Auth from "./ducks/auth"
import * as User from "./ducks/user"

export default combineReducers({
  app: App.default,
  app: App.default,
  app: App.default,
});

export {
  App,
  User,
}
*/