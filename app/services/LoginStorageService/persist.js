// AsyncStorage
import { AsyncStorage } from "react-native"

// Lodash
import _ from "lodash"

export default function(data, callback) {
    AsyncStorage.multiSet(
        // Prepare data object.
        _.chain(data)
            .pick(["app_token", "user_id"])
            .toPairs()
            .value(),

        // Done callback.
        callback
    )
}
