//定义观察者的形式可以不一样，只要具备update方法即可
//2种创建观察者的方法
class Observer {
    update(msg){
        console.log(`我是第一个观察者1，我接收到的消息是：${meg}`);
    }
}

let Observer2 = {
    update(msg){
        console.log(`我是第一个观察者2，我接收到的消息是：${meg}`);
    }
}

//创建目标
class Subject {
    observerList = [];

    add(observer){
        this.observerList.push(observer);
    }
    remove (observer){
        //没有考虑塌陷问题
        this.observerList.filter(item=>{
            return item !== observer
        })
    }
    notify(...params){
        this.observerList.forEach(item=>{
            if(item && typeof item.update === 'function' ){
                item.update(...params);
            }
        })
    }
}

let sub = new Subject;
sub.add(new Observer);
sub.add(Observer2);
setTimeout(()=>{
    sub.notify('hello world')
},1000)