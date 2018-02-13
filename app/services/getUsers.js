import axios  from "utils/axios"

async function getUsers(token, type) {
   this.response = {}
   switch (type) {
      case "losted_followers": {
         this.response = axios.get("api/user/losted-followers")
         return this.response
      }

      case "gained_followers": {
         this.response = axios.get("api/user/gained-followers")
         return this.response
      }

      case "profile_visitors": {
         //  this.response = axios.get("api/user/losted-followers")
         console.log("visitors bos")
      }
      case "user_blocking_me": {
         this.response = axios.get("api/user/blocked-me")
         return this.response
      }

      case "stalkers": {
         // this.response = axios.get("api/user/losted-followers")
         console.log("stalkers bos")
      }

      case "deleted_comment": {
         this.response = axios.get("api/user/losted-followers")
         return this.response
      }
      case "not_follow_me": {
         this.response = axios.get("api/user/not-follow-me")
         return this.response
      }
      case "not_follow_by_me": {
         this.response = axios.get("api/user/not-follow-by-me")
         return this.response
      }
      default:
         return null
   }
}

export default getUsers
