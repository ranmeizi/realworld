export default abstract class AsyncModule {
    static getModule(module: any, name: string) {
        return name === 'default'
            ? module
            : module.then((_module: any) => ({ default: _module[name] }))
    }

    abstract get(name: string): any

}
