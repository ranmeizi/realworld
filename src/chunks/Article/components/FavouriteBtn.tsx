import React, { useState, useCallback, useRef } from 'react'
import { ThumbUpAlt as ThumbUpAltIcon } from '@material-ui/icons'
import { debounce } from '@/utils'
import * as ArticleAPI from '@/services/Articles'

export default function Favourite({ favoritesCount = 0, favorited = false, slug = '' }) {
    const [count, setCount] = useState(favoritesCount)
    const [isFav, setIsFav] = useState(favorited)

    const onClick = useCallback((e) => {
        e.stopPropagation()
        setCount(isFav ? count - 1 : count + 1)
        setIsFav(!isFav)
        reqFav(isFav, slug)
    }, [isFav])

    return <div onClick={onClick} style={{
        color: isFav ? 'red' : 'rgba(57, 60, 67, 0.56)',
        fontSize: '14px'
    }}><ThumbUpAltIcon style={{ fontSize: '14px' }} /> {count}</div>
}

const reqFav = debounce((isFav, slug) => {
    if (isFav) {
        ArticleAPI.unfavourite({ slug })
    } else {
        ArticleAPI.favourite({ slug })
    }
}, 1000)
