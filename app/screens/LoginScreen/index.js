import styles from "./styles"
import React, { Component } from "react"
import { Navigation } from "react-native-navigation"
import { images, strings } from "resources"
import axios from "axios"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { switchToUser } from "ducks/app"
import store from "store"
import { svgPathProperties } from "svg-path-properties"
import InstagramLogin from "react-native-instagram-login"
import { App as AppReducer, User as UserReducer } from "store/reducers"
import * as Auth from "ducks/auth"
//import { InstaLoginService } from "newServices"
import { SignInService } from "services/LoginService"
import Cookie from "react-native-cookie"
//import {  }
import { Path, G, LinearGradient, Stop, Defs, Svg, ClipPath, Animate } from "react-native-svg"
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
   AsyncStorage,
   Animated,
   ART
} from "react-native"

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

const instagram = {
   client_id: "65dcfc61b3564f14a9144181b08c6b1a",
   redirect_url: "http://localhost:8005/login"
}

class LoginScreen extends Component {
   static navigatorStyle = {
      statusBarTextColorSchemeSingleScreen: "light",
      navBarHidden: true,
      tabBarHidden: true
   }

   constructor(props) {
      super(props)

      this.state = {
         isLoading: false,
         ShouldRenderChart: false,
         length: this.length,
         value: 0,
         testValue: new Animated.Value(0),
         headerX: false
      }
      const svgString =
         "M2.4 130.5L28.2 118.4C30.5 117.3 33.1 117.8 34.9 119.4L52.2 135.7C53.5 136.9 55.4 137.1 56.9 136.2L82 121.8C83.2 121.1 84.5 120.9 85.8 121.1L119 125.9C120.4 126.1 121.8 125.5 122.7 124.4L141.6 100.8C143 99.1 145.2 98.2 147.4 98.6L157.7 100.5C158.8 100.7 159.9 100.5 160.8 99.8L180.3 85.7C182.5 84.1 185.5 84.2 187.6 86L192.9 90.4C194.2 91.5 196.2 91.6 197.7 90.6L205.1 85.8C207.8 84 211.5 84.7 213.4 87.5L219.9 97.3C221.2 99.1 223.6 99.6 225.5 98.4 226.3 97.8 226.9 97 227.2 96L238.3 48.5C238.7 46.9 239.7 45.6 241.1 44.7L255.3 36.3C255.9 35.9 256.4 35.4 256.8 34.7L273.8 2.2C275.4-0.7 279-1.8 281.9-0.3 283.5 0.5 284.6 2 285 3.7L296.5 52.9C297 55.1 299.1 56.4 301.3 55.9 302.6 55.6 303.6 54.7 304.1 53.4L308.2 42.9C309.4 39.8 312.9 38.3 316 39.5 316.7 39.7 317.3 40.1 317.9 40.7L323.6 46C325.2 47.4 327.8 47.3 329.3 45.7 329.5 45.4 329.8 45.1 329.9 44.8L339.9 24.3C340.7 22.8 342.1 21.6 343.7 21.1L368.4 14.4C371.6 13.6 374.9 15.5 375.8 18.7 375.9 19.2 376 19.7 376 20.2L376 401 -1 401 -1 135.9C-1 133.6 0.3 131.5 2.4 130.5Z"
      const properties = svgPathProperties(svgString)
      this.length = properties.getTotalLength()

      this.strokeDashoffset = new Animated.Value(this.length)
      this.validHeight = 0

      this.showSignUpPage = this.showSignUpPage.bind(this)
      this.loginButtonPress = this.loginButtonPress.bind(this)
      this.renderBottomBackground = this.renderBottomBackground.bind(this)
      this.handleLoginSucces = this.handleLoginSucces.bind(this)

      //    this.animateEntrance = this.animateEntrance.bind(this);
      //    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
   }

   componentWillMount() {
      if (screenHeight === 812) {
         this.validHeight = screenHeight / 2
         this.setState({ headerX: true })
      } else {
         this.validHeight = 400
         this.setState({ headerX: false })
      }
      Cookie.clear().then(() => {})
   }
   handleLoginSucces({ token }) {}
   loginButtonPress() {
      store.dispatch(AppReducer.switchToUser())
   }

   renderBottomBackground() {
      return (
         <View
            style={{
               position: "absolute",
               bottom: 0,
               left: 0,
               right: 0,
               height: this.validHeight,
               backgroundColor: "transparent"
            }}
         >
            <Image source={images.loginScreeLinearBg} />
         </View>
      )
   }

   showSignUpPage() {
      this.props.navigator.push({
         screen: "HomeScreen"
      })
   }

   render() {
      return (
         <View style={{ flex: 1, backgroundColor: "#152341" }}>
            <Image source={images.linearGradient} style={styles.linearGradient} />
            <Image
               style={this.state.headerX === false ? styles.appLogo : styles.appXLogo}
               source={images.appLogo}
            />
            <Image style={styles.loginScreenBg} source={images.loginScreenBg} />
            {this.renderBottomBackground()}
            <View style={styles.buttonContent}>
               <Text style={styles.upText}>Start analyzing your profile</Text>

               <TouchableOpacity style={{ flex: 1 }} onPress={() => this.refs.instagramLogin.show()}>
                  <View style={styles.buttonView}>
                     <Image style={{ height: 18, width: 18 }} source={images.logoInstagram} />
                     <Text style={styles.loginText}>Login with Instagram</Text>
                  </View>
               </TouchableOpacity>

               <Text style={styles.botText}>We will never post without your permission</Text>
            </View>
            <InstagramLogin
               ref="instagramLogin"
               s
               clientId={instagram.client_id}
               redirectUrl={instagram.redirect_url}
               scopes={["public_content", "follower_list", "basic", "relationships", "likes"]}
               onLoginSuccess={(token, result) => {
                  //fatihe idleri gonder
                  this.props.doInstagramLogin(token, result)
               }}
            />
         </View>
      )
   }
}

const mapStateToProps = (state, ownProps) => {
   return {
      //   token: state.token
   }
}

export default connect(mapStateToProps, Auth)(LoginScreen)
/*
//animate svg dont delete
  onNavigatorEvent(event) {
    if (event.id === "bottomTabSelected") {
      this.setState({ ShouldRenderChart: true });
    }
    if (event.id === "willDisappear") {
      this.setState({ ShouldRenderChart: false });
    }
  }
  animateEntrance() {
    Animated.timing(this.state.testValue, {
      toValue: 1585,
      duration: 2500
    }).start(() => {});
  }

        <View style={styles.buttonContent}>
          <Text style={styles.upText}>Start analyzing your profile</Text>
          <TouchableOpacity
            style={{ flex: 1 }}
            // onPress={() => this.refs.instagramLogin.show()}
          >
            <View style={styles.buttonView}>
              <Image
                style={{ height: 18, width: 18 }}
                source={images.logoInstagram}
              />
              <Text style={styles.loginText}>Login with Instagram</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.botText}>
            We will never post without your permission
          </Text>
        </View>
*/
/*
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: this.validHeight,
          }}
        >
          <Svg width={screenWidth} height={400}>

            <AnimatedPath
              fill="url(#a)"
              strokeWidth={3}
              stroke="#00FF72"
              //reac  strokeDasharray={[this.length, this.length]}
              strokeDashoffset={this.strokeDashoffset}
              d="M-2.49846376,132.521081 L24.1577375,120.312315 C26.3495157,119.308462 28.929268,119.713881 30.7074772,121.341636 L48.6579471,137.773313 C49.9320308,138.939596 51.8108294,139.156315 53.3169812,138.310731 L79.2592909,123.746194 C80.4077228,123.101441 81.7363946,122.85247 83.040349,123.037686 L117.310239,127.905454 C118.692547,128.1018 120.077206,127.563181 120.963493,126.484374 L140.493114,102.712499 C141.868186,101.038731 144.038685,100.236105 146.171902,100.612547 L157.039636,102.530344 C158.090499,102.715787 159.171896,102.473649 160.043336,101.85778 L180.223754,87.5957557 C182.424228,86.0406239 185.391531,86.1431529 187.479416,87.8464602 L193.126912,92.4537161 C194.46448,93.5449113 196.35117,93.6549503 197.806523,92.726649 L205.760164,87.6533964 C208.487878,85.9135161 212.103858,86.6496557 213.934254,89.3174742 L220.982667,99.5905947 C222.232478,101.412206 224.722358,101.875741 226.543969,100.625929 C227.357893,100.067494 227.936594,99.2278323 228.168764,98.2684477 L239.724013,50.519208 C240.108788,48.9292159 241.126096,47.5652717 242.540402,46.7431623 L257.143998,38.2543722 C257.78116,37.8840019 258.303613,37.3448005 258.6537,36.6962723 L276.373495,3.87080041 C277.94759,0.954829087 281.587508,-0.132976564 284.503479,1.44111849 C286.00491,2.25161833 287.090262,3.6630182 287.488016,5.32223327 L299.474636,55.3238571 C299.98963,57.47213 302.148634,58.7961642 304.296907,58.2811704 C305.561454,57.9780273 306.599722,57.0791006 307.080723,55.8709565 L311.527665,44.7014596 C312.753387,41.62278 316.242795,40.1206619 319.321474,41.3463847 C319.978651,41.6080283 320.584386,41.9838168 321.110703,42.4563945 L327.415139,48.1171225 C329.058898,49.5930468 331.587901,49.4569902 333.063825,47.8132315 C333.301735,47.5482676 333.503198,47.2527207 333.662872,46.9344266 L344.027431,26.2737794 C344.798705,24.7363275 346.192726,23.6038251 347.855557,23.1638102 L373.465122,16.3870629 C376.668571,15.5393731 379.952668,17.4490934 380.800358,20.6525425 C380.932894,21.1534031 381,21.6693208 381,22.1874206 L381,403 L-6,403 L-6,137.976141 C-6,135.629507 -4.63196839,133.498244 -2.49846376,132.521081 Z"
            />
          </Svg>
        </View>
        */

/*
        //instagram.jsgit 
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  WebView,
  Alert,
  Modal,
  Dimensions,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import qs from "qs";

const { width, height } = Dimensions.get("window");

export default class Instagram extends Component {
  constructor(props) {
    super(props);
    this.state = { modalVisible: false, username: "", password: "" };
    this.jsCode =
      "(function(){" +
      '$("#login-form").submit(function(event){' +
      'window.location.hash = "login&username=" + document.getElementById("id_username").value + "&password=" + document.getElementById("id_password").value;' +
      "});" +
      "return('yey!');" +
      "}());";
  }

  show() {
    this.setState({ modalVisible: true });
  }

  hide() {
    this.setState({ modalVisible: false });
  }

  _onNavigationStateChange(webViewState) {
    const { url } = webViewState;
    if (url.match(/username/)) {
      const matchAuth = url.match(/(#|\?)(.*)/);
      let resultsAuth = qs.parse(matchAuth[2]);

      if (resultsAuth.username && resultsAuth.password) {
        this.setState({
          username: resultsAuth.username,
          password: resultsAuth.password
        });
      }
    }

    if (url && url.startsWith(this.props.redirectUrl)) {
      const match = url.match(/(#|\?)(.*)/);
      const results = qs.parse(match[2]);
      this.hide();
      if (results.access_token) {
        results.username = this.state.username;
        results.password = this.state.password;
        // Keeping this to keep it backwards compatible, but also returning raw results to account for future changes.
        this.props.onLoginSuccess(results.access_token, results);
      } else {
        this.props.onLoginFailure(results);
      }
    }
  }

  _onMessage(reactMessage) {
    try {
      const json = JSON.parse(reactMessage.nativeEvent.data);
      if (json && json.error_type) {
        this.hide();
        this.props.onLoginFailure(json);
      }
    } catch (err) {}
  }

  _onLoadEnd() {
    const scriptToPostBody = "window.postMessage(document.body.innerText, '*')";
    this.webView.injectJavaScript(scriptToPostBody);
  }

  render() {
    const { clientId, redirectUrl, scopes } = this.props;
    return (
      <Modal
        animationType={"slide"}
        visible={this.state.modalVisible}
        onRequestClose={this.hide.bind(this)}
        transparent
      >
        <View style={[styles.modalWarp, this.props.styles.modalWarp]}>
          <KeyboardAvoidingView
            behavior="padding"
            style={[styles.keyboardStyle, this.props.styles.keyboardStyle]}
          >
            <View style={[styles.contentWarp, this.props.styles.contentWarp]}>
              <WebView
                style={[styles.webView, this.props.styles.webView]}
                source={{
                  uri: `https://api.instagram.com/oauth/authorize/?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=token&scope=${scopes.join(
                    "+"
                  )}`
                }}
                scalesPageToFit
                startInLoadingState
                injectedJavaScript={this.jsCode}
                onNavigationStateChange={this._onNavigationStateChange.bind(
                  this
                )}
                onError={this._onNavigationStateChange.bind(this)}
                onLoadEnd={this._onLoadEnd.bind(this)}
                ref={webView => {
                  this.webView = webView;
                }}
              />
              <TouchableOpacity
                onPress={this.hide.bind(this)}
                style={[styles.btnStyle, this.props.styles.btnStyle]}
              >
                <Image
                  source={require("./close.png")}
                  style={[styles.closeStyle, this.props.styles.closeStyle]}
                />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    );
  }
}
const propTypes = {
  clientId: PropTypes.string.isRequired,
  redirectUrl: PropTypes.string,
  styles: PropTypes.object,
  scopes: PropTypes.array,
  onLoginSuccess: PropTypes.func,
  modalVisible: PropTypes.bool,
  onLoginFailure: PropTypes.func
};

const defaultProps = {
  redirectUrl: "https://google.com",
  styles: {},
  scopes: ["public_content"],
  onLoginSuccess: token => {
    Alert.alert("Alert Title", "Token: " + token, [{ text: "OK" }], {
      cancelable: false
    });
  },
  onLoginFailure: failureJson => {
    console.debug(failureJson);
  }
};

Instagram.propTypes = propTypes;
Instagram.defaultProps = defaultProps;

const styles = StyleSheet.create({
  modalWarp: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  keyboardStyle: {
    flex: 1,
    paddingTop: 30
  },
  contentWarp: {
    backgroundColor: "#fff",
    alignSelf: "center",
    width: width - 30,
    height: height - 80
  },
  webView: {
    flex: 1
  },
  btnStyle: {
    width: 30,
    height: 30,
    position: "absolute",
    top: 5,
    right: 5
  },
  closeStyle: {
    width: 30,
    height: 30
  }
});

        */
