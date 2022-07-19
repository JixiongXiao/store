//https://www.bilibili.com/video/BV1Tc411h7k5
//https://www.cnblogs.com/ranyonsue/p/11201730.html

//关键字 组合继承：原型链继承+借用构造函数

//下面为视频笔记
// function Vip (){
//     Breast.call(this)
// }
//这个方法只是Vip类借用了Breast这个构造函数，并不是继承
//因此Vip的实例无法继承Breast的prototype（原型）

//所以还要加上
// Vip.prototype = new Breast();
//这段是原型链继承
//let Vip_a = new Vip()
//Vip_a.__proto__ 就是Breast，Vip_a也可以继承Breast里面的方法。如果没有加上13行的代码，就继承不到

//网页笔记，具体看第二个网站
//1原型链继承
//新实例的原型等于父类实例
//2借用构造函数继承
//用call和apply将父类构造函数引入子类函数，在子类函数里做父类函数的调用
//3组合继承 上面两种一起用
//4


