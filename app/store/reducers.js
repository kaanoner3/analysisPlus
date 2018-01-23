<<<<<<< HEAD
import { combineReducers } from "redux";
import { auth, app, user } from './ducks';


export default combineReducers({
  app,
  auth,
  user
});

=======
import { combineReducers } from "redux"
import * as App from "./ducks/app"
import * as Auth from "./ducks/auth"

export default combineReducers({
    app: App.default,
    auth: Auth.default
})

export { App, Auth }
>>>>>>> 4793eb0842ac953cb2149b947f407f53e2dd2cde
