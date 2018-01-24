import axios from "axios"

async function getProfileData(token) {
   const params = {
      access_token: token
   }
   const response = axios
      .get("api/user/base-detail", { params })

   return response
}

export default getProfileData
