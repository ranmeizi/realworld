import React, { useRef, useEffect } from 'react'
import { checkToken } from './auth'
import { Modal } from 'antd-mobile'
import { useHistory } from 'react-router-dom'

export function ClickAuthDiv({
    children,
    ...props
}: any) {
    const ref = useRef<any>()
    const history = useHistory()
    useEffect(() => {
        function onAuthClick(e: Event) {
            if (!checkToken()) {
                e.stopPropagation()
                // 弹出提示 跳转登陆
                Modal.alert(
                    '提示',
                    '请先完成登陆',
                    [
                        { text: '等一会', onPress: () => console.log('cancel'), style: 'default' },
                        { text: '去登陆', onPress: () => history.push('/realworld-login') }
                    ]
                )
            }
        }
        ref.current.addEventListener('click', onAuthClick)
        return () => ref.current.removeEventListener('click', onAuthClick)
    }, [])
    return <div ref={ref} {...props}>{children}</div>
}
