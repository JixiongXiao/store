//中介者模式和发布订阅模式，观察者模式很相似

let mediator = (function(){
    let topics=[];
    const subscribe =function subscribe(){}
    const publish = function publish(){}

    return {
        subscribe,
        publish,
    }
})()