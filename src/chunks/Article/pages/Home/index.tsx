import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return <div style={{ height: '100%', background: '#ca112d' }}>
        <p>我是首页</p>
        <input type="text" /><Link to='/posts/1'>去看文章</Link>
    </div>
}

export default Home
