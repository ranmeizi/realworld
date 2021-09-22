import React, { useState, useEffect, useCallback, useMemo } from 'react'
import * as ArticleAPI from '@/services/Articles'
import NavBar from '@/layouts/NavBar'
import defaultImg from '@/assets/images/default.jpeg'

const styles: JssSheet = {
    userImg: {
        display: 'inline-block',
        marginRight: '14px'
    }
}

export default function Posts(props: any) {
    const [postData, setPostData] = useState<Partial<ArticleAPI.Article>>({})
    useEffect(() => {
        getData()
    }, [])

    const showPost = useMemo(() => {
        return Object.keys(postData).length > 0
    }, [postData])

    const getData = useCallback(async () => {
        const slug = props?.match?.params?.slug
        slug && setPostData(await ArticleAPI.getArticleDetail({ slug }))
    }, [])
    return <div className='rvt-headerview article-detail' style={{ height: '100vh' }}>
        {/* 导航 */}
        <NavBar />
        {
            showPost
                ? <div>
                    <div className='f-r j-between'>
                        <div className='f-r a-center'>
                            {/* 头像 */}
                            <img className='user-img' src={postData?.author?.image || defaultImg} alt="用户头像" style={styles.userImg} />
                            <div>
                                <div className='header'>{postData?.author?.username || '示例昵称'}</div>
                                <div className='secd'>{postData.updateAt || '1小时前'}</div>
                            </div>
                        </div>
                        {/* 关注按钮 */}
                        <div>关注</div>
                    </div>
                    {/* 标题 */}
                    <div>
                        {postData.title}
                    </div>
                    {/* 内容 */}
                    <div>
                        {postData.body}
                    </div>
                    {/* 评论 */}
                </div>
                : null
        }

        {/* 底部 */}
    </div>
}
