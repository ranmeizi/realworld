/// <reference types="vite/client" />

interface Window {
    devToolsExtension: any,
    CONSTANTS: any
}

interface JssSheet {
    [key: string]: React.CSSProperties
}

interface Theme {
    bg: {
        pri?: string,
        sec?: string
    },
    fc: {
        header?: string,
        text?: string,
        desc?: string,
        active?: string
    }
}