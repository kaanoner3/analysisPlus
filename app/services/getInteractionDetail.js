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
      case "no_comments_or_likes": {
         this.response = axios.get("/api/user/least-interactionted-me")
         return this.response
      }
      case "least_comments_left": {
         this.response = axios.get("/api/user/least-commented-me")
         return this.response
      }
      case "least_likes_given": {
         this.response = axios.get("/api/user/least-liked-me")
         return this.response
      }
      default:
         return null
   }
}

export default getUsers
