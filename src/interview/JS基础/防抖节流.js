//https://www.bilibili.com/video/BV1kk4y1B76Z?from=search&seid=11359273696677600609
//防抖
//事件响应函数在过一段时间后才会执行，如果在这段时间内再次调用，则重新计算时间
//适用情况 用户输入，搜索栏，表单验证
function debounce (fn,time,triggleNow){
    let timeOutId = null;
    let result;
    let debounced = function(){
        let that = this;
        let args = arguments;
            clearTimeout(timeOutId);
        
        if(triggleNow){
            let execution = !timeOutId;
            timeOutId = setTimeout(function(){
                timeOutId = null;
            },time);
            if(execution){
                result = fn.apply(that,args);
            } 

        } else{
            timeOutId = setTimeout(function(){
                result = fn.apply(that,args);
            },time);
        }
        return result;
    }
    debounced.remove = function(){
        clearTimeout(timeOutId);
        timeOutId = null;
    }
    return debounced;
}
//btn.onmouseover = debounce(test,1000,true);

//最优版本
//我自己写的
function debounce(func,wait,immediate){
    //参数校验
    if (typeof func !=="function") throw new TypeError('func is required and should be a function');
    if (typeof wait ==="boolean"){
        immediate = wait;
        wait = 300;
    }
    if (typeof wait !=="number") wait = 300;
    if(typeof immediate !=="boolean") immediate = false;
    let timer = null,
        result;
    return function proxy(){
        let self = this;
        let params = [].slice.call(arguments);
        //无论什么情况，点击进来后第一件事就是清除timer，之后重新设置
        clearTimeout(timer);
        if(immediate){
            //判断是不是第一次，如果是第一次timer就会是null，callNow就会是true
            let callNow = !timer;
            //决定是否执行后，就设置一个timer
                timer = setTimeout(()=>{
                    timer = null;
                },wait);
                //第一次的话就会执行func，如果不是第一次，callNow就是false，就不会走下面这一步，直到timer被清除
                //第二次如果在wait时间内点击，此时timer未被清除，因此callNow = ！timer为false，点击后timer会被重置，但是func不执行
            if(callNow){
                result = func.apply(self,params);
            }
        } else{
            timer = setTimeout(()=>{
                result = func.apply(self,params);
            },wait)
        }
        return result;
    }
}

function fn(){
    console.log('ok')
}

let btn = document.querySelector('div');
btn.onclick = debounce(fn,1000,true);

//https://www.underscore-js.com/functionsRelated.html
//_.throttle(function, wait, [options]) 创建并返回一个像节流阀一样的函数，当重复调用函数的时候，至少每隔 wait毫秒调用一次该函数。对于想控制一些触发频率较高的事件有帮助。（注：详见：javascript函数的throttle和debounce，感谢 @澳利澳先生 的翻译建议）
//默认情况下，throttle将在你调用的第一时间尽快执行这个function，并且，如果你在wait周期内调用任意次数的函数，都将尽快的被覆盖。如果你想禁用第一次首先执行的话，传递{leading: false}，还有如果你想禁用最后一次执行的话，传递{trailing: false}。

//节流throttle
//第一次能触发最后一次不触发
//因为一开始previous=0，所以第一次会马上触发
function throttle(fn,wait){
    let previous = 0;
    return function(){
        let that = this;
        let args = arguments;
        let current = Date.now();
        if(current - previous > wait ){
            fn.apply(that, args);
            previous = current;
        }
    }
}
//另一种写法，第一次不触发最后一次触发
//第一次触发就设置了timeout，所以要等wait之后才触发
function throttle(fn,wait){
    let timeoutId = null
    return function(){
        let that = this;
        let args = arguments;
        if(!timeoutId){
            timeoutId = setTimeout(()=>{
                timeoutId = null;
                fn.apply(that,args);
            },wait)
        }
    }
}
//完整版写法
//在上一种写法中添加一个 刚触发就执行的代码，然后wait之后继续触发
function throttle(fn,wait, immediate){
    let timeoutId = null;
    let callNow = immediate;
    let result;
    return function(){
        let that = this;
            args = arguments;
            //和防抖不同的是，防抖多次触发事件，只需要执行最后一次，所以每一次触发都要cleartimeout然后重新设置时钟
            //节流只是为了防止事件阻塞，所以触发几次就执行几次，只是执行的间隔拉长。降低执行频率
            //所以下面这个代码只执行一次，就是第一次触发事件的时候
        if(callNow){
           result =  fn.apply(that, args);
            callNow = false;
        }    
        //跑完上面那一步开始设置时钟，始终结束后进行第二次触发
        if(!timeoutId){
            timeoutId = setTimeout(()=>{
                timeoutId = null;
                result=  fn.apply(that,args);
            },wait)
        }
        return result;
    }
}


//_.throttle 
//禁用第一次执行的话，不禁用最后一次执行 第三个参数{leading:false, trailing:true};
//两个不能同时为false

//节流最优版本
function throttle(fn,wait){
    let timer = null,
        previous = 0,
        result;
    return function proxy(){
        //current需要实时更新，previous需要记录上一次执行时间，因此利用闭包记录
        let current = Date.now();
        let remaining = wait - (current-previous);
        let self = this;
        let params = [].slice.call(arguments);
        //超出wait的时间可以立即执行
        if(remaining <= 0){
            //有两种情况可以进入这一步骤，一是第一次点击，二是和上一次触发时间超过wait
            result = fn.apply(self,params);
            //执行之后previous等于上一次执行完的时间
            previous = Date.now();
            //
        }else if(!timer){
            //点击进入时timer为空，意味着这是第二次点击并且间隔时间小于wait，定时器还未设定，因此要设定一个定时器
                timer = setTimeout(()=>{
                    if(timer){
                        clearTimeout(timer);
                        timer = null;
                    }
                    result = fn.apply(self,params);
                    //执行之后要记录上一次执行的时间
                    previous = Date.now();
                },remaining)
            }
            
    return result;
    }
}