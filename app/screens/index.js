// Navigator.
import { Navigation } from 'react-native-navigation'

// Redux provider class.
import { Provider } from 'react-redux'

// Redux store instance.
import store from 'store'

// Screen components.
import LoginScreen from './LoginScreen'
import HomeScreen from './HomeScreen'


// Register them all right away. Because why do it somewhere else?
Navigation.registerComponent('LoginScreen', () => LoginScreen, store, Provider)
Navigation.registerComponent('HomeScreen', () => HomeScreen, store, Provider)


// Export them for ease of import.
export {
    LoginScreen,
    HomeScreen
}
