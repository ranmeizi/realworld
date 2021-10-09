const config = {
    routeBasename: '/'
}
if (window?.rvtConfig) {
    Object.assign(config, window.rvtConfig)
}

export default config