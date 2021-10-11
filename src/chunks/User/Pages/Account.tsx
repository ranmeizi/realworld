import React from 'react'
import NavBar from '@/layouts/NavBar'
import { makeStyles } from '@/theme/useThemeStyle'
import { List, InputItem, TextareaItem, Toast } from 'antd-mobile'
import { createForm } from 'rc-form'
import { connect } from 'react-redux';
import * as UserAPI from '@/services/User'
import { useHistory } from 'react-router'

const useStyle = makeStyles(theme => ({
    root: {
        height: window.innerHeight + 'px',
        boxSizing: 'border-box',
        paddingTop: '36px',
        backgroundColor: theme.bg.sec
    },
    leftContent: {
        fontSize: '14px',
        color: theme.fc.desc
    },
    rightBtn: {
        fontSize: '14px',
        color: theme.fc.active
    },
    input: {
        fontSize: '14px'
    },
}))

function Account({
    uinfo,
    form
}: any) {
    const styles = useStyle()
    const { getFieldProps, getFieldValue } = form
    const history = useHistory()
    async function submit() {
        try {
            const data = await form.validateFields()

            if (await UserAPI.updateCurUser(data)) {
                Toast.success('修改成功', 3, () => history.goBack())
            }
        } catch (e: any) {
            if (e.errors) {
                const errmsg = Object.values(e.errors).map((field: any) => {
                    return field.errors.map((err: any) => err.message)
                }).join('')
                Toast.fail(errmsg)
            }
        }
    }
    return <div style={styles.root}>
        {/* 头 */}
        <NavBar leftContent={<div style={styles.leftContent}>编辑个人资料</div>} rightContent={<div style={styles.rightBtn} onClick={submit}>修改</div>} />
        <List className='fcList'>
            <InputItem style={styles.input} {...getFieldProps('username', {
                initialValue: uinfo.username,
                rules: [
                    { required: true, message: '用户名不能为空!' },
                    { max: 20, message: '用户名不能大于20字!' }
                ]
            })} placeholder="请输入用户名" >用户名</InputItem>
            <TextareaItem
                title='用户头像'
                {...getFieldProps('image', {
                    initialValue: uinfo.image
                })}
                rows={2}
                style={styles.input}
                placeholder="请输入用户头像url"
            />
            {/* 正文 */}
            <TextareaItem
                title='简介'
                rows={3}
                {...getFieldProps('bio', {
                    initialValue: uinfo.bio
                })}
                style={styles.input}
                placeholder="请输入简介"
            />
            <InputItem title='邮箱' style={styles.input} {...getFieldProps('email', {
                initialValue: uinfo.email,
                rules: [
                    { required: true, message: '邮箱不能为空!' }
                ]
            })} placeholder="请输入邮箱" >邮箱</InputItem>
            <InputItem title='密码' type='password' style={styles.input} {...getFieldProps('password', {
                rules: [
                    { required: true, message: '密码不能为空!' }
                ]
            })} placeholder="请输入密码" >密码</InputItem>
        </List>
    </div>
}
const mapStateToProps = (state: any) => ({
    uinfo: state.app.uinfo
})


export default createForm()(connect(mapStateToProps)(Account))
