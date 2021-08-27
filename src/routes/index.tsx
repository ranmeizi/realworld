import React from 'react'
import { lazy } from 'react'
import MobileLayout from '../layouts/mobile'
import { MyRoute } from './renderRoutes'
import { Redirect } from 'react-router-dom'
import Article from '../chunks/Article'
import User from '../chunks/User'

const ArticleModule = new Article()
const UserModule = new User()

const routes: MyRoute[] = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to='/f/home' />
    }, {
        path: '/f',
        component: MobileLayout,
        isCache: true,
        childRoutes: [
            {
                path: '/f/home',
                isCache: true,
                component: lazy(() => ArticleModule.get())
            }, {
                path: '/f/user',
                isCache: true,
                component: lazy(() => UserModule.get())
            }
        ]
    }, {
        path: '/posts',
        component: lazy(() => ArticleModule.get('Posts'))
    }
]

export default routes
