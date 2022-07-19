/*
宏任务微任务
https://www.bilibili.com/video/BV1eJ41177Rg
https://www.bilibili.com/video/BV1dt411W7Y4?from=search&seid=5067825180995292706 浏览器渲染以及事件循环

setTimeOut属于宏任务，当JS文档开始渲染的时候，定时器会被启动，当定时器读秒结束，定时器内的业务会被移动到宏任务队列
必须等到主线程内的所有任务执行完了，并且微任务队列的任务也执行完了之后，才会执行宏任务队列的任务

微任务 microtask(jobs): promise / ajax / Object.observe(该方法已废弃)
宏任务 macrotask(task): setTimout / script / IO / UI Rendering 
*/
setTimeout(()=>{
    console.log('这是一个宏任务，必须等主线程任务执行完毕，微任务执行完毕后，才会被移入主线程8')
},4)
new Promise(resolve=>{
    console.log('resolve是同步执行任务，并不是微任务')
    resolve();
}).then(()=>{
    console.log('then是微任务，必须等同步执行的任务执行完后才会执行')
}).then(()=>{
    console.log('这是第二个then')
})
console.log('这是一个同步执行任务');
//上面代码的执行顺序是 resolve(同步) -> console(同步) -> then(微任务) -> setTimeOut中的业务(宏任务)

//HTML文件中script标签也是一个宏任务，所以把script放在body后面就可以先渲染html再执行script中的业务

