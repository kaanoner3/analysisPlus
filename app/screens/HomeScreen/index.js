import React, { Component } from "react"
import {
   Platform,
   StyleSheet,
   Text,
   View,
   FlatList,
   RefreshControl,
   Animated,
   ImageBackground,
   Dimensions,
   ScrollView,
   Image,
   TouchableOpacity
} from "react-native"
import { HomeScreenHeader, CustomRefreshControll } from "components"
import { images } from "resources"
import styles from "./styles"
import LinearGradient from "react-native-linear-gradient"
import { connect } from "react-redux"
import { getProfileDataRequest } from "ducks/profile"
import FlatlistItem from "./FlatlistItem"
const flatlistData = [
    {flData: 1}
]
const statistic_data = [
   { text1: 12, text2: "GAINED FOLLOWERS" },
   { text1: 29, text2: "LOSTED FOLLOWERS" },
   { text1: 245, text2: "PROFILE VISITORS" },
   { text1: 4, text2: "USER BLOCKING ME" },
   { text1: 57, text2: "STALKERS" },
   { text1: 7, text2: "DELETED COMMENT" },
   { text1: 33, text2: "USERS NOT FOLLOWING ME" },
   { text1: 33, text2: "USERS NOT FOLLOWED BY ME" },
   { text1: 33, text2: "DENEME 1" },
   { text1: 33, text2: "DENEME 2" }
]
const { width, height } = Dimensions.get("window")
class HomeScreen extends Component {
   static navigatorStyle = {
      navBarHidden: true
   }

   constructor() {
      super()
      this.renderList = this.renderList.bind(this)
      this.handleRefresh = this.handleRefresh.bind(this)
      this.renderBackgroundImage = this.renderBackgroundImage.bind(this)
      this.renderNavButtons = this.renderNavButtons.bind(this)

      this.state = {
         loading: true,
         scrollY: new Animated.Value(0),
         headerX: false
      }
      this.state.scrollY.addListener(scrolly => {})
   }
   componentWillMount() {
      this.props.getProfileDataRequest(this.props.token)
      if (height === 812) {
         this.setState({ headerX: true })
      } else {
         this.setState({ headerX: false })
      }
   }
   componentDidMount() {
      this.setState({})
      this.handleRefresh()
   }
   showUserScreen(index) {
      this.props.navigator.push({
         screen: "ShowInstagramUserScreen",
         passProps: { serviceIndex: index }
      })
   }
   renderBackgroundImage() {
      return (
         <ImageBackground style={styles.imageBackgound}>
            <Image source={images.bgTest} style={styles.backgroundUserImage} />
            <View style={styles.bottomView} />
            <LinearGradient
               colors={["#5D4ED3", "#059ED9", "#059ED9"]}
               style={styles.linearGradient}
               startPoint={{ x: 0.0, y: 0.0 }}
               endPoint={{ x: 0.3, y: 0.3 }}
               locations={[0, 0.3, 0]}
            />
         </ImageBackground>
      )
   }
   renderNavButtons() {
      return (
         <View
            style={
               this.state.headerX === false ? styles.headerButtonView : styles.headerButtonXView
            }
         >
            <TouchableOpacity>
               <Image source={images.headerSettingsIcon} />
            </TouchableOpacity>
            <TouchableOpacity>
               <Image source={images.headerSearchIcon} />
            </TouchableOpacity>
         </View>
      )
   }
   handleRefresh() {
       this.props.getProfileDataRequest(this.props.token)
   }
   renderList() {
      return <FlatlistItem  navigator={this.props.navigator} />
   }

   render() {
      return (
         <View style={styles.container}>
            {this.renderBackgroundImage()}
            {this.renderNavButtons()}
            <View style={styles.absolute}>
               <CustomRefreshControll
                  isRefreshing={this.props.isFetching}
                  onRefresh={this.handleRefresh}
                  onScroll={Animated.event([
                     {
                        nativeEvent: {
                           contentOffset: {
                              y: this.refs.header === undefined ? 0 : this.refs.header.state.scrollY
                           }
                        }
                     }
                  ])}
                  contentComponent={
                     <FlatList
                        ListHeaderComponent={
                           <HomeScreenHeader ref="header" loading={this.props.isFetching} />
                        }
                        style={styles.flatlist}
                        data={flatlistData}
                        renderItem={this.renderList}
                        numColumns={2}
                        scrollEventThrottle={1}
                     />
                  }
               />
            </View>
         </View>
      )
   }
}
const mapStateToProps = (state, ownProps) => {
   return {
      token: state.user.token,
      profileData: state.profile.profileData,
      isFetching: state.profile.isFetching
   }
}
export default connect(mapStateToProps, { getProfileDataRequest })(HomeScreen)

/*
      if (index % 2 === 0) {
         return (
            <View
               style={
                  index === 0
                     ? {
                          backgroundColor: "#152341",
                          borderTopLeftRadius: 15,
                          paddingTop: 10,
                          flex: 1
                       }
                     : { backgroundColor: "#152341", flex: 1 }
               }
            >
               <View style={styles.contentLeftItem}>
                  <TouchableOpacity activeOpacity={1} onPress={() => this.showUserScreen(index)}>
                     <View style={{ height: 96 / 2 }}>
                        <Text style={styles.infoText}>{item.text2}</Text>
                     </View>
                     <View style={styles.statisticView}>
                        <Text style={styles.statisticText}>{item.text1}</Text>
                        <View style={styles.arrowView}>
                           <Image source={images.gainArrow} />
                           <Text style={styles.gainText}>2</Text>
                        </View>
                     </View>
                  </TouchableOpacity>
               </View>
            </View>
         )
      } else {
         return (
            <View
               style={
                  index === 1
                     ? {
                          backgroundColor: "#152341",
                          borderTopRightRadius: 15,
                          paddingTop: 10,
                          flex: 1
                       }
                     : { backgroundColor: "#152341", flex: 1 }
               }
            >
               <View style={styles.contentRightItem}>
                  <TouchableOpacity
                     activeOpacity={1}
                     //style={{ backgroundColor: "red" }}
                     onPress={() => this.showUserScreen(index)}
                  >
                     <View style={{ height: 96 / 2 }}>
                        <Text style={styles.infoText}>{item.text2}</Text>
                     </View>
                     <View style={styles.statisticView}>
                        <Text style={styles.statisticText}>{item.text1}</Text>
                        <View style={styles.arrowView}>
                           <Image source={images.lostArrow} />
                           <Text style={styles.lostText}>2</Text>
                        </View>
                     </View>
                  </TouchableOpacity>
               </View>
            </View>
         )
      }
*/
