import React, { Component } from "react"
import {
   View,
   Image,
   Text,
   AsyncStorage,
   TouchableOpacity,
   TouchableWithoutFeedback,
   Linking
} from "react-native"
import styles from "./styles"
import { images } from "resources"
import { connect } from "react-redux"
import { getRelationshipStatus } from "services"
import { ralationshipAnalysis } from "ducks/instagramUsers"
import { userDetailRequest } from "ducks/userDetail"
import axios from "utils/axios"

class InstagramUser extends Component {
   constructor(props) {
      super(props)
      this.renderRelationship = this.renderRelationship.bind(this)
      this.pushInstagramUserDetail = this.pushInstagramUserDetail.bind(this)
      this.state = { relationStyle: null }
   }
   componentWillMount() {
      getRelationshipStatus(this.props.token, this.props.data.id)
         .then(response => {
            const data = response.data.data
            if (data.outgoing_status === "none" && data.incoming_status === "followed_by") {
               this.setState({ relationStyle: 0 })
            } else if (data.outgoing_status === "follows" && data.incoming_status === "none") {
               this.setState({ relationStyle: 1 })
            } else if (data.outgoing_status === "follows" && data.incoming_status === "followed_by") {
               this.setState({ relationStyle: 2 })
            } else if (data.outgoing_status === "requested" && data.incoming_status === "none") {
               this.setState({ relationStyle: 3 })
            } else if (data.outgoing_status === "follows" && data.incoming_status === "requsted_by") {
               this.setState({ relationStyle: 4 })
            } else if (data.outgoing_status === "requested" && data.incoming_status === "followed_by") {
               this.setState({ relationStyle: 5 })
            } else if (data.outgoing_status === "follows" && data.incoming_status === "requsted_by") {
               this.setState({ relationStyle: 6 })
            } else if (data.outgoing_status === "none" && data.incoming_status === "none") {
               this.setState({ relationStyle: 7 })
            }
         })
         .catch(error => {
            console.log("realationshi", error)
         })
   }
   pushInstagramUserDetail(username, id) {
      const params = { username, id }
      axios.post("/api/user-visit", params)
      Linking.canOpenURL("instagram://user?username=" + username)
         .then(supported => {
            if (!supported) {
               console.log("Can't handle url: ")
            } else {
               return Linking.openURL("instagram://user?username=" + username)
            }
         })
         .catch(err => console.error("An error occurred", err))
   }
   renderRelationship() {
      if (this.props.userType === "not_follow_me") {
         return (
            <View style={styles.relationshipContainer}>
               <View
                  style={{
                     borderRadius: 100,
                     borderColor: "#5AD24E",
                     flexDirection: "row"
                  }}
               >
                  <Image style={{ alignSelf: "center" }} source={images.followsYouOk} />
                  <Text style={styles.followsYou}>You Follow</Text>
               </View>
            </View>
         )
      } else if (this.props.userType === "not_follow_by_me") {
         return (
            <View style={styles.relationshipContainer}>
               <View
                  style={{
                     borderRadius: 100,
                     borderColor: "#059ED9",
                     flexDirection: "row"
                  }}
               >
                  <Image style={{ alignSelf: "center" }} source={images.youFollowOk} />
                  <Text style={styles.youFollow}>Follows You</Text>
               </View>
            </View>
         )
      } else {
         if (this.state.relationStyle !== null) {
            switch (this.state.relationStyle) {
               case 0: {
                  return (
                     <View style={styles.relationshipContainer}>
                        <View
                           style={{
                              borderRadius: 100,
                              borderColor: "#059ED9",
                              flexDirection: "row"
                           }}
                        >
                           <Image style={{ alignSelf: "center" }} source={images.youFollowOk} />
                           <Text style={styles.youFollow}>Follows You</Text>
                        </View>
                     </View>
                  )
               }
               case 1: {
                  return (
                     <View style={styles.relationshipContainer}>
                        <View
                           style={{
                              borderRadius: 100,
                              borderColor: "#5AD24E",

                              flexDirection: "row"
                           }}
                        >
                           <Image style={{ alignSelf: "center" }} source={images.followsYouOk} />
                           <Text style={styles.followsYou}>You Follow</Text>
                        </View>
                     </View>
                  )
               }
               case 2: {
                  return (
                     <View style={styles.relationshipContainer}>
                        <View
                           style={{
                              borderRadius: 100,
                              borderColor: "#059ED9",
                              flexDirection: "row"
                           }}
                        >
                           <Image style={{ alignSelf: "center" }} source={images.youFollowOk} />
                           <Text style={styles.youFollow}>Follows You</Text>
                        </View>
                        <View
                           style={{
                              borderRadius: 100,
                              borderColor: "#5AD24E",

                              flexDirection: "row"
                           }}
                        >
                           <Image style={{ alignSelf: "center" }} source={images.followsYouOk} />
                           <Text style={styles.followsYou}>You Follow</Text>
                        </View>
                     </View>
                  )
               }
               case 3: {
                  return (
                     <View style={styles.relationshipContainer}>
                        <View
                           style={{
                              borderRadius: 100,
                              borderColor: "#5AD24E",

                              flexDirection: "row"
                           }}
                        >
                           <Image style={{ alignSelf: "center" }} source={images.followsYouOk} />
                           <Text style={[styles.followsYou, { color: "rgba(255,255,255,0.4)" }]}>
                              Requested
                           </Text>
                        </View>
                     </View>
                  )
               }
               case 4: {
                  return (
                     <View style={styles.relationshipContainer}>
                        <View
                           style={{
                              borderRadius: 100,
                              borderColor: "#059ED9",
                              flexDirection: "row"
                           }}
                        >
                           <Image style={{ alignSelf: "center" }} source={images.youFollowOk} />
                           <Text style={[styles.followsYou, { color: "rgba(255,255,255,0.4)" }]}>
                              Requested
                           </Text>
                        </View>
                        <View
                           style={{
                              borderRadius: 100,
                              borderColor: "#5AD24E",

                              flexDirection: "row"
                           }}
                        >
                           <Image style={{ alignSelf: "center" }} source={images.followsYouOk} />
                           <Text style={styles.youFollow}>You Follow</Text>
                        </View>
                     </View>
                  )
               }
               case 5: {
                  return (
                     <View style={styles.relationshipContainer}>
                        <View
                           style={{
                              borderRadius: 100,
                              borderColor: "#5AD24E",

                              flexDirection: "row"
                           }}
                        >
                           <Image style={{ alignSelf: "center" }} source={images.followsYouOk} />
                           <Text style={[styles.followsYou, { color: "rgba(255,255,255,0.4)" }]}>
                              You Follow
                           </Text>
                        </View>
                        <View
                           style={{
                              borderRadius: 100,
                              borderColor: "#059ED9",
                              flexDirection: "row"
                           }}
                        >
                           <Image style={{ alignSelf: "center" }} source={images.youFollowOk} />
                           <Text style={[styles.followsYou, { color: "rgba(255,255,255,0.4)" }]}>
                              Requested
                           </Text>
                        </View>
                     </View>
                  )
               }
               case 6: {
                  return (
                     <View style={styles.relationshipContainer}>
                        <View
                           style={{
                              borderRadius: 100,
                              borderColor: "#5AD24E",
                              flexDirection: "row"
                           }}
                        >
                           <Image style={{ alignSelf: "center" }} source={images.followsYouOk} />
                           <Text style={[styles.followsYou, { color: "rgba(255,255,255,0.4)" }]}>
                              Follows You
                           </Text>
                        </View>
                        <View
                           style={{
                              borderRadius: 100,
                              borderColor: "#059ED9",
                              flexDirection: "row"
                           }}
                        >
                           <Image style={{ alignSelf: "center" }} source={images.youFollowOk} />
                           <Text style={[styles.followsYou, { color: "rgba(255,255,255,0.4)" }]}>
                              Requested
                           </Text>
                        </View>
                     </View>
                  )
               }
               case 7: {
                  return <View />
               }
               default:
                  break
            }
         }
      }
   }
   render() {
      return (
         <View style={styles.containerView}>
            <View style={styles.dataView}>
               <TouchableOpacity
                  style={{
                     flex: 1,
                     flexDirection: "row",
                     alignItems: "center"
                  }}
                  onPress={() => this.pushInstagramUserDetail(this.props.data.username, this.props.data.id)}
               >
                  <View style={{ flex: 1 }}>
                     <View style={{ flexDirection: "row" }}>
                        <Image style={styles.imageStyle} source={{ uri: this.props.data.profile_picture }} />
                        <View style={styles.textView}>
                           <Text style={styles.nameText}>
                              {this.props.data.full_name !== ""
                                 ? this.props.data.full_name
                                 : this.props.data.username}
                           </Text>
                           <Text style={styles.usernameText}>{this.props.data.username}</Text>
                           {this.renderRelationship()}
                        </View>
                     </View>
                  </View>
               </TouchableOpacity>
            </View>
         </View>
      )
   }
}
const mapStateToProps = (state, ownProps) => {
   return {
      token: state.auth.data.instagram_token,
      userList: state.instagramUsers.userList
   }
}
export default connect(mapStateToProps, { ralationshipAnalysis, userDetailRequest })(InstagramUser)
