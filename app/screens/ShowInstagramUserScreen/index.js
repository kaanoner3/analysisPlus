import React, { Component } from "react"
import {
   View,
   Text,
   Image,
   TouchableOpacity,
   FlatList,
   ActivityIndicator,
   Dimensions
} from "react-native"
import { StaticHeader, InstagramUser } from "components"
import styles from "./styles"
import { getUserDataRequest } from "ducks/instagramUsers"
import { connect } from "react-redux"

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
   componentWillMount() {}
   renderInstagramUser({ item }) {
      return <InstagramUser data={item} onPress={() => this.pushInstagramUserDetail()} />
   }

   render() {
      console.log("CONTROL FETCH", this.props.isFetching)
      if (this.props.isFetching === false) {
         return (
            <View style={{ flex: 1, backgroundColor: "#152341" }}>
               <StaticHeader title={this.props.serviceType.type} navigator={this.props.navigator} />
               <FlatList
                  renderItem={this.renderInstagramUser}
                  data={this.props.userList}
                  style={{ flex: 1 }}
                  ItemSeparatorComponent={() => <View style={styles.itemSepStyle} />}
               />
            </View>
         )
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
   console.log("state neymis bakalım", state)
   return {
      token: state.user.token,
      userList: state.instagramUsers.userList,
      isFetching: state.instagramUsers.isFetching
   }
}
export default connect(mapStateToProps, { getUserDataRequest })(ShowInstagramUserScreen)
