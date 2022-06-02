<template>
  <div>
    {{ msg }}

    <el-button @click="handleTest">测试</el-button>
  </div>
</template>

<script>
export default {
  name: 'TempCom',
  props: {
    msg: { type: String, default: '' }
  },
  mounted: {},
  methods: {
    handleTest() {
      this.$emit('click', '子组件点击按钮')
    }
  }
}
</script>

<style></style>
