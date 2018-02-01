import axios from "axios"

async function getUsers(token, type) {
   const params = { access_token: token }

   switch (type) {
      case "most-likes-to-me": {
         this.response = axios.get("/api/user/most-liked-me", { params })
         return this.response
      }

      case "most-comments-to-me": {
         this.response = axios.get("api/user/gained-followers", { params })
         return this.response
      }

      case "most-likes-and-comments-to-me": {
         this.response = axios.get("/api/user/most-interactionted-me", { params })
         console.log("visitors bos")
      }
      default:
         return null
   }
}

export default getUsers
