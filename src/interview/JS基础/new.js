//https://www.bilibili.com/video/BV1Na4y1i7U1?from=search&seid=4548234660072207819
//new的执行过程
// 创建一个空的简单JavaScript对象（即{}）；
// 链接该对象（设置该对象的constructor）到另一个对象 ； 换句话说，就是把新建的对象的原型绑定到构造函数的原型上
// 将步骤1新创建的对象作为this的上下文 ；
// 如果该函数没有返回对象，则返回this。






//自定义new
function newInstance (fn,...args){
    //创建一个新对象
    const obj={};
    //执行构造函数
    const result = fn.apply(obj,args);
    //判断result，如果构造函数有返回值，就返回result，如果没有，就返回obj   
    if(result instanceof Object) return result;
    //如果不是，返回新创建的对象
    //这一步可以让obj的__proto__等于fn.prototype
    //Object.setPrototypeOf(obj, fn.prototype);
    return obj
    //总之 new会创造一个简单的Js对象
}