import React, { useState, useEffect } from 'react'
import { makeStyles } from '@/theme/useThemeStyle';
import * as ArticleAPI from '@/services/Articles'
import { Toast } from 'antd-mobile'

const useStyle = makeStyles(theme => ({
    btn: {
        fontSize: '12px',
        color: '#56ba68',
        height: '24px',
        lineHeight: '24px',
        padding: '0 8px',
        borderRadius: '12px',
        border: `1px solid #56ba68`,
        transition: '0.3s'
    },
    activeBtn: {
        fontSize: '12px',
        color: '#fff',
        height: '24px',
        lineHeight: '24px',
        padding: '0 8px',
        borderRadius: '12px',
        backgroundColor: ' #56ba68',
        border: `1px solid #56ba68`,
        transition: '0.3s'
    },
}))

function FollowBtn({
    following,
    username
}: any) {
    const styles = useStyle()

    const [f, setF] = useState(following)

    console.log(f, following)

    useEffect(() => {
        setF(following)
    }, [following])

    async function follow() {
        if ('following' in await ArticleAPI.follow({ username })) {
            setF(true)
            Toast.info('关注成功')
        } else {
            Toast.info('关注失败')
        }
    }

    async function unfollow() {
        if ('following' in await ArticleAPI.unfollow({ username })) {
            setF(false)
            Toast.info('取消关注成功')
        } else {
            Toast.info('取消关注失败')
        }
    }

    return <div>
        {
            f
                ? <div style={styles.activeBtn} onClick={unfollow}>已关注</div>
                : <div style={styles.btn} onClick={follow}>关注</div>
        }
    </div>
}

export default FollowBtn