<template>
  <div class="gsap-container">
    <el-button @click="handleTest">测试</el-button>
    <div class="box-container">
      <div class="box box-a" />
      <div class="box box-b" />
      <div class="box box-c" />
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
export default {
  name: 'GsapTest',
  data() {
    return {
      gsap: gsap
    }
  },
  mounted() {
    console.log(gsap)
  },
  methods: {
    handleTest() {
      this.gsap.to('.box-a', {
        repeat: -1,
        duration: 3,
        yoyo: true,
        rotationY: 360,
        rotationX: 360,
        x: 100
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';
.gsap-container {
  height: 100%;
  border: 1px dashed gray;
  .box-container {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .box {
      height: 40px;
      width: 40px;
    }
    .box-a {
      background: lightblue;
    }
    .box-b {
      background: lightgreen;
    }
    .box-c {
      background: lightgray;
    }
  }
}
</style>
