import React, { Component } from 'react'
import './style.less'
import TabBar from './components/Tabbar'
import renderRoutes from '@/routes/renderRoutes'

export default class MobileLayout extends Component<any> {

    static getDerivedStateFromError(error: any) {
        console.error(12121, error)
        // 更新 state 使下一次渲染能够显示降级后的 UI
        return { hasError: true };
    }

    state = {
        hasError: false
    }
    render() {
        const { hasError } = this.state
        return (
            <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
                <div className='rvt-router-view'>
                    {
                        hasError
                            ? <div>出错啦</div>
                            : renderRoutes(this.props.route.childRoutes)
                    }
                </div>
                <TabBar />
            </div>
        )
    }
}
