import React from 'react';
import { List, Switch, Modal, Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AppActions from '@/redux/actions/app'
import { useHistory } from 'react-router';
import { makeStyles } from '@/theme/useThemeStyle';
import {
    GitHub as GitHubIcon,
    Edit as EditIcon,
    DescriptionTwoTone as DescriptionTwoToneIcon,
    GradeTwoTone as GradeTwoToneIcon,
    KeyboardArrowRight as KeyboardArrowRightIcon
} from '@material-ui/icons';
import { ClickAuthDiv } from '@/components/auth';
import defaultImg from '@/assets/images/default.jpeg'

const useStyle = makeStyles(theme => ({
    root: {

    },
    header: {
        position: 'relative',
        height: '50px',
        boxSizing: 'border-box',
        padding: '0 16px'
    },
    headerBg: {
        height: '80px',
        width: '120%',
        position: 'absolute',
        top: 0,
        left: '-10%',
        zIndex: 0,
        borderBottomLeftRadius: '50%',
        borderBottomRightRadius: '50%',
        backgroundImage: 'linear-gradient(to right,rgb(233,136,100) 10%, rgba(237,109,97) 90%'
    },
    headerIcon: {
        color: '#fff',
        fontSize: '18px'
    },
    card: {
        position: 'relative',
        flex: 1,
        margin: '0 16px',
        marginBottom: '16px',
        boxSizing: 'border-box',
        padding: '16px',
        backgroundColor: theme.bg.pri,
        borderRadius: '8px',
        boxShadow: '0 2px 4px 4px rgb(0 0 0 / 15%)'
    },
    avatar: {
        marginRight: '8px'
    },
    articleBtn: {
        flex: 1,
        color: theme.fc.desc
    },
    red: {
        color: theme.fc.active
    },
    yellow: {
        color: 'rgb(245,197,100)'
    }
}))

function Mine({
    uinfo,
    theme,
    setTheme,
    clearUinfo
}: any) {
    const styles = useStyle()

    const history = useHistory()

    function logout() {
        Modal.alert('退出登陆', '确定要退出登陆吗', [
            { text: '算了', onPress: () => console.log('cancel'), style: 'default' },
            {
                text: '确定', onPress: () => {
                    clearUinfo()
                    Toast.info('您已登出')
                }
            }
        ])
    }

    function navtoMyArticle(type: any) {
        history.push(`/myArticles/${type}`)
    }

    function navtoEdit() {
        history.push(`/edit`)
    }

    return <div className='f-c'>
        {/* 我的页面特殊header */}
        <div style={styles.headerBg}></div>
        <div className='f-r j-between a-center' style={styles.header}>
            <GitHubIcon style={styles.headerIcon} onClick={openGitee} />
            <ClickAuthDiv>
                <EditIcon style={styles.headerIcon} onClick={navtoEdit} />
            </ClickAuthDiv>
        </div>
        {/* 个人页卡片 */}
        <div className='mine-card ' style={styles.card}>
            <ClickAuthDiv className='f-r a-center' onClick={() => history.push(`/profile/${uinfo.username}`)}>
                {/* 头像 */}
                <img className='user-img' style={styles.avatar} src={uinfo.image || defaultImg} />
                {/* 名 和 啥的 */}
                <div>
                    <div className='header'>{uinfo.username || '点击登录'}</div>
                    <div className='secd'>real world demo 的神</div>
                </div>
            </ClickAuthDiv>
            <div className='divider'></div>
            <div className='f-r'>
                {/* 我的文章 */}
                <ClickAuthDiv onClick={() => navtoMyArticle(0)} style={styles.articleBtn} className='f-c a-center'>
                    <DescriptionTwoToneIcon style={styles.red} />
                    <div>我的文章</div>
                </ClickAuthDiv>
                {/* 我的收藏 */}
                <ClickAuthDiv onClick={() => navtoMyArticle(1)} style={styles.articleBtn} className='f-c a-center'>
                    <GradeTwoToneIcon style={styles.yellow} />
                    <div>我的收藏</div>
                </ClickAuthDiv>
            </div>
        </div>
        {/* 功能列表卡片 */}
        <div>
            <List.Item
                extra={<Switch
                    checked={theme === 'dark'}
                    onChange={(checked) => {
                        if (checked) {
                            setTheme('dark')
                        } else {
                            setTheme('light')
                        }
                    }}
                />}
            >深色模式</List.Item>
            {
                uinfo.token
                    ? <List.Item extra={<KeyboardArrowRightIcon />} onClick={logout}>退出当前账号</List.Item>
                    : null
            }

        </div>
    </div>
}

const mapStateToProps = (state: any) => ({
    uinfo: state.app.uinfo,
    theme: state.app.theme
})

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    setTheme: AppActions.setTheme,
    clearUinfo: AppActions.clearUinfo
}, dispatch)

function openGitee() {
    window.open('https://gitee.com/boboanzuiniubi/react-vite-template', '_blank')
}

export default connect(mapStateToProps, mapDispatchToProps)(Mine)