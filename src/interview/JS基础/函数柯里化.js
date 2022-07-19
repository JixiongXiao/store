//https://www.bilibili.com/video/BV1RA411E7aN


//函数柯里化的核心技术是 一个函数中返回一个函数
const add = function add(x){
    return function(y){
        return x+y
    }
}
const add1 = add(1); //这个是传递参数x = 1

add1(2) === 3 ; //y=2
add1(20) === 21 //y = 20
/*
再一个函数中填充几个参数然后再返回一个新函数 称之为函数柯里化
可以在不入侵函数的前提下，为函数预先设置通用参数，提供多次重复调用
比如在上面的例子中 可以
const add2 = add(2);
就可以改变参数x，使用同一个函数，但是改变了通用参数
*/

//array.prototype.slice.call(arguments) 可以在函数中把参数(对象) 改编成数组

//柯里化的应用

const nameList1 = [
    {mid:'a1',pro:'c'},
    {mid:'a2',pro:'c'},
    {mid:'a3',pro:'c'},
    {mid:'a4',pro:'c'},
]
const nameList2 = [
    {top:'b1',pro:'c'},
    {top:'b2',pro:'c'},
    {top:'b3',pro:'c'},
    {top:'b4',pro:'c'},
]
let name = (name)=>{return (element)=>{return element[name]}}
let name_mid = name("mid"); //name("mid")实际返回了一个函数(element)=>{return element[mid]}
let name_top = name("top");//(element)=>{return element[top]}

//这一步实际就是nameList1.map(element=>return element[mid])
console.log(nameList1.map(name_mid)); //["a1","a2","a3","a4"]

//这一步实际就是nameList2.map(element=>return element[top])
console.log(nameList2.map(name_top)); //["b1","b2","b3","b4"]

//上面这个例子运用了柯里化技术，重复使用了名字为name的函数，我们可以重复使用name函数，通过改变参数创造出不同的函数name_mid,name_top， 