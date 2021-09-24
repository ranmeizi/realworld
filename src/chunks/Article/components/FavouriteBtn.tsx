import React, { useState, useCallback, useRef } from 'react'
import { ThumbUpAlt as ThumbUpAltIcon } from '@material-ui/icons'
import { Toast } from 'antd-mobile'
import * as ArticleAPI from '@/services/Articles'
import useStyle from '@/theme/useThemeStyle'

const styleSheet = (theme: Theme): JssSheet => ({
    favouriteStyle: {
        fontSize: '14px',
        color: theme.fc.active
    },
    unFavouriteStyle: {
        fontSize: '14px',
        color: theme.fc.desc
    }
})

export default function Favourite({ favoritesCount = 0, favorited = false, slug = '' }) {

    const styles = useStyle(styleSheet)

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

    return <div onClick={onClick} style={isFav ? styles.favouriteStyle : styles.unFavouriteStyle}><ThumbUpAltIcon style={{ fontSize: '14px' }} /> {favoritesCount}</div>
}
