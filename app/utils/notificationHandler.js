import { Alert } from "react-native"

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
         case "notification_message":
            // messages

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
