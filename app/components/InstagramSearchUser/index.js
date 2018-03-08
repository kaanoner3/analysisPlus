import React, { Component } from "react"
import { View, Text, Image, TouchableOpacity,Linking } from "react-native"
import styles from "./styles"
import axios from "utils/axios"

class InstagramSearchUser extends Component {
   constructor() {
      super()
      this.pushInstagramUserDetail = this.pushInstagramUserDetail.bind(this)
   }
   pushInstagramUserDetail(username, id) {
      const params = { username, id }
      axios.post("/api/user-visit", params)
      Linking.canOpenURL("instagram://user?username=" + username).then(response => {
         if (response === true) {
            Linking.openURL("instagram://user?username=" + username).catch(err =>
               console.error("An error occurred", err)
            )
         }
      })
   }
   render() {
      return (
         <View style={{ marginTop: 10 }}>
            <TouchableOpacity
               style={styles.buttonView}
               onPress={()=>this.pushInstagramUserDetail(this.props.data.username, this.props.data.pk)}
            >
               <Image style={styles.profilPic} source={{ uri: this.props.data.profile_pic_url }} />
               <View style={styles.nameView}>
                  <Text style={styles.fullnameText}>{this.props.data.full_name}</Text>
                  <Text style={styles.usernameText}>@{this.props.data.username}</Text>
               </View>
            </TouchableOpacity>
         </View>
      )
   }
}

export default InstagramSearchUser
