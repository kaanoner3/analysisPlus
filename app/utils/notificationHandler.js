import { Alert } from "react-native"
import {  changeUser } from "ducks/auth"
import store from "store"

let notificationData = {}

export function setNotificationData(data) {
   notificationData = data
}

export function getNotificationData() {
   return notificationData
}

export default function notificationHandler(navigator) {
   if (notificationData.notification) {
      const data = notificationData.notification.payload.additionalData

      switch (data.notification_type) {
         case "notification_match":
            navigator.push({
               screen: "SettingScreen",
               passProps: {}
            })
            break
         case "notification_withId":
            const currentId = store.getState().auth.data.instagram_id
            console.log("currentID", currentId)
            console.log("coming id", data.notification_withId)
            if (currentId !== data.notification_withId) {
               const user = store
                  .getState()
                  .user.existingUsers.find(x => x.instagram_id == data.notification_withId)
                  console.log(user)
            }

            break

         case "notification_custom_visitor":
         case "notification_visitor":
            break

         case "notification_custom_like":
         case "notification_like":
            break

         case "notification_message_request_delete":
         case "notification_message_request":
         case "notification_message_request_2":
            // message requests

            break

         default:
            break
      }
   }
}
