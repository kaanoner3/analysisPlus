import { NativeModules, Alert } from "react-native"
const { InAppUtils } = NativeModules
import axios from "utils/axios"
import store from "store"
import { Crashlytics } from "react-native-fabric"
import { validatePurchase } from "services"
import { getProfileDataRequest } from "ducks/profile"

const sharedSecret = "7900d2d1b4f847c19c9e2bf71f904c01"
const item = {}

export async function createPurchaseInstance(navigator, subscriptionIndex = 0) {
   var products = ["com.iznet.analysis.subscription.1month"]

   InAppUtils.loadProducts(products, (error, products) => {
      axios.get("api/package/subscription-list").then(response => {
         item = response.data[subscriptionIndex]
         console.log(item)
         buyItem(item, "subscription", navigator)
      })
   })
}
export async function handleUnfinishedTransactions(navigator) {
   return new Promise((resolve, reject) => {
      InAppUtils.getPendingPurchases(async transactions => {
         console.log("TRANSACTIONS")
         console.log(transactions)

         const serviceCalls = []

         if (transactions.length > 0) {
            //loading flag true
            for (let i = 0; i < transactions.length; i++) {
               const transaction = transactions[i]

               switch (transaction.state) {
                  case "purchased":
                     InAppUtils.finishPurchase(transaction.identifier, error => {})
                     Crashlytics.recordError("Unfinished transaction detected!")

                     serviceCalls.push(
                        validatePurchase(transaction.receipt, transaction.productIdentifier, "unfinished")
                           .then(response => {
                              console.log("unhandled resp", response)
                              InAppUtils.finishPurchase(transaction.identifier, error => {
                                 if (!error) {
                                    console.log("Transaction finished without errors")
                                    Crashlytics.recordError("Unfinished transaction validated!")
                                 } else {
                                    Crashlytics.recordError("Unfinished transaction validation failed.")
                                 }
                              })
                           })
                           .catch(error => {
                              if (error.response) {
                                 if (error.response.status == 500) {
                                    InAppUtils.finishPurchase(transaction.identifier, error => {
                                       if (!error) {
                                          console.log("Transaction finished without errors")
                                          Crashlytics.recordError("Unfinished transaction validated! (500)")
                                       } else {
                                          Crashlytics.recordError(
                                             "Unfinished transaction validation failed. (500)"
                                          )
                                       }
                                    })
                                 }
                              }
                           })
                     )
                     break

                  default:
                     break
               }
            }
            await Promise.all(serviceCalls)
         }
         resolve()
      })
   })
}

export function buyItem(item, type, navigator) {
   console.log("iteeemsss", item)
   console.log("inapputills", InAppUtils)
   Crashlytics.recordError(`buy ${type} action triggered`)
   InAppUtils.purchaseProduct(item.apple_store_id, (error, purchaseProductResponse) => {
      console.log("resp", purchaseProductResponse)
      if (purchaseProductResponse) {
         console.log("böylede olur", purchaseProductResponse)
         validatePurchase(purchaseProductResponse.transactionReceipt, item.apple_store_id).then(
            validResponse => {
               console.log("valid response", validResponse)
               if (validResponse.status === 200) {
                  InAppUtils.finishPurchase(validResponse.transactionIdentifier, error => {
                     if (!error) {
                        //alert koyulabilir
                        console.log("transaction finished without errors")
                     } else {
                        console.log("finish", error)
                     }
                  })
               }
               setTimeout(() => {
                  store.dispatch(getProfileDataRequest())
               }, 200)
            }
         )
      } else {
         console.log("else error", error)
      }
   })
}
