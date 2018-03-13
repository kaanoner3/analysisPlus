import React, { Component } from "react"
import { View, Text, Image, TouchableOpacity, Switch, ScrollView, Linking } from "react-native"
import styles from "./styles"
import { connect } from "react-redux"
import { StaticHeader } from "components"
import { images, languages } from "resources"
import { doInstagramLogin, changeUser } from "ducks/auth"
import { setSettings, getSettings } from "ducks/settings"
import { deleteUser } from "ducks/user"
import Cookie from "react-native-cookie"
import { SignInService, InstagramSelf } from "services/LoginService"
import OneSignal from "react-native-onesignal"
import axios from "utils/axios"
import DeviceInfo from "react-native-device-info"
import * as StoreReview from "react-native-store-review"
import RatingRequestor from "react-native-rating-requestor"

const instagram = {
   client_id: "65dcfc61b3564f14a9144181b08c6b1a",
   redirect_url: "http://localhost:8005/login"
}

class SettingScreen extends Component {
   constructor() {
      super()
      this.renderAccounts = this.renderAccounts.bind(this)
      this.changeUser = this.changeUser.bind(this)
      this.reviewAppStore = this.reviewAppStore.bind(this)
      this.state = { unfollow_me: false, blocks_me: false }
      this.deviceInfo = undefined
      this.bundleId = undefined
   }
   changeUser(instagram_token, username, password) {
      this.props.changeUser(instagram_token, username, password)
   }
   componentWillMount() {
      this.deviceInfo = DeviceInfo.getSystemVersion()
      this.bundleId = DeviceInfo.getBundleId()
      axios
         .get("api/user/settings")
         .then(resp => {
            this.setState({
               unfollow_me: resp.data.notification_losted_follower,
               blocks_me: resp.data.notification_blocked_me
            })
         })
         .catch(error => console.log(error))
   }
   reviewAppStore() {
      if (parseInt(this.deviceInfo) > 10.3) {
         if (StoreReview.isAvailable) {
            StoreReview.requestReview()
         }
      } else {
         let RatingTracker = new RatingRequestor(this.bundleId)
         RatingTracker.showRatingDialog()
         /*
         RatingTracker.handlePositiveEvent(function(didAppear, userDecision) {
               console.log(didAppear,userDecision)
            if (didAppear) {
               switch (userDecision) {
                  case "decline":
                     console.log("User declined to rate")
                     break
                  case "delay":
                     console.log("User delayed rating, will be asked later")
                     break
                  case "accept":
                     console.log("User accepted invitation to rate, redirected to app store")
                     break
               }
            } else {
               console.log("Request popup did not pop up. May appear on future positive events.")
            }
         })
         */
      }
   }
   renderAccounts() {
      if (this.props.userList.length > 0) {
         return this.props.userList.map((data, index) => {
            return (
               <TouchableOpacity
                  style={styles.accComponent}
                  key={data.instagram_id}
                  onPress={() => this.changeUser(data.instagram_token, data.username, data.password)}
               >
                  {this.props.currentUserId === data.instagram_id ? (
                     <Image style={styles.addAccImage} source={images.selectedAcc} />
                  ) : (
                     <Image style={styles.addAccImage} source={images.nonSelectedAcc} />
                  )}
                  <Text style={styles.addAccText}>{data.username}</Text>
                  <TouchableOpacity
                     onPress={() => this.props.deleteUser(data.instagram_id)}
                     style={styles.logoutButton}
                  >
                     <Text style={styles.logoutText}>{languages.t("noti_logout")}</Text>
                  </TouchableOpacity>
               </TouchableOpacity>
            )
         })
      }
   }
   render() {
      return (
         <View style={styles.containerView}>
            <StaticHeader
               title="Settings"
               notiBlockData={this.state.blocks_me}
               notiUnfollowData={this.state.unfollow_me}
               navigator={this.props.navigator}
            />
            <ScrollView>
               <Text style={styles.sectionHeaderText}>{languages.t("noti_accounts")}</Text>
               <View style={styles.accContainer}>
                  {this.renderAccounts()}
                  <TouchableOpacity
                     style={styles.addAccButton}
                     onPress={() => {
                        Cookie.clear().then(() => {
                           this.refs.instagramLogin.show()
                        })
                     }}
                  >
                     <Image style={styles.addAccImage} source={images.addAcc} />
                     <Text style={styles.addAccText}>{languages.t("noti_addAcount")}</Text>
                  </TouchableOpacity>
               </View>
               <Text style={styles.sectionHeaderText}>{languages.t("noti_notifications")}</Text>
               <View style={styles.accContainer}>
                  <View style={styles.notificationView}>
                     <Text style={styles.addAccText}>{languages.t("noti_unfollowMe")}</Text>
                     <Switch
                        onValueChange={res => {
                           this.setState({ unfollow_me: res }, () => {
                              const params = new FormData()
                              params.append("notification_blocked_me", this.state.blocks_me)
                              params.append("notification_losted_follower", this.state.unfollow_me)
                              axios.post("api/user/settings-update", params).then(resp => console.log(resp))
                           })
                        }}
                        value={this.state.unfollow_me}
                        onTintColor="#059ED9"
                     />
                  </View>
                  <View style={styles.notificationView}>
                     <Text style={styles.addAccText}>{languages.t("noti_blocksMe")}</Text>
                     <Switch
                        onValueChange={res => {
                           this.setState({ blocks_me: res }, () => {
                              const params = new FormData()
                              params.append("notification_blocked_me", this.state.blocks_me)
                              params.append("notification_losted_follower", this.state.unfollow_me)
                              axios.post("api/user/settings-update", params).then(resp => console.log(resp))
                           })
                        }}
                        value={this.state.blocks_me}
                        onTintColor="#059ED9" //maliiiiiiye sor
                     />
                  </View>
               </View>
               <Text style={styles.sectionHeaderText}>ANALYSIS+</Text>
               <View style={styles.accContainer}>
                  <TouchableOpacity onPress={() => this.reviewAppStore()}>
                     <View style={styles.notificationView}>
                        <Text style={styles.addAccText}>{languages.t("noti_review")}</Text>
                     </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                     onPress={() => {
                        Linking.openURL(
                           `mailto:info@analysisplusapp.com?subject=id:${
                              this.props.dbID
                           } || instagram_ID:${
                              this.props.currentUserId
                           } || App Version: iOS/${DeviceInfo.getReadableVersion()} - İletişim&body=Mesajınız`
                        )
                     }}
                  >
                     <View style={styles.notificationView}>
                        <Text style={styles.addAccText}>{languages.t("noti_report")}</Text>
                     </View>
                  </TouchableOpacity>
                  <View style={styles.notificationView}>
                     <Text style={styles.addAccText}>{languages.t("noti_term")}</Text>
                  </View>
               </View>
            </ScrollView>
            <InstagramSelf
               ref="instagramLogin"
               clientId={instagram.client_id}
               scopes={["public_content", "follower_list", "basic", "relationships", "likes"]}
               redirectUrl={instagram.redirect_url}
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
      userList: state.user.existingUsers,
      currentUserId: state.profile.profileData.user.id,
      dbID: state.profile.profileData.vipData.id,
      clientId: state.auth.data.clientID
   }
}

export default connect(mapStateToProps, {
   doInstagramLogin,
   changeUser,
   deleteUser,
   setSettings,
   getSettings
})(SettingScreen)
