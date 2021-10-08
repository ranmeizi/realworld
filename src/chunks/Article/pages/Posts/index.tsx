import React, { useState, useEffect, useCallback, useMemo } from 'react'
import * as ArticleAPI from '@/services/Articles'
import NavBar from '@/layouts/NavBar'
import { makeStyles } from '@/theme/useThemeStyle'
import UnderBar from '../../components/UnderBar'
import ErrImg from '@/components/error-image'
import Commonts from '../../components/Comment'
import { useHistory } from 'react-router'

const useStyle = makeStyles(theme => ({
    root: {
        height: window.innerHeight + 'px',
        backgroundColor: theme.bg.pri,
        overflowY: 'scroll'
    },
    userImg: {
        display: 'inline-block',
        marginRight: '14px'
    },
    article: {
        padding: '0 16px',
        paddingBottom: '56px'
    },
    articleContent: {
        marginTop: '24px'
    },
    guanzhu: {
        color: theme.fc.header
    }
}))

export default function Posts(props: any) {

    const styles = useStyle()

    const history = useHistory()

    const [postData, setPostData] = useState<Partial<ArticleAPI.Article>>({})
    const [comments, setComments] = useState<ArticleAPI.Comment[]>([])

    const commentCount = useMemo(() => comments.length, [comments])

    useEffect(() => {
        getData()
        getComments()
    }, [])

    const showPost = useMemo(() => {
        return Object.keys(postData).length > 0
    }, [postData])

    const getData = useCallback(async () => {
        const slug = props?.match?.params?.slug
        slug && setPostData(await ArticleAPI.getArticleDetail({ slug }))
    }, [])

    const getComments = useCallback(async () => {
        const slug = props?.match?.params?.slug
        slug && setComments(await ArticleAPI.getComments({ slug }))
    }, [])

    return <div className='rvt-headerview article-detail' style={styles.root}>
        {/* 导航 */}
        <NavBar />
        {
            showPost
                ? <div style={styles.article}>
                    {/* 标题 */}
                    <div className='title'>
                        {postData.title}
                    </div>
                    <div className='f-r j-between a-center'>
                        <div className='f-r a-center'>
                            {/* 头像 */}
                            <ErrImg className='user-img' src={postData?.author?.image} style={styles.userImg} onClick={(e: any) => {
                                e.stopPropagation()
                                history.push(`/profile/${postData?.author?.username}`)
                            }} />
                            <div>
                                <div className='header' onClick={(e: any) => {
                                    e.stopPropagation()
                                    history.push(`/profile/${postData?.author?.username}`)
                                }} >{postData?.author?.username || '示例昵称'}</div>
                                <div className='secd'>{postData.updateAt || '1小时前'}</div>
                            </div>
                        </div>
                        {/* 关注按钮 */}
                        <div style={styles.guanzhu}>关注</div>
                    </div>
                    {/* 内容 */}
                    <div className='content' style={styles.articleContent}>
                        {postData.body}
                    </div>
                    {/* 评论 */}
                    <div>
                        <Commonts comments={comments} slug={props?.match?.params?.slug} updateComments={getComments}/>
                    </div>
                    <UnderBar data={postData} commentCount={commentCount} updateComments={getComments} />
                </div>
                : null
        }

        {/* 底部 */}
    </div>
}
