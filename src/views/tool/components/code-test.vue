<template>
  <div>
    <div>代码测试页</div>
    <el-button @click="handleRun">运行</el-button>
    <TemCom v-bind="$attrs" />
    <div class="father-box">
      父级
      <div class="son-box">子级</div>
    </div>
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

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';
.father-box {
  font-size: 30px;
  border: 1px solid rgb(154, 69, 69);
  width: 10em;
  .son-box {
    // font-size: 20px;
    border: 1px solid green;
    width: 10em;
  }
}
</style>
