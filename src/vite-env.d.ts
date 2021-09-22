/// <reference types="vite/client" />

interface Window {
    devToolsExtension: any,
    CONSTANTS: any
}

type JssSheet = {
    [key: string]: React.CSSProperties
}
