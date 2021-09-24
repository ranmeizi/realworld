import * as ACTION_TYPES from '../ACTION_TYPES'
import { themeChange } from '@/theme/useThemeStyle'

// 设置皮肤
export function setTheme(theme: 'light' | 'dark') {
    document.body.className = 'rvt-body-' + theme
    themeChange(theme)
    return {
        type: ACTION_TYPES.SET_THEME,
        data: theme
    }
}