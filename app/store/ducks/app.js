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
            appState: "login"
         }
      }
      case APP_SWITCH_TOUSER: {
         return {
            appState: "user"
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
   return { type: APP_SWITCH_TOLOGIN }
}

export function switchToUser() {
   return { type: APP_SWITCH_TOUSER }
}
