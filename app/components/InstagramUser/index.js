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
class InstagramUser extends Component {
   constructor(props) {
      super(props)
      this.renderRelationship = this.renderRelationship.bind(this)
   }
   componentWillMount() {
      console.log(this.props)
      getRelationshipStatus(this.props.token, this.props.data.id).then(response => {
         this.props.ralationshipAnalysis(response.data, this.props.data.id)
      })
      if (this.props.userType !== "not_follow_me " || this.props.userType !== "not_follow_by_me") {
      }
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
         if (this.props.userList.relationship !== undefined) {
            console.log("hadi bakalııım", this.props.userList.relationship)
            switch (this.props.userList.relationship) {
               case "none_follewd_by": {
                   console.log('asd')
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
               case "follows_none": {
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
               case "follows_followed_by": {
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
               case "requested_none": {
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
               case "follows_requested_by": {
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
               case "requested_followed_by": {
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
               case "none_none": {
                  return <View />
               }
               default:
                  break
            }
         }
      }
   }
   render() {
       console.log('MAAAAIIIIN STATE',this.props.userList, '   relationship',this.props.userList.relationship)
      return (
         <View style={styles.containerView}>
            <View style={styles.dataView}>
               <TouchableOpacity
                  style={{
                     flex: 1,
                     flexDirection: "row",
                     alignItems: "center"
                  }}
                  onPress={this.props.onPress}
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
   console.log(state)
   return {
      token: state.auth.accessToken,
      userList: state.instagramUsers.userList
   }
}
export default connect(mapStateToProps, { ralationshipAnalysis })(InstagramUser)
/*
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
*/
