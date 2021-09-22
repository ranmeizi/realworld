import React, { useState, useCallback, useRef } from 'react'
import { ThumbUpAlt as ThumbUpAltIcon } from '@material-ui/icons'
import { Toast } from 'antd-mobile'
import * as ArticleAPI from '@/services/Articles'

export default function Favourite({ favoritesCount = 0, favorited = false, slug = '' }) {
    const [count, setCount] = useState(favoritesCount)
    const [isFav, setIsFav] = useState(favorited)

    const onClick = useCallback(async (e) => {
        e.stopPropagation()
        if (isFav) {
            if (await ArticleAPI.unfavourite({ slug }) > 0) {
                setCount(count - 1)
                setIsFav(false)
            }
        } else {
            if (await ArticleAPI.favourite({ slug }) > 0) {
                Toast.info('点赞成功')
                setCount(count + 1)
                setIsFav(true)
            } else {
                Toast.info('点赞失败')
            }
        }
    }, [isFav])

    return <div onClick={onClick} style={{
        color: isFav ? 'red' : 'rgba(57, 60, 67, 0.56)',
        fontSize: '14px'
    }}><ThumbUpAltIcon style={{ fontSize: '14px' }} /> {favoritesCount}</div>
}
