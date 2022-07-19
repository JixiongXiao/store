//https://www.bilibili.com/video/BV1E7411G7ku?from=search&seid=15402758149966929917
let a = [1,2,3];
//浅拷贝
//...运算符，
let b = [...a];

//Object.assign();
let b = Object.assign([],a);
//把a放进前面的一个数组里，也可以是对象，然后前面的数组也可以含有东西，也就是复制a到另一个数组

//深拷贝

//先把a转换成字符串，然后再解析成对象
let b =JSON.parse(JSON.stringify(a));
//缺点：有循环引用对象时会报错，值为函数，undefined或者symbol时无法拷贝。

//用递归进行赋值

//利用一些工具，比如lodash
