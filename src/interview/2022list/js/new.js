

//new的执行过程
// 创建一个空的简单JavaScript对象（即{}）；
// 链接该对象（设置该对象的constructor）到另一个对象 ； 换句话说，就是把新建的对象的原型绑定到构造函数的原型上
// 将步骤1新创建的对象作为this的上下文 ；
// 如果该函数没有返回对象，则返回this。

// 实现一个new
function newCustom(fn, ...args) {
    // fn为构造函数
    const obj = {}
    // 如果考虑到原型链
    obj.__proto__ = fn.prototype
    const result = fn.apply(fn, args)
    if (result instanceof Object) {
        return result
    } else return obj
}