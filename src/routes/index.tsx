import React from 'react'
import { lazy } from 'react'
import MobileLayout from '../layouts/mobile'
import { MyRoute } from './renderRoutes'
import { Redirect } from 'react-router-dom'

const routes: MyRoute[] = [
    {
        path: '/',
        component: MobileLayout,
        childRoutes: [
            {
                path: '/',
                exact: true,
                component: () => <Redirect to='/article' />
            },
            {
                path: '/article',
                isCache: true,
                component: lazy(() => import('../chunks/Article/Article'))
            }, {
                path: '/setting',
                isCache: true,
                component: lazy(() => import('../chunks/Setting/Setting'))
            }
        ]
    }
]

export default routes
