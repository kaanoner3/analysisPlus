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
import { Provider, dispatch } from "react-redux"
import { startHomeScreen, startLoginScreen } from "services/appStartHelper";
import OneSignal from 'react-native-onesignal';

export default class App extends Component {
  constructor(props) {
    super(props);
    registerScreens(store,Provider)

  }
}
