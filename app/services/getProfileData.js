import axios  from "utils/axios"

async function getProfileData(token) {
   const response = axios
      .get("api/user/base-detail")

   return response
}

export default getProfileData
