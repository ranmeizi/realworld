import { AnyAction } from 'redux'
import * as TYPES from '../ACTION_TYPES'

type UInfo = {
    email: string,
    token: string,
    username: string,
    bio: string,
    image: string
}

type ThemeState = {
    theme: 'light' | 'dark',
    appTab: string,
    hideTabbar: boolean,
    hideHeader: boolean,
    uinfo: UInfo | {}
}

const initialState: ThemeState = {
    theme: 'dark',
    appTab: '',
    hideTabbar: false,
    hideHeader: false,
    uinfo: {}
}

export default function reducer(state: ThemeState = initialState, action: AnyAction) {
    switch (action.type) {
        case TYPES.SET_THEME:
            return {
                ...state,
                theme: action.data
            }
        default: return state
    }
}
