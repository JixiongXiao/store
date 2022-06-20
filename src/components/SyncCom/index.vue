<template>
  <div>
    <div>此处为子组件,数据为: {{ title }},</div>
    <div>子组件点击change时会emit一个update事件,通知父组件修改数据</div>
    <div>子组件输入框 <el-input v-model="newTitle" /></div>
    <el-button @click="change">change</el-button>
  </div>
</template>

<script>
export default {
  name: 'SyncCom',
  props: {
    title: {
      type: String,
      default: 'default'
    }
  },
  data() {
    return {
      newTitle: ''
    }
  },
  methods: {
    change() {
      this.$emit('update:title', this.newTitle)
    }
  }
}
</script>

<style></style>
