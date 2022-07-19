//https://www.bilibili.com/video/BV1m7411L7YW
//DOM事件流
//事件捕获阶段->处于目标阶段->事件冒泡阶段

//addEventListener("事件"，绑定的函数，false)事件冒泡，也就是从节点最底部开始触发 div->body->document
//addEventListener("事件"，绑定的函数，true)事件捕获，也就是从节点最顶部开始触发，document->body->div

//事件捕获比事件冒泡优先