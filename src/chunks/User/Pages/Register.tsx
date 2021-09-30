import React from 'react'
import { makeStyles } from '@/theme/useThemeStyle'
import NavBar from '@/layouts/NavBar'
import { List, InputItem } from 'antd-mobile'
import { createForm } from 'rc-form'

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
}))

function Register({ form }: any) {
    const styles = useStyle()
    const { getFieldProps } = form
    return <div style={styles.root}>
        {/* 导航 */}
        <NavBar title='注册账号' />
        <div className='f-c' style={styles.page}>
            {/* 账号密码登陆 */}
            <div style={styles.title}>注册账号</div>
            <List>
                <InputItem {...getFieldProps('name', {})} placeholder="input your name" />
                <InputItem {...getFieldProps('email', {})} placeholder="input your email" />
                <InputItem {...getFieldProps('password', {})} placeholder="input your password" />
            </List>
            {/* 登陆按钮 */}
            {/* 注册账号？ */}
            <div>
                <span>已有账号？</span>
                <a href="">去登陆</a>
            </div>
        </div>
    </div>
}

export default createForm()(Register)