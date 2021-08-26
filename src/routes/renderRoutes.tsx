import React from 'react'
import { RouteProps, Route } from 'react-router-dom'
import CacheRoute, { CacheRouteProps } from "react-router-cache-route";
import { CacheSwitch } from 'react-router-cache-route'

interface CustRouteParam {
    isAuth?: boolean, // 是否需要校验路由权限
    isCache?: boolean // 是否需要缓存
    cacheProps?: CacheRouteProps // Cache组件props值
    childRoutes?: MyRoute[]
}

export default function (routes: MyRoute[], extraProps = {}, switchProps = {}) {
    return <CacheSwitch {...switchProps}>{
        routes.map(({
            component,
            ...route
        }, index) => {
            let RouteComp = Route
            // 根据isCache决定使用CacheRoute
            if (route.isCache) {
                RouteComp = CacheRoute
                if (route.cacheProps) {
                    Object.assign(route, route.cacheProps)
                    delete route.cacheProps
                }
            }

            let render = route.render
                ? (props: any) => route.render!({ ...props, ...extraProps, route })
                : (props: any) => {
                    const Component = component as React.ComponentType
                    return <Component {...props} {...extraProps} route={route} />
                }

            // 是否需要校验权限
            if (route.isAuth) {
                render = withAuth(render)
            }

            return <RouteComp
                key={index}
                path={route.path}
                exact={route.exact}
                strict={route.strict}
                render={render}
            />
        })}
    </CacheSwitch>
}

export type MyRoute = CustRouteParam & RouteProps

// 检查是否需要权限校验
function withAuth(render: (props: any) => React.ReactNode) {
    return function (props: any) {
        return render(props)
    }
}
