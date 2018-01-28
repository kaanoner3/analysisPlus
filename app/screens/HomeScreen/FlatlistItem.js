import React, { Component } from "react"
import {
   Platform,
   StyleSheet,
   Text,
   View,
   FlatList,
   RefreshControl,
   Animated,
   ImageBackground,
   Dimensions,
   ScrollView,
   Image,
   TouchableOpacity
} from "react-native"
import styles from "./styles"
import { images } from "resources"
import { connect } from "react-redux"

const statistic_data = { text1: 12, text2: "GAINED FOLLOWERS" }

class FlatlistItem extends Component {
   constructor() {
      super()
      this.renderItem = this.renderItem.bind(this)
   }

   showUserScreen() {
      this.props.navigator.push({
         screen: "ShowInstagramUserScreen",
         passProps: {}
      })
   }
   componentWillMount() {}
   renderItem() {
      return (
         <View style={styles.flatlistContainerView}>
            <View style={{ flexDirection: "row" }}>
               <View style={styles.contentLeftItem}>
                  <TouchableOpacity
                     activeOpacity={1}
                     //style={{ backgroundColor: "red" }}
                     onPress={() => this.showUserScreen()}
                  >
                     <View style={{ height: 96 / 2 }}>
                        <Text style={styles.infoText}>GAINED FALLOWERS</Text>
                     </View>
                     <View style={styles.statisticView}>
                        <Text style={styles.statisticText}>{statistic_data.text1}</Text>
                        <View style={styles.arrowView}>
                           <Image source={images.lostArrow} />
                           <Text style={styles.lostText}>2</Text>
                        </View>
                     </View>
                  </TouchableOpacity>
               </View>
               <View style={styles.contentRightItem}>
                  <TouchableOpacity
                     activeOpacity={1}
                     //style={{ backgroundColor: "red" }}
                     onPress={() => this.showUserScreen()}
                  >
                     <View style={{ height: 96 / 2 }}>
                        <Text style={styles.infoText}>LOSTED FOLLOWERS}</Text>
                     </View>
                     <View style={styles.statisticView}>
                        <Text style={styles.statisticText}>{statistic_data.text1}</Text>
                        <View style={styles.arrowView}>
                           <Image source={images.lostArrow} />
                           <Text style={styles.lostText}>2</Text>
                        </View>
                     </View>
                  </TouchableOpacity>
               </View>
            </View>

            <View style={{ flexDirection: "row" }}>
               <View style={styles.contentLeftItem}>
                  <TouchableOpacity
                     activeOpacity={1}
                     //style={{ backgroundColor: "red" }}
                     onPress={() => this.showUserScreen()}
                  >
                     <View style={{ height: 96 / 2 }}>
                        <Text style={styles.infoText}>PROFILE VISITORS</Text>
                     </View>
                     <View style={styles.statisticView}>
                        <Text style={styles.statisticText}>{statistic_data.text1}</Text>
                        <View style={styles.arrowView}>
                           <Image source={images.lostArrow} />
                           <Text style={styles.lostText}>2</Text>
                        </View>
                     </View>
                  </TouchableOpacity>
               </View>
               <View style={styles.contentRightItem}>
                  <TouchableOpacity
                     activeOpacity={1}
                     //style={{ backgroundColor: "red" }}
                     onPress={() => this.showUserScreen()}
                  >
                     <View style={{ height: 96 / 2 }}>
                        <Text style={styles.infoText}>USER BLOCKING ME</Text>
                     </View>
                     <View style={styles.statisticView}>
                        <Text style={styles.statisticText}>{statistic_data.text1}</Text>
                        <View style={styles.arrowView}>
                           <Image source={images.lostArrow} />
                           <Text style={styles.lostText}>2</Text>
                        </View>
                     </View>
                  </TouchableOpacity>
               </View>
            </View>
            <View style={{ flexDirection: "row" }}>
               <View style={styles.contentLeftItem}>
                  <TouchableOpacity
                     activeOpacity={1}
                     //style={{ backgroundColor: "red" }}
                     onPress={() => this.showUserScreen()}
                  >
                     <View style={{ height: 96 / 2 }}>
                        <Text style={styles.infoText}>STALKERS</Text>
                     </View>
                     <View style={styles.statisticView}>
                        <Text style={styles.statisticText}>{statistic_data.text1}</Text>
                        <View style={styles.arrowView}>
                           <Image source={images.lostArrow} />
                           <Text style={styles.lostText}>2</Text>
                        </View>
                     </View>
                  </TouchableOpacity>
               </View>
               <View style={styles.contentRightItem}>
                  <TouchableOpacity
                     activeOpacity={1}
                     //style={{ backgroundColor: "red" }}
                     onPress={() => this.showUserScreen()}
                  >
                     <View style={{ height: 96 / 2 }}>
                        <Text style={styles.infoText}>DELETED COMMENT</Text>
                     </View>
                     <View style={styles.statisticView}>
                        <Text style={styles.statisticText}>{statistic_data.text1}</Text>
                        <View style={styles.arrowView}>
                           <Image source={images.lostArrow} />
                           <Text style={styles.lostText}>2</Text>
                        </View>
                     </View>
                  </TouchableOpacity>
               </View>
            </View>
            <View style={{ flexDirection: "row" }}>
               <View style={styles.contentLeftItem}>
                  <TouchableOpacity
                     activeOpacity={1}
                     //style={{ backgroundColor: "red" }}
                     onPress={() => this.showUserScreen()}
                  >
                     <View style={{ height: 96 / 2 }}>
                        <Text style={styles.infoText}>{statistic_data.text2}</Text>
                     </View>
                     <View style={styles.statisticView}>
                        <Text style={styles.statisticText}>{statistic_data.text1}</Text>
                        <View style={styles.arrowView}>
                           <Image source={images.lostArrow} />
                           <Text style={styles.lostText}>2</Text>
                        </View>
                     </View>
                  </TouchableOpacity>
               </View>
               <View style={styles.contentRightItem}>
                  <TouchableOpacity
                     activeOpacity={1}
                     //style={{ backgroundColor: "red" }}
                     onPress={() => this.showUserScreen()}
                  >
                     <View style={{ height: 96 / 2 }}>
                        <Text style={styles.infoText}>{statistic_data.text2}</Text>
                     </View>
                     <View style={styles.statisticView}>
                        <Text style={styles.statisticText}>{statistic_data.text1}</Text>
                        <View style={styles.arrowView}>
                           <Image source={images.lostArrow} />
                           <Text style={styles.lostText}>2</Text>
                        </View>
                     </View>
                  </TouchableOpacity>
               </View>
            </View>
         </View>
      )
   }
   render() {
      console.log("HAAAAAYDİİİİİİ", this.props.profileData)

      return <View style={{ flex: 1 }}>{this.renderItem()}</View>
   }
}
const mapStateToProps = (state, ownProps) => {
   return {
      token: state.user.token,
      profileData: state.profile.profileData,
      isFetching: state.profile.isFetching
   }
}
export default connect(mapStateToProps, {})(FlatlistItem)
