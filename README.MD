# react-vite-template
vite 搭建的 react 开发平台  

## TODO
构建
- ~~typescript~~
- ~~css按需引入~~
- ~~路由懒加载~~
- ~~eslint~~  
    1. ~~命令行手动lint~~
    2. 规则优化
    3. module request 时语法检测
    4. build 时语法检测
- ~~jest~~
- ~~适配咱们jenkins环境变量 ```NETWORK_ENV``` 取不同的 host 地址~~
- ssr  

开发
- 路由模块 ```react-router-dom```  
   1. ~~路由场景切换 ```react-transition-group```  ~~
   2. ~~路由缓存 history api 控制 ```react-router-cache-route```/```react-activation```~~  
   3. 路由一级页状态存入 store
- 换肤
- ~~iconfonts~~
- User 模块  
    1. permitionListx
    2. 路由组件劫持
    3. button组件 劫持
- Setting 模块
- Loading 模块
- ~~Request 模块 ```axios```~~
- 原生事件交互
- utils
- 公共 components

# history 路由
使用history路由，不用锚点了，抓包软件抓不到query
但这对静态服务有些要求，在nginx 上需要设置 try_file 使请求路由地址时永远返回index.html

# 避免使用context
react-activation这个库改变组件层级，对context有所影响，不想再修补索性不用了，真的用的话可以去看作者写的解决方案自行解决

# 别用require
vite既然是esmodule实现的，为什要用commonjs的语法呢