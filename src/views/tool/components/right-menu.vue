<template>
  <div class="container" @contextmenu.prevent="showMenu">
    <p>右键点击这块区域</p>
    <p>
      npm install vue-contextmenujs
      安装vue-contextmenujs插件，通过this.$contextmenu使用
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    // 显示右键菜单
    showMenu(event) {
      this.$contextmenu({
        items: [
          {
            label: '看见我就说明成功了',
            divided: true,
            icon: 'el-icon-loading'
          },
          {
            label: '返回(B)',
            onClick: () => {
              this.message = '返回(B)'
              console.log('返回(B)')
            }
          },
          { label: '前进(F)', disabled: true },
          { label: '重新加载(R)', divided: true, icon: 'el-icon-refresh' },
          { label: '另存为(A)...' },
          { label: '打印(P)...', icon: 'el-icon-printer' },
          { label: '投射(C)...', divided: true },
          {
            label: '使用网页翻译(T)',
            divided: true,
            minWidth: 0,
            children: [{ label: '翻译成简体中文' }, { label: '翻译成繁体中文' }]
          },
          {
            label: '截取网页(R)',
            minWidth: 0,
            children: [
              {
                label: '截取可视化区域',
                onClick: () => {
                  this.message = '截取可视化区域'
                  console.log('截取可视化区域')
                }
              },
              { label: '截取全屏' }
            ]
          },
          { label: '查看网页源代码(V)', icon: 'el-icon-view' },
          { label: '检查(N)' }
        ],
        event,
        x: event.clientX,
        y: event.clientY,
        customClass: 'class-a',
        zIndex: 3,
        minWidth: 230
      })
      return false
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';
.container {
  @include flex(center, center, column);
  width: 100%;
  height: 500px;
  background: #fafafa;
  border: 1px solid lightgray;
  border-radius: 8px;
  cursor: pointer;
  p {
    margin-bottom: 20px;
  }
}
</style>
