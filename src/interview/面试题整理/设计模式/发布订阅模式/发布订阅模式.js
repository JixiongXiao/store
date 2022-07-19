
(function(){
    let eventPond=[];                                             //自己创造事件池

    function subscribe(){                                        //向事件池加入方法
    if(!eventPond.includs(func)) {
    eventPond.push(func)}                                        //去重处理，当事件池内没有这个事件，加入事件池
    return function unsubscribe(){                               //每一次加入后会返回一个方法，用来移除事件
            eventPond = eventPond.filter(item=>{
              return item !== func                               //返回不等于func的其他事件，其实也就是去除了func事件
            } )
    }
    }

    subscribe.trigger = function trigger(...params){                     //通知事件池的方法执行
        eventPond.forEach(item=>{
            if(typeof item ==='function'){
                item(...params);
            }
        })

    }

    window.subscribe = subscribe;
})()

subscribe.trigger();                                              //触发事件池的事件

// A
const fn1 = data => {};
subscribe(fn1);

// B
const fn2 = data => {};
subscribe(fn2);

// C
const fn3 = data => {};
subscribe(fn3);

// D
const fn4 = data => {};
subscribe(fn5);

// E
const fn5 = data => {};
subscribe(fn5);


//用类的方式实现
class Sub{
    eventPond=[];
    subscribe(func){
        let self = this,
            eventPond = self.eventPond;
            if(!eventPond.includes(func)) eventPond.push(func);
            return function unsubscribe (){
                eventPond.filter(item=>{
                    return item !== func
                })
            }
    }
    trigger(...params){
        let self = this,
        eventPond = self.eventPond;
        eventPond.forEach(item=>{
            if(typeof item === 'function'){
                item(...params)
            }
        })
    }
}