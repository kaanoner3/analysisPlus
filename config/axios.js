<<<<<<< HEAD
import axios from 'axios'
=======
import axios from "axios"
import _ from "lodash"
>>>>>>> 4793eb0842ac953cb2149b947f407f53e2dd2cde

export default {
    baseURL: "http://analysisplusapp.com/"
}

function setAxiosConfig(baseURL,token){
    
    const myAxios = axios.create({
        baseURL,
        
    })
}