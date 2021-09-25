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


export function useTheme() {
    const [theme, setTheme] = useState<'light' | 'dark'>(defaultTheme)
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