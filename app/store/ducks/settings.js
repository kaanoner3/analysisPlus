export const GET_SETTINGS = "settings/GET_SETTINGS"
export const SET_SETTINGS = "settings/SET_SETTINGS"

const initialState = {
   errorMessage: null,
   isFetching: null,
   unfollow_me: false,
   blocks_me: false,
   firstTime: null
}
export default function(state = initialState, action = {}) {
   switch (action.type) {
      case GET_SETTINGS: {
         return {
            ...state,
            blocks_me,
            unfollow_me
         }
      }
      case SET_SETTINGS: {
         const { unfollow_me, blocks_me } = action
         return {
            ...state,
            unfollow_me,
            blocks_me
         }
      }
      default:
         return state
   }
}

export function setSettings(unfollow_me, blocks_me) {
   return { type: INTERACTION_DETAIL_REQUEST, unfollow_me, blocks_me }
}

export function getSettings() {
   return { type: GET_SETTINGS }
}
