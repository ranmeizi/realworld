export default class AsyncModule {
    getModule(module: any, name: string) {
        return name === 'default'
            ? module
            : module.then((_module: any) => ({ default: _module[name] }))
    }
}
