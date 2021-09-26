import React, { useState, useEffect } from 'react'
import { Icon } from 'antd-mobile'
import * as ArticleAPI from '@/services/Articles'

export default function ({ slug }: any) {
    const [comments, setComments] = useState<ArticleAPI.Comment[]>([])
    useEffect(() => {
        getData()
    }, [])
    async function getData() {
        setComments(await ArticleAPI.getComments({ slug }))
    }
    return <div>
        {
            comments.length > 0
                ? <div>
                    {
                        comments.map(item => <ItemRow data={item} />)
                    }
                </div>
                : <Empty />
        }
    </div>
}

function ItemRow({ data, username }: any) {
    return <div className='f-r'>
        {/* 左边头像 */}
        <div>
            s
        </div>
        {/* 右边是内容 */}
        <div>

        </div>
    </div>
}

function Empty() {
    return <div>
        <Icon type='loading' />
    </div>
}