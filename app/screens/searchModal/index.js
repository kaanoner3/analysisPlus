import React, { Component } from "react"
import {
   View,
   Text,
   Image,
   TouchableOpacity,
   TextInput,
   Dimensions,
   KeyboardAvoidingView,
   FlatList
} from "react-native"
import { StaticHeader, InstagramSearchUser } from "components"
import { connect } from "react-redux"
import styles from "./styles"
import { images,languages } from "resources"
import axios from "utils/axios"
import { Navigation } from "react-native-navigation"
class SearchModal extends Component {
   constructor(props) {
      super(props)
      this.state = { input: "", userList: [] }
      this.renderContent = this.renderContent.bind(this)
      this.renderItem = this.renderItem.bind(this)
      this.renderHeader = this.renderHeader.bind(this)
      this.renderSearchBar = this.renderSearchBar.bind(this)
      this.renderResults = this.renderResults.bind(this)
      this.renderUserSearches = this.renderUserSearches.bind(this)
      this.renderUserlist = this.renderUserlist.bind(this)
      this.backButton = this.backButton.bind(this)
   }
   renderContent() {
      return (
         <View style={{ flex: 1 }}>
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
               <FlatList
                  ref={flatlist => (this.flatlist = flatlist)}
                  data={["searchBar", "userSearches", "results"]}
                  ListHeaderComponent={this.renderHeader}
                  renderItem={this.renderItem}
                  stickyHeaderIndices={[1]}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="always"
                  contentContainerStyle={{
                     minHeight: Dimensions.get("window").height + 20
                  }}
               />
            </KeyboardAvoidingView>
         </View>
      )
   }
   renderUserlist({ item }) {
      return (
         <InstagramSearchUser
            data={item.user}
            userType="search"
            //onPress={() => this.pushInstagramUserDetail()}
            navigator={this.props.navigator}
         />
      )
   }
   renderResults() {
      return (
         <View style={{ flex: 1 }}>
            <FlatList data={this.state.userList} renderItem={this.renderUserlist} />
         </View>
      )
   }
   renderUserSearches() {
      return <View style={{ marginTop: 10 }} />
   }
   renderItem({ item, index }) {
      switch (item) {
         case "searchBar":
            return this.renderSearchBar()
         case "userSearches":
            return this.renderUserSearches()
         case "results":
            return this.renderResults()
      }
   }
   renderSearchBar() {
      return (
         <View style={{ paddingTop: 30, backgroundColor: "#152341" }}>
            <View style={styles.inputView}>
               <Image style={styles.searchIcon} source={images.headerSearchIcon} />
               <TextInput
                  style={styles.textInput}
                  placeholder="Search"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  onChangeText={text => {
                     if (text.length > 2) {
                        axios
                           .get(
                              "https://www.instagram.com/web/search/topsearch/?context=blended&query=" + text
                           )
                           .then(response => {
                              this.setState({ userList: response.data.users })
                           })
                     } else if (text.length === 0) {
                        axios
                           .get(
                              "https://www.instagram.com/web/search/topsearch/?context=blended&query=" + text
                           )
                           .then(response => {
                              this.setState({ userList: response.data.users })
                           })
                     }
                  }}
                  autoCapitalize="none"
                  autoCorrect={false}
               />
            </View>
            <View style={{ borderWidth: 1, marginTop: 20, borderColor: "rgba(255,255,255,0.1)" }} />
         </View>
      )
   }
   backButton() {
      this.props.navigator.pop({
         animated: true,
         animationType: "fade"
      })
   }
   renderHeader() {
      return (
         <View style={{ height: 107 }}>
            <TouchableOpacity
               style={{ height: 60, width: 40, position: "absolute", left: 20, top: 20 }}
               onPress={this.backButton}
            >
               <Image style={{ marginTop: 10 }} source={images.headerBackButton} />
            </TouchableOpacity>
            <Text
               style={{
                  color: "white",
                  fontSize: 34,
                  marginLeft: 20,
                  fontWeight: "bold",
                  fontFamily: "Circular",
                  marginTop: 66
               }}
            >
               {languages.t("search_text")}
            </Text>
         </View>
      )
   }
   render() {
      return <View style={styles.container}>{this.renderContent()}</View>
   }
}

const mapStateToProps = (state, ownProps) => {
   return {}
}

export default connect(mapStateToProps, {})(SearchModal)
