<template>
  <pre v-if="!isString" class="json-item" v-html="jsonText" />
  <div v-else class="json-item string-box" v-html="jsonText" />
</template>

<script>
export default {
  name: 'JsonBoard',
  props: {
    jsonData: {
      type: [String, Object],
      default: ''
    }
  },
  data() {
    return {
      jsonText: '',
      isString: false // 若是无法识别的JSON 直接以字符串的方式展示
    }
  },
  watch: {
    // 异步赋值
    jsonData() {
      this.funInit()
    }
  },
  mounted() {
    this.funInit()
    this.beColor()
  },
  methods: {
    funInit() {
      if (!this.jsonData) {
        this.jsonText = ''
        this.isString = false
      } else {
        this.jsonText = this.jsonFormat(this.jsonData)
      }
    },
    jsonFormat(jsonTemp) {
      let json = ''
      try {
        // stringify 时需指定缩进否则不会显示换行。为了防止传入的string没有指定 在此统一执行一遍
        if (typeof jsonTemp !== 'string') {
          json = JSON.stringify(jsonTemp, undefined, 2)
        } else {
          json = JSON.stringify(JSON.parse(jsonTemp), undefined, 2)
        }
        const jsonObj = JSON.parse(json)
        console.log(jsonObj)
        if (typeof jsonObj === 'object') {
          this.isString = false
          json = json
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
          return json.replace(
            /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
            (match) => {
              let cls = 'number'
              if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                  cls = 'key'
                } else {
                  cls = 'string'
                }
              } else if (/true|false/.test(match)) {
                cls = 'boolean'
              } else if (/null/.test(match)) {
                cls = 'null'
              }
              return '<span class="' + cls + '">' + match + '</span>'
            }
          )
        } else {
          this.isString = true
          return jsonTemp
        }
      } catch (e) {
        this.isString = true
        return jsonTemp
      }
    },
    beColor() {
      this.$nextTick(() => {
        const domString = document.querySelectorAll('.string')
        for (const dom of domString) {
          dom.style.color = '#f16222'
        }
        const domKey = document.querySelectorAll('.key')
        for (const dom of domKey) {
          dom.style.color = '#424456'
        }
        const domNum = document.querySelectorAll('.number')
        for (const dom of domNum) {
          dom.style.color = '#2fa0ed'
        }
        const domBoolean = document.querySelectorAll('.boolean')
        for (const dom of domBoolean) {
          dom.style.color = '#00c099'
        }
        const domNull = document.querySelectorAll('.null')
        for (const dom of domNull) {
          dom.style.color = '#cc33cc'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.json-item {
  width: 100%;
  height: 100%;
  overflow-x: scroll;
  &.string-box {
    height: auto;
    line-height: 20px;
    overflow: hidden;
    word-break: break-all;
  }
  .number {
    color: #2fa0ed;
  }
  .string {
    color: #f16222;
  }
  .boolean {
    color: #00c099;
  }
  .null {
    color: #cc33cc;
  }
  .key {
    color: #424456;
  }
}
</style>
