//https://segmentfault.com/a/1190000010532908
//https://www.bilibili.com/video/BV1Rp4y1v7AH?from=search&seid=13810073624626640142 视频

function *test(){
    yield 'a';
    yield 'b';
}
let a = test();
let b = test();

/* 
a 和 b两个迭代器是相互独立的，作用域独立
每当调用了迭代器的.next()方法，generator的指针会从上一次停下的地方继续运行，直到遇到下一个yield语句
*/

//.next()方法可以传递参数
//传递的参数其实是把yield返回的数据覆盖
//也就是说在第一个.next()内部传参没有意义，因为第一个.next()之前是没有yield语句的

function *test(){
    let n = 1;
    let v = yield n+22;
    console.log('test:'+v);
    yield ++n;
    yield ++n;
}
let _test = test();

console.log(_test.next()); //23
_test.next('abc'); // test:abc   这一步的时候运行到第二个yield，此时n= 2; 并且上一个yield返回值v = 23被新的参数覆盖，也就是v = 'abc'
console.log(_test.next()); // 3 因为上一步的时候运行到第二个yield n = 2。所以这一步是n = ++n = 3;