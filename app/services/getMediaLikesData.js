import axios  from "utils/axios"

async function getMediaLikesData(token, id) {
   const response = axios.get("api/user/" + id + "/media-likes")
   return response
}

export default getMediaLikesData
