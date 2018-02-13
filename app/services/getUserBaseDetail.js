import axios from "axios"

async function getUserBaseDetail(token, id) {
    
   const response = axios.get(
      "https://api.instagram.com/v1/users/" + id 
   )

   return response
}

export default getUserBaseDetail
