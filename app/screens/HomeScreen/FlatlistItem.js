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
import styles from "./styles"
import { images } from "resources"
import { connect } from "react-redux"
import { renderDiffArrow } from "services"
import { getUserDataRequest } from "ducks/instagramUsers"

const statistic_data = { text1: 12, text2: "GAINED FOLLOWERS" }

class FlatlistItem extends Component {
   constructor() {
      super()
      this.renderItem = this.renderItem.bind(this)
   }

   showUserScreen(serviceType) {
      this.props.getUserDataRequest(this.props.token, serviceType)
      this.props.navigator.push({
         screen: "ShowInstagramUserScreen",
         passProps: { serviceType }
      })
   }
   componentWillReceiveProps(nextProps) {
         console.log('RECEİVE PROPS',nextProps)
   }
   renderItem() {
         console.log('RENDER ITEM', this.props.profileData)
      return (
         <View style={[styles.flatlistContainerView, { paddingBottom: 100 }]}>
            <View style={{ flexDirection: "row" }}>
               <View style={styles.contentLeftItem}>
                  <TouchableOpacity
                     activeOpacity={1}
                     onPress={() => this.showUserScreen("not_follow_me")}
                  >
                     <View style={{ height: 96 / 2 }}>
                        <Text style={styles.infoText}>USERS NOT FOLLOW ME</Text>
                     </View>
                     <View style={styles.statisticView}>
                        <Text style={styles.statisticText}>
                           {this.props.profileData === null ? 0 : this.props.profileData.statistic.not_follow_me}
                        </Text>
<<<<<<< HEAD
                        {this.props.profileData === null ? <View></View> :renderDiffArrow(this.props.statisticDiff.not_follow_me)}
=======
                        {this.props.statisticDiff === null ? <View></View> : renderDiffArrow(this.props.statisticDiff.not_follow_me)}
>>>>>>> fd789b289bbc67b35ad2652fe412919b7ff3d026
                     </View>
                  </TouchableOpacity>
               </View>
               <View style={styles.contentRightItem}>
                  <TouchableOpacity
                     activeOpacity={1}
                     //style={{ backgroundColor: "red" }}
                     onPress={() => this.showUserScreen("not_follow_by_me")}
                  >
                     <View style={{ height: 96 / 2 }}>
                        <Text style={styles.infoText}>USERS NOT FOLLOWED BY ME</Text>
                     </View>
                     <View style={styles.statisticView}>
                        <Text style={styles.statisticText}>
                           {this.props.profileData === null ? 0 : this.props.profileData.statistic.not_follow_by_me}
                        </Text>
<<<<<<< HEAD
                        {this.props.profileData === null ? <View></View> :renderDiffArrow(this.props.statisticDiff.not_follow_by_me)}
=======
                        {this.props.statisticDiff === null ? <View></View> : renderDiffArrow(this.props.statisticDiff.not_follow_by_me)}
>>>>>>> fd789b289bbc67b35ad2652fe412919b7ff3d026
                     </View>
                  </TouchableOpacity>
               </View>
            </View>
            <View style={{ flexDirection: "row" }}>
               <View style={styles.contentLeftItem}>
                  <TouchableOpacity
                     activeOpacity={1}
                     //style={{ backgroundColor: "red" }}
                     onPress={() => this.showUserScreen("gained_followers")}
                  >
                     <View style={{ height: 96 / 2 }}>
                        <Text style={styles.infoText}>GAINED FALLOWERS</Text>
                     </View>
                     <View style={styles.statisticView}>
                        <Text style={styles.statisticText}>
                           {this.props.profileData === null ? 0 : this.props.profileData.statistic.gained_followers}
                        </Text>
<<<<<<< HEAD
                        {this.props.profileData === null ? <View></View> :renderDiffArrow(this.props.statisticDiff.gained_followers)}
=======
                        {this.props.statisticDiff === null ? <View></View> : renderDiffArrow(this.props.statisticDiff.gained_followers)}
>>>>>>> fd789b289bbc67b35ad2652fe412919b7ff3d026
                     </View>
                  </TouchableOpacity>
               </View>
               <View style={styles.contentRightItem}>
                  <TouchableOpacity
                     activeOpacity={1}
                     //style={{ backgroundColor: "red" }}
                     onPress={() => this.showUserScreen("losted_followers")}
                  >
                     <View style={{ height: 96 / 2 }}>
                        <Text style={styles.infoText}>LOSTED FOLLOWERS}</Text>
                     </View>
                     <View style={styles.statisticView}>
                        <Text style={styles.statisticText}>
                           {this.props.profileData === null ? 0 : this.props.profileData.statistic.losted_followers}
                        </Text>
<<<<<<< HEAD
                        {this.props.profileData === null ? <View></View> :renderDiffArrow(this.props.statisticDiff.losted_followers)}
=======
                        {this.props.statisticDiff === null ? <View></View> : renderDiffArrow(this.props.statisticDiff.losted_followers)}
>>>>>>> fd789b289bbc67b35ad2652fe412919b7ff3d026
                     </View>
                  </TouchableOpacity>
               </View>
            </View>

            <View style={{ flexDirection: "row" }}>
               <View style={styles.contentLeftItem}>
                  <TouchableOpacity
                     activeOpacity={1}
                     //style={{ backgroundColor: "red" }}
                     onPress={() => this.showUserScreen("profile_visitors")}
                  >
                     <View style={{ height: 96 / 2 }}>
                        <Text style={styles.infoText}>PROFILE VISITORS</Text>
                     </View>
                     <View style={styles.statisticView}>
                        <Text style={styles.statisticText}>
                           {this.props.profileData === null ? 0 : this.props.profileData.statistic.profile_visitors}
                        </Text>
<<<<<<< HEAD
                        {this.props.profileData === null ? <View></View> :renderDiffArrow(this.props.statisticDiff.profile_visitors)}
=======
                        {this.props.statisticDiff === null ? <View></View> : renderDiffArrow(this.props.statisticDiff.profile_visitors)}
>>>>>>> fd789b289bbc67b35ad2652fe412919b7ff3d026
                     </View>
                  </TouchableOpacity>
               </View>
               <View style={styles.contentRightItem}>
                  <TouchableOpacity
                     activeOpacity={1}
                     //style={{ backgroundColor: "red" }}
                     onPress={() => this.showUserScreen("user_blocking_me")}
                  >
                     <View style={{ height: 96 / 2 }}>
                        <Text style={styles.infoText}>USER BLOCKING ME</Text>
                     </View>
                     <View style={styles.statisticView}>
                        <Text style={styles.statisticText}>
                           {this.props.profileData === null ? 0 : this.props.profileData.statistic.user_blocking_me}
                        </Text>
<<<<<<< HEAD
                        {this.props.profileData === null ? <View></View> :renderDiffArrow(this.props.statisticDiff.user_blocking_me)}
=======
                        {this.props.statisticDiff === null ? <View></View> : renderDiffArrow(this.props.statisticDiff.user_blocking_me)}
>>>>>>> fd789b289bbc67b35ad2652fe412919b7ff3d026
                     </View>
                  </TouchableOpacity>
               </View>
            </View>
            <View style={{ flexDirection: "row" }}>
               <View style={styles.contentLeftItem}>
                  <TouchableOpacity
                     activeOpacity={1}
                     //style={{ backgroundColor: "red" }}
                     onPress={() => this.showUserScreen("stalkers")}
                  >
                     <View style={{ height: 96 / 2 }}>
                        <Text style={styles.infoText}>STALKERS</Text>
                     </View>
                     <View style={styles.statisticView}>
                        <Text style={styles.statisticText}>
                           {this.props.profileData === null ? 0 : this.props.profileData.statistic.stalkers}
                        </Text>
<<<<<<< HEAD
                        {this.props.profileData === null ? <View></View> :renderDiffArrow(this.props.statisticDiff.stalkers)}
=======
                        {this.props.statisticDiff === null ? <View></View> : renderDiffArrow(this.props.statisticDiff.stalkers)}
>>>>>>> fd789b289bbc67b35ad2652fe412919b7ff3d026
                     </View>
                  </TouchableOpacity>
               </View>
               <View style={styles.contentRightItem}>
                  <TouchableOpacity
                     activeOpacity={1}
                     //style={{ backgroundColor: "red" }}
                     onPress={() => this.showUserScreen("deleted_comment")}
                  >
                     <View style={{ height: 96 / 2 }}>
                        <Text style={styles.infoText}>DELETED COMMENT</Text>
                     </View>
                     <View style={styles.statisticView}>
                        <Text style={styles.statisticText}>
                           {this.props.profileData === null ? 0 : this.props.profileData.statistic.deleted_comments}
                        </Text>
<<<<<<< HEAD
                        {this.props.profileData === null ? <View></View> :renderDiffArrow(this.props.statisticDiff.deleted_comments)}
=======
                        {this.props.statisticDiff === null ? <View></View> : renderDiffArrow(this.props.statisticDiff.deleted_comments)}
>>>>>>> fd789b289bbc67b35ad2652fe412919b7ff3d026
                     </View>
                  </TouchableOpacity>
               </View>
            </View>
         </View>
      )
   }
   render() {
         console.log('FLAAATLİST' , this.props.profileData)
      return <View style={{ flex: 1 }}>{this.renderItem()}</View>
   }
}
const mapStateToProps = (state, ownProps) => {
   return {
      token: state.user.token,
      profileData: state.profile.profileData,
      isFetching: state.profile.isFetching,
      statisticDiff: state.profile.diff
   }
}
export default connect(mapStateToProps, { getUserDataRequest })(FlatlistItem)
