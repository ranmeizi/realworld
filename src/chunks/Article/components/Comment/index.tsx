import React from 'react'
import * as ArticleAPI from '@/services/Articles'
import { makeStyles } from '@/theme/useThemeStyle'
import ErrImg from '@/components/error-image'
import { useHistory } from 'react-router'
import { connect } from 'react-redux';
import { Modal, Toast } from 'antd-mobile'

type CommontsProps = {
    slug: string,
    comments: ArticleAPI.Comment[],
    uinfo: ArticleAPI.Author,
    updateComments: any
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
        height: '36px',
        lineHeight: '36px',
        backgroundColor: 'rgba(0,0,0,0.07)',
        width: window.innerWidth - 32 + 'px',
        margin: '0 -16px',
        padding: '0 16px',
        fontWeight: 600,
        color: theme.fc.header
    },
    rowItem: {
        padding: '16px 0',
        position: 'relative'
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
    },
    empty: {
        padding: '16px 0',
        color: theme.fc.text
    },
    delBtn: {
        color: theme.fc.active,
        position: 'absolute',
        right: '8px',
        top: '16px'
    }
}))

function Comments({ comments, uinfo, slug, updateComments }: CommontsProps) {
    const styles = useStyle()
    return <div style={styles.root}>
        <div style={styles.jiange}></div>
        <div style={styles.header}>评论({comments.length})</div>
        {
            comments.length > 0
                ? <div>
                    {
                        comments.map(item => <React.Fragment key={item.id}>
                            <ItemRow data={item} username={uinfo.username} slug={slug} updateComments={updateComments} />
                            <div className='divider' style={styles.divider}></div>
                        </React.Fragment>
                        )
                    }
                </div>
                : <Empty />
        }
    </div>
}

const mapStateToProps = (state: any) => ({
    uinfo: state.app.uinfo
})

export default connect(mapStateToProps)(Comments)

function ItemRow({ data, username, slug, updateComments }: any) {
    console.log(username)
    const styles = useStyle()
    const history = useHistory()

    function del() {
        Modal.alert('提示', '你要删除评论吗?', [
            { text: '算了', onPress: () => console.log('cancel'), style: 'default' },
            {
                text: '删除', onPress: async () => {
                    const rc = await ArticleAPI.delComment({ slug, id: data.id })
                    if (rc < 0) {
                        Toast.fail('删除失败')
                    } else {
                        Toast.success('删除成功')
                        updateComments()
                    }
                }
            },
        ])
    }

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
        {
            username === data?.author?.username
                ? <div style={styles.delBtn} onClick={del}>删除</div>
                : <div style={styles.delBtn}>关注</div>
        }
    </div>
}

function Empty() {
    const styles = useStyle()
    return <div style={styles.empty}>
        内容为空
    </div>
}