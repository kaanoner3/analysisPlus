// AsyncStorage
import { AsyncStorage } from "react-native"

export default function(callback) {
    AsyncStorage.multiRemove(["app_token", "user_id"], callback)
}
