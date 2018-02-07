import axios from "axios"

async function getUserMediaData(token, id) {
   const response = axios.get(
      "https://api.instagram.com/v1/users/" + id + "/media/recent/?access_token=" + token
   )
    
   return response
}

export default getUserMediaData
