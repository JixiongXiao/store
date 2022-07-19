//https://www.bilibili.com/video/BV1Ei4y1g718?from=search&seid=14310848123250322014

//typeof()适合用来判断基本数据类型

/*
JS中的数据类型
  + 原始数据类型
     number(NaN,Infinity[表示无穷大的值]), string, boolean, null, undefined, symbol(唯一值), bigint
  + 对象类型
    ·标准普通对象 object
    ·标准特殊对象 Array/RegExp/Date/Error/Math/ArrayBuffer/DataView/Set/Map
    ·标准非特殊对象 Number/String/Boolean/Symbol/BigInt...
    ·可调用对象 实现了call方法的function

(NaN === NaN) => false
isNaN([value]) 会触发隐式转换，如果value是字符串，会被转换成number再判断是不是number
Object.is([value],[value])判断两个值是否相等，并不判断类型，所以 Object.is(10,20) => false

关于symbol的应用，看珠峰第一节课
浏览器浮点数计算问题，可以数字全部乘系数，比如10，计算后再除10
*/  

//引用数据类型
let obj ={};
let arr = [];
let m = new Map();

console.log(Object.prototype.toString.call(m));//输出为[object, Map];
//调用object原型对象的toString方法，用来判断对象类型

//Array 自带判断方法
//console.log(Array.isArray(arr));

let str1 = "ABC"; //这个创建出来是一个 原始值
let str2 = new String("ABC");//这个创建出来是一个 对象值
//str1和str2结构是不一样的
//Symbol 和 BigInt 不允许被new
//想要获取一个对象类型的symbol可以 Object(symbol())

console.log(str1 instanceof String); //false
console.log(str2 instanceof String); //true

/* 
typeof[value] 的弊端 
    ·不能检测null， 返回objecg
    ·
    ·
 */