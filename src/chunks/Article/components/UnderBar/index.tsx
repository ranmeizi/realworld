import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import FavouriteBtn from '../FavouriteBtn'
import { Share as ShareIcon, Comment as CommentIcon } from '@material-ui/icons'
import { makeStyles } from '@/theme/useThemeStyle'
import { TextareaItem, Toast } from 'antd-mobile'
import { ClickAuthDiv } from '@/components/auth'
import * as ArticleAPI from '@/services/Articles'
import { useUnactivate } from 'react-activation'

const useStyle = makeStyles((theme) => ({
    icon1: {
        fontSize: '14px',
        marginRight: '4px'
    },
    action: {
        flex: 1,
        boxSizing: 'border-box',
        paddingLeft: '16px'
    },
    publishBtn: {
        backgroundColor: theme.fc.active,
        height: '24px',
        lineHeight: '24px',
        padding: '0 16px',
        borderRadius: '12px',
        color: '#fff',
        fontSize: '12px'
    },
    mask: {
        height: window.innerHeight + 'px',
        width: '100vw',
        position: 'fixed',
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.15)'
    },
    commentBar: {
        position: 'fixed',
        boxSizing: 'border-box',
        bottom: 0,
        left: 0,
        zIndex: 3001,
        width: '100vw',
        padding: '8px 12px',
        backgroundColor: theme.bg.pri
    }
}))

export default function UnderBar({ data, updateComments, commentCount }: any) {
    const [write, setWrite] = useState(false)
    const styles = useStyle()
    return <div className='f-r a-center article-underbar'>
        {/* 说点什么吧 */}
        <ClickAuthDiv className='fake-input' onClick={() => setWrite(true)} >说点什么吧</ClickAuthDiv>
        <div className='f-r j-around a-center' style={styles.action}>
            {/* 评论 锚点 */}
            <div className='f-r'>
                <CommentIcon style={styles.icon1} />
                {commentCount}
            </div>
            {/* 点赞 */}
            <FavouriteBtn {...data} />
            {/* 分享 */}
            <div>
                <ShareIcon style={styles.icon1} onClick={shareClick} />
            </div>
            {
                write ? <CommentInput updateComments={updateComments} onMaskClose={() => setWrite(false)} {...data} /> : null
            }
        </div>
    </div>
}

function shareClick() {
    Toast.info('得要微信号分享,我再想想咋整')
}

// 评论样式
function CommentInput({
    onMaskClose,
    slug,
    updateComments
}: any) {
    const styles = useStyle()
    const [value, setValue] = useState<any>('')

    useUnactivate(() => {
        onMaskClose()
    })

    async function publishComment() {
        if (!value) {
            return
        }

        const rc = await ArticleAPI.publishComment({ slug, body: value })

        if (rc > 0) {
            Toast.success('发表成功')
            updateComments()
            onMaskClose()
        } else {
            Toast.fail('发表失败')
        }
    }
    return ReactDOM.createPortal(<div style={styles.mask} onClick={onMaskClose}>
        {/* 底下 */}
        <div style={styles.commentBar} onClick={e => e.stopPropagation()}>
            {/* 输入框 */}
            <TextareaItem value={value} onChange={setValue} rows={3} />
            {/* 按钮 */}
            <div className='f-r j-end' style={{ marginTop: '8px' }}>
                <div style={styles.publishBtn} onClick={publishComment}>
                    发表
                </div>
            </div>
        </div>
    </div>, document.body)
}