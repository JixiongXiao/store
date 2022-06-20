<template>
  <div>
    <div>此处为父级,数据为 {{ title }}</div>
    <div>父组件引用子组件，通过.sync方式把数据作为参数传入子组件</div>
    <SyncCom :title.sync="title" />
    <div>
      .sync修饰符可看作$emti 和 v-on的语法糖 用来实现子组件同步修改父组件参数
    </div>
    <div>
      正常情况下应该是子组件emit某个事件,然后父组件v-on的方式监听该事件,获取参数,去修改父组件数据
    </div>
  </div>
</template>

<script>
import SyncCom from '@/components/SyncCom'
export default {
  name: 'SyncComponent',
  components: {
    SyncCom
  },
  data() {
    return {
      title: '父级数据'
    }
  }
}
</script>

<style></style>
