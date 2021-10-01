import React, { useCallback } from 'react'
import { makeStyles } from '@/theme/useThemeStyle'
import NavBar from '@/layouts/NavBar'
import { List, InputItem, Toast } from 'antd-mobile'
import { createForm } from 'rc-form'
import { useHistory } from 'react-router'
import * as UserAPI from '@/services/User'

const useStyle = makeStyles(theme => ({
    root: {
        height: window.innerHeight + 'px',
        boxSizing: 'border-box',
        paddingTop: '36px'
    },
    page: {
        padding: '36px'
    },
    title: {
        fontSize: '18px',
        fontWeight: 600,
        color: theme.fc.text,
        textAlign: 'center'
    },
    input: {
        fontSize: '14px'
    },
    registBtn: {
        marginTop: '36px',
        width: '100%',
        height: '32px',
        lineHeight: '32px',
        borderRadius: '18px',
        backgroundColor: theme.fc.active,
        color: '#fff',
        textAlign: 'center'
    },
    login: {
        marginTop: '24px',
        color: theme.fc.text
    },
    a: {
        color: theme.fc.active,
        textAlign: 'center'
    }
}))

function Login({ form }: any) {
    const styles = useStyle()
    const { getFieldProps } = form
    const history = useHistory()

    const login = useCallback(async () => {
        try {
            const data = await form.validateFields()
            const user = await UserAPI.login(data as UserAPI.LoginParams)
            // 如果有user 那么登陆成功,异常让service给出提示
            if (Object.keys(user).length > 0) {

            }
        } catch (e: any) {
            if (e.errors) {
                const errmsg = Object.values(e.errors).map((field: any) => {
                    return field.errors.map((err: any) => err.message)
                }).join('')
                Toast.fail(errmsg)
            }
        }
    }, [])

    return <div style={styles.root} className='login-page'>
        {/* 导航 */}
        <NavBar title='登陆' />
        <div className='f-c' style={styles.page}>
            {/* 账号密码登陆 */}
            <div style={styles.title}>登陆</div>
            <List >
                <InputItem style={styles.input} {...getFieldProps('email', {
                    rules: [
                        { required: true, message: '邮箱不能为空!' }
                    ]
                })} placeholder="input your email" />
                <InputItem style={styles.input} {...getFieldProps('password', {
                    rules: [
                        { required: true, message: '密码不能为空!' }
                    ]
                })} placeholder="input your password" type='password' />
            </List>
            {/* 登陆按钮 */}
            <div style={styles.registBtn} onClick={login}>登陆</div>
            {/* 注册账号？ */}
            <div style={styles.login} className='f-r j-center'>
                <span>还没有账号？</span>
                <a style={styles.a} onClick={() => history.push('/register')}>去注册</a>
            </div>
        </div>
    </div>
}

export default createForm()(Login)