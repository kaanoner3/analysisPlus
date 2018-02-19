import React, { Component } from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import styles from "./styles"
import { connect } from "react-redux"
import { StaticHeader } from "components"
import {images} from 'resources'

class SettingScreen extends Component {
   constructor() {
      super()
      this.renderAccounts = this.renderAccounts.bind(this)
   }
   renderAccounts() {
      return <View />
   }
   render() {
      return (
         <View style={styles.containerView}>
            <StaticHeader title="Settings" navigator={this.props.navigator} />
            <Text style={styles.sectionHeaderText}>ACCOUNTS</Text>
            <View style={styles.accContainer}>
            {this.renderAccounts()}
            <TouchableOpacity style={styles.addAccButton}>
               <Image style={styles.addAccImage} source={images.addAcc}/>
               <Text style={styles.addAccText}>Add Account</Text>
            </TouchableOpacity>
            </View>
         </View>
      )
   }
}

const mapStateToProps = (state, ownProps) => {
   return {
      //   token: state.token
   }
}

export default connect(mapStateToProps, {})(SettingScreen)
