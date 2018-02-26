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
import {images} from 'resources'

const { width, height } = Dimensions.get("window");

export default class InstagramSelf extends Component {
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
                  source={images.close}
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

InstagramSelf.propTypes = propTypes;
InstagramSelf.defaultProps = defaultProps;

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

