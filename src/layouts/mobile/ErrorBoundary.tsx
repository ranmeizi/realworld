import React, { PureComponent } from 'react'
import './style.less'
import Routes from '@/routes/renderRoutes'

// 顶层路由错误边界

export default class ErrorBoundary extends PureComponent<any> {

    static getDerivedStateFromError(error: any) {
        // 更新 state 使下一次渲染能够显示降级后的 UI
        return { hasError: true };
    }

    state = {
        hasError: false
    }

    render() {
        const { hasError } = this.state
        return (
            <div style={{ height: '100%', width: '100%' }}>
                {
                    hasError
                        ? <div>出错啦</div>
                        : <Routes {...this.props.route} />
                }
            </div>
        )
    }
}
