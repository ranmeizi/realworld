import React from 'react'
import Posts from './pages/Posts'
import { Link } from 'react-router-dom'

export default function Article(props: any) {
    return <div style={{ height: '100vh', background: '#ca112d' }}><input type="text" /><Link to='/posts/1'>去看文章</Link></div>
}

export {
    Posts
}
