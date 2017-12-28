import styles from "./styles";
import React, { Component } from "react";
import { Navigation } from "react-native-navigation";
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
  Animated
} from "react-native";
import { images, strings } from "resources";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { switchToUser } from "ducks/app";
import store from "store";
import {} from "components";
import {
  VictoryBar,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryClipContainer,
  VictoryBrushContainer,
  VictoryContainer,
  VictoryCursorContainer,
  VictorySelectionContainer,
  VictoryVoroniContainer,
  VictoryGroup,
  VictoryScatter,
  VictoryAnimation,
  VictoryVoronoiContainer,
  VictoryArea,
  VictoryPie
} from "victory-native";
import {
  Path,
  G,
  LinearGradient,
  Stop,
  Defs,
  Svg,
  ClipPath,
  Animate
} from "react-native-svg";
import { AnimatedSVGPath } from "react-native-svg-animations";
import { svgPathProperties } from "svg-path-properties";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const baseUrl = "";
let AnimatedPath = Animated.createAnimatedComponent(Path);
let AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

class LoginScreen extends Component {
  static navigatorStyle = {
    statusBarTextColorSchemeSingleScreen: "light",
    navBarHidden: true,
     tabBarHidden: true
  };
  constructor(props) {
    super(props);

    const svgString =
      "M2.4 130.5L28.2 118.4C30.5 117.3 33.1 117.8 34.9 119.4L52.2 135.7C53.5 136.9 55.4 137.1 56.9 136.2L82 121.8C83.2 121.1 84.5 120.9 85.8 121.1L119 125.9C120.4 126.1 121.8 125.5 122.7 124.4L141.6 100.8C143 99.1 145.2 98.2 147.4 98.6L157.7 100.5C158.8 100.7 159.9 100.5 160.8 99.8L180.3 85.7C182.5 84.1 185.5 84.2 187.6 86L192.9 90.4C194.2 91.5 196.2 91.6 197.7 90.6L205.1 85.8C207.8 84 211.5 84.7 213.4 87.5L219.9 97.3C221.2 99.1 223.6 99.6 225.5 98.4 226.3 97.8 226.9 97 227.2 96L238.3 48.5C238.7 46.9 239.7 45.6 241.1 44.7L255.3 36.3C255.9 35.9 256.4 35.4 256.8 34.7L273.8 2.2C275.4-0.7 279-1.8 281.9-0.3 283.5 0.5 284.6 2 285 3.7L296.5 52.9C297 55.1 299.1 56.4 301.3 55.9 302.6 55.6 303.6 54.7 304.1 53.4L308.2 42.9C309.4 39.8 312.9 38.3 316 39.5 316.7 39.7 317.3 40.1 317.9 40.7L323.6 46C325.2 47.4 327.8 47.3 329.3 45.7 329.5 45.4 329.8 45.1 329.9 44.8L339.9 24.3C340.7 22.8 342.1 21.6 343.7 21.1L368.4 14.4C371.6 13.6 374.9 15.5 375.8 18.7 375.9 19.2 376 19.7 376 20.2L376 401 -1 401 -1 135.9C-1 133.6 0.3 131.5 2.4 130.5Z";
    const properties = svgPathProperties(svgString);
    this.length = properties.getTotalLength();
    this.strokeDashoffset = new Animated.Value(this.length);
    this.offset = new Animated.Value(100);

    this.showSignUpPage = this.showSignUpPage.bind(this);
    this.loginButtonPress = this.loginButtonPress.bind(this);
    this.renderChartAnimation = this.renderChartAnimation.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    this.state = {
      isLoading: false,
      ShouldRenderChart: false,
      offset: new Animated.Value(0)
    };

    this.offset.addListener(value => {
       // console.log(Math.ceil(this.offset._value).toString() + "%")
    });


  }
  animate = () => {
    this.strokeDashoffset.setValue(this.length);

    Animated.sequence([
      Animated.delay(100),
      Animated.timing(this.strokeDashoffset, {
        toValue: 0,
        duration: 3500
      })
    ]).start(() => {
      this.animate();
    });
  };
  animateOffset = () => {
    this.offset.setValue(100);

    Animated.sequence([
      Animated.delay(100),
      Animated.timing(this.offset, {
        toValue: 0,
        duration: 3500
      })
    ]).start(() => {
      this.animateOffset();
    });
  };
  componentDidMount() {
    this.setState({})
    this.animate();
    this.animateOffset()
  }
  /*
     *
     */
  loginButtonPress() {}
  onNavigatorEvent(event) {
    if (event.id === "bottomTabSelected") {
      this.setState({ ShouldRenderChart: true });
    }
    if (event.id === "willDisappear") {
      this.setState({ ShouldRenderChart: false });
    }
  }
  renderChartAnimation() {
    if (this.state.ShouldRenderChart === true) {
      return (
        <View style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <Svg width={screenWidth} height={400} viewBox="0 0 375 402">
            <Defs>
              <LinearGradient
                x1="50%"
                y1="100%"
                x2="50%"
                y2="0%"
                id="a"
              >
                <Stop stopColor="#00FF72" offset="0%" stopOpacity="0" />
                <Stop stopColor="#00FF72" offset="100%" stopOpacity="0.5" />
              </LinearGradient>
            </Defs>
            <AnimatedPath
              fill="url(#a)"
              strokeWidth={3}
              stroke="#00FF72"
              strokeDasharray={[this.length, this.length]}
              strokeDashoffset={this.strokeDashoffset}
              d="M-2.49846376,132.521081 L24.1577375,120.312315 C26.3495157,119.308462 28.929268,119.713881 30.7074772,121.341636 L48.6579471,137.773313 C49.9320308,138.939596 51.8108294,139.156315 53.3169812,138.310731 L79.2592909,123.746194 C80.4077228,123.101441 81.7363946,122.85247 83.040349,123.037686 L117.310239,127.905454 C118.692547,128.1018 120.077206,127.563181 120.963493,126.484374 L140.493114,102.712499 C141.868186,101.038731 144.038685,100.236105 146.171902,100.612547 L157.039636,102.530344 C158.090499,102.715787 159.171896,102.473649 160.043336,101.85778 L180.223754,87.5957557 C182.424228,86.0406239 185.391531,86.1431529 187.479416,87.8464602 L193.126912,92.4537161 C194.46448,93.5449113 196.35117,93.6549503 197.806523,92.726649 L205.760164,87.6533964 C208.487878,85.9135161 212.103858,86.6496557 213.934254,89.3174742 L220.982667,99.5905947 C222.232478,101.412206 224.722358,101.875741 226.543969,100.625929 C227.357893,100.067494 227.936594,99.2278323 228.168764,98.2684477 L239.724013,50.519208 C240.108788,48.9292159 241.126096,47.5652717 242.540402,46.7431623 L257.143998,38.2543722 C257.78116,37.8840019 258.303613,37.3448005 258.6537,36.6962723 L276.373495,3.87080041 C277.94759,0.954829087 281.587508,-0.132976564 284.503479,1.44111849 C286.00491,2.25161833 287.090262,3.6630182 287.488016,5.32223327 L299.474636,55.3238571 C299.98963,57.47213 302.148634,58.7961642 304.296907,58.2811704 C305.561454,57.9780273 306.599722,57.0791006 307.080723,55.8709565 L311.527665,44.7014596 C312.753387,41.62278 316.242795,40.1206619 319.321474,41.3463847 C319.978651,41.6080283 320.584386,41.9838168 321.110703,42.4563945 L327.415139,48.1171225 C329.058898,49.5930468 331.587901,49.4569902 333.063825,47.8132315 C333.301735,47.5482676 333.503198,47.2527207 333.662872,46.9344266 L344.027431,26.2737794 C344.798705,24.7363275 346.192726,23.6038251 347.855557,23.1638102 L373.465122,16.3870629 C376.668571,15.5393731 379.952668,17.4490934 380.800358,20.6525425 C380.932894,21.1534031 381,21.6693208 381,22.1874206 L381,403 L-6,403 L-6,137.976141 C-6,135.629507 -4.63196839,133.498244 -2.49846376,132.521081 Z"
            />
          </Svg>
        </View>
      );
    } else {
      return <View style={{}} />;
    }
  }
  /*
     * Switches page to registration form.
  */
  showSignUpPage() {
    this.props.navigator.push({
      screen: "HomeScreen"
    });
  }

  /*
     *
     */
  render() {
    console.log(this.offset._value);
    return (
      <View style={{ flex: 1, backgroundColor: "#151515" }}>
        <Image source={images.linearGradient} style={styles.linearGradient} />
        <Image style={styles.appLogo} source={images.appLogo} />
        <Image style={styles.loginScreenBg} source={images.loginScreenBg} />

        {this.renderChartAnimation()}

        <View style={styles.buttonContent}>
          <Text style={styles.upText}>Start analyzing your profile</Text>
          <TouchableOpacity
            style={{}}
            onPress={() => this.refs.instagramLogin.show()}
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
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    //   token: state.token
  };
};

export default connect(mapStateToProps, {})(LoginScreen);
/*
  
                        < Svg   width = "375" height = "402" viewBox = "0 0 375 402" > 
     <Defs>
         <linearGradient x1="51.8" y1="1.4" x2="51.8" y2="100">
         <Stop stop-color="#00FF72" offset="0%" stop-opacity="0.5" />
         <Stop stop-color="#00FF72" offset="100%" stop-opacity="0" />
         </linearGradient>
         <Path d="M2.9 131.4L28.7 119.3 28.7 119.3C30.5 118.4 32.7 118.8 34.2 120.2L51.5 136.4 51.5 136.4C53.1 137.9 55.5 138.2 57.4 137.1L82.5 122.7 82.5 122.7C83.5 122.1 84.6 121.9 85.7 122L118.9 126.9 118.9 126.9C120.6 127.1 122.4 126.4 123.5 125.1L142.4 101.4 142.4 101.4C143.6 100 145.4 99.3 147.2 99.6L157.6 101.5 157.6 101.5C158.9 101.7 160.3 101.4 161.4 100.6L180.8 86.5 180.8 86.5C182.7 85.2 185.2 85.3 187 86.7L192.2 91.1 192.2 91.1C193.9 92.5 196.4 92.7 198.2 91.5L205.6 86.6 205.6 86.6C207.9 85.1 211 85.7 212.5 88L219.1 97.8 219.1 97.8C220.6 100.1 223.7 100.8 226 99.2 227.1 98.5 227.8 97.4 228.1 96.2L239.3 48.7 239.3 48.7C239.6 47.4 240.5 46.3 241.6 45.6L255.8 37.1 255.8 37.1C256.6 36.7 257.2 36 257.7 35.2L274.7 2.7 274.7 2.7C276 0.3 279-0.7 281.5 0.6 282.8 1.3 283.7 2.5 284 3.9L295.5 53.1 295.5 53.1C296.1 55.8 298.8 57.5 301.5 56.9 303.1 56.5 304.5 55.3 305.1 53.8L309.1 43.3 309.1 43.3C310.1 40.7 313 39.4 315.6 40.4 316.2 40.6 316.7 41 317.2 41.4L322.9 46.7 322.9 46.7C325 48.6 328.1 48.4 330 46.4 330.3 46 330.6 45.6 330.8 45.2L340.8 24.7 340.8 24.7C341.5 23.4 342.6 22.5 344 22.1L368.7 15.4 368.7 15.4C371.4 14.7 374.1 16.3 374.8 18.9 374.9 19.3 375 19.8 375 20.2L375 400 0 400 0 135.9 0 135.9C0 134 1.1 132.2 2.9 131.4Z" />
         </Defs> 
         <G fill="none">
         <Path d="M2.4 130.5L28.2 118.4C30.5 117.3 33.1 117.8 34.9 119.4L52.2 135.7C53.5 136.9 55.4 137.1 56.9 136.2L82 121.8C83.2 121.1 84.5 120.9 85.8 121.1L119 125.9C120.4 126.1 121.8 125.5 122.7 124.4L141.6 100.8C143 99.1 145.2 98.2 147.4 98.6L157.7 100.5C158.8 100.7 159.9 100.5 160.8 99.8L180.3 85.7C182.5 84.1 185.5 84.2 187.6 86L192.9 90.4C194.2 91.5 196.2 91.6 197.7 90.6L205.1 85.8C207.8 84 211.5 84.7 213.4 87.5L219.9 97.3C221.2 99.1 223.6 99.6 225.5 98.4 226.3 97.8 226.9 97 227.2 96L238.3 48.5C238.7 46.9 239.7 45.6 241.1 44.7L255.3 36.3C255.9 35.9 256.4 35.4 256.8 34.7L273.8 2.2C275.4-0.7 279-1.8 281.9-0.3 283.5 0.5 284.6 2 285 3.7L296.5 52.9C297 55.1 299.1 56.4 301.3 55.9 302.6 55.6 303.6 54.7 304.1 53.4L308.2 42.9C309.4 39.8 312.9 38.3 316 39.5 316.7 39.7 317.3 40.1 317.9 40.7L323.6 46C325.2 47.4 327.8 47.3 329.3 45.7 329.5 45.4 329.8 45.1 329.9 44.8L339.9 24.3C340.7 22.8 342.1 21.6 343.7 21.1L368.4 14.4C371.6 13.6 374.9 15.5 375.8 18.7 375.9 19.2 376 19.7 376 20.2L376 401 -1 401 -1 135.9C-1 133.6 0.3 131.5 2.4 130.5Z" style="stroke-width:2;stroke:#00FF72" />
         </G>
         </Svg >
    
    */
