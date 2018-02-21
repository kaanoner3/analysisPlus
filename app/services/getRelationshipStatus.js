import axios from "axios"

async function getRelationshipStatus(token, id) {
 
   const response = axios.get(
      "https://api.instagram.com/v1/users/" + id + "/relationship?access_token=" +token
   )
   return response
}

export default getRelationshipStatus
