import RW from '@/utils/Request/rw'


export interface GetArticlesParam {
    tag?: string, // Filter by tag
    author?: string, // Filter by author (username)
    favorited?: string, // Filter by favorites of a user (username)
    pageSize?: number, // Limit number of articles returned (default is 20)
    pageNum?: number // Offset/skip number of articles (default is 0)
}

export type Author = {

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
        return res.data.map((item: any) => ({
            list: item.articles,
            total: item.articlesCount
        }))
    } catch (e) {
        return {
            list: Array(20).fill(1),
            total: 0
        }
    }
}