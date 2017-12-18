import { combineReducers } from "redux";
import * as App from "./ducks/app"

export default combineReducers({
  app: App.default,
});

export {
  App,
}
