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
    uinfo: Partial<UInfo>
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
        case TYPES.SET_UINFO:
            return {
                ...state,
                uinfo: action.data
            }
        case TYPES.CLEAR_UINFO:
            return {
                ...state,
                uinfo: {}
            }
        default: return state
    }
}
