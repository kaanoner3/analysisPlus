import React, { Component } from "react"
import {
   View,
   Image,
   Text,
   AsyncStorage,
   TouchableOpacity,
   TouchableWithoutFeedback
} from "react-native"
import styles from "./styles"
import { images } from "resources"
import { connect } from "react-redux"
import { getRelationshipStatus } from "services"
import { ralationshipAnalysis } from "ducks/instagramUsers"
import { userDetailRequest } from "ducks/userDetail"

class InteractionUser extends Component {
   constructor(props) {
      super(props)
      this.renderRelationship = this.renderRelationship.bind(this)
      this.pushInstagramUserDetail = this.pushInstagramUserDetail.bind(this)
      this.renderList = this.renderList.bind(this)
      this.state = { relationStyle: null }
   }
   componentWillMount() {
      getRelationshipStatus(this.props.token, this.props.data.id).then(response => {
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
         } else if (
            data.outgoing_status === "requested" &&
            data.incoming_status === "followed_by"
         ) {
            this.setState({ relationStyle: 5 })
         } else if (data.outgoing_status === "follows" && data.incoming_status === "requsted_by") {
            this.setState({ relationStyle: 6 })
         } else if (data.outgoing_status === "none" && data.incoming_status === "none") {
            this.setState({ relationStyle: 7 })
         }
      })
   }
   pushInstagramUserDetail(user_id) {
      this.props.userDetailRequest(user_id, this.props.token)
      this.props.navigator.push({
         screen: "UserDetailScreen",
         backButtonTitle: "Back",
         backButtonHidden: false,
         passProps: {}
      })
   }
   renderRelationship() {
      if (this.props.userType === "not_follow_me") {
         return (
            <View style={styles.relationshipContainer}>
               <View
                  style={{
                     borderRadius: 100,
                     borderColor: "#5AD24E",
                     marginLeft: 10,
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
                              marginLeft: 10,
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
                              marginLeft: 10,
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
                              marginLeft: 10,
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
                              marginLeft: 10,
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
                              marginLeft: 10,
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
                              marginLeft: 10,
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
   renderList() {
      if (this.props.index === 0 || this.props.index === 1 || this.props.index === 2) {
         return (
            <View style={{ flexDirection: "row", flex: 1 }}>
               <View
                  style={{
                     height: 24,
                     width: 24,
                     borderRadius: 100,
                     backgroundColor: "#059ED9",
                     marginLeft: 20,
                     marginTop: 27
                  }}
               >
                  <Text style={{ color: "white", alignSelf: "center", marginTop: 4 }}>
                     {this.props.index}
                  </Text>
               </View>
               <View style={styles.dataView}>
                  <TouchableOpacity
                     style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center"
                     }}
                     onPress={() => this.pushInstagramUserDetail(this.props.data.id)}
                  >
                     <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: "row" }}>
                           <Image
                              style={styles.imageStyle}
                              source={{ uri: this.props.data.profile_picture }}
                           />
                           <View style={styles.textView}>
                              <Text style={styles.nameText}>{this.props.data.full_name}</Text>
                              <Text style={styles.usernameText}>{this.props.data.username}</Text>
                              {this.renderRelationship()}
                              <View style={{ marginTop: 5, flexDirection: "row",alignItems:'center' }}>
                                 <Image
                                    style={{ height: 12, width: 12, resizeMode: "contain" }}
                                    source={images.ghost1}
                                 />
                                 <Text
                                    style={{
                                       color: "rgba(255,255,255,0.4)",
                                       fontSize: 13,
                                       marginLeft: 5
                                    }}
                                 >
                                    {this.props.data.count}
                                 </Text>
                              </View>
                           </View>
                        </View>
                     </View>
                  </TouchableOpacity>
               </View>
            </View>
         )
      } else {
         return (
            <View style={{ flexDirection: "row", flex: 1 }}>
               <View
                  style={{
                     height: 24,
                     width: 24,
                     borderRadius: 100,
                     backgroundColor: "#192A4F",
                     marginLeft: 20,
                     marginTop: 27
                  }}
               >
                  <Text style={{ color: "white", alignSelf: "center", marginTop: 4 }}>
                     {this.props.index}
                  </Text>
               </View>
               <View style={styles.dataView}>
                  <TouchableOpacity
                     style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center"
                     }}
                     onPress={() => this.pushInstagramUserDetail(this.props.data.id)}
                  >
                     <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: "row" }}>
                           <Image
                              style={styles.imageStyle}
                              source={{ uri: this.props.data.profile_picture }}
                           />
                           <View style={styles.textView}>
                              <Text style={styles.nameText}>{this.props.data.full_name}</Text>
                              <Text style={styles.usernameText}>{this.props.data.username}</Text>
                              {this.renderRelationship()}
                              <View style={{ marginTop: 5, flexDirection: "row",alignItems:'center' }}>
                                 <Image
                                    style={{ height: 12, width: 12, resizeMode: "contain" }}
                                    source={images.ghost1}
                                 />
                                 <Text
                                    style={{
                                       color: "rgba(255,255,255,0.4)",
                                       fontSize: 13,
                                       marginLeft: 5,
                                       
                                    }}
                                 >
                                    {this.props.data.count}
                                 </Text>
                              </View>
                           </View>
                        </View>
                     </View>
                  </TouchableOpacity>
               </View>
            </View>
         )
      }
   }
   render() {
      console.log(this.props.data)
      return <View style={styles.containerView}>{this.renderList()}</View>
   }
}
const mapStateToProps = (state, ownProps) => {
   return {
      token: state.auth.accessToken,
      userList: state.instagramUsers.userList
   }
}
export default connect(mapStateToProps, { ralationshipAnalysis, userDetailRequest })(
   InteractionUser
)
