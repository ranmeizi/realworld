/// <reference types="vite/client" />

interface Window {
    devToolsExtension: any,
    CONSTANTS: any
}

type JssSheet = {
    [key: string]: React.CSSProperties
}

type Theme = {
    bg?: {
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