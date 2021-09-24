import React, { Suspense, useMemo, useEffect } from 'react'
import { RouteProps, Switch, Route, withRouter, matchPath, useHistory } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { KeepAlive, useAliveController } from 'react-activation'
import Loading from '@/components/loading'
import useForwardActivationControl from '@/utils/hooks/useForwardActivationControl'

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

// 这玩意只能用1级
function TransitionRoutes(props: any) {
    const routes: MyRoute[] = props.routes
    const location = props.location
    const history = props.history

    // 是否需要过渡动画
    const transitionKey = useMemo(() => {
        const route = routes.find(r => matchPath(location.pathname, r))
        return route?.isTransition
            ? route.path
            : 'notransition'
    }, [location.pathname])

    return <TransitionGroup
        className={'transition-group'}
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

export default withRouter(TransitionRoutes)

export type MyRoute = CustRouteParam & RouteProps

// 使用keepalive
function withKeepAlive(render: (props: any) => React.ReactNode) {
    return function (props: any) {
        return <ForwardAliveComponent {...props}>{render(props)}</ForwardAliveComponent>
    }
}

function ForwardAliveComponent(props: any) {
    const name = useMemo(() => {
        const url = props.match.url
        return url
    }, [])
    useForwardActivationControl({ name, match: props.match })
    return <KeepAlive id={name} >{props.children}</KeepAlive>
}


// renderRoutes
export function renderRoutes(routes: MyRoute[]) {
    return routes.map((route, index) => {
        const RouteComp: React.ComponentType<MyRoute> = Route
        let render = route.render
            ? route.render
            : (props: any) => {
                const Component = route.component as React.ComponentType
                return <Suspense fallback={<Loading />}><Component {...props} /></Suspense>
            }
        // 是否需要缓存
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