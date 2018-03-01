import { Alert } from "react-native"
import { changeUser } from "ducks/auth"
import store from "store"
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'

let notificationData = {}

export function setNotificationData(data) {
   console.log("set notification", data)
   notificationData = data
}

export function getNotificationData() {
   return notificationData
}

export default function notificationHandler(navigator) {
   if (notificationData.notification) {
      const data = notificationData.notification.payload.additionalData
      console.log("deneeemee", data)
      switch (data.notification_type) {
         case "noncase":
            break
         case "notification_match":
            const currentId = store.getState().auth.data.instagram_id
            console.log("currentID", currentId)
            if (currentId !== data.instagram_id) {
               const user = store.getState().user.existingUsers.find(x => x.instagram_id == data.instagram_id)
               console.log(user)
               store.dispatch(changeUser(user.instagram_token, user.username, user.password)) 
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
