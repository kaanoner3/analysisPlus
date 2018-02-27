import { Navigation } from "react-native-navigation";
import { images,languages } from "resources"

export function startHomeScreen(token) {
  Navigation.startTabBasedApp({
    tabs: [
      {
        screen: "HomeScreen",
        label: languages.t("tab_home"),
        icon: images.tabIndex0,
        selectedIcon: images.tabIndex0Active
      },
      {
        screen: "InteractionScreen",
        label: languages.t("tab_interaction"),
        icon: images.tabIndex1,
        selectedIcon: images.tabIndex1Active
      },
      {
        screen: "PremiumServiceScreen",
        label: languages.t("tab_engagement"),
        icon: images.tabIndex2,
        selectedIcon: images.tabIndex2Active
      },
      {
        screen: "StatisticChartScreen",
        label: languages.t("tab_graphic"),
        icon: images.tabIndex3,
        selectedIcon: images.tabIndex3Active
      }
    ],
    tabsStyle: {
      initialTabIndex: 0,
      tabBarBackgroundColor: "#111A2C",
      tabBarTranslucent: false,
      tabBarSelectedLabelColor: "#059ED9",
      tabBarTextFontFamily: "Circular",
      tabBarLabelColor:'rgba(255,255,255,0.3)',
      tabBarButtonColor:'rgba(255,255,255,0.3)',
      tabBarSelectedButtonColor:"rgba(5,158,217,1)"
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
