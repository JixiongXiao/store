<template>
  <div class="container">
    <div class="search-container">
      <el-input v-model="search" />
      <el-button @click="handleSearch">搜索</el-button>
      <el-button @click="handleVisible(false)">隐藏</el-button>
      <el-button @click="handleVisible(true)">显示</el-button>
      <el-button @click="hideNode(false)">隐藏节点</el-button>
      <el-button @click="hideNode(true)">显示节点</el-button>
    </div>
    <div id="graph-container" />
  </div>
</template>

<script>
import G6 from '@antv/g6'
export default {
  name: 'AntVDemo',
  data() {
    return {
      instance: '',
      pickedNodes: [],
      hoverTimer: '',
      search: '',
      nodes: [],
      level3Nodes: [],
      showLevel3: true
    }
  },
  mounted() {
    this.instance = this.drawGraph()
    this.nodes.forEach((node) => {
      if (node.level === 3) {
        this.level3Nodes.push(node.id)
      }
    })
  },
  methods: {
    handleSearch() {
      const node = this.instance.findById(this.search)
      if (node) {
        // focus测试
        this.hideNode(true)
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
    drawGraph() {
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
        <li>${e.item.getModel().asset}</li>
      </ul>
      <ul>
        <li>${e.item.getModel().level}级资产组</li>
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
        defaultEdge: {
          style: {
            lineWidth: 0,
            stroke: 'grey'
          }
        },
        nodeStateStyles: {
          hover: {
            lineWidth: 0,
            stroke: '#FE9797',
            shadowBlur: 10,
            shadowColor: '#FE9797'
            // opacity: 0
          },
          active: {
            // // lineWidth: 4,
            // // stroke: '#FE9797',
            // // shadowBlur: 10,
            // // shadowColor: '#FE9797'
            // shadowColor: '#5780ee',
            // shadowOffsetX: 1,
            // shadowOffsetY: 5,
            // shadowBlur: 20
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

      const data = {
        // data中节点顺序应遵循每个资产组的顺序，比如先将资产组A的数据添加后再加入资产组B的数据
        // 因为渲染时节点渲染是按照从上到下渲染，如果节点顺序交叉会导致渲染是节点拥挤
        // 每个节点内部最好存放一个包含所有子代节点的数组
        nodes: [
          {
            id: 'node0',
            size: 160,
            level: 1,
            asset: '江苏省分公司资产组',
            label: ['江苏省分公司资...', 'A', '90'],
            group: 'a',
            type: 'levelA-blue'
          },
          {
            id: 'node1',
            size: 80,
            level: 2,
            asset: '苏州市研发部',
            label: '苏州市研发部',
            group: 'a',
            type: 'levelB-blue'
          },
          {
            id: 'node2',
            size: 160,
            level: 1,
            asset: '安徽省分公司资产组',
            label: ['安徽省分公司资...', 'B', '66'],
            group: 'b',
            type: 'levelA-orange'
          },
          {
            id: 'node4',
            size: 80,
            level: 2,
            asset: '南京市产品研发部',
            label: '南京市产品...',
            group: 'a',
            type: 'levelB-blue'
          },
          {
            id: 'node5',
            size: 80,
            level: 2,
            asset: '无锡市技术研发部',
            label: '无锡市技术...',
            group: 'a',
            type: 'levelB-blue'
          },
          {
            id: 'node6',
            size: 24,
            level: 3,
            asset: '苏州市某某技术支持中心',
            group: 'a',
            type: 'levelC-orange'
          },
          {
            id: 'node7',
            size: 24,
            level: 3,
            asset: '苏州市某某技术支持中心',
            group: 'a',
            type: 'levelC-blue'
          },
          {
            id: 'node98',
            size: 80,
            level: 2,
            asset: '合肥市研发部',
            label: '合肥市产品...',
            group: 'b',
            type: 'levelB-blue'
          },
          {
            id: 'node8',
            size: 24,
            level: 3,
            asset: '合肥市某某产品研发部',
            group: 'b',
            type: 'levelC-blue'
          },
          {
            id: 'node9',
            size: 24,
            level: 3,
            asset: '合肥市某某产品研发部',
            group: 'b',
            type: 'levelC-blue'
          },
          {
            id: 'node10',
            size: 24,
            level: 3,
            asset: '合肥市某某产品研发部',
            group: 'b',
            type: 'levelC-blue'
          },
          {
            id: 'node11',
            size: 24,
            level: 3,
            asset: '合肥市某某产品研发部',
            group: 'b',
            type: 'levelC-blue'
          },
          {
            id: 'node12',
            size: 24,
            level: 3,
            asset: '合肥市某某产品研发部',
            group: 'b',
            type: 'levelC-blue'
          },
          {
            id: 'node13',
            size: 24,
            level: 3,
            asset: '合肥市某某产品研发部',
            group: 'b',
            type: 'levelC-blue'
          },
          {
            id: 'node99',
            size: 160,
            level: 1,
            asset: '山东省分公司资产组',
            label: ['山东省分公司资...', 'C', '33'],
            group: 'c',
            type: 'levelA-red'
          },
          {
            id: 'node3',
            size: 80,
            level: 2,
            asset: '济南市研发中心',
            label: '济南市研发...',
            group: 'c',
            type: 'levelB-blue'
          },
          {
            id: 'node14',
            size: 24,
            level: 3,
            asset: '济南市研发中心一部',
            group: 'c',
            type: 'levelC-blue'
          },
          {
            id: 'node15',
            size: 24,
            level: 3,
            asset: '济南市研发中心二部',
            group: 'c',
            type: 'levelC-blue'
          },
          {
            id: 'node16',
            size: 24,
            level: 3,
            asset: '济南市研发中心三部',
            group: 'c',
            type: 'levelC-orange'
          }
        ],
        edges: [
          { source: 'node0', target: 'node1' },
          { source: 'node0', target: 'node4' },
          { source: 'node0', target: 'node5' },
          { source: 'node99', target: 'node3' },
          { source: 'node2', target: 'node98' },
          { source: 'node1', target: 'node6' },
          { source: 'node1', target: 'node7' },
          { source: 'node98', target: 'node8' },
          { source: 'node98', target: 'node9' },
          { source: 'node98', target: 'node10' },
          { source: 'node98', target: 'node11' },
          { source: 'node98', target: 'node12' },
          { source: 'node98', target: 'node13' },
          { source: 'node3', target: 'node14' },
          { source: 'node3', target: 'node15' },
          { source: 'node3', target: 'node16' }
        ]
      }
      const nodes = data.nodes
      this.nodes = data.nodes
      graph.data({
        nodes,
        edges: data.edges.map(function(edge, i) {
          edge.id = 'edge' + i
          return Object.assign({}, edge)
        })
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
      graph.on('node:click', function(e) {
        // graph.setItemState(e.item, 'active', true)
        // const nodes = graph.getNeighbors(e.item, 'target')
        // this.pickedNodes = nodes
        // nodes.forEach((node) => {
        //   graph.setItemState(node, 'active', true)
        // })
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
  border: 1px dotted gray;
  width: 100%;
  height: 100%;
  background: url('./BG.png');
}
.demoMenu {
  cursor: pointer;
}
</style>
