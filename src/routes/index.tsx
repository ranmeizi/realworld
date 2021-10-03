import React from 'react'
import { lazy } from 'react'
import ErrorBoundary from '../layouts/ErrorBoundary'
import { MyRoute } from '@/routes/renderRoutes'
import Article from '../chunks/Article'
import User from '@/chunks/User'
import TabView from '@/components/home-tab-view'
import { Redirect, Link } from 'react-router-dom'

const ArticleModule = new Article()
const UserModule = new User()

// 嵌套路由都脑残。。

const routes: MyRoute[] = [
    {
        path: '/',
        component: ErrorBoundary,
        routes: [
            {
                path: '/',
                exact: true,
                render: () => <Redirect to='/f/home' />
            },
            {
                path: '/f',
                isCache: true,
                isTransition: true,
                component: TabView,
                routes: [
                    {
                        path: '/f/home',
                        isCache: true,
                        component: lazy(() => ArticleModule.get())
                    },
                    {
                        path: '/f/user',
                        isCache: true,
                        component: lazy(() => UserModule.get())
                    },
                ]
            },
            {
                path: '/posts/:slug',
                isCache: true,
                isTransition: true,
                component: lazy(() => ArticleModule.get('Posts'))
            },
            {
                path: '/test',
                component: Test
            },
            {
                path: '/realworld-login',
                isTransition: true,
                component: lazy(() => UserModule.get('RealWorldLogin'))
            },
            {
                path: '/register',
                isTransition: true,
                component: lazy(() => UserModule.get('Register'))
            },
            {
                path: '/login',
                isTransition: true,
                component: lazy(() => UserModule.get('Login'))
            },
            {
                path: '/profile/:username',
                isTransition: true,
                component: lazy(() => ArticleModule.get('Profile'))
            }
        ],
    }
]

export default routes


function Test() {
    return <div>
        <Link to='/f/home'>Article</Link>
        /
        <Link to='/f/user'>User</Link>

    </div>
}