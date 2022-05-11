<template>
  <div class="chain-info-container">
    <div class="chain-info-left">
      <svg-icon
        icon-class="arrow_left"
        class-name="chain-icon"
        @click.stop="goLeft"
      />
    </div>
    <div class="chain-info">
      <div class="info-left">
        <div class="chain-view-header info-box-header">
          <div class="box-header-num">
            <span>{{ 10 > infoIndex ? '0' + infoIndex : infoIndex }}</span>
          </div>
          <div class="box-header-title">杀伤链概况</div>
          <div class="box-header-empty" />
        </div>
        <div class="chain-view-body">{{ infoData.overview.asset }}</div>
      </div>
      <div class="info-mid">
        <div class="asset-path-header info-box-header">
          <div class="box-header-num">
            <span>{{ 10 > infoIndex ? '0' + infoIndex : infoIndex }}</span>
          </div>
          <div class="box-header-title">资产组路径</div>
          <div class="box-header-empty" />
        </div>
        <div class="asset-path-body">body</div>
      </div>
      <div class="info-right">
        <div class="vuls-header info-box-header">
          <div class="box-header-num">
            <span>{{ 10 > infoIndex ? '0' + infoIndex : infoIndex }}</span>
          </div>
          <div class="box-header-title">涉及漏洞</div>
          <div class="box-header-empty" />
        </div>
        <div class="vuls-body">body</div>
      </div>
    </div>
    <div class="chain-info-right">
      <svg-icon
        icon-class="arrow_right"
        class-name="chain-icon"
        @click.stop="goRight"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChainInfo',
  props: {
    infoA: {
      type: [Object, Array],
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      infoData: {},
      infoIndex: 1
    }
  },
  mounted() {
    this.infoData = this.infoA[this.infoIndex - 1]
  },
  methods: {
    goLeft() {
      if (this.infoIndex === 1) return
      this.infoData = this.infoA[this.infoIndex - 1]
      this.infoIndex--
    },
    goRight() {
      if (this.infoIndex === this.infoA.length) return
      this.infoData = this.infoA[this.infoIndex - 1]
      this.infoIndex++
    }
  }
}
</script>

<style lang="scss" scoped>
.chain-info-container {
  width: calc(100% - 18px);
  height: calc(100% - 18px);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.chain-info {
  height: 600px;
  display: flex;
  justify-content: space-between;
  .info-box-header {
    display: flex;
    height: 32px;
    line-height: 32px;
    .box-header-num {
      text-align: center;
      width: 32px;
      border-bottom: 3px solid #1954e4;
      span {
        display: inline-block;
        border: 2px solid #ffbc0b;
        height: 20px;
        line-height: 20px;
        font-weight: 700;
        color: #ffbc0b;
      }
    }
    .box-header-title {
      color: white;
      font-size: 16px;
      flex: 1;
      padding-left: 8px;
      border-bottom: 1px solid #ffbc0b;
    }
    .box-header-empty {
      width: 16px;
      margin-left: 8px;
      border-bottom: 3px solid #1954e4;
    }
  }
  .info-left {
    width: 320px;
  }
  .info-mid {
    width: 360px;
    margin: 0 48px;
  }
  .info-right {
    width: 504px;
  }
}
.chain-info-left {
  padding-left: 88px;
}
.chain-info-right {
  padding-right: 88px;
}
.chain-icon {
  width: 64px;
  height: 64px;
  cursor: pointer;
}
</style>
