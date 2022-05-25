<template>
  <div>
    <span>展示json格式文件</span>
    <div class="json-board-container">
      <json-board :json-data="data" />
    </div>
  </div>
</template>

<script>
import JsonBoard from '@/components/JsonBoard'
export default {
  name: 'ShowJson',
  components: {
    JsonBoard
  },
  data() {
    return {
      data: {
        valueString: 'lalal',
        valueNumber: 123,
        valueBoolean: true,
        valueLongString:
          'this.is a long string/this.is a long string/this.is a long string/this.is a long string/this.is a long string/this.is a long string/',
        valueNull: null,
        valueArray: [
          'string1',
          'string2',
          {
            arrNum: 123456
          }
        ],
        valueObj: {
          key1: 'string1',
          key2: false,
          key3: null
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.json-board-container {
  width: 500px;
  height: 300px;
}
</style>
