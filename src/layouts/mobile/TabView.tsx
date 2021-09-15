import React, { Suspense } from 'react'
import TabBar from './components/Tabbar'
import Routes from '@/routes/renderRoutes'

export default function (props: any) {
    console.log('aaa')
    return <div>
            <Routes {...props.route} />
        <TabBar />
    </div>
}