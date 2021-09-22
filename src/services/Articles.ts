import RW from '@/utils/Request/rw'

export interface GetArticlesParam {
    tag?: string, // Filter by tag
    author?: string, // Filter by author (username)
    favorited?: string, // Filter by favorites of a user (username)
    pageSize?: number, // Limit number of articles returned (default is 20)
    pageNum?: number // Offset/skip number of articles (default is 0)
}

export type Author = {
    username: string,
    bio: string,
    image: string,
    following: boolean
}

export type Article = {
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
            params: { tag, author, favorited, limit, offset }
        })
        return {
            list: res.data.articles,
            total: res.data.articlesCount
        }
    } catch (e) {
        console.log(e)
        return {
            list: Array(20).fill(1),
            total: 0
        }
    }
}

export interface GetArticleDetailParam {
    slug: string // Slug of the article to get
}

export async function getArticleDetail({ slug }: GetArticleDetailParam): Promise<Article | Record<string, unknown>> {
    try {
        const res = await RW.get(`/articles/${slug}`, { loading: true })
        return res.data.article || {}
    } catch {
        return {}
    }
}

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