import path from 'path'
import autoprefixer from 'autoprefixer'
import pxtorem from 'postcss-pxtorem'
import usePluginImport from 'vite-plugin-importer'

const postcssOpts = {
    ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
    plugins: () => [
        autoprefixer({
            overrideBrowserslist: [
                "Android 4.1",
                "iOS 7.1",
                "Chrome > 31",
                "ff > 31",
                "ie >= 8"
            ],
            grid: true
        }),
        pxtorem({ rootValue: 50, propWhiteList: [] })
    ],
};

export default {
    postcss: postcssOpts,
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    define: {
        'process.env': {
            'NETWORK_ENV': JSON.stringify(process.env.NETWORK_ENV),
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }
    },
    plugins: [
        usePluginImport({
            libraryName: "antd-mobile",
            libraryDirectory: "es",
            style: true
        }),
        usePluginImport({
            libraryName: '@material-ui/icons',
            libraryDirectory: 'esm',
            camel2DashComponentName: false
        }),
        usePluginImport({
            libraryName: '@material-ui/core',
            libraryDirectory: 'esm',
            camel2DashComponentName: false
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, "../src/")
        }
    },
    server: {
        strict: false,
        host: '0.0.0.0',
        port: '8090',
        https: false,
        proxy: {
            '/api': {
                target: 'http://jsonplaceholder.typicode.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            },
        },
        cors: {
            origin: ['http://wozijidehoutai.com']
        },
        historyApiFallback: true
    }
}