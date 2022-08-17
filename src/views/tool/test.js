export function createObj(ins) {
  const that = ins
  return { a: [{ b: { c: 3, d: that }}] }
}
// 抹平数组
export function flatArr(arr) {
  return arr.reduce((pre, cur) => {
    return Array.prototype.concat(pre, Array.isArray(cur) ? flatArr(cur) : cur)
  }, [])
}

// 实现call
export function myCall(fn, context, ...args) {
  context.fn = fn
  const result = context.fn(...args)
  delete context.fn
  return result
}

// 数组去重

export function dedup(arr) {
  // 运行最快
  // return [...new Set(arr)]

  const result = []
  // 不存在的数据，indexOf为-1
  arr.forEach((item, index) => {
    if (result.indexOf(item) === -1) {
      result.push(item)
    }
  })
  return result
}

