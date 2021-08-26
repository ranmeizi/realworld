import React, { Component, Suspense } from 'react'
import './style.less'
import TabBar from './components/Tabbar'
import renderRoutes from '@/routes/renderRoutes'

export default class MobileLayout extends Component<any> {
    state = {
        hidden: false,
        selectedTab: 'blueTab'
    }
    render() {
        console.log(this.props)
        return (
            <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
                <div className='rvt-router-view'>
                    <Suspense fallback={<div>Loading...</div>}>
                        {
                            renderRoutes(this.props.route.childRoutes)
                        }
                    </Suspense>
                </div>
                <TabBar />
            </div>
        )
    }
}
