import React, { Component } from "react"
import {
   Platform,
   StyleSheet,
   Text,
   View,
   Image,
   Dimensions,
   ImageBackground,
   Animated,
   TouchableOpacity
} from "react-native"
import { images } from "resources"
import * as Progress from "react-native-progress"
import Svg, {
   Circle,
   Ellipse,
   G,
   LinearGradient,
   RadialGradient,
   Line,
   Path,
   Polygon,
   Polyline,
   Rect,
   Symbol,
   Use,
   Defs,
   Stop
} from "react-native-svg"

const { width, height } = Dimensions.get("window")

let statusbarHeight = 20
if (!Platform.isPad && !Platform.isTVOS && height == 812) {
   statusbarHeight = 44
}
let AnimatedCircle = Animated.createAnimatedComponent(Circle)

class HomeScreenHeader extends Component {
   constructor() {
      super()
      this.state = {
         scrollY: new Animated.Value(0),
         rotateY: new Animated.Value(0),
         loading: false,
         startAnimation: false,
         indeterminate: true,
         progress: 0
      }

      this.rotate = "0deg"
      this.rotateText = "0deg"
      this.interval
      this.interval2
      this.opacity
      this.renderSvgCircle = this.renderSvgCircle.bind(this)
      this.renderAnimatedPart = this.renderAnimatedPart.bind(this)
      this.rotateCircle = this.rotateCircle.bind(this)

      this.state.rotateY.addListener(rotateY => {})
      this.state.scrollY.addListener(scrollY => {
         if (this.state.startAnimation === false) {
            let strokeDashoffset = scrollY.value * -6.5
            strokeDashoffset = Math.min(strokeDashoffset, 377)
            strokeDashoffset = Math.max(strokeDashoffset, 0)
            this._myCircle.setNativeProps({
               strokeDashoffset: 377 - strokeDashoffset
            })
         }
      })
   }
   componentDidMount(){
       this.setState({})
   }
   animate() {
      this.setState({ progress: 0 }, () => {
         setTimeout(() => {
            this.interval = setInterval(() => {
               let temp = Math.random() * 10
               if (this.state.progress + temp <= 98) {
                  this.setState({ progress: this.state.progress + temp })
               } else {
                  this.setState({ progress: 98 })
               }
            }, 70)
         }, 0)
      })
   }
   componentWillReceiveProps(nextProps) {
      if (this.props.loading !== nextProps.loading) {
         if (nextProps.loading === true) {
            this.setState({ startAnimation: true }, () => {
               this.animate()
               Animated.timing(this.state.rotateY, {
                  toValue: 1,
                  duration: 250
               }).start(() => {
                  this.rotateCircle()
               })
            })
         } else {
            this.setState({ startAnimation: false }, () => {
               clearInterval(this.interval)
               clearInterval(this.interval2)
               Animated.timing(this.state.rotateY, {
                  toValue: 0,
                  duration: 500
               }).start(() => {})
            })
         }
      }
   }
   rotateCircle() {
      let temp = 1
      let strokeDashoffset = 0
      this.interval2 = setInterval(() => {
         temp += 1
         strokeDashoffset = temp * 6.5
         strokeDashoffset = Math.min(strokeDashoffset, 10000)
         strokeDashoffset = Math.max(strokeDashoffset, 0)
         this._myCircle2.setNativeProps({
            strokeDashoffset: 0 + strokeDashoffset
         })
      }, 1)
   }
   renderSvgCircle() {
      if (this.state.startAnimation === false) {
         return (
            <View style={{ position: "absolute", top: 0, left: 0, zIndex: 9 }}>
               <Svg width="124" height="124">
                  <Defs>
                     <LinearGradient x1="50%" y1="100%" x2="50%" y2="0%" id="a">
                        <Stop stopColor="#59D24E" offset="0%" />
                        <Stop stopColor="#00BCC2" offset="100%" />
                     </LinearGradient>
                  </Defs>
                  <G fill="none" fillRule="evenodd" strokeLinecap="round">
                     <Circle
                        strokeOpacity=".1"
                        stroke="#FFF"
                        strokeWidth="4"
                        cx="62"
                        cy="62"
                        r="60"
                     />
                     <AnimatedCircle
                        stroke="url(#a)"
                        strokeWidth="4"
                        strokeDasharray="377"
                        strokeDashoffset="377"
                        rotation="-90"
                        origin="60, 60"
                        ref={ref => (this._myCircle = ref)}
                        cx="58"
                        cy="62"
                        r="60"
                     />
                  </G>
               </Svg>
            </View>
         )
      } else {
         return (
             
            <Animated.View
               style={[
                  { position: "absolute", top: 0, left: 0, zIndex: 9 },
                  { opacity: this.opacity }
               ]}
            >
               <Svg width="124" height="124">
                  <Defs>
                     <LinearGradient x1="50%" y1="100%" x2="50%" y2="0%" id="a">
                        <Stop stopColor="#59D24E" offset="0%" />
                        <Stop stopColor="#00BCC2" offset="100%" />
                     </LinearGradient>
                  </Defs>
                  <G fill="none" fillRule="evenodd" strokeLinecap="round">
                     <Circle
                        strokeOpacity=".1"
                        stroke="#FFF"
                        strokeWidth="4"
                        cx="62"
                        cy="62"
                        r="60"
                     />
                     <AnimatedCircle
                        stroke="url(#a)"
                        strokeWidth="4"
                        strokeDasharray="100"
                        strokeDashoffset=""
                        rotation="-90"
                        origin="60, 60"
                        ref={ref => (this._myCircle2 = ref)}
                        cx="58"
                        cy="62"
                        r="60"
                     />
                  </G>
               </Svg>
            </Animated.View>
            
         )
      }
   }
   renderAnimatedPart() {
      if (this.state.startAnimation === false) {
         return (
            <Animated.View
               style={{
                  transform: [{ rotateY: this.rotate }],
                  flexDirection: "row",
                  marginTop: 26,
                  alignItems: "center"
               }}
            >
               <Animated.View
                  style={{
                     transform: [{ rotateY: this.rotateText }],
                     flexDirection: "column",
                     paddingRight: 20
                  }}
               >
                  <Text style={styles.textStyle}>{this.props.userData===null ?0:this.props.userData.user.counts.follows}</Text>
                  <Text style={styles.textStyle1}>FOLLOWING</Text>
               </Animated.View>
               <View
                  style={{
                     width: 124,
                     height: 124,
                     alignItems: "center",
                     justifyContent: "center"
                  }}
               >
                  <Animated.Image
                     style={{
                        transform: [{ rotateY: this.rotate }],
                        height: 106,
                        width: 106,
                        borderRadius: 53
                     }}
                     source={this.props.userData===null ?{uri:""}:{ uri: this.props.userData.user.profile_picture}}
                  />
                  {this.renderSvgCircle()}
               </View>
               <Animated.View
                  style={{
                     transform: [{ rotateY: this.rotateText }],
                     flexDirection: "column",
                     marginLeft: 20
                  }}
               >
                  <Text style={styles.textStyle}>{this.props.userData===null ?0:this.props.userData.user.counts.followed_by}</Text>
                  <Text style={styles.textStyle1}>FOLLOWERS</Text>
               </Animated.View>
            </Animated.View>
         )
      } else {
         return (
            <Animated.View
               style={{
                  flexDirection: "row",
                  marginTop: 36,
                  alignItems: "center"
               }}
            >
               <View
                  style={{
                     width: 124,
                     height: 124,
                     alignItems: "center",
                     justifyContent: "center"
                  }}
               >
                  <View style={{}}>
                     <Progress.Circle
                        style={{ alignSelf: "center" }}
                        borderWidth={0}
                        formatText={progress => `${Math.round(this.state.progress)}%`}
                        borderColor="rgba(255,255,255,0.0)"
                        size={80}
                        textStyle={{
                           color: "white",
                           fontSize: 20,
                           fontWeight: "bold"
                        }}
                        progress={this.state.progress}
                        showsText={true}
                        color={"rgba(255,255,255,0)"}
                        unfilledColor="rgba(255,255,255,0.0)"
                     />
                  </View>
                  {this.renderSvgCircle()}
               </View>
            </Animated.View>
         )
      }
   }
   render() {
    console.log("HEEEADEEEEER", this.props.userData)
    console.log(this._myCircle2)
      this.opacity = this.state.scrollY.interpolate({
         inputRange: [-60, 0],
         outputRange: [0, 1]
      })
      const main_opacity = this.state.scrollY.interpolate({
         inputRange: [0, 80],
         outputRange: [1, 0.5]
      })
      this.rotate = this.state.rotateY.interpolate({
         inputRange: [0, 1],
         outputRange: ["0deg", "180deg"]
      })
      this.rotateText = this.state.rotateY.interpolate({
         inputRange: [0, 1],
         outputRange: ["0deg", "180deg"]
      })
      const spin = this.state.scrollY.interpolate({
         inputRange: [-60, -60, 0, 0, 0],
         outputRange: ["360deg", "360deg", "0deg", "0deg", "0deg"]
      })
      return (
         <Animated.View style={[{ paddingBottom: 20, opacity: main_opacity }]}>
            <View style={{ height: statusbarHeight }} />
            <View style={{ flexDirection: "column", alignItems: "center" }}>
               {this.renderAnimatedPart()}
               <View
                  style={{
                     flexDirection: "column",
                     alignItems: "center",
                     marginTop: 10
                  }}
               >
                  <Text style={styles.textStyle}>{this.props.userData===null ?"":this.props.userData.user.full_name}</Text>
                  <Text style={[styles.textStyle1, { marginTop: 4 }]}>@{this.props.userData===null ?"":this.props.userData.user.username}</Text>
               </View>
            </View>
         </Animated.View>
      )
   }
}

export default HomeScreenHeader

const styles = {
   textStyle: {
      color: "white",
      fontSize: 22,
      backgroundColor: "transparent",
      alignSelf: "center",
      fontWeight: "bold",
      fontFamily: "Circular"
   },
   textStyle1: {
      color: "rgba(255,255,255,0.5)",
      fontSize: 12,
      fontWeight: "bold",
      backgroundColor: "transparent",
      marginTop: 4,
      fontFamily: "Circular"
   }
}
/*
                let strokeDashoffset = scrollY.value * -6.5
                strokeDashoffset = Math.min(strokeDashoffset, 377)
                strokeDashoffset = Math.max(strokeDashoffset, 0)
                this._myCircle.setNativeProps({ strokeDashoffset: 377 - strokeDashoffset });


                */
