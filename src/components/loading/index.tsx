import React from 'react'
import ReactDOM from 'react-dom'
import { Icon } from 'antd-mobile'

const style: JssSheet = {
    root: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        pointerEvents: 'none',
        top: 0,
        left: 0
    }
}

export default function Loading() {
    return <div className='rvt-loading' style={style.root}>
        <Icon type='loading' />
    </div>
}

let container: Element | null = null
let isOpen = false

export function open() {
    if (isOpen) {
        return
    }
    if (!container) {
        container = document.createElement('div')
        document.body.appendChild(container)
    }
    ReactDOM.render(<Loading />, container)
}

export function close() {
    if (!container) {
        return
    }
    ReactDOM.unmountComponentAtNode(container)
}