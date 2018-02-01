import axios from "axios"

async function getExtraMediaData(token, id, url) {
   const response = axios.get(
      url
   )
   return response
}

export default getExtraMediaData
