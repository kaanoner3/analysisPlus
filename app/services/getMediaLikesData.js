import axios from "axios"

async function getMediaLikesData(token, id) {
   const response = axios.get("api/user/" + id + "/media-likes?access_token=" + token)
   return response
}

export default getMediaLikesData
