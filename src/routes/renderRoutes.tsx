import React, { useEffect, useState, Suspense } from 'react'
import { RouteProps, Switch, Route, withRouter } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { KeepAlive } from 'react-activation'

interface CustRouteParam {
    isAuth?: boolean, // 是否需要校验路由权限
    isCache?: boolean, // 是否需要缓存
    isTransition?: boolean, // 是否使用过度动画
    childRoutes?: MyRoute[]
}

export default function renderRoutes(routes: MyRoute[], extraProps = {}, switchProps = {}) {
    return <Switch {...switchProps} >{
        routes.map(({
            component,
            ...route
        }, index) => {
            let RouteComp: React.ComponentType<MyRoute> = Route

            let render = route.render
                ? (props: any) => route.render!({ ...props, ...extraProps, route })
                : (props: any) => {
                    const Component = component as React.ComponentType
                    return <Component {...props} {...extraProps} route={route} />
                }
            if (route.isCache) {
                render = withKeepAlive(render)
            }
            if (route.isTransition) {
                render = withTransition(render)
            }

            // 是否需要校验权限
            // if (route.isAuth) {
            //     render = withAuth(render)
            // }

            return <RouteComp
                key={index}
                path={route.path}
                exact={route.exact}
                strict={route.strict}
                render={render}
            />
        })}
    </Switch>
}

export type MyRoute = CustRouteParam & RouteProps

// 检查是否需要权限校验
function withAuth(render: (props: any) => React.ReactNode) {
    return function (props: any) {
        return render(props)
    }
}

function withKeepAlive(render: (props: any) => React.ReactNode) {
    console.log('dssds', KeepAlive)
    return function (props: any) {
        return <KeepAlive>{render(props)}</KeepAlive>
    }
}


// export function withTransition(Component: any) {
//     return function (props: any) {
//         const [inProp, setInProp] = useState(false);
//         useEffect(() => {
//             setInProp(true)
//             return () => setInProp(false)
//         }, [])
//         return <CSSTransition in={inProp} timeout={500} classNames="fade" key={location.pathname}>
//             <Component {...props} />
//         </CSSTransition>
//     }
// }
const Transition = withRouter(function (props: any) {
    const [inProp, setInProp] = useState(false);
    useEffect(() => {
        console.log('mount', props)
        setInProp(true)
        return () => setInProp(false)
    }, [])
    return <CSSTransition in={inProp} timeout={500} classNames="fade" key={location.pathname}>
        <Suspense fallback={<div>对不起</div>}>
            {props.children}
        </Suspense>
    </CSSTransition>

})

function withTransition(render: (props: any) => React.ReactNode) {
    return function (props: any) {
        return <Transition>
            {render(props)}
        </Transition>
    }
}
