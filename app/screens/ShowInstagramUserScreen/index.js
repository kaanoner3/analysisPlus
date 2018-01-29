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
   componentWillMount() {
       console.log(this.props)
   }
   renderInstagramUser({ item }) {
      return <InstagramUser data={item} userType={this.props.serviceType} onPress={() => this.pushInstagramUserDetail()} />
   }

   render() {
      if (this.props.isFetching === false) {
         return (
            <View style={{ flex: 1, backgroundColor: "#152341" }}>
               <StaticHeader title={this.props.serviceType} navigator={this.props.navigator} />
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
   return {
      token: state.user.token,
      userList: state.instagramUsers.userList,
      isFetching: state.instagramUsers.isFetching
   }
}
export default connect(mapStateToProps, { getUserDataRequest })(ShowInstagramUserScreen)
