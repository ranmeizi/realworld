import { open, close } from '@/components/loading'

// 声明合并
declare module 'axios' {
    export interface AxiosRequestConfig {
        /**
         * @description 设置为true，则会在请求过程中显示loading动画，直到请求结束才消失
         */
        loading?: boolean;
    }
}

const reqStack: boolean[] = []

// 来不及解释了
function whenRequest(config: any) {
    if (config?.loading) {
        if (reqStack.length === 0) {
            open()
        }

        reqStack.push(true)
    }
}
function whenResponse(config: any) {
    if (config?.loading) {

        reqStack.pop()
        if (reqStack.length === 0) {
            close()
        }
    }
}

export default {
    whenRequest,
    whenResponse
}