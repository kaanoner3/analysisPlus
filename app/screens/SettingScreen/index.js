import React, { Component } from "react"
import { View, Text, Image, TouchableOpacity, Switch, ScrollView } from "react-native"
import styles from "./styles"
import { connect } from "react-redux"
import { StaticHeader } from "components"
import { images, languages } from "resources"
import { doInstagramLogin, changeUser } from "ducks/auth"
import { deleteUser } from "ducks/user"
import Cookie from "react-native-cookie"
import { SignInService, InstagramSelf } from "services/LoginService"

const instagram = {
   client_id: "65dcfc61b3564f14a9144181b08c6b1a",
   redirect_url: "http://localhost:8005/login"
}

class SettingScreen extends Component {
   constructor() {
      super()
      this.renderAccounts = this.renderAccounts.bind(this)
      this.changeUser = this.changeUser.bind(this)
   }
   changeUser(instagram_token, username, password) {
      this.props.changeUser(instagram_token, username, password)
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
            <StaticHeader title="Settings" navigator={this.props.navigator} />
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
                     <Switch />
                  </View>
                  <View style={styles.notificationView}>
                     <Text style={styles.addAccText}>{languages.t("noti_blocksMe")}</Text>
                     <Switch />
                  </View>
               </View>
               <Text style={styles.sectionHeaderText}>ANALYSIS+</Text>
               <View style={styles.accContainer}>
                  <View style={styles.notificationView}>
                     <Text style={styles.addAccText}>{languages.t("noti_review")}</Text>
                  </View>
                  <View style={styles.notificationView}>
                     <Text style={styles.addAccText}>{languages.t("noti_report")}</Text>
                  </View>
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
      clientId: state.auth.data.clientID
   }
}

export default connect(mapStateToProps, { doInstagramLogin, changeUser, deleteUser })(SettingScreen)
