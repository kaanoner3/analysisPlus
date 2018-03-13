import React, { Component } from "react"
import { Text, View, Image, Dimensions, TouchableOpacity, ActivityIndicator, FlatList } from "react-native"
import styles from "./styles"
import { images, languages } from "resources"
import { StaticHeader, InteractionUser,ErrorPage } from "components"
import { addDataToInteractionlist } from "ducks/interactions"
import { connect } from "react-redux"

const height = Dimensions.get("window").height

class InteractionDetailScreen extends Component {
   constructor() {
      super()
      this.renderBackButton = this.renderBackButton.bind(this)
      this.backButtonPress = this.backButtonPress.bind(this)
      this.renderFlatlistItem = this.renderFlatlistItem.bind(this)
      this.hideBackButton = false
      this.state = { headerX: false }
      this.page = 0
      this.headerText = ""
   }
   componentWillMount() {
      this.headerText = "interaction_" + this.props.serviceType
      if (height === 812) {
         this.setState({ headerX: true })
      } else {
         this.setState({ headerX: false })
      }
   }
   backButtonPress() {
      this.props.navigator.pop({
         animated: true,
         animationType: "fade"
      })
   }
   renderFlatlistItem({ item, index }) {
      return <InteractionUser data={item} index={index} navigator={this.props.navigator} />
   }

   renderBackButton() {
      return (
         <TouchableOpacity style={styles.button} onPress={() => this.backButtonPress()}>
            <Image style={styles.buttonImage} source={images.headerBackButton} />
         </TouchableOpacity>
      )
   }
   render() {
      if (this.props.isFetching === false) {
         if (this.props.errorPage === false) {
            return (
               <View style={{ flex: 1, backgroundColor: "#152341" }}>
                  <StaticHeader title={languages.t(this.headerText)} navigator={this.props.navigator} />
                  <View style={{ flex: 1 }}>
                     <FlatList
                        renderItem={this.renderFlatlistItem}
                        data={this.props.flatlistData}
                        style={{ flex: 1 }}
                        ItemSeparatorComponent={() => <View style={styles.itemSepStyle} />}
                        onEndReachedThreshold={0.5}
                        onEndReached={() => {
                           this.page = this.page + 1
                           let temp = Math.floor(this.props.interactionList.length / 20)
                           if (20 * temp < this.props.interactionList.length) {
                              temp = temp + 1
                           }
                           if (this.page < temp) {
                              this.props.addDataToInteractionlist(this.page)
                           }
                        }}
                     />
                  </View>
               </View>
            )
         } else {
            return <ErrorPage />
         }
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
      flatlistData: state.interactions.flatlistData,
      interactionList: state.interactions.interactionList,
      isFetching: state.interactions.isFetching,
      errorPage: state.interactions.errorPage
   }
}
export default connect(mapStateToProps, { addDataToInteractionlist })(InteractionDetailScreen)
/*
         <View style={{ flex: 1 }}>
            <StaticHeader title="Profile Visitors" navigator={this.props.navigator} />
            <Image source={images.bitmap} style={styles.bgImage} />
            <View style={styles.buttonView}>
               <TouchableOpacity style={styles.buttonStyle}>
                  <Image style={styles.lockStyle} source={images.lockLogo} />
                  <Text style={styles.upgradeText}>UPGRADE PREMIUM</Text>
               </TouchableOpacity>
            </View>
         </View>
         */
