import React, { useCallback, useMemo, useRef, useEffect } from 'react'
import * as ArticleAPI from '@/services/Articles'
import PullList from '@/components/pull-list'
import { useHistory } from 'react-router-dom'
import { Comment as CommentIcon } from '@material-ui/icons'
import FavouriteBtn from './FavouriteBtn'
import { Toast } from 'antd-mobile'
import { makeStyles } from '@/theme/useThemeStyle'
import ErrImg from '@/components/error-image'

type Props = {
    offset?: boolean,
    query: ArticleAPI.GetArticlesParam
}

const useStyle = makeStyles((theme: Theme) => ({
    contentContainerStyle: {
        boxSizing: 'border-box'
    },
    root: {
        backgroundColor: theme.bg.pri,
        padding: '16px',
        borderBottom: '1px solid rgba(57, 60, 67, 0.08)'
    },
    userImg: {
        display: 'inline-block',
        marginRight: '14px'
    },
    actionBar: {
        marginTop: '16px'
    },
    icon1: {
        fontSize: '14px',
        color: theme.fc.desc,
        marginRight: '40px'
    },
    guanzhu: {
        color: theme.fc.header
    }
}))


export default function ArticleList({ query, offset }: Props) {
    const styles = useStyle()

    const formRef = useRef<any>(null)

    const history = useHistory()

    useEffect(() => {
        formRef.current.getData(0)
    }, [query])

    const getData = useCallback(async pagination => await ArticleAPI.getArticles({
        ...pagination,
        ...query
    }), [query])

    const onRowClick = useCallback((data: ArticleAPI.Article) => {
        if (!data.slug) {
            return Toast.info('没有slug')
        }
        localStorage.removeItem('gotoComment')
        history.push(`/posts/${data.slug}`)
    }, [])

    const renderRow = useMemo(() => (data: ArticleAPI.Article, sectionID: any, rowID: any) => {
        return <div className='article-row-item' style={styles.root} onClick={() => onRowClick(data)}>
            {/* 头部 */}
            <div className='f-r j-between a-center'>
                <div className='f-r a-center' onClick={(e) => {
                    e.stopPropagation()
                    history.push(`/profile/${data?.author?.username}`)
                }}>
                    {/* 头像 */}
                    <ErrImg className='user-img' src={data?.author?.image} style={styles.userImg} />
                    <div>
                        <div className='header'>{data?.author?.username || '示例昵称'}</div>
                        <div className='secd'>{data.updateAt || '1小时前'}</div>
                    </div>
                </div>
                {/* 关注按钮 */}
                <div style={styles.guanzhu}>关注</div>
            </div>
            {/* 标题 */}
            <div className='title'>
                {data.title || '我是一个标题'}
            </div>
            {/* 正文 */}
            <div className='content hidecontent'>
                {data.description || defaultContent}
            </div>
            {/* 评论/点赞 */}
            <div className='f-r j-end' style={styles.actionBar}>
                <div className='f-r j-center a-center' onClick={e => {
                    e.stopPropagation()
                    onRowClick(data)
                    localStorage.setItem('gotoComment', '1')
                }}><CommentIcon style={styles.icon1} /></div>
                <FavouriteBtn {...data} />
            </div>
        </div>
    }, [styles])

    const renderSeparator = useMemo(() => (sectionID: any, rowID: any) => {
        return <div
            key={`${sectionID}-${rowID}`}
            className='article-list-gap'
        />
    }, [])

    return <div>
        <PullList
            apiRef={formRef}
            offset={offset}
            getDataMethod={getData}
            renderRow={renderRow}
            renderSeparator={renderSeparator}
            contentContainerStyle={styles.contentContainerStyle}
        />
    </div>
}

const defaultContent = '你知道吗，每刷新1次，你的页面就变成了新的，刷新2次，就会变2次'
