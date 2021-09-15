import React from 'react'
import { lazy } from 'react'
import ErrorBoundary from '../layouts/mobile/ErrorBoundary'
import { MyRoute } from '@/routes/renderRoutes'
import { Redirect } from 'react-router-dom'
import Article from '../chunks/Article'
import User from '../chunks/User'
import TabView from '@/layouts/mobile/TabView'

const ArticleModule = new Article()
const UserModule = new User()

// 嵌套路由都脑残。。

const routes: MyRoute[] = [
    {
        path: '/',
        component: ErrorBoundary,
        routes: [
            // home
            {
                path: '/h',
                isCache: true,
                component: TabView,
                routes: [
                    {
                        path: '/h/home',
                        isCache: true,
                        component: lazy(() => ArticleModule.get())
                    }, {
                        path: '/h/user',
                        isCache: true,
                        component: lazy(() => UserModule.get())
                    }
                ]
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
