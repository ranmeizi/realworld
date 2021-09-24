import { useState, useMemo, useEffect } from 'react'
import light from './light/vars'
import dark from './dark/vars'
import $EB, { EventBus } from '@/utils/EventBus'
import store from '@/redux/store'

const eventTypes = EventBus.TYPES

const themes = {
    'light': light,
    'dark': dark
}

const defaultTheme = store.getState().app.theme

export const themeChange = function (theme: 'light' | 'dark') {
    console.log('emit ???')
    $EB.emit(eventTypes.THEME_CHANGE, theme)
}

export default function useStyle(style: JssSheet | ((theme: Theme) => JssSheet)) {

    const theme = useTheme()

    return useMemo(() => {
        if (Object.prototype.toString.call(style) === '[object Function]') {
            style = (style as ((theme: Theme) => JssSheet))(theme)
        }
        return style
    }, [theme])
}

export function useTheme() {
    const [theme, setTheme] = useState<'light' | 'dark'>(defaultTheme)
    useEffect(() => {
        $EB.on(eventTypes.THEME_CHANGE, setTheme)
        return () => $EB.un(eventTypes.THEME_CHANGE, setTheme)
    }, [])
    return themes[theme]
}