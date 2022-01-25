import React, { useCallback, useMemo } from "react";
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

type PermissionAreaOptions = {
    /* 权限码 */
    permission: string,
    /* 没权限时需要显示吗？ */
    show?: boolean,
    /* 点击时没有权限的提示语 */
    tips?: string
}

const permissionSelector = (state: any) => state.app.permission

// 按钮点击权限
export function withPermissionArea({
    permission,
    show = false,
    tips = '无权限'
}: PermissionAreaOptions) {
    return function (Component: React.ComponentType) {
        return React.forwardRef((
            { children, ...props }: React.PropsWithChildren<any>,
            ref
        ) => {
            const permissionList: string[] = useSelector(permissionSelector)

            // 是否有权限
            const hasPermission = useMemo(() => {
                return permissionList.includes(permission)
            }, [permissionList])

            // click拦截
            const click = useCallback(function (this: any, ...args) {
                if (!hasPermission) {
                    return alert(tips || '无权限')
                }
                // 如果绑定有onclick函数,那么触发
                props.onClick && props.onClick.apply(this, args)
            }, [props.onClick, hasPermission])

            // 是否显示元素
            const showEl = useMemo(() => {
                return show || hasPermission
            }, [hasPermission])

            return showEl ? <Component {...props} ref={ref} onClick={click}>{children}</Component> : null
        })
    }
}

type PermissionRouterOptions = {
    /* 权限码 */
    permission: string,
    /* 重定向地址 */
    redirect?: string
}

// 路由访问权限
export function withPermissionRouter({
    permission,
    redirect = '/403'
}: PermissionRouterOptions) {
    return function (Component: React.ComponentType) {
        return (props: any) => {
            const permissionList: string[] = useSelector(permissionSelector)

            // 是否有权限
            const hasPermission = useMemo(() => {
                return permissionList.includes(permission)
            }, [permissionList])
            console.log(hasPermission, 'dldk')
            return hasPermission ? <Component {...props} /> : <Redirect to={redirect} />
        }
    }
}
