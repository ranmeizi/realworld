import React from 'react'
import ArticleList from '../../components/List'

const homeQuery = {}

function Home() {
    return <div className='rvt-tabview'>
        <ArticleList query={homeQuery} offset />
    </div>
}

export default Home
