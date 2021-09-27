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

export const themeChange = function (theme: 'light' | 'dark') {
    $EB.emit(eventTypes.THEME_CHANGE, theme)
}


export function useTheme() {
    const [theme, setTheme] = useState<'light' | 'dark'>(store.getState().app.theme)
    useEffect(() => {
        $EB.on(eventTypes.THEME_CHANGE, setTheme)
        return () => $EB.un(eventTypes.THEME_CHANGE, setTheme)
    }, [])
    return themes[theme]
}

export function makeStyles<
    K extends string = string
>(style: (theme: Theme) => JssSheet<K>) {
    return function useStyle() {

        const theme = useTheme()

        return useMemo(() => {
            return style(theme)
        }, [theme])
    }
}
