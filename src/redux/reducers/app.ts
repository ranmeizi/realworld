import { AnyAction } from 'redux'
import * as TYPES from '../ACTION_TYPES'

type ThemeState = {
    theme: 'light' | 'dark',
    appTab: string
}

const initialState: ThemeState = {
    theme: 'light',
    appTab: ''
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
