import React from 'react'
import { Icon } from 'antd-mobile'

const style: JssSheet = {
    root: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

export default function () {
    return <div style={style.root}>
        <Icon type='loading' />
    </div>
}
