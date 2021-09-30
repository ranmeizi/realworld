import React, { useState, useMemo, useCallback, useEffect } from 'react'
import ArticleList from '../../components/List'
import { Tabs } from 'antd-mobile'
import * as ArticleAPI from '@/services/Articles'
import { makeStyles } from '@/theme/useThemeStyle'

const useStyle = makeStyles((theme) => ({
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

function Home() {
    const [tags, setTags] = useState<string[]>([])
    const [query, setQuery] = useState<ArticleAPI.GetArticlesParam>({})
    useEffect(() => {
        async function getData() {
            setTags(await ArticleAPI.getTags())
        }
        getData()
    }, [])

    const onTabChange = useCallback(({ title }) => {
        const tag = title === '全部' ? null : title
        setQuery({ ...query, tag })
    }, [query])

    return <div className='rvt-tabview'>
        {/* tag 切换 */}
        <div className='am-navbar'>
            <TagTabs tags={tags} onTabChange={onTabChange} />
        </div>
        {/* 文章列表 */}
        <div style={{ paddingTop: '36px', boxSizing: 'border-box' }}>
            <ArticleList query={query} offset />
        </div>
    </div>
}

export default Home

function TagTabs({ tags, onTabChange }: any) {
    const styles = useStyle()
    const tabs = useMemo(() => {
        return [
            { title: '全部' },
            ...tags.map((tag: string) => ({ title: tag }))
        ];
    }, [tags])
    return <Tabs tabs={tabs}
        tabBarTextStyle={styles.tabBarTextStyle}
        initialPage={0}
        onChange={onTabChange}
    ></Tabs>
}
