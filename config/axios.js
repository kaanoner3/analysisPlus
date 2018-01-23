import axios from 'axios'

export default {
    baseURL: "http://analysisplusapp.com/"
}

function setAxiosConfig(baseURL,token){
    
    const myAxios = axios.create({
        baseURL,
        
    })
}