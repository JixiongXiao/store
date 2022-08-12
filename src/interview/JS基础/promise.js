// 完整教程
// https://www.bilibili.com/video/BV15J411G7FG?p=5

// 语法
new Promise((resolve, reject) => {
  resolve('success')
  // reject("fail")
  // promise中如果resolve被执行了就传递到value，reject执行了就传递到reason
}).then(
  // 第一个对应promise中的resolve
  value => {
    console.log(value) // success
  },
  // 第二个对应reject，
  reason => {
    console.log(reason)// faile
  }
  // then中必须有2个参数，如果你只写了成功的状态，那reason就写null
  // 第二个then一般都指向成功，也就是第一个参数
).then(a => {}, null)

// then的运用技巧
new Promise((resolve, reject) => {
  resolve('success')
  // reject("fail")
}).then(
  // 第一个then中当promise运行成功，then可以返回一个promise值，那第二个then就会对第一个then中的成功进行处理
  // 否则第二个then是对第一个then整个then的执行进行处理，那只要执行了then，就是成功
  // 当一个事件需要先从A获取数据，获取到数据后再从B获取数据，然后再进行事件C处理，就需要这一个过程
  // A和B都有可能获取失败
  value => {
    return new Promise((resolve, reject) => {
      resolve('解决了')
    })
  },
  reason => {
    console.log(reason)// faile
  }

).then(
  value => {
    console.log(value) // 解决了
  },
  reason => {
    console.log(reason)
  })

// then的用法2
new Promise((resolve, reject) => {
  resolve('success')
  // reject("fail")
}).then(
  // 如果第一个then返回的promise还有then
  // 那接下来的then就是对第二个promise的then的处理。也就是无论这个then是成功了或者失败了
  // 第二个then总是指向成功
  value => {
    return new Promise((resolve, reject) => {
      // resolve('解决了')
      reject('失败了')
    }).then(
      a => { return '处理成功' },
      b => { return '处理失败' }
    )
  },
  reason => {
    console.log(reason)
  }

).then(
  // 上面处理失败了，但是因为then成功执行，所以这个then成功获取了上面then的信息，所以指向成功
  value => {
    console.log(value) // 处理失败
  },
  reason => {
    console.log(reason)
  })

// 如果then中返回的是对象
// 可以写成
new Promise((resolve, reject) => {
  resolve('g')
}).then(
  value => {
    return {
      // 这个then会被封装成一个promise
      // 第二个then会接收第一个then的结果
      then(resolve, reject) {
        resolve('g')
      }
    }
  }, null
).then(null, null)

// then().catch()
// 细节：catch本身也是一个promise，
new Promise((resolve, reject) => {
  resolve('g')
}).then(
  value => {
    return {

      then(resolve, reject) {
        resolve('g')
      }
    }
  }, null
).catch(error => {
  // 这里可以接收到上面所有的rejected，只要一个地方失败，就调用catch
  // 所以一般catch都放在最后面
})

// then().finally()
// finally中无论失败或者成功都会执行

// promise封装settimeout，
function timeout(delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay)
  })
}
timeout(2000).then(() => {
  console.log('1')
  return timeout(2000)
}).then(
  console.log('又过了2秒')
)
// 用异步的方式实现2秒后输出1，

// 缓存问题，因为异步请求需要时间，如果异步请求频率过高，并且多次请求同一个数据，可以在函数中建立一个储存数据的map或者set之类

// Promise.reject()的用法
// 如果在then中想要发送一个reject
new Promise((resolve, reject) => {
  resolve('a')
}).then(value => {
  // 如果在then中想要中断
  // 方法1
  throw new Error('fail')
  // 方法2
  return Promise.reject('错误')
}).catch(
  error => {
    console.log(error)
  }
)

// promise.all
// promise.allSettled 这个接口可以接收所有promise就算是状态为reject

// promise.race([]) race接口和上面2个接口一样，可以接收所有promise，但是只返回最快的那个promise

// promise的队列，就是一个一个执行
Promise((resolve, reject) => {
// 执行完这个promise
// 执行resolve触发下一个then
  resolve()
}).then(value => {
  // 当then返回一个promise，下一个then接收的是这个promise而不是第一个promise，
  // 因此要等这个promise处理完,才会进行下一个then，
  return Promise((resolve, reject) => {
    resolve()
  })
  // 这就形成了promise队列
}).then()

// 用map形成队列，会用到promise.resolve
function queue(num) {
  let promise = Promise.resolve()
  num.map(v => {
    promise = promise.then(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(v)
          resolve()
        }, 1000)
      })
    })
  })
}
queue([1, 2, 3, 4, 5, 6])
// 结果为每隔1秒钟输出一个数字

// async await是promise的语法糖
// async 相当于new Promise()
// await 相当于then

// 正常写法
new Promise(resolve => {
  resolve()
}).then(v => {
  return 'xiong'
}).then(v => {
  return new Promise(resolve => {
    resolve(v)
  })
}
).then(v => { console.log(v) })

// async await写法
async function hahah() {
  // await 依次往下执行
  // await 后面的行为是微任务，优先于宏
  const name = await 'xiong'
  console.log(name)
  const result = await new Promise(
    resolve => {
      resolve(name)
    }
  )
  console.log(result)
}

// 一些自己写的测试
// function test (){
//     let a;
//     return new Promise(resolve=>{
//         setTimeout(
//             ()=>{
//         a="test"
//         resolve(a);
//             },2000)
//     })
// }
// async function a(){
//     let result = await test();
//     console.log("a是"+result);
// }
// a();

// async function a(){
//     let result;
//      await setTimeout(()=>{
//         result = 'test';
//         console.log('await执行完毕')
//     },2000)
//     console.log("a是"+result);
//     setTimeout(()=>{
//         console.log('2秒后a是'+result);
//     },2000)
// }
// a();

setTimeout(() => {
  console.log('这是一个宏任务，必须等主线程任务执行完毕，微任务执行完毕后，才会被移入主线程')
}, 4)
new Promise((resolve, reject) => {
  console.log('resolve是同步执行任务，并不是微任务')
  reject()
}).then((value) => {
  console.log('then是微任务，必须等同步执行的任务执行完后才会执行')
}, reason => { console.log('执行失败') }).then(() => {
  console.log('这是第二个then')
})
console.log('这是一个同步执行任务console')
