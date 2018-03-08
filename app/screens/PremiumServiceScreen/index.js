import { images, strings } from "resources"
import React, { Component } from "react"
import { View, Image, TouchableOpacity, Text, Dimensions, ScrollView, FlatList } from "react-native"
import { AnimatedHeader, PremiumButton } from "components"
import styles from "./styles"
import Swiper from "react-native-swiper"
import axios from "utils/axios"
import { NativeModules } from "react-native"
import { getProductList } from "services"
import { languages } from "resources"
import { transactionHandler } from "utils"

const { height, width } = Dimensions.get("window")
const { InAppUtils } = NativeModules

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

      this.state = { headerX: false, subscriptionIndex: 1, loading: false, inAppItems: [] }
      this.products = []

      this.renderPremiumSubscription = this.renderPremiumSubscription.bind(this)
      this.renderSwiper = this.renderSwiper.bind(this)
      this.buyButtonPress = this.buyButtonPress.bind(this)
   }
   componentWillMount() {
      if (height === 812) {
         this.setState({ headerX: true })
      } else {
         this.setState({ headerX: false })
      }
   }
   buyButtonPress() {
      console.log(this.state.subscriptionIndex)
      const item = this.state.inAppItems[this.state.subscriptionIndex]
      console.log(item)
      if (item) {
         console.log("if")
         transactionHandler.buyItem(item, "subscription", this.props.navigators)
      }
   }
   renderPremiumSubscription({ item, index }) {
      return (
         <PremiumButton
            key={index}
            ref={premiumButton => {
               buttons[index] = premiumButton
            }}
            activeButton={index === this.state.subscriptionIndex ? true : false}
            premiumCost={"₺ 14,90"}
            premiumDuration="1 Week"
            onClick={() => {
               buttons.forEach((button, buttonIndex) => {
                  if (buttonIndex === index) {
                     this.setState({ subscriptionIndex: buttonIndex }, () => {
                        console.log(this.state.subscriptionIndex)
                     })
                  } else {
                     button.setState({ isActive: false })
                  }
               })
            }}
         />
      )
   }
   componentDidMount() {
      console.log("did mount")
      transactionHandler.handleUnfinishedTransactions(this.props.navigator)
      this.setState({ loading: true }, () => {
         getProductList()
            .then(({ data }) => {
               this.products = data.map(value => value.apple_store_id)

               InAppUtils.loadProducts(this.products, (error, products) => {
                  if (error) {
                  }

                  if (products) {
                     console.log(products)
                     const inAppItems = data.map((value, key) => ({
                        ...value,
                        ...products.filter(product => {
                           return product.identifier === value.apple_store_id
                        })[0]
                     }))
                     this.setState({ inAppItems })
                  }
                  this.setState({ loading: false })
               })
            })
            .catch(() => {
               this.setState({ loading: false })
               alert("Beklenmedik bir hata oluştu.")
            })
      })
      //loading
   }
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
                  {languages.t("premium_swiper1")}
                  </Text>
               </View>
               <View style={styles.swiperTextView}>
                  <Text style={styles.sliderTextStyle} numberOfLines={3} ellipsizeMode="clip">
                  {languages.t("premium_swiper2")}
                  </Text>
               </View>
               <View style={styles.swiperTextView}>
                  <Text style={styles.sliderTextStyle} numberOfLines={3} ellipsizeMode="clip">
                  {languages.t("premium_swiper3")}
                  </Text>
               </View>
            </Swiper>
         </View>
      )
   }
   render() {
      console.log(this.state)
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
                        <TouchableOpacity style={styles.purchaseButton} onPress={() => this.buyButtonPress()}>
                           <Text style={styles.purchaseButtonText}>{languages.t("premium_buynow")}</Text>
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
                     when the user purchases a subscription to that publication, where applicable. Terms of
                     Use .
                  </Text>
               </ScrollView>
            </View>
         </View>
      )
   }
}

export default PremiumServiceScreen
