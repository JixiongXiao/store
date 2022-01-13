<template>
  <div ref="threeInstance" class="three-instance" />
</template>

<script>
import { TEngine } from '@/three/TEngine'
import { objectList } from '@/three/TBasicObject'
import { lightsList } from '@/three/TLight'
import { helperList } from '@/three/THelper'
import { codeModelList } from '@/three/TCodeModel'
export default {
  name: 'Three',
  data() {
    return {
      instance: ''
    }
  },
  mounted() {
    this.instance = new TEngine(this.$refs['threeInstance'])
    this.instance.addObject(...objectList)
    this.instance.addObject(...lightsList)
    this.instance.addObject(...helperList)
    this.instance.addObject(...codeModelList)
  }
}
</script>

<style>
.three-instance {
  width: 100%;
  height: 100%;
}
</style>
