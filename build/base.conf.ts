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
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, "../src/")
        }
    },
    server: {
        host: '0.0.0.0',
        port: '8080',
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
        }
    }
}