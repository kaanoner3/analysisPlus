// Base component class.
import { Component } from "react"

// Navigation handler.
import { Navigation } from "react-native-navigation"

// Store instance.
import store from "store"
import { images } from 'resources'

// Root-level reducer.
import { App as AppReducer, User as UserReducer } from "store/reducers"

// AsyncStorage helper.
import { revive } from "services/LoginStorageService"

// Config object.
import { setConfig as setAxiosConfig } from 'config/axios'

export default class App extends Component {
    /*
      * App constructor.
      */
    constructor(props) {
        super(props)

        // Listen to changes on store.
        store.subscribe(this.onStoreUpdate.bind(this))

        // Get last login state from storage.
        revive((err, result) => {

            // If an error occured or client was not signed in,
            // set action to login, or otherwise, set it to user.
            if (err || result === false) {
                store.dispatch(AppReducer.switchToLogin())
            } else {
                store.dispatch(AppReducer.switchToUser())
                store.dispatch(
                    UserReducer.setUserIdentity(result.app_token, result.user_id)
                )
            }
        })
    }

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

    /*
      *
      */
    startApp(appState) {
        let action = appState.substr(0, 1).toUpperCase() + appState.substr(1)
        return this[`start${action}`]()
    }

    /*
      * Shows the login screen.
      */
    startLogin() {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: "HomeScreen",
                    label: 'Home',
                    icon: images.tabIndex0,
                    selectedIcon: images.tabIndex0Active,
                },
                {
                    screen: "ShowInstagramUserScreen",
                    label: 'Interaction',
                    icon: images.tabIndex1,
                    selectedIcon: images.tabIndex1Active,
                },
                {
                    screen: "HomeScreen",
                    label: 'Engagement',
                    icon: images.tabIndex2,
                    selectedIcon: images.tabIndex2Active,
                },
                {
                    screen: "HomeScreen",
                    label: 'Graphic',
                    icon: images.tabIndex3,
                    selectedIcon: images.tabIndex3Active,
                },
            ],
            tabsStyle: {
                initialTabIndex: 0,
                tabBarBackgroundColor: '#111A2C',
                tabBarTranslucent: false,
            },
            appStyle: {
                orientation: "portrait",
                statusBarTextColorSchemeSingleScreen: "light",
                navBarHidden: true,
                //tabBarHidden: true,
                drawUnderTabBar: true,
            },
            passProps: {},
            animationType: "slide-down"
        })
    }

    /*
      * Shows the signed-in user interface.
      */
    startUser() {
        setImmediate(() =>
            setAxiosConfig({
                //'headers.common.Authorization': `Bearer ${store.getState().user.token}`,
            })
        )

        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: "LoginScreen",
                },
                {
                    screen: "LoginScreen",
                },
                {
                    screen: "LoginScreen",
                },
                {
                    screen: "LoginScreen",
                },
                {
                    screen: "LoginScreen",
                },
            ],
            tabsStyle: {
                initialTabIndex: 0,
            },
            appStyle: {
                orientation: "portrait",
                statusBarTextColorSchemeSingleScreen: "dark",
                navBarHidden: true,
                tabBarHidden: true,
                drawUnderTabBar: true,
            },
            passProps: {},
            animationType: "slide-down"
        })
    }
}
