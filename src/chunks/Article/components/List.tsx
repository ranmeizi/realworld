import React, { useCallback, useMemo } from 'react'
import * as ArticleAPI from '@/services/Articles'
import PullList from '@/components/pull-list'
import defaultImg from '@/assets/images/default.jpeg'
import { useHistory } from 'react-router-dom'
import { Comment as CommentIcon, ThumbUpAlt as ThumbUpAltIcon } from '@material-ui/icons'
import FavouriteBtn from './FavouriteBtn'
import { Toast } from 'antd-mobile'

type Props = {
    offset?: boolean,
    query: ArticleAPI.GetArticlesParam
}

const styles: JssSheet = {
    contentContainerStyle: {
        padding: '0 16px',
        boxSizing: 'border-box'
    },
    root: {
        padding: '16px 0',
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
        color: 'rgba(57, 60, 67, 0.56)',
        marginRight: '40px'
    },
    icon2: {
        fontSize: '14px',
        color: 'rgba(57, 60, 67, 0.56)'
    }
}

export default function ArticleList({ query, offset }: Props) {

    const history = useHistory()

    const getData = useCallback(async pagination => await ArticleAPI.getArticles({
        ...pagination,
        ...query
    }), [])

    const onRowClick = useCallback((data: ArticleAPI.Article) => {
        if (!data.slug) {
            return Toast.info('没有slug')
        }
        history.push(`/posts/${data.slug}`)
    }, [])

    const renderRow = useMemo(() => (data: ArticleAPI.Article, sectionID: any, rowID: any) => {
        return <div className='article-row-item' style={styles.root} onClick={() => onRowClick(data)}>
            {/* 头部 */}
            <div className='f-r j-between'>
                <div className='f-r a-center'>
                    {/* 头像 */}
                    <img className='user-img' src={data?.author?.image || defaultImg} alt="用户头像" style={styles.userImg} />
                    <div>
                        <div className='header'>{data?.author?.username || '示例昵称'}</div>
                        <div className='secd'>{data.updateAt || '1小时前'}</div>
                    </div>
                </div>
                {/* 关注按钮 */}
                <div>关注</div>
            </div>
            {/* 标题 */}
            <div className='title'>
                {data.title || '我是一个标题'}
            </div>
            {/* 正文 */}
            <div className='content'>
                {data.description || defaultContent}
            </div>
            {/* 评论/点赞 */}
            <div className='f-r j-end' style={styles.actionBar}>
                <div className='f-r j-center a-center' onClick={e => e.stopPropagation()}><CommentIcon style={styles.icon1} /></div>
                <FavouriteBtn {...data} />
            </div>
        </div>
    }, [])
    return <div>
        <PullList
            offset={offset}
            getDataMethod={getData}
            renderRow={renderRow}
            contentContainerStyle={styles.contentContainerStyle}
        />
    </div>
}

const defaultContent = '你知道吗，每刷新1次，你的页面就变成了新的，刷新2次，就会变2次'
