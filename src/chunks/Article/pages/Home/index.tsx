import React from 'react'
import ArticleList from '../../components/List'

const homeQuery = {}

function Home() {
    return <div className='rvt-tabview'>
        <div>我是首页</div>
        <ArticleList query={homeQuery} offset />
    </div>
}

export default Home
