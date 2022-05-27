<template>
  <div>
    <div>代码测试页</div>
    <el-button @click="handleRun">运行</el-button>
  </div>
</template>

<script>
import { createObj, flatArr } from '../test'
export default {
  name: 'CodeTest',
  data() {
    return {
      mulArr: [1, 2, [3, 4], 5, [[6, 7], 8]],
      result: ''
    }
  },
  mounted() {
    const testMap = new Map([
      ['a', 'ahaha'],
      ['b', 'bhaha']
    ])
    console.log(testMap)
  },
  methods: {
    handleRun() {},
    customNew(Con, ...param) {
      const obj = {}
      Con.call(obj, ...param)
      obj.prototype = Con.prototype
    }
  }
}
</script>

<style></style>
