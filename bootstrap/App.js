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
     //    console.log("err", err);
    //     console.log("result", result);
      this.app_token = result.app_token;
      // If an error occured or client was not signed in,
      // set action to login, or otherwise, set it to user.
      if (err || result === false) {
    //    console.log('constructor revive')
        store.dispatch(switchToLogin());
      } else {
        store.dispatch(switchToUser());
        store.dispatch({
          type: "ACTION_SET_USER_IDENTITY",
          token: result.app_token,
          id: result.user_id
        });
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
      this.startApp(appState);
    }
  }

  startApp(appState) {
    let action = appState.substr(0, 1).toUpperCase() + appState.substr(1);
    return this[`start${action}`]();
  }

  startLogin() {
    startLoginScreen();
  }

  startUser() {
    startHomeScreen(this.app_token);
  }
}

/*

console.disableYellowBox = true

registerScreens(store, Provider)

 function startHomeScreen(token) {
   Navigation.startTabBasedApp({
      tabs: [
         {
            screen: "HomeScreen",
            label: "Home",
            icon: images.tabIndex0,
            selectedIcon: images.tabIndex0Active
         },
         {
            screen: "InteractionScreen",
            label: "Interaction",
            icon: images.tabIndex1,
            selectedIcon: images.tabIndex1Active
         },
         {
            screen: "PremiumServiceScreen",
            label: "Engagement",
            icon: images.tabIndex2,
            selectedIcon: images.tabIndex2Active
         },
         {
            screen: "StatisticChartScreen",
            label: "Graphic",
            icon: images.tabIndex3,
            selectedIcon: images.tabIndex3Active
         }
      ],
      tabsStyle: {
         initialTabIndex: 0,
         tabBarBackgroundColor: "#111A2C",
         tabBarTranslucent: false,
         tabBarSelectedLabelColor: "#059ED9",
         tabBarTextFontFamily: "Circular"
      },
      appStyle: {
         orientation: "portrait",
         statusBarTextColorSchemeSingleScreen: "light",
         navBarHidden: true,
         drawUnderTabBar: true,
         screenBackgroundColor: "#152341"
      },
      passProps: {},
      animationType: "slide-down"
   })
}

 function startLoginScreen() {
   Navigation.startSingleScreenApp({
      screen: {
         screen: "LoginScreen",
         title: "Welcome",
         navigatorStyle: {},
         navigatorButtons: {}
      },

      passProps: {},
      animationType: "slide-down"
   })
}
export default{
  startLoginScreen,startHomeScreen
}

*/
