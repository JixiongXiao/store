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

//自己写得节流
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
            //这个定时器可以记录在单位时间内的第二次触发，单位时间结束后就会自动触发第二次事件
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