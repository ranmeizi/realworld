import RW from '@/utils/Request/rw'

export interface GetArticlesParam {
    tag?: string | null, // Filter by tag
    author?: string, // Filter by author (username)
    favorited?: string, // Filter by favorites of a user (username)
    pageSize?: number, // Limit number of articles returned (default is 20)
    pageNum?: number // Offset/skip number of articles (default is 0)
}

export interface Author {
    username: string,
    bio: string,
    image: string,
    following: boolean
}

// 文章数据
export interface Article {
    slug: string,
    title: string,
    description: string,
    body: string,
    tagList: string[],
    createdAt: string,
    updateAt: string,
    favorited: boolean,
    favoritesCount: number,
    author: Author,
}

// 评论数据
export interface Comment {
    id: number,
    createdAt: string,
    updatedAt: string,
    body: string,
    author: Author
}

/**
 * 获取文章数据
 */
export async function getArticles({
    tag,
    author,
    favorited,
    pageSize: limit = 20,
    pageNum: offset = 0
}: GetArticlesParam): Promise<{
    list: Article[],
    total: number
}> {
    try {
        const res = await RW.get('/articles', {
            params: { tag, author, favorited, limit, offset },
            loading: true
        })
        return {
            list: res.data.articles,
            total: res.data.articlesCount
        }
    } catch (e) {
        return {
            list: [],
            total: 0
        }
    }
}

export async function createArticle({
    title,
    body,
    tagList,
    description
}: Partial<Article>): Promise<string> {
    try {
        const res = await RW.post(`/articles`, {
            article: {
                title,
                body,
                tagList,
                description
            }
        }, {
            loading: true
        })
        if (res.status !== 200) {
            throw new Error('失败')
        }
        return res.data.article.slug
    } catch (e) {
        return ''
    }
}

export interface GetArticleDetailParam {
    slug: string // Slug of the article to get
}

// 获取文章详情
export async function getArticleDetail({ slug }: GetArticleDetailParam): Promise<Article | Record<string, unknown>> {
    try {
        const res = await RW.get(`/articles/${slug}`, { loading: true })
        return res.data.article || {}
    } catch {
        return {}
    }
}

// 点赞接口
export async function favourite({ slug }: any): Promise<number> {
    try {
        const res = await RW.post(`/articles/${slug}/favorite`, {}, { loading: true })
        if (res.status !== 200) {
            throw new Error('点赞失败')
        }
        return 1
    } catch (e) {
        return -1
    }
}

// 取消点赞
export async function unfavourite({ slug }: any): Promise<number> {
    try {
        const res = await RW.delete(`/articles/${slug}/favorite`, { loading: true })
        if (res.status !== 200) {
            throw new Error('点赞失败')
        }
        return 1
    } catch (e) {
        return -1
    }
}

// 获取评论
export async function getComments({ slug }: any): Promise<Comment[]> {
    try {
        const res = await RW.get(`/articles/${slug}/comments`)
        return res.data.comments || []
    } catch {
        return []
    }
}

export type PublishCommentParams = {
    body: string,
    slug: string
}

export async function publishComment({ slug, body }: PublishCommentParams) {
    try {
        const res = await RW.post(`/articles/${slug}/comments`, {
            comment: { body }
        }, {
            loading: true
        })
        if (res.status !== 200) {
            throw new Error('失败')
        }
        return 1
    } catch (e) {
        return -1
    }
}

export async function delComment({ slug, id }: any) {
    try {
        const res = await RW.delete(`/articles/${slug}/comments/${id}`, {
            loading: true
        })
        if (res.status < 200 || res.status > 300) {
            throw new Error('失败')
        }
        return 1
    } catch (e) {
        return -1
    }
}

// 获取标签
export async function getTags(): Promise<string[]> {
    try {
        const res = await RW.get('/tags')
        return res.data.tags
    } catch (e) {
        return []
    }
}

export type Profile = {
    username: string,
    bio: string,
    image: string,
    following: boolean
}

// 个人资料
export async function getProfile({ username }: any): Promise<Profile | Record<string, undefined>> {
    try {
        const res = await RW.get(`/profiles/${username}`)
        return res.data.profile
    } catch (e) {
        return {}
    }
}

// 关注
export async function follow({ username }: any) {
    try {
        const res = await RW.post(`/profiles/${username}/follow`, {}, {
            loading: true
        })
        return res.data.profile
    } catch (e) {
        return {}
    }
}

// 取消关注
export async function unfollow({ username }: any) {
    try {
        const res = await RW.delete(`/profiles/${username}/follow`, {
            loading: true
        })
        return res.data.profile
    } catch (e) {
        return {}
    }
}