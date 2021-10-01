import React from 'react'
import { makeStyles } from '@/theme/useThemeStyle'
import NavBar from '@/layouts/NavBar'
import RWImg from '@/assets/images/realworld.png'
import { useHistory } from 'react-router-dom'

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
    img: {
        flex: 1,
        objectFit: 'contain'
    },
    a: {
        color: theme.fc.active,
        textAlign: 'center'
    },
    registBtn: {
        marginTop: '36px',
        width: '100%',
        height: '32px',
        lineHeight: '32px',
        backgroundColor: '#56ba68',
        color: '#fff',
        textAlign: 'center'
    },
    login: {
        marginTop: '24px',
        color: theme.fc.text
    }
}))

export default function RealWorldLogin() {
    const styles = useStyle()
    const history = useHistory()
    return <div style={styles.root}>
        {/* 导航 */}
        <NavBar title='登陆/注册' />
        <div className='f-c' style={styles.page}>
            {/* 介绍realword */}
            <p style={styles.title}> RealWorld demo 的王</p>
            {/* 图片 */}
            <img style={styles.img} src={RWImg} alt="" />
            {/* git 地址 */}
            <a style={styles.a} href="https://github.com/gothinkster/realworld">Git地址：https://github.com/gothinkster/realworld</a>
            {/* 立即注册 */}
            <div style={styles.registBtn} onClick={() => history.push('/register')}>立即注册</div>
            {/* 登陆 */}
            <div style={styles.login} className='f-r j-center'>
                <span>已有realworld账号？</span>
                <a style={styles.a} onClick={() => history.push('/login')}>去登陆</a>
            </div>
        </div>
    </div>
}