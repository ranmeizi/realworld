import { lazy } from 'react'
import MobileLayout from '../layouts/mobile'
import { RouteConfig } from 'react-router-config'

const routes: RouteConfig[] = [
    {
        path: '/',
        component: MobileLayout,
        childRoutes: [
            {
                path: '/article',
                component: lazy(() => import('../chunks/Article'))
            }, {
                path: '/setting',
                component: lazy(() => import('../chunks/Setting'))
            }
        ]
    }
]

export default routes
