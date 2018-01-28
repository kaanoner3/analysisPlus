/*
|------------------------------------------------------------------------------
| Initial state.
|------------------------------------------------------------------------------
*/

const initialState = {
   appState: null
}
export const APP_SWITCH_TOLOGIN = "app/APP_SWITCH_TOLOGIN"
export const APP_SWITCH_TOUSER = "app/APP_SWITCH_TOUSER"

/*
|------------------------------------------------------------------------------
| Reducer.
|------------------------------------------------------------------------------
*/
export default function(state = initialState, action = {}) {
   switch (action.type) {
      case APP_SWITCH_TOLOGIN: {
         return {
            appState: action.data,
         }
      }
      case APP_SWITCH_TOUSER: {
         return {
            appState: action.data,
         }
      }
      default:
         return state
   }
}

/*
|------------------------------------------------------------------------------
| Action creators.
|------------------------------------------------------------------------------
*/

/*
|------------------------------------------------------------------------------
| Actions.
|------------------------------------------------------------------------------
*/

export function switchToLogin() {
   return { type: APP_SWITCH_TOLOGIN,data: 'login' }
}

export function switchToUser() {
   return { type: APP_SWITCH_TOUSER, data: 'user' }
}
