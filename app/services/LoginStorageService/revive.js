// AsyncStorage
import { AsyncStorage } from "react-native"

// Lodash
import _ from "lodash"

export default function(callback) {
    AsyncStorage.multiGet(["app_token", "user_id"], (err, stores) => {
        //
        if (err) {
            return callback(err)
        }

        // Restructure data as an object.
        const data = _.fromPairs(stores)
        // Decide if it's an acceptable login data.
        const isSignedIn =
            Number(data.user_id) > 0 ||
            (data.app_token && data.app_token.length) > 0

        //
        callback(null, isSignedIn ? data : false)
    })
}
