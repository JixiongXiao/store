//https://www.bilibili.com/video/BV1nE411q73o 后盾人数组学习

let arr = [1,2,3,4,5]
//第一集笔记
//console.table(array)可以把数组用表格形式打印出来

//第二集
//如果用new Array(6)创建，会创造出6个空元素的数组。这点要注意，new Array括号里不能只有一个数值
//正确做法是
let arrTest = Array.of(6) //[6]

//第三集 类型转换和检测
console.log(Array.isArray(arr));//true
console.log(arr.toString());//1,2,3,4,5
let arrString = String(arr);
let arrConnect = arr.join("-")//1-2-3-4-5
//拆分
let str='xio';
console.log(str.split(""));//["x","i","o"]
//如果对象有length属性，都可以用Array.from方法，或者 array.prototype.slice.call(str)
console.log(Array.from(str));//["x","i","o"]    字符串是有length属性的，但是object没有

let str="xiao,ji,xiong";
console.log(str.split(","));//["xiao","ji","xiong"];

//展开语法 ...args
//求和
function sum(...args){
    return args.reduce((s,v)=>{
        retrun (s += v)
    },0)
}
console.log(sum(1,2,3,4,5))

//操作DOM
const div = document.querySelectorAll("div");
//这个时候div并不是一个数组，无法div.map,要把div转换成数组格式
[...div].map();
Array.from(div).map();
Array.prototype.map.call(div,function(){})

//解构赋值语法
//最简单的例子
let arrTest = ['xiao','xiong'];
let[surname,name] = arrTest;
//surname和name会被分别赋值，arrTest被解构

let[,year] = ["xiong",1992]; //逗号可以用来占位，如果没有逗号，year='xiong‘
console.log(year)//1992 


//对于数组头尾元素的操作

//push()，往数组末尾添加值，返回整个数组的长度 array.length
arr.push('shawn');//可以同时追加多个
let arrTest = ['IDM','TCD'];
arr.push('student', ...arrTest);
//array.pop()
let lastOne= arr.pop();//删除，并且返还数组最后一个值
//array.shift()
let firstOne = arr.shift();//删除数组第一个数值，并且返回该数值
//array.unshift() 往数组最开头添加值，并且返回数组的长度length ，记住push是往后添加
let length = arr.unshift('TCD');

//数组的增删查改
let arr = [1,2,3,4,5,]
//slice() 从已有的数组中返回选定的元素,并且不改变原数组
//array.slice(start,end); 如果参数只有start，则意味着从start的位置要数组最后一位
let test = arr.slice(1,2); //[2,3]
let test = arr.slice(1); //[2,3,4,5]

//splice() 原数组会被改变 从start位置开始删除，删除数目为[截图数目]，有第三个参数则为替换值
//array.splice(start，截取数目，要添加的数值)
let test = arr.splice(0,2,'xiong') //此时test是splice的返回值[1,2]
console.log(arr); //['xiong',3,4,5]
//当[截取数目]=0 则不替换，而是在start后面添加新的值
let arr = [1,2,3,4,5];
arr.splice(1,0,'xiong'); //[1,'xiong',2,3,4,5]

//清空数组
//arr.length = 0; 这种方法改变了原有的数组
//arr = []; 这是开辟了新的内存空间

//连接数组
let arrA = ['a','b'];
let arrB = ['c','d'];
let arrConA = [...arr, ...arrA, ...arrB];
let arrConB = arr.concat(arrA,arrB);
//上面两种连接方法结果一样

//数组内部的复制
//copyWithin(粘贴的位置，start,end);
let arr = [1,2,3,4,5,6]
console.log(arr.copyWithin(2,0,2)); 
//[1,2,1,2,5,6] 从arr[2]开始粘贴，也就是数值2和3之间，从arr[0]到[2]之前的那个位置 为复制内容，也就是arr[0]和arr[1]

//数组索引查找
//indexOf() //如果没有查找到数据的话，返回-1
console.log(arr.indexOf(3))// 2
//lastIndexOf()//从右边开始查找 
//includes() 返回一个布尔值，如果存在返回true，反之为false
console.log(arr.includes(3)) //true

//find() 针对引用类型的查找，因为includes()无法进行引用类型的查找
let lesson = [{name:'js'},{name:'css'}];
let status = lesson.find(function(item){
    //lesson.findIndex()就可以返回index而不是返回该数据
    return item.name =='css'
})
console.log(status);//当查找到数值的时候，不是返回布尔值，而是直接返回该数据，所以这里返回{name:'cass}

//排序
let arrSrot = [1,3,6,4,2,9];
let arrAfterSrot = arrSrot.sort(function(a,b){
    //a-b 为从小到大， b-a为从大到小
    return a - b;
})
console.log(arrAfterSrot);

//数组循环操作

let arr = [1,2,3]
//for of 获取的是值
 for (let value of arr){
     value += 10
 }
 console.log(arr); //1,2,3
 //是将arr的值赋予给变量value， 实际上value是新开辟了一个内存空间，所以改变value不会改变arr内部的值
let arrTest =[{name:'a'},{name:'b'}];
for (let value of arrTest){
    value.name = 'xiong'
}
console.log(arrTest);//[{name:'xiong'},{name:'xiong'}];
//当数组中的数据是引用类型，则会直接被改变

for(let key in arrTest){
    //for key 获取的是索引而不是值
    arrTest[key].name = 'xiao'
}
console.log(arrTest);//[{name:'xiao'},{name:'xiao'}];

//forEach本质上等同于for循环，对每一项执行回调函数，会改变原数组，forEach可以控制DOM节点。
//forEach的返回值为undefined，也就是会改变原数组
//map和foreach的区别就是，当你在map中return，他会返回一个新数组
//但是map中如果你不return，则会改变原来的数据
arrTest.forEach((item)=>{
  console.log(item)  
})
//forEach和map的使用场景
//forEach常用于如果你想利用数据处理一些业务，比如存储或者打印
//map用于你想要改变数值的时候，map运行速度比forEach快，可以结合.filter()或者reduce()使用




//数组内的迭代器
let arrKey = arr.keys();
let arrValue = arr.values();
let arrEntry = arr.entries();
//三个都是可以用.next()的迭代器，具体看后盾人视频22

//every()和some()的用法 两者都是遍历数组
//every()当有其中一项返回了false，则整体为false， 用来判断数组中的数据
let grade = [
    {name:'xiong',grade:88},
    {name:'shawn',grade:58},
    {name:'xiao',grade:61},
]
let result = grade.every((student)=>{
    //括号内的参数也可以写成(value,index,arr)
    return student.grade >= 60
})
//因为有人分数低于60，所以当有一项返回false，则整体返回false，也就是result=false
console.log(result? "全部都及格":"有人没及格"); //有人没及格

//some()则是有一个为真，则全部为真，当回调函数中return true 则遍历只要遇到第一个true，就终止遍历，以便节约性能
//当回调函数return false， 则会遍历整个数组，确保所有的数值都是false
let result = grade.some(student=>{
    return student.grade >= 60
})
console.log(result);//true

//过滤器 filter(); 返回一个新数组
//大部分方法里面都可以写(value,index,arr)三个参数，不过一般只需要value
let result = grade.filter(student=>{
    //result则会等于一个数组
    return student.grade >= 60
})

let arr=[1,2,3,4];
//reduce(function(previous, current, index, array),index) 方法 后面的index可以决定第一次运行的previous的初始值，如果不填则默认是arr[0]
//reduce的遍历会返回上一个运行的return 如果没有return则返回undefined
arr.reduce((pre,cur)=>{console.log(pre,cur)}); //1,2 / undefined,3 / undefined,4
//第一次运行的时候,previous = arr[0],current = arr[1];
//第二次运行的时候 previous等于上一次运行的return 的值，current = [2];

let arr = [1,2,3,1,2,1,8];
//例子，用来统计数值在数组从出现过几次
function count(array,item){
    return array.reduce((total,cur)=>{
        let isShow = item ==cur ? 1:0;
        total += isShow;
        return total
    },0)
    //0表示总次数目前为0
}
console.log(count(arr,1)); // 3

//例子，用来去除数组中的最大值
function arrayMax(array){
    return array.reduce((pre,cur)=>{
        return pre > cur ? pre : cur;
    })
}
//如果想要获取大于1的所有数值，可以先把pre赋值为空数组[]，然后在reduce中进行比较，把大于1的数push到pre中
//reduce也可以用来数组去重
let newArr = arr.reduce((arr,cur)=>{
    if(arr.includes(cur)===false){
        arr.push(cur);
    }
},[]);
console.log(newArr);