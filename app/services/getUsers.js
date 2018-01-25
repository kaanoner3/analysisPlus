import axios from "axios"

async function getUsers(token, type) {
    console.log('TYPEE GELDİİ',type)
   const params = { token }
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
         this.response = axios.get("api/user/blocked-me", { params })
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

         console.log('NOOOOOT FOLLO MEEEE',this.response)
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