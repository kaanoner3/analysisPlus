// Base component class.
import { Component } from "react"

// Navigation handler.
import { Navigation } from "react-native-navigation"

// Store instance.
import store from "store"
import { images } from "resources"

// Root-level reducer.
import { switchToUser, switchToLogin } from "ducks/app"
import { setUserIdentity } from "ducks/user"
// AsyncStorage helper.
import { revive } from "services/LoginStorageService"
import registerScreens from "../app/screens"
// Config object.
import { setConfig as setAxiosConfig } from "config/axios"
import { Provider, dispatch } from "react-redux"
import { startHomeScreen, startLoginScreen } from "services/appStartHelper";


export default class App extends Component {
  constructor(props) {
    super(props);
    this.app_token = "";
    registerScreens(store,Provider)
    store.subscribe(this.onStoreUpdate.bind(this));

    revive((err, result) => {
      this.app_token = result.app_token;
      if (err || result === false) {
        store.dispatch(switchToLogin());
      } else {
        store.dispatch(switchToUser());
      }
    });
    
  }

  onStoreUpdate() {
    // Get the decided
    const { startLogin,startHome,appState } = store.getState().app;
    // If new app state is different from the previous one, restart.
    // TODO: make sure 'restarting' does not cause memory leaks.
    if (this.currentAppState != appState) {
      this.currentAppState = appState;
      //this.startApp(appState);
    }
  }

  startApp(appState) {
    let action = appState.substr(0, 1).toUpperCase() + appState.substr(1);
    return this[`start${action}`]();
  }

  startLogin() {
  //  startLoginScreen();
  }

  startUser() {
 //   startHomeScreen(this.app_token);
  }
}
