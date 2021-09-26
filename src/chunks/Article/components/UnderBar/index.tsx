import React from 'react'
import FavouriteBtn from '../FavouriteBtn'
import { Share as ShareIcon, Comment as CommentIcon } from '@material-ui/icons'
import { makeStyles } from '@/theme/useThemeStyle'
import { Toast } from 'antd-mobile'

const useStyle = makeStyles((theme) => ({
    icon1: {
        fontSize: '14px',
        marginRight: '4px'
    },
    action: {
        flex: 1,
        boxSizing: 'border-box',
        paddingLeft: '16px'
    }
}))

export default function UnderBar({ data }: any) {
    const styles = useStyle()
    return <div className='f-r a-center article-underbar'>
        {/* 说点什么吧 */}
        <div className='fake-input' >说点什么吧</div>
        <div className='f-r j-around a-center' style={styles.action}>
            {/* 评论 锚点 */}
            <div className='f-r'>
                <CommentIcon style={styles.icon1} />
                0
            </div>
            {/* 点赞 */}
            <FavouriteBtn {...data} />
            {/* 分享 */}
            <div>
                <ShareIcon style={styles.icon1} onClick={shareClick} />
            </div>
        </div>
    </div>
}

function shareClick() {
    Toast.info('得要微信号分享')
}