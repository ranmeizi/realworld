import { useState, useMemo, useEffect } from 'react'
import light from './light/vars'
import dark from './dark/vars'
import $EB, { EventBus } from '@/utils/EventBus'

const eventTypes = EventBus.TYPES

const themes = {
    'light': light,
    'dark': dark
}

const defaultTheme = themes[localStorage.getItem('_YK_THEME_') as 'light' | 'dark'] || light

export default function (style: JssSheet | ((theme: Theme) => JssSheet)) {
    const [theme, setTheme] = useState(defaultTheme)
    useEffect(() => {
        $EB.on(eventTypes.THEME_CHANGE, setTheme)
        return $EB.un(eventTypes.THEME_CHANGE, setTheme)
    }, [])
    return useMemo(() => {
        if (Object.prototype.toString.call(style) === '[object Function]') {
            return (style as ((theme: Theme) => JssSheet))(theme)
        } else {
            return style
        }
    }, [theme])
}