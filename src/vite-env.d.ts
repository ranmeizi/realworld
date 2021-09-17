/// <reference types="vite/client" />

interface Window {
    devToolsExtension: any
}

type JssSheet = {
    [key: string]: React.CSSProperties
}