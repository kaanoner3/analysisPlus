import React, { Component } from "react"
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native"
import { StaticHeader, InstagramUser } from "components"
import styles from "./styles"
import { getUserDataRequest } from "ducks/instagramUsers"
import { connect } from "react-redux"

const data = [
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
class ShowInstagramUserScreen extends Component {
   constructor() {
      super()
      this.renderInstagramUser = this.renderInstagramUser.bind(this)
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
   }
   renderInstagramUser({ item }) {
      return <InstagramUser onPress={() => this.pushInstagramUserDetail()} />
   }

   render() {
      return (
         <View style={{ flex: 1, backgroundColor: "#152341" }}>
            <StaticHeader title={this.props.serviceType.type} navigator={this.props.navigator} />
            <FlatList
               renderItem={this.renderInstagramUser}
               data={data}
               style={{ flex: 1 }}
               ItemSeparatorComponent={() => <View style={styles.itemSepStyle} />}
            />
         </View>
      )
   }
}
const mapStateToProps = (state, ownProps) => {
    console.log('state neymis bakalım',state)
    return {
       token: state.user.token,
      // userList: state.instagramUser.profileData.user,
       isFetching: state.instagramUsers.isFetching
    }
 }
export default connect(mapStateToProps, { getUserDataRequest })(ShowInstagramUserScreen)
