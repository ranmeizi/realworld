import React, { useCallback, useState, useMemo } from 'react'
import ArticleList from '../../components/List'
import { Tabs } from 'antd-mobile'
import { makeStyles } from '@/theme/useThemeStyle'
import * as ArticleAPI from '@/services/Articles'
import NavBar from '@/layouts/NavBar'
import { store } from '@/redux/store'

const useStyle = makeStyles(theme => ({
    root: {
        paddingTop: '36px'
    },
    tabBarTextStyle: {
        padding: 0,
        height: '36px',
        lineHeight: '36px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'block',
        textAlign: 'center',
        fontSize: '14px'
    }
}))

export default function (props: any) {
    const styles = useStyle()
    return <div style={styles.root}>
        {/* 头 */}
        <NavBar title='我的文章' />
        <UserArticle username={store.getState().app.uinfo.username} type={props.match.params.type} />
    </div>
}

type UserArticleType = {
    username: string,
    type?: string
}

export function UserArticle({
    username,
    type = '0'
}: UserArticleType) {
    const styles = useStyle()

    const [query, setQuery] = useState<ArticleAPI.GetArticlesParam>(
        type === '0'
            ? {
                author: username
            }
            : {
                favorited: username
            }
    )

    const onTabChange = useCallback(({ title }) => {
        // tab 改变 修改query
        if (title === '我的文章') {
            setQuery({
                author: username
            })
        } else if (title === '我喜欢的文章') {
            setQuery({
                favorited: username
            })
        }
    }, [])

    return <div>
        {/* 我的文章 */}
        {/* 点赞文章 */}
        <Tabs tabs={[{ title: '我的文章' }, { title: '我喜欢的文章' },]}
            tabBarTextStyle={styles.tabBarTextStyle}
            initialPage={Number(type)}
            onChange={onTabChange}
        ></Tabs>
        <ArticleList query={query} offset />
    </div>
}