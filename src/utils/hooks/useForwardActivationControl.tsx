import { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useAliveController } from 'react-activation'

// 使用match和historyaction判断一下是否是前进到此路由
export default function useForwardActivationControl({
    name,
    match
}: any) {
    const history = useHistory()
    const location = useLocation()
    const { refresh } = useAliveController()

    useEffect(() => {
        if (history.action === 'PUSH' && match.url === name) {
            refresh(name)
            console.log('我应该ger屁了')
        }
    }, [location.pathname])
}