
import React, { useState, useEffect, useCallback } from 'react'
import { Tabs } from 'antd-mobile'
import { makeStyles } from '@/theme/useThemeStyle'
import * as ArticleAPI from '@/services/Articles'
import ArticleList from '../../components/List'
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons'
import viteSvg from '@/favicon.svg'
import maoboliImg from '@/assets/images/maoboli.jpeg'
import { useHistory } from 'react-router'
import ErrImg from '@/components/error-image'

const useStyle = makeStyles(theme => ({
    header: {
        position: 'relative',
        height: '20vh',
        backgroundImage: `url(${maoboliImg})`,
        backgroundSize: 'cover'
    },
    backBtn: {
        position: 'absolute',
        fontSize: '18px',
        top: '16px',
        left: '16px',
        color: '#fff'
    },
    viteImg: {
        height: '50%',
        objectFit: 'contain'
    },
    profileDiv: {
        padding: '16px',
        backgroundColor: theme.bg.pri,
        position: 'relative'
    },
    avatar: {
        boxSizing: 'border-box',
        border: `3px solid ${theme.bg.pri}`,
        position: 'absolute',
        top: '-32px',
        left: '16px'
    },
    editBtn: {
        fontSize: '12px',
        color: '#56ba68',
        height: '24px',
        lineHeight: '24px',
        padding: '0 8px',
        borderRadius: '12px',
        border: `1px solid #56ba68`
    },
    username: {
        fontSize: '18px',
        color: theme.fc.header,
        marginBottom: '6px'
    },
    bio: {
        fontSize: '14px',
        color: theme.fc.text
    },
    tabBarTextStyle: {
        padding: 0,
        height: '36px',
        lineHeight: '36px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'block',
        textAlign: 'center',
        fontSize: '14px'
    }
}))

export default function (props: any) {
    const styles = useStyle()
    const history = useHistory()
    const [profile, setProfile] = useState<ArticleAPI.Profile | Record<string, undefined>>({})
    console.log(props.match.params.username)
    const [query, setQuery] = useState<ArticleAPI.GetArticlesParam>({
        author: props.match.params.username
    })

    useEffect(() => {
        getData()
    }, [])

    const getData = useCallback(async () => {
        setProfile(await ArticleAPI.getProfile({ username: props.match.params.username }))
    }, [])

    const onTabChange = useCallback(({ title }) => {
        // tab 改变 修改query
        if (title === '我的文章') {
            setQuery({
                author: props.match.params.username
            })
        } else if (title === '我喜欢的文章') {
            setQuery({
                favorited: props.match.params.username
            })
        }
    }, [])

    return <div>
        {/* 背景 */}
        <div style={styles.header} className='f-r j-center a-center'>
            {/* 返回按钮 */}
            <ArrowBackIcon style={styles.backBtn} onClick={history.goBack} />
            <img style={styles.viteImg} src={viteSvg} />
        </div>
        {/* 个人头像 */}
        <div style={styles.profileDiv}>
            {/* 头像 */}
            <ErrImg className='user-img lg' style={styles.avatar} src={profile.image} />
            {/* 关注/修改资料 */}
            <div className='f-r j-end'>
                <div style={styles.editBtn}>编辑资料</div>
            </div>
            {/* 名/简介 */}
            <div>
                <div style={styles.username}>{profile.username || '...'}</div>
                <div style={styles.bio}>{profile.bio || '暂无简介'}</div>
            </div>
        </div>
        {/* 文章 */}
        <div>
            {/* 我的文章 */}
            {/* 点赞文章 */}
            <Tabs tabs={[{ title: '我的文章' }, { title: '我喜欢的文章' },]}
                tabBarTextStyle={styles.tabBarTextStyle}
                initialPage={0}
                onChange={onTabChange}
            ></Tabs>
            <ArticleList query={query} offset />
        </div>
    </div>
}