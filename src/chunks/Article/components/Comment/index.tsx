import React, { useState, useEffect } from 'react'
import { Icon } from 'antd-mobile'
import * as ArticleAPI from '@/services/Articles'
import { makeStyles } from '@/theme/useThemeStyle'
import ErrImg from '@/components/error-image'
import { useHistory } from 'react-router'

type CommontsProps = {
    slug: string
}

const useStyle = makeStyles(theme => ({
    root: {
        marginTop: '16px'
    },
    jiange: {
        height: '8px',
        width: '100vw',
        margin: '0 -16px',
        backgroundColor: theme.bg.sec
    },
    divider: {
        width: '100vw',
        margin: '0 -16px',
    },
    header: {
        height: '28px',
        lineHeight: '28px',
        backgroundColor: 'rgba(0,0,0,0.15)',
        width: '100vw',
        margin: '0 -16px',
        padding: '0 16px',
        fontWeight: 600,
        color: theme.fc.header
    },
    rowItem: {
        padding: '16px 0'
    },
    avatar: {
        marginRight: '8px'
    },
    uname: {
        color: theme.fc.header,
        fontSize: '14px',
        fontWeight: 800
    },
    body: {
        fontSize: '12px',
        marginTop: '8px',
        color: theme.fc.text
    }
}))

export default function ({ slug }: CommontsProps) {
    const styles = useStyle()
    const [comments, setComments] = useState<ArticleAPI.Comment[]>([])
    useEffect(() => {
        getData()
    }, [])
    async function getData() {
        setComments(await ArticleAPI.getComments({ slug }))
    }
    return <div style={styles.root}>
        <div style={styles.jiange}></div>
        <div style={styles.header}>评论({comments.length})</div>
        {
            comments.length > 0
                ? <div>
                    {
                        comments.map(item => <React.Fragment>
                            <ItemRow data={item} />
                            <div className='divider' style={styles.divider}></div>
                        </React.Fragment>
                        )
                    }
                </div>
                : <Empty />
        }
    </div>
}

function ItemRow({ data, username }: any) {
    const styles = useStyle()
    const history = useHistory()
    return <div className='f-r' style={styles.rowItem}>
        {/* 左边头像 */}
        <div style={styles.avatar}>
            <ErrImg src={data?.author?.image} className='user-img' alt="" onClick={(e: any) => {
                e.stopPropagation()
                history.push(`/profile/${data?.author?.username}`)
            }} />
        </div>
        {/* 右边是内容 */}
        <div>
            {/* 昵称 */}
            <div style={styles.uname} onClick={(e: any) => {
                e.stopPropagation()
                history.push(`/profile/${data?.author?.username}`)
            }} >{data?.author?.username}</div>
            {/* 内容 */}
            <div style={styles.body}>{data.body}</div>
        </div>
    </div>
}

function Empty() {
    return <div>
        内容为空
    </div>
}