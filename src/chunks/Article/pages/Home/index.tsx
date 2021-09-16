import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return <div className='rvt-tabview' style={{ background: '#ca112d' }}>
        <div>我是首页</div>
        <input type="text" /><Link to='/posts/1'>去看文章</Link>
    </div>
}

export default Home
