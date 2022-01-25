import React, { useState, useCallback, useEffect } from 'react'
import { ThumbUpAlt as ThumbUpAltIcon } from '@material-ui/icons'
import { Toast } from 'antd-mobile'
import * as ArticleAPI from '@/services/Articles'
import { makeStyles } from '@/theme/useThemeStyle'
import { ClickAuthDiv } from '@/components/auth'

const useStyle = makeStyles((theme: Theme) => ({
    favouriteStyle: {
        fontSize: '14px',
        color: theme.fc.active
    },
    unFavouriteStyle: {
        fontSize: '14px',
        color: theme.fc.desc
    }
}))

type FavouriteProps = {
    favoritesCount: number,
    favorited: boolean,
    slug: string
}

export default function Favourite({ favoritesCount = 0, favorited = false, slug = '' }: FavouriteProps) {

    const styles = useStyle()

    const [count, setCount] = useState(favoritesCount)
    const [isFav, setIsFav] = useState(favorited)

    useEffect(() => {
        setCount(favoritesCount)
    }, [favoritesCount])

    useEffect(() => {
        setIsFav(favorited)
    }, [favorited])

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

    return <ClickAuthDiv
        className='f-r a-center'
        onClick={onClick}
        style={isFav ? styles.favouriteStyle : styles.unFavouriteStyle}
    >
        <ThumbUpAltIcon style={{ fontSize: '14px', marginRight: '4px' }} /> {count}
    </ClickAuthDiv>
}
