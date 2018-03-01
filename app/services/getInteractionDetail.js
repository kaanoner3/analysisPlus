import axios from "utils/axios"

async function getUsers(type) {
   switch (type) {
      case "most_likes_to_me": {
         this.response = axios.get("/api/user/most-liked-me")
         return this.response
      }

      case "most_comments_to_me": {
         this.response = axios.get("api/user/most-commented-me")
         return this.response
      }

      case "most_likes_and_comments_to_me": {
         this.response = axios.get("/api/user/most-interactionted-me")
         return this.response
      }
      default:
         return null
   }
}

export default getUsers
