import axios from 'axios'

export default {
    baseURL: "http://analysisplusapp.com/",
}

export function setConfig(config) {
    Object.keys(config).forEach(key => {
        _.set(axios.defaults, key, config[key])
    })
}
