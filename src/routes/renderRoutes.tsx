import React, { Suspense, useMemo } from 'react'
import { RouteProps, Switch, Route, withRouter, matchPath } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { KeepAlive } from 'react-activation'

interface CustRouteParam {
    isAuth?: boolean, // 是否需要校验路由权限
    isTransition?: boolean, // 是否需要过渡动画
    isCache?: boolean, // 是否需要缓存
    routes?: MyRoute[], // 普通路由
}

const ANIMATION_MAP = {
    PUSH: 'forward',
    POP: 'back'
}

function Routes(props: any) {
    const routes: MyRoute[] = props.routes
    const location = props.location
    const history = props.history

    const transitionKey = useMemo(() => {
        const route = routes.find(r => matchPath(location.pathname, r))
        return route?.isTransition
            ? route.path
            : 'notransition'
    }, [location.pathname])

    return <TransitionGroup
        className={'square-wrapper'}
        childFactory={child => React.cloneElement(
            child,
            { classNames: ANIMATION_MAP[history.action as 'PUSH' | 'POP'] }
        )}
    >
        <CSSTransition
            timeout={500}
            key={transitionKey as string}
        >
            <Switch location={location}>
                {renderRoutes(routes)}
            </Switch>
        </CSSTransition>
    </TransitionGroup>
}

export default withRouter(Routes)

export type MyRoute = CustRouteParam & RouteProps

// 使用keepalive
function withKeepAlive(render: (props: any) => React.ReactNode) {
    return function (props: any) {
        return <KeepAlive>{render(props)}</KeepAlive>
    }
}

// renderRoutes
export function renderRoutes(routes: MyRoute[]) {
    return routes.map((route, index) => {
        let RouteComp: React.ComponentType<MyRoute> = Route
        let render = route.render
            ? route.render
            : (props: any) => {
                const Component = route.component as React.ComponentType
                return <Suspense fallback='对不起。。。'><Component {...props} /></Suspense>
            }
        if (route.isCache) {
            render = withKeepAlive(render)
        }

        return <RouteComp
            key={index}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            render={(props) => render({ ...props, route } as any)}
        />

    })
}