const NETWORK_ENV = process.env.NETWORK_ENV as Envs || 'DEVELOP'

// 环境变量可选值
type Envs = 'DEVELOP' | 'TEST' | 'UAT' | 'RELEASE'

// 服务地址列表
type Servers = {
    'realWorldServer': 'realworld 后台',
    'testServer': '测试后台'
}

type ServerList = Record<keyof Servers, string>

const config: Record<Envs, ServerList> = {
    DEVELOP: {
        realWorldServer: 'https://api.realworld.io/api',
        testServer: '试一下',
    },
    TEST: {
        realWorldServer: 'https://conduit.productionready.io/api',
        testServer: '试一下'
    },
    UAT: {
        realWorldServer: 'https://conduit.productionready.io/api',
        testServer: '试一下'
    },
    RELEASE: {
        realWorldServer: 'https://conduit.productionready.io/api',
        testServer: '试一下'
    }
}

export default config[NETWORK_ENV]
