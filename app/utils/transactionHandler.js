import { NativeModules, Alert } from "react-native"
const { InAppUtils } = NativeModules
import axios from "utils/axios"
import store from "store"
import { Crashlytics } from "react-native-fabric"

const item = {}
export async function createPurchaseInstance(navigator) {
   var products = ["com.iznet.analysis.subscription.1month"]

   InAppUtils.loadProducts(products, (error, products) => {
      console.log("products:", products)
      axios.get("api/package/subscription-list").then(response => {
         item = response.data[0]
         console.log(item)
         buyItem(item, "subscription", navigator)
      })
   })
   InAppUtils.canMakePayments(canMakePayments => {
      if (!canMakePayments) {
         Alert.alert(
            "Not Allowed",
            "This device is not allowed to make purchases. Please check restrictions on device"
         )
      }
   })
}
export async function handleUnfinishedTransactions(navigator) {}

export function buyItem(item, type, navigator) {
   console.log(item)
   Crashlytics.recordError(`buy ${type} action triggered`)
   InAppUtils.purchaseProduct(item.apple_store_id, (error, response) => {
      console.log("err", error)
      console.log("resp", response)
   })
}
