import RW from '@/utils/Request/rw'
import { Toast } from 'antd-mobile'
import { store } from '@/redux/store'
import * as appAction from '@/redux/actions/app'

export type User = {
    name: string,
    email: string,
    password: string,
    token: string,
    bio: string,
    image: string
}

export type LoginParams = Extract<User, 'email' | 'password'>
export type RegisterParams = Extract<User, 'name' | 'email' | 'password'>

// 登陆
export async function login({
    email,
    password
}: LoginParams): Promise<number> {
    try {
        const res = await RW.post('/users/login', { user: { email, password } }, { loading: true })
        if (res.data.user) {
            // 登陆成功 存放user到redux
            store.dispatch(appAction.setUinfo(res.data.user))
            // 清空history push到首页
            history.go(history.length)
            window.location.replace("/f/home")
        }
        return 1
    } catch (e: any) {
        if (e.response.data.errors) {
            const errmsg = Object.entries(e.response.data.errors).reduce((msgList: string[], [key, value]) => {
                return [...msgList, `${key}:${(value as string[]).join('')}`]
            }, []).join('\n')
            Toast.fail(errmsg)
        }
        return -1
    }
}

// 注册
export async function register({
    name,
    email,
    password
}: RegisterParams): Promise<User | {}> {
    try {
        const res = await RW.post('/users', {
            user: {
                name,
                email,
                password
            }
        })
        return res.data.user
    } catch (e) {
        return {}
    }
}

// 获取当前用户
export async function getCurUser(): Promise<User | {}> {
    try {
        const res = await RW.get('/user')
        return res.data.user
    } catch (e) {
        return {}
    }
}

// 获取个人页信息
export async function updateCurUser({
    name,
    email,
    bio,
    image,
    token
}: Partial<User>): Promise<User | {}> {
    try {
        const res = await RW.put('/user', {
            user: {
                name,
                email,
                bio,
                image,
                token
            }
        })
        return res.data.user
    } catch (e) {
        return {}
    }
}