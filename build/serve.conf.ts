import reactRefresh from '@vitejs/plugin-react-refresh'

export default (config) => ({
    ...config,
    plugins: [
        ...config.plugins || [],
        reactRefresh()
    ]
})