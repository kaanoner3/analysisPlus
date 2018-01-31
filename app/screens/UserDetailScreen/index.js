import React, { Component } from "react"
import {
   View,
   Text,
   AsyncStorage,
   Image,
   TouchableOpacity,
   Dimensions,
   ActivityIndicator
} from "react-native"
import axios from "axios"
import { StaticHeader } from "components"
import styles from "./styles"
import { images } from "resources"
import ScrollableTabView, { DefaultTabBar } from "react-native-scrollable-tab-view"
import MediaContentScreen from "./mediaContentScreen"
import LikeContentScreen from "./likeContentScreen"
import { connect } from "react-redux"
import { addMediaData } from "ducks/userDetail"

const height = Dimensions.get("window").height

class UserDetailScreen extends Component {
   static navigatorStyle = {
      statusBarTextColorSchemeSingleScreen: "light",
      drawUnderTabBar: true,
      // tabBarHidden: true,
      navBarTranslucent: true,
      navBarHidden: true
   }
   constructor(props) {
      super(props)
      this.state = {
         loading: false,
         buttonText: null,
         relationshipStyle: null,
         headerX: false,
         buttonIndicator: false
      }

      this.backPress = this.backPress.bind(this)
      this.renderProfileDetail = this.renderProfileDetail.bind(this)
      this.renderRelationArrow = this.renderRelationArrow.bind(this)
      this.renderFollowButton = this.renderFollowButton.bind(this)

      this.userDetail = ["2"]
      this.mediaData = ["12", "123", "3", "213"]
      this.likeData = ["12", "123", "3", "213"]
   }
   backPress() {
      this.props.navigator.pop({
         animated: true,
         animationType: "fade"
      })
   }
   componentDidMount() {
      this.setState({})
   }
   componentWillMount() {
      console.log("USER DETAIL PROPS", this.props)
      if (height === 812) {
         this.setState({ headerX: true })
      } else {
         this.setState({ headerX: false })
      }
   }
   handlePress() {}
   renderFollowButton() {
      if (this.props.relationshipToSelf.outgoing_status === "follows") {
         if (this.state.buttonIndicator === false) {
            return (
               <TouchableOpacity
                  onPress={() => this.handlePress(this.relationship)}
                  style={{ marginTop: 20, marginRight: 20 }}
               >
                  <View style={[styles.followButtonViewStyle, { backgroundColor: "#F44336" }]}>
                     <Text style={styles.followButtonTextStyle}>Unfollow</Text>
                  </View>
               </TouchableOpacity>
            )
         } else {
            return (
               <TouchableOpacity
                  onPress={() => this.handlePress(this.relationship)}
                  style={{ marginTop: 20, marginRight: 20 }}
               >
                  <View style={[styles.followButtonViewStyle, { backgroundColor: "#F44336" }]}>
                     <ActivityIndicator
                        style={{
                           alignSelf: "center",
                           marginVertical: 8
                        }}
                        color="white"
                        size="small"
                     />
                  </View>
               </TouchableOpacity>
            )
         }
      } else if (this.props.relationshipToSelf.outgoing_status === "requested") {
         if (this.state.buttonIndicator === false) {
            return (
               <TouchableOpacity
                  onPress={() => this.handlePress(this.relationship)}
                  style={{ marginTop: 20, marginRight: 20 }}
               >
                  <View style={styles.followButtonViewStyle}>
                     <Text style={styles.followButtonTextStyle}>Requested</Text>
                  </View>
               </TouchableOpacity>
            )
         } else {
            return (
               <TouchableOpacity
                  onPress={() => this.handlePress(this.relationship)}
                  style={{ marginTop: 20, marginRight: 20 }}
               >
                  <View style={styles.followButtonViewStyle}>
                     <ActivityIndicator
                        style={{
                           alignSelf: "center",
                           marginVertical: 8
                        }}
                        color="white"
                        size="small"
                     />
                  </View>
               </TouchableOpacity>
            )
         }
      } else {
         if (this.state.buttonIndicator === false) {
            return (
               <TouchableOpacity
                  onPress={() => this.handlePress(this.relationship)}
                  style={{ marginTop: 20, marginRight: 20 }}
               >
                  <View style={styles.followButtonViewStyle}>
                     <Text style={styles.followButtonTextStyle}>Follow</Text>
                  </View>
               </TouchableOpacity>
            )
         } else {
            return (
               <TouchableOpacity
                  onPress={() => this.handlePress(this.relationship)}
                  style={{ marginTop: 20, marginRight: 20 }}
               >
                  <View style={styles.followButtonViewStyle}>
                     <ActivityIndicator
                        style={{
                           alignSelf: "center",
                           marginVertical: 8
                        }}
                        color="white"
                        size="small"
                     />
                  </View>
               </TouchableOpacity>
            )
         }
      }
   }
   renderRelationArrow() {
      if (this.props.relationshipToSelf !== null) {
         if (
            this.props.relationshipToSelf.outgoing_status === "follows" &&
            this.props.relationshipToSelf.incoming_status === "followed_by"
         ) {
            return (
                <View style={{flexDirection:'row'}} >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                     style={{
                        height: 8,
                        width: 8,
                        resizeMode: "contain",
                        marginTop: 5
                     }}
                     source={images.followsYouOk}
                  />
                  <Text style={[styles.statusText,{color:'#5AD24E'}]}>Following You</Text>
               </View>
               <View style={{ flexDirection: "row", alignItems: "center",marginLeft: 10 }}>
                  <Image
                     style={{
                        height: 8,
                        width: 8,
                        resizeMode: "contain",
                        marginTop: 5
                     }}
                     source={images.youFollowOk}
                  />
                  <Text style={[styles.statusText,{color:'#059ED9'}]}>You Following</Text>
               </View>
               </View>
            )
         } else if (
            (this.props.relationshipToSelf.outgoing_status === "requested" ||
               this.props.relationshipToSelf.outgoing_status === "none") &&
            this.props.relationshipToSelf.incoming_status === "followed_by"
         ) {
            return (
               <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                     style={{
                        height: 8,
                        width: 8,
                        resizeMode: "contain",
                        marginTop: 5
                     }}
                     source={images.followsYouOk}
                  />
                  <Text style={[styles.statusText,{color:'#5AD24E'}]}>Following You</Text>
               </View>
            )
         } else {
            return (
               <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                     style={{
                        height: 8,
                        width: 8,
                        resizeMode: "contain",
                        marginTop: 5
                     }}
                     source={images.youFollowOk}
                  />
                  <Text style={[styles.statusText,{color:'#059ED9'}]}>You Following</Text>
               </View>
            )
         }
      } else {
         return <View />
      }
   }

   renderProfileDetail() {
      if (this.userDetail !== null) {
         return (
            <View style={{ marginTop: 20 }}>
               <View style={styles.profileDetailView}>
                  <Image
                     style={styles.profile_picture}
                     source={{ uri: this.props.baseDetail.profile_picture }}
                  />
                  <View
                     style={{
                        flexDirection: "column",
                        marginLeft: 20,
                        flex: 1
                     }}
                  >
                     <View style={styles.profilIstatistic}>
                        <View style={styles.countsView}>
                           <Text style={styles.countsTextStyle}>
                              {this.props.baseDetail.counts.media}{" "}
                           </Text>
                           <Text style={styles.countStaticStyle}>POSTS</Text>
                        </View>
                        <View style={styles.countsView}>
                           <Text style={styles.countsTextStyle}>
                              {this.props.baseDetail.counts.followed_by}
                           </Text>
                           <Text style={styles.countStaticStyle}>FOLLOWERS</Text>
                        </View>
                        <View style={styles.countsView}>
                           <Text style={styles.countsTextStyle}>
                              {this.props.baseDetail.counts.follows}
                           </Text>
                           <Text style={styles.countStaticStyle}>FOLLOWS</Text>
                        </View>
                     </View>

                     {this.renderFollowButton()}
                  </View>
               </View>
               <View style={{ paddingLeft: 20, marginTop: 20 }}>
                  <Text style={styles.usernameText}>{this.props.baseDetail.full_name}</Text>

                  <View
                     style={{
                        flexDirection: "row",
                        alignItems: "center"
                     }}
                  >
                     {this.renderRelationArrow()}
                  </View>
               </View>
            </View>
         )
      } else return null
   }
   render() {
      if (!this.props.isFetching) {
         return (
            <View style={styles.container}>
               <StaticHeader title="Barbara Porter" navigator={this.props.navigator} />
               {this.renderProfileDetail()}
               <ScrollableTabView
                  activeTab={1}
                  tabBarTextStyle={{
                     fontFamily: "Circular",
                     marginTop: 10
                  }}
                  style={{ marginTop: 20 }}
                  renderTabBar={() => (
                     <DefaultTabBar
                        backgroundColor="#192A4F"
                        activeTextColor="#059ED9"
                        inactiveTextColor="white"
                        underlineStyle={{
                           backgroundColor: "transparent"
                        }}
                     />
                  )}
               >
                  <MediaContentScreen
                     navigator={this.props.navigator}
                     tabLabel="MEDIA"
                     mediaData={this.props.mediaData}
                  />
                  <LikeContentScreen
                     navigator={this.props.navigator}
                     tabLabel="LIKES"
                     likedata={this.likeData}
                  />
               </ScrollableTabView>
            </View>
         )
      } else {
         return (
            <View
               style={{
                  flex: 1,
                  backgroundColor: "#152341",
                  alignItems: "center"
               }}
            >
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
   console.log("detay", state)
   return {
      isFetching: state.userDetail.isFetching,
      mediaData: state.userDetail.userMediaData,
      baseDetail: state.userDetail.userBaseDetail,
      relationshipToSelf: state.userDetail.relationshipToSelf,
      pagination: state.userDetail.pagination
   }
}

export default connect(mapStateToProps, { addMediaData })(UserDetailScreen)

/*

*/
