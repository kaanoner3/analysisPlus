import { Navigation } from "react-native-navigation";
import { setConfig as setAxiosConfig } from "config/axios";
import { images } from "resources";

export function startHomeScreen(token) {

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
  });
}

export function startLoginScreen() {
  Navigation.startSingleScreenApp({
    screen: {
      screen: "LoginScreen",
      title: "Welcome",
      navigatorStyle: {},
      navigatorButtons: {}
    },

    passProps: {},
    animationType: "slide-down"
  });
}
