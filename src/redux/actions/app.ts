import * as ACTION_TYPES from '../ACTION_TYPES'

// 设置皮肤
export function setTheme(theme: 'light' | 'dark') {
    return {
        type: ACTION_TYPES.SET_THEME,
        data: theme
    }
}