<template>
  <div class="container">
    <div v-if="showText" class="text-container" @click="cancel">
      <div class="label-box">
        <div class="label-box-left">1</div>
        <div class="label-box-right">2</div>
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
          { source: '0', target: '4' },
          {
            source: '4',
            target: '5'
          },
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
            target: '0'
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
        const num1 = node.id % 2
        const num2 = node.id % 3
        node.type = num1 === 0 ? 'assetA' : 'assetB'
        node.img = num2 === 0 ? this.firewallImg : this.serverImg
        node.label = ''
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
      const graph = new G6.Graph({
        container: 'graph-container',
        width,
        height,
        modes: {
          default: ['drag-canvas', 'zoom-canvas']
        },
        layout: this.fruchterman,
        animate: true,
        defaultNode: {
          size: 40
        },
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
        const hull5 = graph.createHull({
          id: 'hull5',
          members: ['0', '1', '2', '3', '4', '5', '6', '7', '8'],
          padding: 3,
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
          padding: 30,
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
      })
      graph.on('node:dblclick', (e) => {
        console.log(e.item)
        this.showText = true
      })
      graph.on('node:mouseenter', (e) => {
        graph.setItemState(e.item, 'active', true)
      })
      graph.on('node:mouseleave', (e) => {
        graph.setItemState(e.item, 'active', false)
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
      return graph
    },
    drawGraphTest() {
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
            id: '40',
            label: '40',
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
          {
            source: '4',
            target: '5'
          },
          {
            source: '5',
            target: '0'
          },
          {
            source: '6',
            target: '7'
          },
          {
            source: '6',
            target: '8'
          },
          {
            source: '6',
            target: '9'
          },
          {
            source: '6',
            target: '10'
          },
          {
            source: '6',
            target: '11'
          },
          {
            source: '13',
            target: '14'
          },
          {
            source: '13',
            target: '15'
          },
          {
            source: '13',
            target: '16'
          },
          {
            source: '13',
            target: '17'
          },
          {
            source: '18',
            target: '19'
          },
          {
            source: '18',
            target: '20'
          },
          {
            source: '18',
            target: '21'
          },
          {
            source: '22',
            target: '23'
          },
          {
            source: '22',
            target: '24'
          },
          {
            source: '22',
            target: '25'
          },
          {
            source: '22',
            target: '26'
          },
          {
            source: '22',
            target: '27'
          },
          {
            source: '22',
            target: '28'
          },
          {
            source: '22',
            target: '29'
          },
          {
            source: '22',
            target: '30'
          },
          {
            source: '31',
            target: '32'
          },
          {
            source: '31',
            target: '33'
          }
        ]
      }
      data.nodes.forEach((node) => {
        node.type = 'assetA'
        node.img = this.serverImg
        // node.label = ''
      })
      const colors = [
        '#BDD2FD',
        '#BDEFDB',
        '#C2C8D5',
        '#FBE5A2',
        '#F6C3B7',
        '#B6E3F5',
        '#D3C6EA',
        '#FFD8B8',
        '#AAD8D8',
        '#FFD6E7'
      ]
      const strokes = [
        '#5B8FF9',
        '#5AD8A6',
        '#5D7092',
        '#F6BD16',
        '#E8684A',
        '#6DC8EC',
        '#9270CA',
        '#FF9D4D',
        '#269A99',
        '#FF99C3'
      ]

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
      const graph = new G6.Graph({
        container: 'graph-container',
        width,
        height,
        modes: {
          default: ['drag-canvas', 'zoom-canvas']
        },
        layout: {
          type: 'force',
          linkDistance: 80,
          preventOverlap: true,
          nodeStrength: -10,
          clustering: true,
          clusterNodeSize: 1,
          clusterEdgeDistance: 20,
          clusterEdgeStrength: 100,
          clusterNodeStrength: 10
        },
        animate: true,
        defaultNode: {
          size: 40
        },
        defaultEdge: {
          style: {
            // lineWidth: 0
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              fill: '#e2e2e2'
            }
          }
        }
      })
      graph.data(data)
      graph.render()
      graph.on('afterlayout', () => {
        const hull1 = graph.createHull({
          id: 'hull1',
          members: ['13', '14', '15', '16', '17'],
          padding: 10,
          style: {
            fill: 'blue',
            lineWidth: 0,
            stroke: 'green'
            // opacity: 0.1
          }
        })
        const hull2 = graph.createHull({
          id: 'hull2',
          type: 'smooth-convex ',
          members: [
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
          padding: 10,
          style: {
            fill: 'lightgreen',
            stroke: 'green'
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
            fill: 'lightgreen',
            stroke: 'green'
          }
        })
        const hull4 = graph.createHull({
          id: 'hull4',
          members: ['31', '32', '33'],
          padding: 10,
          style: {
            fill: 'lightgreen',
            stroke: 'green'
          }
        })
        // const hull5 = graph.createHull({
        //   id: 'hull5',
        //   type: 'bubble',
        //   members: ['0', '1', '2', '3', '4', '5', '6', '7', '8'],
        //   nonMembers: ['9', '10', '11', '12'],
        //   padding: 10,
        //   style: {
        //     fill: 'blue'
        //   }
        // })
      })
      graph.on('node:dblclick', (e) => {
        console.log(e.item)
        this.showText = true
      })
      graph.on('node:mouseenter', (e) => {
        graph.setItemState(e.item, 'active', true)
      })
      graph.on('node:mouseleave', (e) => {
        graph.setItemState(e.item, 'active', false)
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
    width: 550px;
    height: 635px;
    display: flex;
    border: 1px solid white;
    .label-box-left {
      width: 300px;
      height: 100%;
      border: 1px solid blue;
    }
    .label-box-right {
      width: 250px;
      height: 100%;
      border: 1px solid blue;
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
