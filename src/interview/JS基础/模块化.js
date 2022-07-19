//https://www.bilibili.com/video/BV1K54y1S7zx?from=search&seid=6642986616227895653


//模块化优点
//避免命名冲突，减少命名空间污染
//模块之间可以相互依赖
//更好的分离，按需加载
//更高的复用性，高可维护性

// 模块化开发在现代开发中已是必不可少的一部分，它大大提高了项目的可维护、可拓展和可协作性。通常，我们 在浏览器中使用 ES6 的模块化支持，在 Node 中使用 commonjs 的模块化支持。


// 分类:

// es6: import / export
// commonjs: require / module.exports / exports
// amd: require / defined  asynchronous module definition 
//阿里巴巴的贡献 CMD common module definition



// require与import的区别

// require支持 动态导入，import不支持，正在提案 (babel 下可支持)
// require是 同步 导入，import属于 异步 导入
// require是 值拷贝，导出值变化不会影响导入值；import指向 内存地址，导入值会随导出值而变化

//commonjs是一种模块化规范，来源于NodeJs，不同模块互相require
//本质是一种同步方法 同步加载模块
//commonjs有缓存机制，只要被require一次，这个模块就会被缓存，所以require只会运行一次

//amd 异步加载模块，所有的模块加载完后才会执行回调函数-前置依赖 asynchronous module definition
//amd是通过requireJs实现的，
//导出模块用defined
//引入模块用require 
//require需要给模块配置路径，具体看视频

//es6
//export import
//export如果没有default，import的时候需要加{}

//具体在视频117分钟，面试重点
//commonjs模块输出的是一个值的拷贝，导出值变化不会影响到入值
//es6模块输出的是值的引用，指向内存地址，导入值会随者导出值而变化
//commonjs是在运行时加载，
//es6模块是在编译时就加载

//可以自己去看看YUI