import React from 'react'
import { lazy } from 'react'
import ErrorBoundary from '../layouts/mobile/ErrorBoundary'
import { MyRoute } from '@/routes/renderRoutes'
import Article from '../chunks/Article'
import TabView from '@/components/home-tab-view'

const ArticleModule = new Article()

// 嵌套路由都脑残。。

const routes: MyRoute[] = [
    {
        path: '/',
        component: ErrorBoundary,
        routes: [
            {
                path: '/home',
                isCache: true,
                component: TabView,
            },
            {
                path: '/posts/:id',
                isTransition: true,
                isCache: true,
                component: lazy(() => ArticleModule.get('Posts'))
            }
        ],
    }
]

export default routes
