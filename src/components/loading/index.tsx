import React from 'react'
import ReactDOM from 'react-dom'
import { Icon } from 'antd-mobile'

const style: JssSheet = {
    root: {
        height: `${window.innerHeight}px`,
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        zIndex: 10
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
    console.log('open', isOpen)
    if (isOpen) {
        return
    }
    if (!container) {
        container = document.createElement('div')
        document.body.appendChild(container)
    }
    isOpen = true
    ReactDOM.render(<Loading />, container)
}

export function close() {
    if (!container) {
        return
    }
    isOpen = false
    ReactDOM.unmountComponentAtNode(container)
}

// 监听history pop事件
window.addEventListener('popstate', () => {
    console.log('popstate')
    close()
})