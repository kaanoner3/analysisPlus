// Base component class.
import { Component } from "react"

// Navigation handler.
import { Navigation } from "react-native-navigation"

// Store instance.
import store from "store"
import { images } from "resources"

// Root-level reducer.
<<<<<<< HEAD
import {switchToUser,switchToLogin} from "ducks/app"
import { setUserIdentity } from "ducks/user";
// AsyncStorage helper.
import { revive } from "services/LoginStorageService";
import { startHomeScreen, startLoginScreen } from "services/appStartHelper";
// Config object.
import { setConfig as setAxiosConfig } from "config/axios";
import { connect, dispatch } from "react-redux";
=======
import { App as AppReducer, User as UserReducer } from "store/reducers"

// AsyncStorage helper.
import { revive } from "services/LoginStorageService"

// Config object.
import { setConfig as setAxiosConfig } from "config/axios"
>>>>>>> 4793eb0842ac953cb2149b947f407f53e2dd2cde

export default class App extends Component {
    /*
      * App constructor.
<<<<<<< HEAD
  */
  constructor(props) {
    super(props);
    this.app_token = "";
    // Listen to changes on store.
    store.subscribe(this.onStoreUpdate.bind(this));
    // Get last login state from storage.
    revive((err, result) => {
      //   console.log("err", err);
      //   console.log("result", result);
      this.app_token = result.app_token;
      // If an error occured or client was not signed in,
      // set action to login, or otherwise, set it to user.
      if (err || result === false) {
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
=======
      */
    constructor(props) {
        super(props)

        // Listen to changes on store.
        store.subscribe(this.onStoreUpdate.bind(this))

        // Get last login state from storage.
        revive((err, result) => {
            console.log("err", err)
            console.log("result", result)
            // If an error occured or client was not signed in,
            // set action to login, or otherwise, set it to user.
            if (err || result === false) {
                store.dispatch(AppReducer.switchToLogin())
            } else {
                store.dispatch(AppReducer.switchToUser())
                store.dispatch(
                    UserReducer.setUserIdentity(
                        result.app_token,
                        result.user_id
                    )
                )
            }
        })
    }
>>>>>>> 4793eb0842ac953cb2149b947f407f53e2dd2cde

    /*
      * Stuff to do when store gets updated.
      */
    onStoreUpdate() {
        // Get the decided
        let { appState } = store.getState().app

        // If new app state is different from the previous one, restart.
        // TODO: make sure 'restarting' does not cause memory leaks.
        if (this.currentAppState != appState) {
            this.currentAppState = appState
            this.startApp(appState)
        }
    }

    startApp(appState) {
        let action = appState.substr(0, 1).toUpperCase() + appState.substr(1)

        return this[`start${action}`]()
    }

<<<<<<< HEAD
  startLogin() {
    startLoginScreen();
  }

  startUser() {
    startHomeScreen(this.app_token);
  }
=======
    startLogin() {
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

    startUser() {
        setImmediate(() =>
            setAxiosConfig({
                // 'headers.common.Authorization': `Bearer ${store.getState().user.token}`,
            })
        )
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
>>>>>>> 4793eb0842ac953cb2149b947f407f53e2dd2cde
}

/*
const mapStateToProps = () => {
  return {}
}
export default connect(mapStateToProps, {
  setUserIdentity
})(App)
*/
