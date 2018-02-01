import axios from "axios"

async function getUserMediaData(token, id) {
   const response = axios.get(
      "https://api.instagram.com/v1/users/" + id + "/media/recent/?access_token=" + token
   )
    console.log('service media',response)   
   return response
}

export default getUserMediaData
