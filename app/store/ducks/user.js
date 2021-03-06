const ACTION_SET_USER_IDENTITY = "user/ACTION_SET_USER_IDENTITY"
export const ACTION_DELETE_USER = "user/ACTION_DELETE_USER"

const initialState = {
   errorMessage: null,
   isFetching: null,
   existingUsers: []
}
export default function(state = initialState, action = {}) {
   switch (action.type) {
      case ACTION_SET_USER_IDENTITY: {
         const { instagram_token, instagram_id, access_token, username, password } = action
         const userList = Object.assign([], state.existingUsers)
         const user = userList.find(x => x.instagram_id == instagram_id)
         if (user === undefined) {
            const newUser = {
               instagram_id,
               instagram_token,
               access_token,
               username,
               password
            }
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
      }
      case ACTION_DELETE_USER: {
         const { instagram_id } = action
         const userList = Object.assign([], state.existingUsers)
         const index = userList.findIndex(x => x.instagram_id == instagram_id)
         userList.splice(index,1)
         
         return {
            ...state,
            existingUsers: userList
         }
      }
      default:
         return state
   }
}

export function setUser(instagram_id, instagram_token, access_token, username, password) {
   return { type: ACTION_SET_USER_IDENTITY, instagram_id, instagram_token, access_token, username, password }
}
export function deleteUser(instagram_id) {
   return { type: ACTION_DELETE_USER, instagram_id }
}
