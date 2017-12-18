import styles from "./styles"
import React, { Component } from "react"
import { Navigation } from "react-native-navigation"
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    TextInput,
    AsyncStorage
} from "react-native"
import { images, strings } from "resources"
import axios from "axios"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
//import { login } from "ducks/user"
import { switchToUser } from "ducks/app"
import store from "store"
import {

} from "components"

const baseUrl = "https://hakanaktas.com.tr:3000/"

class LoginScreen extends Component {
    static navigatorStyle = {
        statusBarTextColorSchemeSingleScreen: "light",
        navBarHidden: true
        //  statusBarTextColorScheme: 'dark', // text color of status bar, 'dark' / 'light' (remembered across pushes)
    }
    constructor() {
        super()

        this.showSignUpPage = this.showSignUpPage.bind(this)
        this.loginButtonPress = this.loginButtonPress.bind(this)

        this.state = {
            email: "",
            password: "",
            isLoading: false,

            errors: {
                email: null,
                password: null,
            },
        }
    }

    /*
     *
     */
    loginButtonPress() {
        if (this.state.isLoading) {
            return
        }

        this.setState({ isLoading: true })

        store.dispatch(login(this.state.email, this.state.password))
            .then(user => {
                store.dispatch(switchToUser())
            })
            .catch(err => {
                if (err.status == 422) {
                    return this.setState({
                        errors: { ...err.response.data }
                    })
                }

                // TODO
            })
            .then(() => {
                this.setState({ isLoading: false })
            })
    }

    /*
     * Switches page to registration form.
     */
    showSignUpPage() {
        this.props.navigator.push({
            screen: "SignUpScreen",
        })
    }

    /*
     *
     */
    render() {
        return (
            <View style={styles.container}>
                <Text>asdasdasda</Text>
            </View>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
     //   token: state.token
    }
}

export default connect(mapStateToProps, { })(LoginScreen)
/*

*/
