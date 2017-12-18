import axios from 'axios'
import _ from 'lodash'

export default {
    baseURL: 'http://analysisplusapp.com/test',
}

export function setConfig(config) {
    Object.keys(config).forEach(key => {
        _.set(axios.defaults, key, config[key])
    })
}
