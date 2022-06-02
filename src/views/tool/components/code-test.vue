<template>
  <div>
    <div>代码测试页</div>
    <el-button @click="handleRun">运行</el-button>
    <TemCom v-bind="$attrs" />
  </div>
</template>

<script>
import { createObj, flatArr } from '../test'
import TemCom from './temp-component.vue'
export default {
  name: 'CodeTest',
  components: {
    TemCom
  },
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
  },
  methods: {
    handleRun() {
      console.log(Date.now())
    },
    customNew(Con, ...param) {
      const obj = {}
      Con.call(obj, ...param)
      obj.prototype = Con.prototype
    }
  }
}
</script>

<style></style>
