import React, { Component } from "react"
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator, Dimensions } from "react-native"
import { StaticHeader, InstagramUser, ErrorPage } from "components"
import styles from "./styles"
import { getUserDataRequest, addDataToUserlist } from "ducks/instagramUsers"
import { connect } from "react-redux"
import { languages, images } from "resources"
import { BlurView, VibrancyView } from "react-native-blur"

class ShowInstagramUserScreen extends Component {
   constructor() {
      super()
      this.renderInstagramUser = this.renderInstagramUser.bind(this)
      this.renderBlurContent = this.renderBlurContent.bind(this)
      this.isContentVip = this.isContentVip.bind(this)

      this.page = 0

      this.headerText = ""
   }
   pushInstagramUserDetail() {
      this.props.navigator.push({
         screen: "UserDetailScreen",
         backButtonTitle: "Back",
         backButtonHidden: false,
         passProps: {}
      })
   }
   componentWillMount() {
      this.headerText = "header_" + this.props.serviceType
      console.log(this.headerText)
   }
   renderInstagramUser({ item }) {
      return (
         <View>
            <InstagramUser
               data={item}
               userType={this.props.serviceType}
               //onPress={() => this.pushInstagramUserDetail()}
               navigator={this.props.navigator}
            />
         </View>
      )
   }
   renderBlurContent() {
      return (
         <View style={styles.absolute}>
            <BlurView style={styles.absolute} blurType="dark" blurAmount={5} />
            <View style={{ flexDirection: "column", alignItems: "center", marginTop: 200 }}>
               <TouchableOpacity
                  style={styles.upgradeButton}
                  onPress={() => {
                     this.props.navigator.push({
                        screen: "PremiumServiceScreen",
                        backButtonTitle: "Back",
                        backButtonHidden: false,
                        passProps: {}
                     })
                  }}
               >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                     <Image style={{ height: 26, width: 20, marginVertical: 14 }} source={images.lockLogo} />
                     <Text style={styles.buttonText}>{languages.t("upgradePremium")}</Text>
                  </View>
               </TouchableOpacity>
            </View>
         </View>
      )
   }
   isContentVip() {
      console.log(this.props.serviceType, this.props.isVip)
      if (this.props.serviceType === "losted_followers" && this.props.isVip === false) {
         return this.renderBlurContent()
      } else {
         return <View />
      }
   }
   render() {
      if (this.props.isFetching === false) {
         if (this.props.errorPage === false) {
            return (
               <View style={{ flex: 1, backgroundColor: "#152341" }}>
                  <StaticHeader title={languages.t(this.headerText)} navigator={this.props.navigator} />
                  <View style={{ flex: 1 }}>
                     <FlatList
                        renderItem={this.renderInstagramUser}
                        data={this.props.flatlistData}
                        style={{ flex: 1 }}
                        ItemSeparatorComponent={() => <View style={styles.itemSepStyle} />}
                        onEndReachedThreshold={0.5}
                        onEndReached={() => {
                           this.page = this.page + 1
                           let temp = Math.floor(this.props.userList.length / 20)
                           if (20 * temp < this.props.userList.length) {
                              temp = temp + 1
                           }
                           if (this.page < temp) {
                              this.props.addDataToUserlist(this.page)
                           }
                        }}
                     />
                     {/*bunu ayrı bir fonksiyona al bir suru kritere gore olabilir*/}
                     {this.isContentVip()}
                  </View>
               </View>
            )
         } else {
            return <ErrorPage />
         }
      } else {
         return (
            <View style={{ flex: 1, backgroundColor: "#152341", alignItems: "center" }}>
               <ActivityIndicator
                  style={{ top: Dimensions.get("window").height / 2 }}
                  color="white"
                  size="large"
               />
            </View>
         )
      }
   }
}
const mapStateToProps = (state, ownProps) => {
   return {
      token: state.user.token,
      flatlistData: state.instagramUsers.flatlistData,
      userList: state.instagramUsers.userList,
      isFetching: state.instagramUsers.isFetching,
      errorPage: state.instagramUsers.errorPage,
      isVip: state.profile.profileData.vipData.isVip
   }
}
export default connect(mapStateToProps, { getUserDataRequest, addDataToUserlist })(ShowInstagramUserScreen)
