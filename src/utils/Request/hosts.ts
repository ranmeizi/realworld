const NETWORK_ENV = process.env.NETWORK_ENV as Envs

// 环境变量可选值
type Envs = 'DEVELOP' | 'TEST' | 'UAT' | 'RELEASE'

// 服务地址列表
type Servers =
    'realWorldServer' |
    'otherServer'

type ServerList = Record<Servers, string>

const config: Record<Envs, ServerList> = {
    DEVELOP: {
        realWorldServer: 'https://conduit.productionready.io/api',
        otherServer: '试一下'
    },
    TEST: {
        realWorldServer: 'https://conduit.productionready.io/api',
        otherServer: '试一下'
    },
    UAT: {
        realWorldServer: 'https://conduit.productionready.io/api',
        otherServer: '试一下'
    },
    RELEASE: {
        realWorldServer: 'https://conduit.productionready.io/api',
        otherServer: '试一下'
    }
}

export default config[NETWORK_ENV]
