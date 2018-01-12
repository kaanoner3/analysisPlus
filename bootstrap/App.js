// Base component class.
import { Component } from "react";

// Navigation handler.
import { Navigation } from "react-native-navigation";

// Store instance.
import store from "store";
import { images } from "resources";

// Root-level reducer.
import { App as AppReducer, User as UserReducer } from "store/reducers";

// AsyncStorage helper.
import { revive } from "services/LoginStorageService";

// Config object.
import { setConfig as setAxiosConfig } from "config/axios";

export default class App extends Component {
  /*
      * App constructor.
      */
  constructor(props) {
    super(props);

    // Listen to changes on store.
    store.subscribe(this.onStoreUpdate.bind(this));

    // Get last login state from storage.
    revive((err, result) => {
      // If an error occured or client was not signed in,
      // set action to login, or otherwise, set it to user.
      if (err || result === false) {
        store.dispatch(AppReducer.switchToLogin());
      } else {
        store.dispatch(AppReducer.switchToUser());
        store.dispatch(
          UserReducer.setUserIdentity(result.app_token, result.user_id)
        );
      }
    });
  }

  /*
      * Stuff to do when store gets updated.
      */
  onStoreUpdate() {
    // Get the decided
    let { appState } = store.getState().app;

    // If new app state is different from the previous one, restart.
    // TODO: make sure 'restarting' does not cause memory leaks.
    if (this.currentAppState != appState) {
      this.currentAppState = appState;
      this.startApp(appState);
    }
  }

  /*
      *
      */
  startApp(appState) {
    let action = appState.substr(0, 1).toUpperCase() + appState.substr(1);

    return this[`start${action}`]();
  }

  /*
      * Shows the login screen.
Navigation.startSingleScreenApp({
  screen: {
    screen: 'example.WelcomeScreen', // unique ID registered with Navigation.registerScreen
    title: 'Welcome', // title of the screen as appears in the nav bar (optional)
    navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
    navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
  },
  drawer: { // optional, add this if you want a side menu drawer in your app
    left: { // optional, define if you want a drawer from the left
      screen: 'example.FirstSideMenu', // unique ID registered with Navigation.registerScreen
      passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
      disableOpenGesture: false // can the drawer be opened with a swipe instead of button (optional, Android only)
      fixedWidth: 500, // a fixed width you want your left drawer to have (optional)
    },
    right: { // optional, define if you want a drawer from the right
      screen: 'example.SecondSideMenu', // unique ID registered with Navigation.registerScreen
      passProps: {} // simple serializable object that will pass as props to all top screens (optional)
      disableOpenGesture: false // can the drawer be opened with a swipe instead of button (optional, Android only)
      fixedWidth: 500, // a fixed width you want your right drawer to have (optional)
    },
    style: { // ( iOS only )
      drawerShadow: true, // optional, add this if you want a side menu drawer shadow
      contentOverlayColor: 'rgba(0,0,0,0.25)', // optional, add this if you want a overlay color when drawer is open
      leftDrawerWidth: 50, // optional, add this if you want a define left drawer width (50=percent)
      rightDrawerWidth: 50 // optional, add this if you want a define right drawer width (50=percent)
    },
    type: 'MMDrawer', // optional, iOS only, types: 'TheSideBar', 'MMDrawer' default: 'MMDrawer'
    animationType: 'door', //optional, iOS only, for MMDrawer: 'door', 'parallax', 'slide', 'slide-and-scale'
                                        // for TheSideBar: 'airbnb', 'facebook', 'luvocracy','wunder-list'
    disableOpenGesture: false // optional, can the drawer, both right and left, be opened with a swipe instead of button
  },
  passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
  animationType: 'slide-down' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
})

      */
  startLogin() {
    Navigation.startSingleScreenApp({
      screen: {
        screen: "LoginScreen", // unique ID registered with Navigation.registerScreen
        title: "Welcome", // title of the screen as appears in the nav bar (optional)
        navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
        navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
      },

      passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
      animationType: "slide-down" // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
    });
  }

  /*
      * Shows the signed-in user interface.
      */
  startUser() {
    setImmediate(() =>
      setAxiosConfig({
        'headers.common.Authorization': `Bearer ${store.getState().user.token}`,
      })
    );

    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: "HomeScreen"
        },
        {
          screen: "InteractionScreen"
        },
        {
          screen: "HomeScreen"
        },
        {
          screen: "HomeScreen"
        }
      ],
      tabsStyle: {
        initialTabIndex: 0
      },
      appStyle: {
        orientation: "portrait",
        statusBarTextColorSchemeSingleScreen: "dark",
        navBarHidden: true,
        drawUnderTabBar: true
      },
      passProps: {},
      animationType: "slide-down"
    });
  }
}
