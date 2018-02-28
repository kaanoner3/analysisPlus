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
   TouchableOpacity,
   Alert,
   AsyncStorage
} from "react-native"
import { HomeScreenHeader, CustomRefreshControll } from "components"
import { images, strings } from "resources"
import styles from "./styles"
import LinearGradient from "react-native-linear-gradient"
import { connect } from "react-redux"
import { getProfileDataRequest } from "ducks/profile"
import FlatlistItem from "./FlatlistItem"
import OneSignal from "react-native-onesignal"
import notificationHandler, { getNotificationData, setNotificationData } from "utils/notificationHandler"

const flatlistData = [{ flData: 1 }]

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
      this.settingButtonPress = this.settingButtonPress.bind(this)
      this.searchButtonPressed = this.searchButtonPressed.bind(this)
      this.onOpened = this.onOpened.bind(this)
   
      AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
          stores.map((result, i, store) => {
            // get at each store's key/value so you can work with it
            let key = store[i][0];
            let value = store[i][1];
            console.log('asyncdata', key, value)
          });
        });
      });

      this.state = {
         loading: true,
         scrollY: new Animated.Value(0),
         headerX: false
      }
   }

   onOpened(result) {
      setNotificationData(result)
      notificationHandler(this.props.navigator)
   }
   componentWillMount() {
      OneSignal.addEventListener("opened", this.onOpened)
      this.props.getProfileDataRequest(this.props.token)
      if (height === 812) {
         this.setState({ headerX: true })
      } else {
         this.setState({ headerX: false })
      }
   }
   componentWillUnmount() {
      OneSignal.removeEventListener("opened", this.onOpened)
   }
   componentDidMount() {
      this.setState({})
      this.handleRefresh()
      setTimeout(() => {
         notificationHandler(this.props.navigator)
      }, 1000)
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
            <Image
               source={{ uri: this.props.userData.user.backgroundPic }}
               style={styles.backgroundUserImage}
            />
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
   searchButtonPressed() {
      this.props.navigator.push({
         screen: "SearchModal"
      })
   }
   settingButtonPress() {
      this.props.navigator.push({
         screen: "SettingScreen",
         passProps: {}
      })
   }
   renderNavButtons() {
      return (
         <View style={this.state.headerX === false ? styles.headerButtonView : styles.headerButtonXView}>
            <TouchableOpacity onPress={this.settingButtonPress}>
               <Image source={images.headerSettingsIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.searchButtonPressed}>
               <Image source={images.headerSearchIcon} />
            </TouchableOpacity>
         </View>
      )
   }
   handleRefresh() {
      this.props.getProfileDataRequest(this.props.token)
   }
   renderList() {
      return <FlatlistItem navigator={this.props.navigator} />
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
                           <HomeScreenHeader
                              ref="header"
                              loading={this.props.isFetching}
                              userData={this.props.userData}
                           />
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
      userData: state.profile.profileData,
      isFetching: state.profile.isFetching
   }
}
export default connect(mapStateToProps, { getProfileDataRequest })(HomeScreen)
