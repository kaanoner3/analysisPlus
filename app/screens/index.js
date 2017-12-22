// Navigator.
import { Navigation } from 'react-native-navigation'

// Redux provider class.
import { Provider } from 'react-redux'

// Redux store instance.
import store from 'store'

// Screen components.
import LoginScreen from './LoginScreen'
import HomeScreen from './HomeScreen'
import ShowInstagramUserScreen from './ShowInstagramUserScreen'
import InteractionScreen from './InteractionScreen'
import StatisticChartScreen from './StatisticChartScreen'

Navigation.registerComponent('LoginScreen', () => LoginScreen, store, Provider)
Navigation.registerComponent('HomeScreen', () => HomeScreen, store, Provider)
Navigation.registerComponent('ShowInstagramUserScreen', () => ShowInstagramUserScreen, store, Provider)
Navigation.registerComponent('InteractionScreen', () => InteractionScreen, store, Provider)
Navigation.registerComponent('StatisticChartScreen', () => StatisticChartScreen, store, Provider)


// Export them for ease of import.
export {
    LoginScreen,
    HomeScreen,
    ShowInstagramUserScreen,
    InteractionScreen,
    StatisticChartScreen,
}
