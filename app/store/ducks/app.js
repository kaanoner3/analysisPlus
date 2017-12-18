/*
|------------------------------------------------------------------------------
| Initial state.
|------------------------------------------------------------------------------
*/

const initialState = {
    appState: null,
}

/*
|------------------------------------------------------------------------------
| Reducer.
|------------------------------------------------------------------------------
*/

export default function (state = initialState, action = {}) {
    if (action.type === 'APP_STATE_CHANGED') {
        return {
            appState: action.appState
        }
    }

    return state
}

/*
|------------------------------------------------------------------------------
| Action creators.
|------------------------------------------------------------------------------
*/

export function changeAppState(appState) {
    return {
        type: 'APP_STATE_CHANGED',
        appState,
    }
}

/*
|------------------------------------------------------------------------------
| Actions.
|------------------------------------------------------------------------------
*/

export function switchToLogin() {
    return changeAppState('login')
}

export function switchToUser() {
    return changeAppState('user')
}
