// Base component class.
import { Component } from "react";

// Navigation handler.
import { Navigation } from "react-native-navigation";

// Store instance.
import store from "store";
import { images } from "resources";

// Root-level reducer.
import { switchToUser, switchToLogin } from "ducks/app";
import { setUserIdentity } from "ducks/user";
// AsyncStorage helper.
import { revive } from "services/LoginStorageService";
import { startHomeScreen, startLoginScreen } from "services/appStartHelper";
// Config object.
import { setConfig as setAxiosConfig } from "config/axios";
import { connect, dispatch } from "react-redux";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.app_token = "";
    store.subscribe(this.onStoreUpdate.bind(this));

    revive((err, result) => {
     //    console.log("err", err);
    //     console.log("result", result);
      this.app_token = result.app_token;
      // If an error occured or client was not signed in,
      // set action to login, or otherwise, set it to user.
      if (err || result === false) {
    //    console.log('constructor revive')
        store.dispatch(switchToLogin());
      } else {
        store.dispatch({
          type: "ACTION_SET_USER_IDENTITY",
          token: result.app_token,
          id: result.user_id
        });
        store.dispatch(switchToUser());
      }
    });
  }

  onStoreUpdate() {
    // Get the decided
 //   console.log('STORE.GETSTATE',store.getState().app)
    const { appState } = store.getState().app;

    // If new app state is different from the previous one, restart.
    // TODO: make sure 'restarting' does not cause memory leaks.
//    console.log('currentappstate',this.currentAppState)
//    console.log('app state nezamangircek',appState)
    if (this.currentAppState != appState) {
      console.log('ife girdi onstoreupdate')
      this.currentAppState = appState;
      this.startApp(appState);
    }
  }

  startApp(appState) {
    let action = appState.substr(0, 1).toUpperCase() + appState.substr(1);
//    console.log([`start${action}`],'appState',action)
    
    return this[`start${action}`]();
  }

  startLogin() {
  //  console.log('START LOOOGIN')
    startLoginScreen();
  }

  startUser() {
 //   console.log('START USEEEEER')
    startHomeScreen(this.app_token);
  }
}
