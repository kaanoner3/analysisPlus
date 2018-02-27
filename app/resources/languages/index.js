import tr from "./tr"
import en from "./en"
import I18n from "react-native-i18n"
import * as moment from 'moment';
import DeviceInfo from "react-native-device-info"

I18n.fallbacks = false

I18n.translations = {
   en,
   tr
}

I18n.locale = DeviceInfo.getDeviceLocale().slice(0, 2)

export default I18n
