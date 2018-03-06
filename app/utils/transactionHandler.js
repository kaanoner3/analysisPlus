import { NativeModules, Alert } from "react-native"
const { InAppUtils } = NativeModules
import axios from "utils/axios"
import store from "store"
import { Crashlytics } from "react-native-fabric"
import { validatePurchase } from "services"

const sharedSecret = "7900d2d1b4f847c19c9e2bf71f904c01"
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
                     // InAppUtils.finishPurchase(transaction.identifier, (error) => { });
                     Crashlytics.recordError("Unfinished transaction detected!")

                     serviceCalls.push(
                        validatePurchase(transaction.productIdentifier, transaction.receipt, "unfinished")
                           .then(response => {
                              console.log(response)
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
                                 /*if (error.response.status == 500) {
                        InAppUtils.finishPurchase(transaction.identifier, error => {
                          if (!error) {
                            console.log('Transaction finished without errors');
                            Crashlytics.recordError(
                              'Unfinished transaction validated! (500)',
                            );
                          } else {
                            Crashlytics.recordError(
                              'Unfinished transaction validation failed. (500)',
                            );
                          }
                        });
                      }*/
                              }
                           })
                     )
                     break

                  default:
                     break
               }
            }
            await Promise.all(serviceCalls);

         }
      })
   })
}

export function buyItem(item, type, navigator) {
   console.log(item)
   Crashlytics.recordError(`buy ${type} action triggered`)
   InAppUtils.purchaseProduct(item.apple_store_id, (error, response) => {
      console.log("err", error)
      console.log("resp", response)
      if (response && response.productIdentifier) {
         console.log("böylede olur")
         if (response.originalTransactionIdentifier !== undefined) {
            console.log("restore product")
            /*
            InAppUtils.restorePurchases((error, response) => {
               if (error) {
                  Alert.alert("itunes Error", "Could not connect to itunes store.")
               } else {
                  Alert.alert("Restore Successful", "Successfully restores all your purchases.")

                  if (response.length === 0) {
                     Alert.alert("No Purchases", "We didn't find any purchases to restore.")
                     return
                  }
                  response.forEach(purchase => {
                     if (purchase.productIdentifier === "com.xyz.abc") {
                        // Handle purchased product.
                     }
                  })
               }
            })
            */
         } else {
            const response = validatePurchase(response.transactionReceipt, item.apple_store_id).then(
               response => {
                  InAppUtils.finishPurchase(response.transactionIdentifier, error => {
                     if (!error) {
                        console.log("transaction finished without errors")
                     } else {
                        console.log(error)
                     }
                  })
               }
            )
            console.log("validate response", response)
         }
      } else {
         console.log("else error", error)
      }
   })
}
