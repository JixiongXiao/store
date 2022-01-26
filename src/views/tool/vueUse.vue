<template>
  <div class="vueUse-container">
    <div class="component-list">
      <el-dropdown split-button type="primary" @command="commonComponent">
        <span class="el-dropdown-link">通用组件列表</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="utils-test">常用方法</el-dropdown-item>
          <el-dropdown-item command="md5">md5加密</el-dropdown-item>
          <el-dropdown-item command="lazy">懒加载</el-dropdown-item>
          <el-dropdown-item
            command="click-outside"
          >点击div以外区域关闭div</el-dropdown-item>
          <el-dropdown-item command="right-menu">右键菜单</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="component-container">
      <keep-alive>
        <component :is="currentComponent" />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Md5 from './components/md5'
import ClickOutside from './components/click-outside'
import Lazy from './components/lazy'
import RightMenu from './components/right-menu'
export default {
  name: 'VueUse',
  components: {
    ClickOutside,
    Lazy,
    RightMenu,
    Md5
  },
  data() {
    return {
      currentComponent: ''
    }
  },
  methods: {
    // 通用组件
    commonComponent(command) {
      this.currentComponent = command
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';
.vueUse-container {
  @include flex(flex-start, flex-start, row);
  width: 100%;
  height: 100%;
  padding: 16px;
  overflow-y: auto;
  .component-list {
    width: 180px;
    height: 100%;
    border-right: 1px solid lightblue;
    .el-dropdown {
      margin-bottom: 16px;
    }
  }
  .component-container {
    width: calc(100% - 180px);
    height: 100%;
    padding: 16px;
  }
}
</style>
