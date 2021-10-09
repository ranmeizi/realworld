import React, { useState, useMemo, useCallback, useEffect } from 'react'
import ArticleList from '../../components/List'
import { Tabs } from 'antd-mobile'
import * as ArticleAPI from '@/services/Articles'
import { makeStyles } from '@/theme/useThemeStyle'
import { Clear as ClearIcon } from '@material-ui/icons';
import { useHistory } from 'react-router'
import { ClickAuthDiv } from '@/components/auth'

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
    },
    writeBtn: {
        position: 'fixed',
        bottom: '64px',
        right: '8px',
        height: '48px',
        width: '48px',
        fontSize: '24px',
        borderRadius: '24px',
        color: '#fff',
        backgroundImage: ' linear-gradient(0deg, rgb(255,91,91),rgb(255,131,101))',
        transform: 'rotateZ(-45deg)'
    }
}))

function Home() {
    const styles = useStyle()
    const [tags, setTags] = useState<string[]>([])
    const [query, setQuery] = useState<ArticleAPI.GetArticlesParam>({})
    const history = useHistory()
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
        {/* 写文章按钮 */}
        <ClickAuthDiv className='f-r j-center a-center' style={styles.writeBtn} onClick={() => history.push('/edit')}>
            <ClearIcon />
        </ClickAuthDiv>
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
