import legacy from '@vitejs/plugin-legacy'

export default (config) => ({
    ...config,
    plugins: [
        ...config.plugins || [],
        legacy({
            targets: ['defaults', 'not IE 11']
        })
    ],
    build: {
        target: 'es2015'
    }
})