<template>
  <div class="container">
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
            <div>负责人:</div>
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
    <div id="graph-container" />
  </div>
</template>

<script>
import G6 from '@antv/g6'
export default {
  name: 'AntVBubble',
  data() {
    return {
      instance: '',
      showText: false,
      serverImg: require('../../icons/server.png'),
      firewallImg: require('../../icons/firewall.png'),
      fruchterman: {
        type: 'fruchterman',
        preventOverlap: true,
        gravity: 3,
        speed: 5,
        clustering: true,
        clusterGravity: 5
      },
      detail: {},
      hightlightNode: '',
      gourpNodes: [],
      position: {
        x: '',
        y: ''
      }
    }
  },
  mounted() {
    this.instance = this.drawGraph()
  },
  methods: {
    cancel() {
      this.showText = false
    },
    drawGraph() {
      const data = {
        nodes: [
          {
            id: '0',
            label: '0',
            cluster: 'a',
            type: 'assetA',
            img: this.serverImg
          },
          {
            id: '1',
            label: '1',
            cluster: 'a',
            type: 'assetA',
            img: this.serverImg
          },
          {
            id: '2',
            label: '2',
            cluster: 'a'
          },
          {
            id: '3',
            label: '3',
            cluster: 'a'
          },
          {
            id: '4',
            label: '4',
            cluster: 'a',
            type: 'assetA',
            img: this.serverImg
          },
          {
            id: 'group1',
            group: true,
            label: 'XXX资产组',
            cluster: 'a',
            type: 'asset-group'
          },
          {
            id: '5',
            label: '5',
            cluster: 'a'
          },
          {
            id: '6',
            label: '6',
            cluster: 'a'
          },
          {
            id: '7',
            label: '7',
            cluster: 'a'
          },
          {
            id: '8',
            label: '8',
            cluster: 'a'
          },
          {
            id: '9',
            label: '9',
            cluster: 'a'
          },
          {
            id: '10',
            label: '10',
            cluster: 'a'
          },
          {
            id: '11',
            label: '11',
            cluster: 'a'
          },
          {
            id: '12',
            label: '12',
            cluster: 'a'
          },
          {
            id: '13',
            label: '13',
            cluster: 'b'
          },
          {
            id: '14',
            label: '14',
            cluster: 'b'
          },
          {
            id: '15',
            label: '15',
            cluster: 'b'
          },
          {
            id: '16',
            label: '16',
            cluster: 'b'
          },
          {
            id: '17',
            label: '17',
            cluster: 'b'
          },
          {
            id: '18',
            label: '18',
            cluster: 'c'
          },
          {
            id: '19',
            label: '19',
            cluster: 'c'
          },
          {
            id: '20',
            label: '20',
            cluster: 'c'
          },
          {
            id: '21',
            label: '21',
            cluster: 'c'
          },
          {
            id: '22',
            label: '22',
            cluster: 'c'
          },
          {
            id: '23',
            label: '23',
            cluster: 'c'
          },
          {
            id: '24',
            label: '24',
            cluster: 'c'
          },
          {
            id: '25',
            label: '25',
            cluster: 'c'
          },
          {
            id: '26',
            label: '26',
            cluster: 'c'
          },
          {
            id: '27',
            label: '27',
            cluster: 'c'
          },
          {
            id: '28',
            label: '28',
            cluster: 'c'
          },
          {
            id: '29',
            label: '29',
            cluster: 'c'
          },
          {
            id: '30',
            label: '30',
            cluster: 'c'
          },
          {
            id: '31',
            label: '31',
            cluster: 'd'
          },
          {
            id: '32',
            label: '32',
            cluster: 'd'
          },
          {
            id: '33',
            label: '33',
            cluster: 'd'
          },
          {
            id: '34',
            label: '34',
            cluster: 'e'
          },
          {
            id: '35',
            label: '35',
            cluster: 'e'
          },
          {
            id: '36',
            label: '36',
            cluster: 'e'
          },
          {
            id: '37',
            label: '37',
            cluster: 'e'
          }
        ],
        edges: [
          {
            source: '0',
            target: '1'
          },
          {
            source: '1',
            target: '2'
          },
          {
            source: '2',
            target: '3'
          },
          {
            source: '3',
            target: '4'
          },
          { source: '4', target: 'group1' },
          { source: 'group1', target: '5' },
          {
            source: '5',
            target: '6'
          },
          {
            source: '6',
            target: '7'
          },
          {
            source: '7',
            target: '8'
          },
          {
            source: '8',
            target: 'group1'
          },
          {
            source: '9',
            target: '10'
          },
          {
            source: '10',
            target: '11'
          },
          {
            source: '11',
            target: '9'
          }
        ]
      }
      data.nodes.forEach((node) => {
        if (node.group) {
          this.gourpNodes.push(node.id)
        } else {
          const num1 = node.id % 2
          const num2 = node.id % 3
          node.type = num1 === 0 ? 'assetA' : 'assetB'
          node.img = num2 === 0 ? this.firewallImg : this.serverImg
          node.label = ''
        }
      })

      const nodes = data.nodes
      const clusterMap = new Map()
      const clusterId = 0
      //   nodes.forEach(function(node) {
      //     // cluster
      //     if (node.cluster && clusterMap.get(node.cluster) === undefined) {
      //       clusterMap.set(node.cluster, clusterId)
      //       clusterId++
      //     }
      //     const cid = clusterMap.get(node.cluster)
      //     if (!node.style) {
      //       node.style = {}
      //     }
      //     node.style.fill = colors[cid % colors.length]
      //     node.style.stroke = strokes[cid % strokes.length]
      //   })

      const container = document.getElementById('graph-container')
      const width = container.scrollWidth
      const height = container.scrollHeight || 500
      const tooltip = new G6.Tooltip({
        offsetX: 10,
        offsetY: 10,
        trigger: 'mouseEnter',
        itemTypes: ['node'],
        getContent: (e) => {
          if (e.item.getModel().group) return
          const outDiv = document.createElement('div')
          outDiv.style.width = 'fit-content'
          outDiv.innerHTML = `
      <h4>资产: ${e.item.getModel().label || e.item.getModel().id}</h4>`
          return outDiv
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
        layout: this.fruchterman,
        animate: true,
        // defaultNode: {
        //   size: 40
        // },
        defaultEdge: {
          style: {
            lineWidth: 0
            // endArrow: {
            //   path: 'M 0,0 L 8,4 L 8,-4 Z',
            //   fill: '#e2e2e2'
            // }
          }
        }
      })
      graph.data(data)
      graph.render()
      graph.on('afterlayout', () => {
        locknode()
        const hull5 = graph.createHull({
          id: 'hull5',
          members: ['group1', '0', '1', '2', '3', '4', '5', '6', '7', '8'],
          padding: 20,
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
        const hull6 = graph.createHull({
          id: 'hull6',
          //   type: 'bubble',
          members: ['9', '10', '11'],
          //   nonMembers: ['9', '10', '11', '12'],
          padding: 3,
          style: {
            fill: '#ffffff',
            lineWidth: 0,
            // fill: '#ffffff',
            opacity: 0.7,
            shadowColor: '#8CAAF2',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 10
          }
        })
        const hull1 = graph.createHull({
          id: 'hull1',
          members: ['13', '14', '15', '16', '17'],
          padding: 10,
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
        const hull2 = graph.createHull({
          id: 'hull2',
          type: 'smooth-convex ',
          members: [
            'group1',
            '0',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12'
          ],
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
        const hull3 = graph.createHull({
          id: 'hull3',
          members: [
            '18',
            '19',
            '20',
            '21',
            '22',
            '23',
            '24',
            '25',
            '26',
            '27',
            '28',
            '29',
            '30'
          ],
          padding: 10,
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
        const hull4 = graph.createHull({
          id: 'hull4',
          members: ['31', '32', '33'],
          padding: 10,
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
        graph.on('afterupdateitem', (e) => {
          // update时，4级资产组的hull要在3级资产组之前
          hull5.updateData(hull5.members)
          hull6.updateData(hull6.members)
          hull1.updateData(hull1.members)
          hull2.updateData(hull2.members)
          hull3.updateData(hull3.members)
          hull4.updateData(hull4.members)
        })
      })
      // graph.on('node:dblclick', (e) => {
      //   if (this.hightlightNode) {
      //     const node = graph.findById(this.hightlightNode)
      //     graph.setItemState(node, 'selected', false)
      //   }
      //   graph.setItemState(e.item, 'selected', true)
      //   this.hightlightNode = e.item.getModel().id
      //   this.detail = e.item.getModel()
      //   this.showText = true
      // })
      graph.on('node:click', (e) => {
        if (e.item.getModel().group) return
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
        this.position.x = e.item.getModel().x
        this.position.y = e.item.getModel().y
      })
      graph.on('node:dragend', (e) => {
        graph.updateItem(e.item, {
          x: this.position.x,
          y: this.position.y
        })
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
      const locknode = () => {
        this.gourpNodes.forEach((id) => {
          const node = graph.findById(id)
          node.lock()
        })
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
#graph-container {
  border: 1px dotted gray;
  width: 100%;
  height: 100%;
  background: url('./BG.png');
}
</style>
