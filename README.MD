# react-vite-template
vite 搭建的 react 开发平台  

建议使用 typescript 语言开发，这样开发过程中会有类型提示，别的小伙伴读代码也会方便很多

因为用的是vite，dev模式使用的是modulejs可能有些浏览器不适配，不过build时添加了legacy适配ie11浏览器，不过这个项目的代码css没有适配ie11

## 开始
使用 ```npm install```或者```yarn install``` 安装依赖  
启动dev服务 ```npm run dev```或者```yarn dev```  
build ```npm run build``` 或者 ```yarn build```  
值得一提，在启动项目时，代码中会读取环境变量中的 NETWORK_ENV 去匹配不同环境的接口前缀

需要注意！  
因为vite是esmodule，在请求资源时才去读代码，没有找到很好的时机去lint代码，请手动运行```npm run lint```或者```yarn lint``` 去约束你的代码  

如果需要执行测试js ```npm run test```或者```yarn test```

## 技术栈
React、Typescript、less、vite、jest

## 基础搭建
一些公共组件  
实现了less/cssinjs 的换肤  
路由push缓存  
路由过渡动画  
全局请求loading  

## history 路由
使用history路由，不用锚点了，抓包软件抓不到query
但这对静态服务有些要求，在nginx 上需要设置 try_file 使请求路由地址时永远返回index.html

## 避免使用context
react-activation这个库改变组件层级，对context有所影响，不想再修补索性不用了，真的用的话可以去看作者写的解决方案自行解决

## 别用require
vite既然是esmodule实现的，为什要用commonjs的语法呢