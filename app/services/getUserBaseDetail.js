import axios from "axios"

async function getUserBaseDetail(token, id) {
   const response = axios.get(
      "https://api.instagram.com/v1/users/" + id + "/?access_token=" + token
   )
   console.log('service',"https://api.instagram.com/v1/users/" + id + "/?access_token=" + token)
   return response
}

export default getUserBaseDetail
