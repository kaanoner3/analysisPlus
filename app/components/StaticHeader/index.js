import React, { Component } from "react"
import { Text, View, Image, Dimensions, TouchableOpacity } from "react-native"
import styles from "./styles"
import { images } from "resources"
import axios from "utils/axios"

const height = Dimensions.get("window").height

class StaticHeader extends Component {
   constructor() {
      super()
      this.renderBackButton = this.renderBackButton.bind(this)
      this.backButtonPress = this.backButtonPress.bind(this)
      this.unfollow = null
      this.blocks = null
      this.hideBackButton = false
      this.state = { headerX: false }
   }
   componentWillMount() {
      if (height === 812) {
         this.setState({ headerX: true })
      } else {
         this.setState({ headerX: false })
      }
   }
   componentWillReceiveProps(nextProps) {
      if (nextProps.notiBlockData && nextProps.notiUnfollowData) {
         this.unfollow = nextProps.notiUnfollowData
         this.blocks = nextProps.notiBlockData
      }
   }
   backButtonPress() {
    this.props.navigator.pop({
        animated: true,
        animationType: "fade"
     })
     /*
      if (this.unfollow !== null && this.blocks !== null) {
         const params = FormData()
         params.append("notification_blocked_me", this.blocks)
         params.append("notification_losted_follower", this.unfollow)
         axios
            .post("api/user/settings-update", params)
            .then(resp => {
               this.props.navigator.pop({
                  animated: true,
                  animationType: "fade"
               })
            })
            .catch(error => {
         
            })
      }
      */
   }
   renderBackButton() {
      return (
         <TouchableOpacity style={styles.button} onPress={() => this.backButtonPress()}>
            <Image style={styles.buttonImage} source={images.headerBackButton} />
         </TouchableOpacity>
      )
   }
   render() {
      return (
         <View style={this.state.headerX === false ? styles.containerView : styles.headerXcontainer}>
            {this.renderBackButton()}
            <View style={styles.titleView}>
               <Text style={styles.titleTextStyle}>{this.props.title}</Text>
            </View>
            <View style={{ height: 35, width: 35 }} />
         </View>
      )
   }
}

export default StaticHeader
