import React from 'react'
import Posts from './pages/Posts'
import { Link } from 'react-router-dom'

export default function Article() {
    return <div><input type="text" /><Link to='/posts'>去看文章</Link></div>
}

export {
    Posts
}
