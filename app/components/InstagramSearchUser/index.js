import React, { Component } from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"

class InstagramSearchUser extends Component {
   constructor() {
      super()
   }
   componentWillMount() {
      console.log(this.props.data)
   }
   render() {
      return (
         <View style={{marginTop: 15}}>
            <TouchableOpacity style={{flexDirection:'row',paddingLeft: 20}}>
               <Image
                  style={{ height: 48, width: 48, borderRadius: 24 }}
                  source={{ uri: this.props.data.profile_pic_url }}
               />
               <View style={{ flexDirection: "column", marginLeft: 10 }}>
                  <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", fontFamily: "Circular" }}>
                     {this.props.data.full_name}
                  </Text>
                  <Text style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, fontWeight: "400", fontFamily: "Circular",marginTop:5 }}>@{this.props.data.username}</Text>
               </View>
            </TouchableOpacity>
         </View>
      )
   }
}

export default InstagramSearchUser
const styles = {}
