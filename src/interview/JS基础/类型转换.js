//https://www.bilibili.com/video/BV1eE411t7GD

//把其他类型‘原始值’ 转化为对象 Object([value])
/*把其他值转化为布尔类型
   ·规则，只有“0,NaN，null,undefined，空字符串”会变成false，其余都是true，包括[]，-1
     +Boolean([value]);
     + !![value] 
     + ![value] 转换为布尔值并且取反
     + 条件判断 if(1){}
     + A||B A&&B

   */

// 大家都知道 JS 中在使用运算符号或者对比符时，会自带隐式转换，规则如下:

// -、*、/、% ：一律转换成数值后计算

//true = 1; false = 0;
//null = 0;
//任何数字和NaN运算 都等于NaN
//任何值和字符串相加都等于字符串，包括布尔值!!!

//隐式类型转换
//let c = 123;
// c = c + ""; c变成字符串

//result = 100 - "1"; 结果为99 只有加法才会把数字变成字符串，其他情况都是把其他数值变成数字。
//let d = "123";
// d - 0 / d*1 / d/1 这三种运算都会把d变成数字 



// +：

// 数字 + 字符串 = 字符串， 运算顺序是从左到右
// 数字 + 对象， 优先调用对象的valueOf -> toString
// 数字 + boolean/null -> 数字
// 数字 + undefined -> NaN


// [1].toString() === '1'
// {}.toString() === '[object object]'
// NaN !== NaN 、+undefined 为 NaN

//i++ 和 i+= 1 ,i= i+1是不一样的
//如果i是字符串，+=结果是字符串

//对象的加减法，先调用对象的symbol.toPrimitive,如果没有这个方法，就调用valueOf看是不是原始值，没有valueOf就调用toString
//转换成数字 Number()用的是浏览器底层原理 Number(null) = 0 / parseInt(null) =NaN，
//因为parseInt和parseFloat 会先把value转换乘字符串，然后从左边第一个字符开始找
//null的底层二进制是000