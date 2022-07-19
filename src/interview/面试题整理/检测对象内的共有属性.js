Object.prototype.hasPubProperty = function hasPubProperty(attr){
    let that = this,
        prototype = Object.getPrototypeOf(that);
    while (prototype){
        if(prototype.hasOwnProperty(attr)) return true;
        prototype = Object.getPrototypeOf(prototype);
    }
    return false;
}

//方法2 用in，in操作符会先检测内部是否有这个属性，没有的话才会沿着原型链找
Object.prototype.hasPubProperty = function hasPubProperty(attr){
    let that = this,
        prototype = Object.getPrototypeOf(that);
        return attr in prototype;
        //也就是说这里绕过了this的私有属性，直接在原型对象中用in查找。如果为true那就是在原型链上找到了该属性。

}