import React, { useCallback, useMemo } from 'react'
import * as ArticleAPI from '@/services/Articles'
import PullList from '@/components/pull-list'
import defaultImg from '@/assets/images/default.jpeg'
import { useHistory } from 'react-router-dom'
import { Comment as CommentIcon, ThumbUpAlt as ThumbUpAltIcon } from '@material-ui/icons'

type Props = {
    offset?: boolean,
    query: ArticleAPI.GetArticlesParam
}

const styles: JssSheet = {
    contentContainerStyle: {
        padding: '0 16px',
        boxSizing: 'border-box'
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

    const onRowClick = useCallback((rowData) => {
        console.log(rowData)
        history.push('/posts/1')
    }, [])

    const renderRow = useMemo(() => (rowData: any, sectionID: any, rowID: any) => {
        return <div className='article-row-item' onClick={() => onRowClick(rowData)}>
            {/* 头部 */}
            <div className='f-r j-between'>
                <div className='f-r a-center'>
                    {/* 头像 */}
                    <img className='user-img' src={defaultImg} alt="用户头像" style={styles.userImg} />
                    <div>
                        <div className='header'>昵称示例</div>
                        <div className='secd'>1小时前</div>
                    </div>
                </div>
                {/* 关注按钮 */}
                <div>关注</div>
            </div>
            {/* 正文 */}
            <div className='content'>
                我管你有多少我就显示三行我管你有多少我就显示三行我管你有多少我就显示三行我管你有多少我就显示三行我管你有多少我就显示三行我管你有多少我就显示三行我管你有多少我就显示三行
                我管你有多少我就显示三行我管你有多少我就显示三行我管你有多少我就显示三行我管你有多少我就显示三行我管你有多少我就显示三行我管你有多少我就显示三行我管你有多少我就显示三行
                我管你有多少我就显示三行我管你有多少我就显示三行我管你有多少我就显示三行我管你有多少我就显示三行我管你有多少我就显示三行我管你有多少我就显示三行我管你有多少我就显示三行我管你有多少我就显示三行
                我管你有多少我就显示三行我管你有多少我就显示三行我管你有多少我就显示三行我管你有多少我就显示三行我管你有多少我就显示三行我管你有多少我就显示三行
                我管你有多少我就显示三行我管你有多少我就显示三行我管你有多少我就显示三行我管你有多少我就显示三行我管你有多少我就显示三行我管你有多少我就显示三行
            </div>
            {/* 评论/点赞 */}
            <div className='f-r j-end' style={styles.actionBar}>
                <div className='f-r j-center a-center' onClick={e => e.stopPropagation()}><CommentIcon style={styles.icon1} /></div>
                <div className='f-r j-center a-center' onClick={e => e.stopPropagation()}><ThumbUpAltIcon style={styles.icon2} />9999</div>
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

function renderRow() {

}
