<template>
  <div class="container">
    <div class="search-container">
      <el-input v-model="search" />
      <el-button @click="handleSearch">搜索</el-button>
      <el-button @click="backPage1">返回</el-button>
      <!-- <el-button @click="handleVisible(false)">隐藏</el-button>
      <el-button @click="handleVisible(true)">显示</el-button> -->
      <!-- <el-button @click="hideNode(false)">隐藏节点</el-button>
      <el-button @click="hideNode(true)">显示节点</el-button> -->
    </div>
    <div v-if="showText" class="text-container" @click="cancel">
      <div class="label-box">
        <div class="label-box-decoration" />
        <div class="label-box-left">
          <div class="box-label-title">
            <p>资产组信息</p>
            <p>Asset Group Information</p>
          </div>
          <div class="box-label-content">
            <div>所属集群:</div>
            <div>资产组:</div>
            <div>聚类:{{ detail.cluster }}</div>
            <div>上级资产组:</div>
            <div>下级资产组:</div>
          </div>
        </div>
        <div class="label-box-decoration" />
        <div class="label-box-right">
          <div class="box-label-title">
            <p>资产信息</p>
            <p>Asset Information</p>
          </div>
          <div class="box-label-content">
            <div>资产名称:{{ detail.id }}</div>
            <div>MAC地址:</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showChainInfo" class="text-container" @click="cancel">
      <ChainInfo :info-a="chainInfoTest" />
    </div>
    <div id="graph-container" />
  </div>
</template>

<script>
import G6 from '@antv/g6'
import ChainInfo from './chainInfo'
import groupData from './group.json'
export default {
  name: 'AntVDemo',
  components: {
    ChainInfo
  },
  data() {
    return {
      instance: '',
      pickedNodes: [],
      hoverTimer: '',
      search: '',
      nodes: [],
      level3Nodes: [],
      showLevel3: true,
      showText: false,
      showChainInfo: false,
      serverImg: require('../../icons/server.png'),
      firewallImg: require('../../icons/firewall.png'),
      detail: {},
      hightlightNode: '',
      groupNodes: [],
      pickedNode: {
        x: '',
        y: ''
      },
      counter: 0,
      groupIndex: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
      allnodes: [],
      nodesInGroup: {},
      assetL2: {},
      hullL2: [],
      showPage: 1, // 1代表第一个页面，2代表第二个页面
      chainInfoTest: [
        {
          overview: { asset: 6, vul: 80, per: 50 },
          path: [1, 2, 3],
          vuls: [1, 2, 3]
        },
        {
          overview: { asset: 8, vul: 20, per: 40 },
          path: [3, 4, 5],
          vuls: [3, 4, 5]
        }
      ],
      assetGroupData: JSON.parse(JSON.stringify(groupData)),
      assetGroupNodes: [],
      assetGroupedges: []
    }
  },
  mounted() {
    this.groupDataProcess()
    this.attackChainProcess()
    this.instance = this.drawGraph()
    this.assetGroupNodes.forEach((node) => {
      if (node.level === 3) {
        this.level3Nodes.push(node.id)
      }
    })
    console.log(this.assetGroupData)
  },
  methods: {
    handleSearch() {
      const node = this.instance.findById(this.search)
      if (node) {
        // focus测试
        this.showPage === 1 ? this.hideNode(true) : null
        this.instance.zoomTo(1.5)
        this.instance.focusItem(this.search, true, {
          duration: 500
        })
      }
    },
    handleVisible(isShow) {
      const node = this.instance.findById(this.search)
      if (node) {
        // 隐藏节点测试
        node.changeVisibility(isShow)
      }
    },
    hideNode(isShow) {
      this.showLevel3 = isShow
      this.level3Nodes.forEach((id) => {
        const node = this.instance.findById(id)
        node.changeVisibility(isShow)
      })
    },
    cancel() {
      this.showText = false
      this.showChainInfo = false
    },
    backPage1() {
      this.groupIndex = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
      this.showLevel3 = true
      this.instance.destroy()
      this.instance = this.drawGraph()
      this.showPage = 1
    },
    drawGraph() {
      const that = this
      const container = document.getElementById('graph-container')
      const width = container.scrollWidth
      const height = container.scrollHeight || 500
      const tooltip = new G6.Tooltip({
        offsetX: 10,
        offsetY: 10,
        trigger: 'click',
        itemTypes: ['node'],
        getContent: (e) => {
          const outDiv = document.createElement('div')
          outDiv.style.width = 'fit-content'
          outDiv.innerHTML = `
      <h4>资产组详情</h4>
      <ul>
        <li>${e.item.getModel().name}</li>
      </ul>
      <ul>
        <li>资产组ID:${e.item.getModel().id}</li>
      </ul>`
          return outDiv
        }
      })
      const menu = new G6.Menu({
        itemTypes: ['node'],
        getContent(e) {
          return `
          <div style="cursor:pointer">进入详情页</div>
          `
        },
        handleMenuClick(target, item) {
          console.log(target, item)
          graph.destroy()
          // 此处内部的this指的是menu实例而不是
          that.instance = that.drawGraphTwo()
          that.showPage = 2
        }
      })
      const graph = new G6.Graph({
        container: 'graph-container',
        width,
        height,
        plugins: [tooltip, menu],
        layout: {
          type: 'force',
          preventOverlap: true,
          linkDistance: (d) => {
            if (d.source.level === 1) {
              return 140
            }
            return 60
          },
          nodeStrength: (d) => {
            if (d.level === 3) {
              return -30
            }
            return -20
          },
          edgeStrength: (d) => {
            if (d.type === 'atack-edge') {
              return 0
            }
            if (d.source.level === 1) {
              return 0.7
            }
            return 0.3
          }
        },
        defaultNode: {
          color: '#5B8FF9',
          style: {
            lineWidth: 0
          },
          labelCfg: {
            style: {
              fill: '#FE9797'
            }
          }
        },
        modes: {
          default: ['drag-canvas', 'zoom-canvas', 'drag-node']
        }
        // animate: true,
        // animateCfg: {
        //   duration: 2000, // Number，一次动画的时长
        //   easing: 'linearEasing' // String，动画函数
        // }
      })

      // data中节点顺序应遵循每个资产组的顺序，比如先将资产组A的数据添加后再加入资产组B的数据
      // 因为渲染时节点渲染是按照从上到下渲染，如果节点顺序交叉会导致渲染是节点拥挤
      // 每个节点内部最好存放一个包含所有子代节点的数组
      const nodes = this.assetGroupNodes
      const edges = this.assetGroupedges
      graph.data({
        nodes: nodes,
        edges: edges
      })
      graph.render()
      graph.on('node:dragstart', function(e) {
        graph.layout()
        refreshDragedNodePosition(e)
      })
      graph.on('node:drag', function(e) {
        refreshDragedNodePosition(e)
      })
      graph.on('node:dragend', function(e) {
        e.item.get('model').fx = null
        e.item.get('model').fy = null
      })
      graph.on('node:mouseenter', function(e) {
        graph.setItemState(e.item, 'active', true)
        const nodes = graph.getNeighbors(e.item, 'target')
        this.pickedNodes = nodes
        nodes.forEach((node) => {
          graph.setItemState(node, 'active', true)
          const children = graph.getNeighbors(node, 'target')
          if (children.length > 0) {
            children.forEach((child) => {
              graph.setItemState(child, 'active', true)
              this.pickedNodes.push(child)
            })
          }
        })
      })
      graph.on('node:mouseleave', function(e) {
        graph.setItemState(e.item, 'active', false)
        if (this.pickedNodes.length > 0) {
          this.pickedNodes.forEach((node) => {
            graph.clearItemStates(node)
          })
        }
        this.pickedNodes = []
      })
      graph.on('edge:mouseenter', (e) => {
        graph.setItemState(e.item, 'hover', true)
      })
      graph.on('edge:mouseleave', (e) => {
        graph.setItemState(e.item, 'hover', false)
      })
      graph.on('edge:click', (e) => {
        this.showChainInfo = true
      })
      graph.on('wheel', (e) => {
        const zoom = graph.getZoom()
        if (zoom < 0.4 && this.showLevel3) {
          // this.level3Nodes.forEach((id) => {
          //   const node = graph.findById(id)
          //   node.changeVisibility(false)
          // })
          this.hideNode(false)
        }
        if (zoom > 0.4 && !this.showLevel3) {
          this.hideNode(true)
        }
      })
      if (typeof window !== 'undefined') {
        window.onresize = () => {
          if (!graph || graph.get('destroyed')) return
          if (!container || !container.scrollWidth || !container.scrollHeight) {
            return
          }
          graph.changeSize(container.scrollWidth, container.scrollHeight)
        }
      }

      function refreshDragedNodePosition(e) {
        const model = e.item.get('model')
        model.fx = e.x
        model.fy = e.y
      }
      return graph
    },
    drawGraphTwo() {
      const data = {
        nodes: [],
        edges: []
      }
      for (let i = 0; i < 200; i++) {
        const node = {
          id: 'node' + i
        }
        if (this.counter < 20) {
          this.counter++
        } else {
          this.groupIndex.shift()
          this.counter = 0
          this.counter++
        }
        if (this.counter <= 5) {
          node.group = `group${this.groupIndex[0]}`
        } else if (this.counter > 5 && this.counter <= 10) {
          node.group = `group${this.groupIndex[0]}_1`
        } else {
          node.group = `group${this.groupIndex[0]}_2`
        }
        const num1 = this.counter % 2
        const num2 = this.counter % 3
        node.type = num1 === 0 ? 'assetA' : 'assetB'
        node.img = num2 === 0 ? this.firewallImg : this.serverImg
        node.label = ''
        node.cluster = this.groupIndex[0]
        node.groupTag = false
        data.nodes.push(node)
        if (this.assetL2[this.groupIndex[0]]) {
          this.assetL2[this.groupIndex[0]].push(node)
        } else {
          this.assetL2[this.groupIndex[0]] = []
          this.nodesInGroup[this.groupIndex[0]] = {}
          const groupNode = {
            id: `group${this.groupIndex[0]}`,
            groupTag: true,
            label: `资产组${this.groupIndex[0]}`,
            cluster: this.groupIndex[0],
            type: 'asset-group'
          }
          const groupNode1 = {
            id: `group${this.groupIndex[0]}_1`,
            groupTag: true,
            label: `资产组${this.groupIndex[0]}_1`,
            cluster: this.groupIndex[0],
            type: 'asset-group'
          }
          const groupNode2 = {
            id: `group${this.groupIndex[0]}_2`,
            groupTag: true,
            label: `资产组${this.groupIndex[0]}_2`,
            cluster: this.groupIndex[0],
            type: 'asset-group'
          }
          this.assetL2[this.groupIndex[0]].push(groupNode)
          data.nodes.push(groupNode)
          this.groupNodes.push(groupNode.id)
          this.assetL2[this.groupIndex[0]].push(groupNode1)
          data.nodes.push(groupNode1)
          this.groupNodes.push(groupNode1.id)
          this.assetL2[this.groupIndex[0]].push(groupNode2)
          data.nodes.push(groupNode2)
          this.groupNodes.push(groupNode2.id)
          this.assetL2[this.groupIndex[0]].push(node)
        }
      }
      for (const key in this.assetL2) {
        this.assetL2[key].forEach((node) => {
          if (!node.groupTag) {
            if (this.nodesInGroup[key][node.group]) {
              this.nodesInGroup[key][node.group].push(node.id)
            } else {
              this.nodesInGroup[key][node.group] = []
              this.nodesInGroup[key][node.group].push(node.id)
            }
          }
        })
      }
      // 绘制edge
      for (const group in this.nodesInGroup) {
        for (const subGroup in this.nodesInGroup[group]) {
          for (let i = 0; i < this.nodesInGroup[group][subGroup].length; i++) {
            const edge = {
              source: subGroup,
              target: this.nodesInGroup[group][subGroup][i]
            }
            data.edges.push(edge)
            // if (i === 0) {
            //   const edge = {
            //     source:
            //       this.nodesInGroup[group][subGroup][
            //         this.nodesInGroup[group][subGroup].length - 1
            //       ],
            //     target: this.nodesInGroup[group][subGroup][i]
            //   }
            //   data.edges.push(edge)
            // } else {
            //   const edge = {
            //     source: this.nodesInGroup[group][subGroup][i - 1],
            //     target: this.nodesInGroup[group][subGroup][i]
            //   }
            //   data.edges.push(edge)
            // }
          }
        }
      }
      this.allnodes = data
      // console.log(this.assetL2)
      // console.log(this.allnodes)
      // console.log(this.nodesInGroup)
      const container = document.getElementById('graph-container')
      const width = container.scrollWidth
      const height = container.scrollHeight || 500
      const tooltip = new G6.Tooltip({
        offsetX: 10,
        offsetY: 10,
        trigger: 'mouseEnter',
        itemTypes: ['node'],
        getContent: (e) => {
          const outDiv = document.createElement('div')
          outDiv.style.width = 'fit-content'
          outDiv.innerHTML = `
      <h4>资产: ${e.item.getModel().label || e.item.getModel().id}</h4>`
          return outDiv
        },
        shouldBegin: (e) => {
          if (e.item.getModel().groupTag) return false
          else return true
        }
      })
      const graph = new G6.Graph({
        container: 'graph-container',
        width,
        height,
        plugins: [tooltip],
        modes: {
          default: ['drag-canvas', 'zoom-canvas', 'drag-node']
        },
        layout: {
          type: 'fruchterman',
          preventOverlap: true,
          gravity: 1,
          clustering: true,
          clusterGravity: 1,
          gpuEnabled: true,
          workerEnabled: true
        },
        animate: true,
        defaultEdge: {
          style: {
            lineWidth: 0
          }
        }
      })
      graph.data(data)
      graph.render()
      graph.on('afterlayout', () => {
        for (const group in this.nodesInGroup) {
          for (const subGroup in this.nodesInGroup[group]) {
            const mem = []
            const groupName = subGroup
            mem.push(groupName)
            if (groupName[6] === '_') {
              const mem = [...this.nodesInGroup[group][subGroup], groupName]
              const hull = createHulllevel2(mem, subGroup)
              this.hullL2.push(hull)
            }
          }
        }
        for (const key in this.assetL2) {
          const mem = []
          this.assetL2[key].forEach((node) => {
            mem.push(node.id)
          })
          const hull = createHulllevel1(mem, key)
          this.hullL2.push(hull)
        }
        locknode() // 锁定资产组标签
        graph.on('afterupdateitem', (e) => {
          this.hullL2.forEach((hull) => {
            hull.updateData(hull.members)
          })
        })
      })
      graph.on('node:click', (e) => {
        if (e.item.getModel().groupTag) return
        if (this.hightlightNode) {
          const node = graph.findById(this.hightlightNode)
          graph.setItemState(node, 'selected', false)
        }
        graph.setItemState(e.item, 'selected', true)
        this.hightlightNode = e.item.getModel().id
        this.detail = e.item.getModel()
        this.showText = true
      })
      graph.on('node:mouseenter', (e) => {
        graph.setItemState(e.item, 'active', true)
      })
      graph.on('node:mouseleave', (e) => {
        graph.setItemState(e.item, 'active', false)
      })
      graph.on('node:dragstart', (e) => {
        this.pickedNode.x = e.item.getModel().x
        this.pickedNode.y = e.item.getModel().y
      })
      graph.on('node:dragend', (e) => {
        // graph.updateItem(e.item, {
        //   x: this.pickedNode.x,
        //   y: this.pickedNode.y
        // })
        const neighbors = graph.getNeighbors(e.item)
      })
      graph.on('node:drop', (e) => {
        console.log(e.item)
      })
      graph.on('edge:mouseenter', (e) => {
        graph.setItemState(e.item, 'hover', true)
      })
      graph.on('edge:mouseleave', (e) => {
        graph.setItemState(e.item, 'hover', false)
      })
      if (typeof window !== 'undefined') {
        window.onresize = () => {
          if (!graph || graph.get('destroyed')) return
          if (!container || !container.scrollWidth || !container.scrollHeight) {
            return
          }
          graph.changeSize(container.scrollWidth, container.scrollHeight)
        }
      }
      const createHulllevel1 = (mem, index) => {
        const hull = graph.createHull({
          id: `hull${index}`,
          members: mem,
          padding: 40,
          style: {
            lineWidth: 0,
            fill: '#ffffff',
            opacity: 1,
            shadowColor: '#8CAAF2',
            shadowOffsetX: 1,
            shadowOffsetY: 5,
            shadowBlur: 20
          }
        })
        return hull
      }
      const createHulllevel2 = (mem, index) => {
        const hull = graph.createHull({
          id: `hull${index}`,
          members: mem,
          padding: 5,
          style: {
            fill: '#ffffff',
            lineWidth: 0,
            // fill: '#ffffff',
            opacity: 0.8,
            shadowColor: '#8CAAF2',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 10
          }
        })
        return hull
      }
      const locknode = () => {
        this.groupNodes.forEach((id) => {
          const node = graph.findById(id)
          node.lock()
        })
      }
      return graph
    },
    processLevel1Group(group) {
      const rankMap = {
        A: 'blue',
        B: 'blue',
        C: 'orange',
        D: 'orange',
        E: 'red',
        F: 'red'
      }
      const node = {
        id: group.group_id,
        name: group.group_name,
        level: group.level - 1, // 资产组数据从2级开始，所以默认最高级2级
        rank: group.rank,
        score: group.score,
        size: 160 // 2级资产组固定尺寸为160
      }
      // 计算节点type
      const type = `level${node.level}-${rankMap[group.rank]}`
      node['type'] = type
      node['label'] = ['', group.rank, group.score]
      // 重新处理节点label显示
      if (group.group_name.length > 7) {
        const str = group.group_name
        node['label'][0] = str.substring(0, 7) + '...'
      } else {
        node['label'][0] = group.group_name
      }
      return node
    },
    processLevel2Group(group) {
      const rankMap = {
        A: 'blue',
        B: 'blue',
        C: 'orange',
        D: 'orange',
        E: 'red',
        F: 'red'
      }
      const node = {
        id: group.group_id,
        f_id: group.f_group_id,
        name: group.group_name,
        level: group.level - 1, // 资产组数据从2级开始，所以默认最高级2级
        rank: group.rank,
        score: group.score,
        size: 80 // 3级资产组固定尺寸为80
      }
      const type = `level${node.level}-${rankMap[group.rank]}`
      node['type'] = type
      // 重新处理节点label显示
      if (group.group_name.length > 6) {
        const str = group.group_name
        node['label'] = str.substring(0, 5) + '...'
      } else {
        node['label'] = group.group_name
      }
      return node
    },
    processLevel3Group(group) {
      const rankMap = {
        A: 'blue',
        B: 'blue',
        C: 'orange',
        D: 'orange',
        E: 'red',
        F: 'red'
      }
      const node = {
        id: group.group_id,
        f_id: group.f_group_id, // 上级id
        p_id: group.p_group_id, // 上上级id
        name: group.group_name,
        level: group.level - 1, // 资产组数据从2级开始，所以默认最高级2级
        rank: group.rank,
        score: group.score,
        size: 24 // 4级资产组固定尺寸为80
      }
      const type = `level${node.level}-${rankMap[group.rank]}`
      node['type'] = type
      return node
    },
    createHideLine(source, target) {
      return {
        source: source,
        target: target,
        type: 'hide-edge',
        id: `${source}-${target}`
      }
    },
    groupDataProcess() {
      this.assetGroupData.asset_groups.forEach((groupL1, index) => {
        // 第一层循环 处理2级资产组
        const node = this.processLevel1Group(groupL1)
        this.assetGroupNodes.push(node)
        const keys = Object.keys(groupL1)
        if (keys.includes('child')) {
          groupL1.child.forEach((groupL2, index) => {
            // 第二层循环 处理3级资产组
            const node = this.processLevel2Group(groupL2)
            this.assetGroupNodes.push(node)
            this.assetGroupedges.push(
              this.createHideLine(groupL1.group_id, groupL2.group_id)
            )
            const keys = Object.keys(groupL2)
            if (keys.includes('child')) {
              groupL2.child.forEach((groupL3, index) => {
                // 第三层循环 处理4级资产组
                const node = this.processLevel3Group(groupL3)
                this.assetGroupNodes.push(node)
                this.assetGroupedges.push(
                  this.createHideLine(groupL2.group_id, groupL3.group_id)
                )
              })
            }
          })
        }
      })
    },
    attackChainProcess() {
      this.assetGroupData.chains.forEach((chain, index) => {
        if (chain.chain_group_order.length > 1) {
          chain.chain_group_order.reduce((pre, cur) => {
            const edge = {
              id: `at-${pre}-${cur}`,
              type: 'atack-edge',
              source: pre,
              target: cur
            }
            this.assetGroupedges.push(edge)
            return cur
          })
        }
      })
      //   const edge = {
      //     id: 'at-1001000000-1002000000',
      //     type: 'atack-edge',
      //     source: '1001000000',
      //     target: '1002000000'
      //   }
      //   this.assetGroupedges.push(edge)
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
}
.search-container {
  position: absolute;
  width: 300px;
}
#graph-container {
  width: 100%;
  height: 100%;
  background: url('./BG.png');
}
.text-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: space-around;
  align-items: center;
  .label-box {
    width: 560px;
    height: 438px;
    display: flex;
    color: white;
    text-shadow: 0 0 3px #fff;
    .label-box-decoration {
      box-sizing: border-box;
      width: 8px;
      margin-top: 46px;
      height: calc(100% - 46px);
      //   box-shadow: 0px 0px 4px rgba(255, 255, 255, 0.6);
      border-top: 1px solid white;
      border-right: 1px solid white;
      border-bottom: 1px solid white;
    }
    .label-box-left {
      width: 272px;
      height: 100%;
      padding-left: 8px;
    }
    .label-box-right {
      width: 272px;
      height: 100%;
      padding-left: 8px;
    }
    .box-label-title {
      font-size: 16px;
      font-weight: 700;
    }
    .box-label-content {
      margin-top: 8px;
      height: 20px;
      line-height: 20px;
    }
  }
}
.demoMenu {
  cursor: pointer;
}
</style>
