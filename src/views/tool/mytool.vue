<template>
  <div class="my-test-container">
    <div class="component-list">
      <el-dropdown split-button type="primary" @command="commonComponent">
        <span class="el-dropdown-link">通用组件列表</span>
        <el-dropdown-menu id="test" slot="dropdown">
          <el-dropdown-item command="utils-test">常用方法</el-dropdown-item>
          <el-dropdown-item command="md5">md5加密</el-dropdown-item>
          <el-dropdown-item command="lazy">懒加载</el-dropdown-item>
          <el-dropdown-item
            command="click-outside"
          >点击div以外区域关闭div</el-dropdown-item>
          <el-dropdown-item command="RightMenu">右键菜单</el-dropdown-item>
          <el-dropdown-item
            command="json-board"
          >展示JSON格式数据</el-dropdown-item>
          <el-dropdown-item
            command="sync-com"
          >子组件模拟v-model</el-dropdown-item>
          <el-dropdown-item command="gsap-test">gsap动画测试</el-dropdown-item>
          <el-dropdown-item command="code-test">代码测试页面</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="component-container">
      <keep-alive>
        <component :is="currentComponent" msg="fromLevel1" />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Md5 from './components/md5'
import ClickOutside from './components/click-outside'
import Lazy from './components/lazy'
import RightMenu from './components/right-menu'
import JsonBoard from './components/json-board.vue'
import CodeTest from './components/code-test.vue'
import GsapTest from './components/gsap-test.vue'
import SyncCom from './components/sync-component.vue'
export default {
  name: 'Mytool',
  components: {
    ClickOutside,
    Lazy,
    RightMenu,
    Md5,
    JsonBoard,
    CodeTest,
    GsapTest,
    SyncCom
  },
  data() {
    return {
      currentComponent: '',
      test: 123
    }
  },
  mounted() {},
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
.my-test-container {
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
  .search-icon {
    width: 200px;
    height: 200px;
  }
}
</style>
