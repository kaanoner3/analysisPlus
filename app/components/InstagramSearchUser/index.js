import React, { Component } from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import styles from "./styles"
class InstagramSearchUser extends Component {
   constructor() {
      super()
   }

   render() {
      return (
         <View style={{marginTop: 10}}>
            <TouchableOpacity style={styles.buttonView}>
               <Image
                  style={styles.profilPic}
                  source={{ uri: this.props.data.profile_pic_url }}
               />
               <View style={styles.nameView}>
                  <Text style={styles.fullnameText}>
                     {this.props.data.full_name}
                  </Text>
                  <Text style={styles.usernameText}>@{this.props.data.username}</Text>
               </View>
            </TouchableOpacity>
         </View>
      )
   }
}

export default InstagramSearchUser
