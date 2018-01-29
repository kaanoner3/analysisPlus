import axios from "axios"

async function getUsers(token, type) {
   const params = { access_token: token }
   this.response = {}
   switch (type) {
      case "losted_followers": {
         this.response = axios.get("api/user/losted-followers", { params })
         return this.response
      }

      case "gained_followers": {
         this.response = axios.get("api/user/gained-followers", { params })
         return this.response
      }

      case "profile_visitors": {
         //  this.response = axios.get("api/user/losted-followers", { params })
         console.log("visitors bos")
      }
      case "user_blocking_me": {
            console.log('tııık')
         this.response = axios.get("api/user/blocked-me", { params })
         console.log(response)
         return this.response
      }

      case "stalkers": {
         // this.response = axios.get("api/user/losted-followers", { params })
         console.log("stalkers bos")
      }

      case "deleted_comment": {
         this.response = axios.get("api/user/losted-followers", { params })
         return this.response
      }
      case "not_follow_me": {
         this.response = axios.get("api/user/not-follow-me", { params })
         return this.response
      }
      case "not_follow_by_me": {
         this.response = axios.get("api/user/not-follow-by-me", { params })
         return this.response
      }
      default:
         return null
   }
}

export default getUsers
