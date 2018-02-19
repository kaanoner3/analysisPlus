const ACTION_SET_USER_IDENTITY = "user/ACTION_SET_USER_IDENTITY"
const initialState = {
   errorMessage: null,
   isFetching: null,
   existingUsers: []
}
export default function(state = initialState, action = {}) {
   switch (action.type) {
      case ACTION_SET_USER_IDENTITY:
         const { instagram_token, instagram_id, access_token, username } = action
         const userList = Object.assign([], state.existingUsers)
          console.log('userlist',userList)
         const user = userList.find(x => x.instagram_id == instagram_id)
         console.log("reduuuuuucer", user)
         if (user === undefined) {
            const newUser = {
               instagram_id,
               instagram_token,
               access_token,
               username
            }
            console.log('asdasdasdsa',newUser)
            return {
               ...state,
               existingUsers: [...state.existingUsers, newUser]
            }
         } else {
            return {
               ...state,
               existingUsers: [...state.existingUsers]
            }
         }

      default:
         return state
   }
}

export function setUser(instagram_token, instagram_id, access_token, username) {
   return { type: ACTION_SET_USER_IDENTITY, instagram_token, instagram_id, access_token, username }
}
