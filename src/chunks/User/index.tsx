import AsyncModule from '../AsyncModule'

// 模块不要切分的太小，可以合并的！不用拿业务区分模块
export default class User extends AsyncModule {

    // 模块单例
    static _instance: any = null

    get(name: string = 'default') {
        if (!User._instance) {
            User._instance = import('./User')
        }
        return this.getModule(User._instance, name)
    }
}
