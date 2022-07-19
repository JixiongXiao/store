//https://www.bilibili.com/video/BV1iE411q7Qd

//闭包就是父函数被销毁的情况下，子函数依然保留着父级的变量对象和作用域链
for (var i=0; i<5;i++){
    setTimeout(function(){
      console.log(i++);
    },4000)
  }
  console.log(i);
  // 5 56789

for (var i=0; i<5;i++){
    setTimeout(function(a){
      console.log(a);
    },4000,i)
  }
  console.log(i);
  //5 01234