import axios  from "utils/axios"

async function getUsers(token, type) {
   

   switch (type) {
      case "most-likes-to-me": {
         this.response = axios.get("/api/user/most-liked-me")
         return this.response
      }

      case "most-comments-to-me": {
         this.response = axios.get("api/user/gained-followers")
         return this.response
      }

      case "most-likes-and-comments-to-me": {
         this.response = axios.get("/api/user/most-interactionted-me")
         console.log("visitors bos")
      }
      default:
         return null
   }
}

export default getUsers
