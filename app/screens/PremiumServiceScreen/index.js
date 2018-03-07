import { images, strings } from "resources"
import React, { Component } from "react"
import { View, Image, TouchableOpacity, Text, Dimensions, ScrollView, FlatList } from "react-native"
import { AnimatedHeader, PremiumButton } from "components"
import styles from "./styles"
import Swiper from "react-native-swiper"
import axios from "utils/axios"

const { height, width } = Dimensions.get("window")

const buttons = []
const testData = [
   {
      apple_store_id: "com.iznet.analysis.subscription.1month",
      end_day: 30,
      name: "Deneme Paketi",
      text: "Deneme Paketi Açıklama",
      price: 2.49,
      discont: null,
      id: 1
   },
   {
      apple_store_id: "com.iznet.analysis.subscription.3month",
      end_day: 90,
      name: "Deneme Paketi",
      text: "Deneme Paketi Açıklama",
      price: 7.49,
      discont: null,
      id: 2
   },
   {
      apple_store_id: "com.iznet.analysis.subscription.6month",
      end_day: 180,
      name: "Deneme Paketi",
      text: "Deneme Paketi Açıklama",
      price: 12.49,
      discont: null,
      id: 3
   }
]
class PremiumServiceScreen extends Component {
   static navigatorStyle = {
      statusBarTextColorSchemeSingleScreen: "light",
      navBarHidden: true
   }
   constructor() {
      super()

      this.state = { headerX: false, focusIndex: 1 }

      this.renderPremiumSubscription = this.renderPremiumSubscription.bind(this)
      this.renderSwiper = this.renderSwiper.bind(this)
   }
   componentWillMount() {
      if (height === 812) {
         this.setState({ headerX: true })
      } else {
         this.setState({ headerX: false })
      }
   }
   renderPremiumSubscription({ item, index }) {
      // console.log(item)
      // console.log(index)
      return (
         <PremiumButton
            ref={premiumButton => {
               buttons[index] = premiumButton
            }}
            activeButton={index === this.state.focusIndex ? true : false}
            premiumCost={"₺ 14,90"}
            premiumDuration="1 Week"
            onClick={() => {
               buttons.forEach((button, buttonIndex) => {
                  if (buttonIndex === index) {
                     button.setState({ isActive: true })
                  } else {
                     button.setState({ isActive: false })
                  }
               })
            }}
         />
      )
   }
   componentDidMount() {}
   renderSwiper() {
      return (
         <View style={styles.swiperContainer}>
            <Swiper
               style={{
                  alignItems: "center",
                  alignSelf: "center",
                  marginTop: 10
               }}
               autoplay
               autoplayTimeout={4}
               horizontal
               dot={<View style={styles.swiperDotView} />}
               activeDot={<View style={styles.swiperActiveDotView} />}
               paginationStyle={{
                  top: 60
               }}
            >
               <View style={styles.swiperTextView}>
                  <Text style={styles.sliderTextStyle} numberOfLines={3} ellipsizeMode="clip">
                     Manage your company accounts as you wish
                  </Text>
               </View>
               <View style={styles.swiperTextView}>
                  <Text style={styles.sliderTextStyle} numberOfLines={3} ellipsizeMode="clip">
                     Track your followers of your business account
                  </Text>
               </View>
               <View style={styles.swiperTextView}>
                  <Text style={styles.sliderTextStyle} numberOfLines={3} ellipsizeMode="clip">
                     Analyze your business account
                  </Text>
               </View>
            </Swiper>
         </View>
      )
   }
   render() {
      return (
         <View style={styles.container}>
            <View style={styles.topContent}>
               <Image
                  style={this.state.headerX === false ? styles.logoStyle : styles.logoXStyle}
                  source={images.premiumLogo}
               />
               <Text style={styles.premiumText}>PREMIUM</Text>
               {this.renderSwiper()}
               <FlatList
                  style={{}}
                  data={testData}
                  extraData={this.state}
                  scrollEnabled={false}
                  renderItem={this.renderPremiumSubscription}
                  ListFooterComponent={
                     <View style={{ flexDirection: "column", alignItems: "center" }}>
                        <TouchableOpacity style={styles.purchaseButton}>
                           <Text style={styles.purchaseButtonText}>BUY NOW</Text>
                        </TouchableOpacity>
                     </View>
                  }
               />
            </View>
            <View style={{ flex: 1, paddingTop: 10 }}>
               <ScrollView style={{ height: 120 }} horizontal={false}>
                  <Text style={styles.subscriptionInfoText}>
                     Payment will be chatged to iTunes Account at confirmation of purchase. Subscription
                     automatically renews unless auto-renew is turnet off at least 24-hours before the end of
                     the current period. Account will be charged for renewal within 24-hours prior to the end
                     of the current period, and identify the cost of the renewal. Subscriptions may be managed
                     by the user and auto-renewal may be turned off by going to the user’s Account Settings
                     after purchase. Any unused portion of a free trial period, if offered, will be forteited
                     when the user purchases a subscription to that publication, where applicable. 
                     Terms of Use .
                  </Text>
               </ScrollView>
            </View>
         </View>
      )
   }
}

export default PremiumServiceScreen
