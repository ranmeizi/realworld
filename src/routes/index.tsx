import React from 'react'
import { lazy } from 'react'
import ErrorBoundary from '../layouts/ErrorBoundary'
import { MyRoute } from '@/routes/renderRoutes'
import Article from '../chunks/Article'
import User from '@/chunks/User'
import TabView from '@/components/home-tab-view'
import { Redirect, useHistory } from 'react-router-dom'
import { withPermissionArea, withPermissionRouter } from '@/components/permission'
import { setPermission } from '@/redux/actions/app'
import { store } from '@/redux/store'

const Button = ({ children, ...props }: any) => <button {...props}>{children}</button>

const P11Btn = withPermissionArea({
    permission: '1',
    tips: '我没有权限'
})(Button)

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
                path: ['/edit', '/edit/:slug'],
                isCache: true,
                isTransition: true,
                component: lazy(() => ArticleModule.get('Edit'))
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
                path: '/test1',
                component: withPermissionRouter({
                    permission: '2'
                })(Test1)
            },
            {
                path: '/realworld-login',
                isCache: true,
                isTransition: true,
                component: lazy(() => UserModule.get('RealWorldLogin'))
            },
            {
                path: '/register',
                isCache: true,
                isTransition: true,
                component: lazy(() => UserModule.get('Register'))
            },
            {
                path: '/login',
                isCache: true,
                isTransition: true,
                component: lazy(() => UserModule.get('Login'))
            },
            {
                path: '/profile/:username',
                isCache: true,
                isTransition: true,
                component: lazy(() => ArticleModule.get('Profile'))
            },
            {
                path: '/myArticles/:type',
                isCache: true,
                isTransition: true,
                component: lazy(() => ArticleModule.get('MyArticles'))
            },
            {
                path: '/account/:username',
                isCache: true,
                isTransition: true,
                component: lazy(() => UserModule.get('Account'))
            },
        ],
    }
]

export default routes

function Test() {
    const history = useHistory()
    return <div>
        <P11Btn onClick={() => {
            alert('要跳转了啊')
            history.push('/test1')
        }}>点我跳转啊笨蛋</P11Btn>
        <button onClick={() => store.dispatch(setPermission(['1']))}>setPromission1</button>
        <button onClick={() => store.dispatch(setPermission(['2']))}>setPromission2</button>
    </div>
}

function Test1() {
    return <div>
        有很多很多好内容。。
    </div>
}