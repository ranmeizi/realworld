import React from 'react'
import { makeStyles } from '@/theme/useThemeStyle'
import NavBar from '@/layouts/NavBar'
import { List, InputItem } from 'antd-mobile'
import { createForm } from 'rc-form'
import { useHistory } from 'react-router'

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

function Register({ form }: any) {
    const styles = useStyle()
    const { getFieldProps } = form
    const history = useHistory()
    return <div style={styles.root} className='login-page'>
        {/* 导航 */}
        <NavBar title='注册账号' />
        <div className='f-c' style={styles.page}>
            {/* 账号密码登陆 */}
            <div style={styles.title}>注册账号</div>
            <List >
                <InputItem style={styles.input} {...getFieldProps('name', {})} placeholder="input your name" />
                <InputItem style={styles.input} {...getFieldProps('email', {})} placeholder="input your email" />
                <InputItem style={styles.input} {...getFieldProps('password', {})} placeholder="input your password" />
            </List>
            {/* 登陆按钮 */}
            <div style={styles.registBtn}>注册</div>
            {/* 注册账号？ */}
            <div style={styles.login} className='f-r j-center'>
                <span>已有账号？</span>
                <a style={styles.a} onClick={() => history.push('/login')}>去登陆</a>
            </div>
        </div>
    </div>
}

export default createForm()(Register)