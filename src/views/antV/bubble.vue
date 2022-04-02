<template>
  <div class="container">
    <div id="graph-container" />
  </div>
</template>

<script>
import G6 from '@antv/g6'
export default {
  name: 'AntVBubble',
  data() {
    return {
      instance: ''
    }
  },
  mounted() {
    this.drawGraph()
  },
  methods: {
    drawGraph() {
      const data = {
        nodes: [
          { id: 'node0', size: 50 },
          { id: 'node1', size: 30 },
          { id: 'node2', size: 30 },
          { id: 'node3', size: 30 },
          { id: 'node4', size: 30, isLeaf: true },
          { id: 'node5', size: 30, isLeaf: true },
          { id: 'node6', size: 15, isLeaf: true },
          { id: 'node7', size: 15, isLeaf: true },
          { id: 'node8', size: 15, isLeaf: true },
          { id: 'node9', size: 15, isLeaf: true },
          { id: 'node10', size: 15, isLeaf: true },
          { id: 'node11', size: 15, isLeaf: true },
          { id: 'node12', size: 15, isLeaf: true },
          { id: 'node13', size: 15, isLeaf: true },
          { id: 'node14', size: 15, isLeaf: true },
          { id: 'node15', size: 15, isLeaf: true },
          { id: 'node16', size: 15, isLeaf: true }
        ],
        edges: [
          { source: 'node0', target: 'node1' },
          { source: 'node0', target: 'node2' },
          { source: 'node0', target: 'node3' },
          { source: 'node0', target: 'node4' },
          { source: 'node0', target: 'node5' },
          { source: 'node1', target: 'node6' },
          { source: 'node1', target: 'node7' },
          { source: 'node2', target: 'node8' },
          { source: 'node2', target: 'node9' },
          { source: 'node2', target: 'node10' },
          { source: 'node2', target: 'node11' },
          { source: 'node2', target: 'node12' },
          { source: 'node2', target: 'node13' },
          { source: 'node3', target: 'node14' },
          { source: 'node3', target: 'node15' },
          { source: 'node3', target: 'node16' }
        ]
      }
      const nodes = data.nodes

      const descriptionDiv = document.createElement('div')
      descriptionDiv.innerHTML = 'Wait for the layout to complete...'
      const container = document.getElementById('graph-container')
      container.appendChild(descriptionDiv)

      const width = container.scrollWidth
      const height = (container.scrollHeight || 500) - 20

      this.instance = new G6.Graph({
        container: 'graph-container',
        width,
        height,
        modes: {
          default: ['drag-canvas', 'zoom-canvas', 'lasso-select']
        },
        layout: {
          type: 'force',
          preventOverlap: true,
          linkDistance: (d) => {
            if (d.source.id === 'node0') {
              return 300
            }
            return 60
          },
          nodeStrength: (d) => {
            if (d.isLeaf) {
              return -50
            }
            return -10
          },
          edgeStrength: (d) => {
            if (
              d.source.id === 'node1' ||
              d.source.id === 'node2' ||
              d.source.id === 'node3'
            ) {
              return 0.7
            }
            return 0.1
          }
        }
      })
      this.instance.data({
        nodes,
        edges: data.edges.map(function(edge, i) {
          edge['id'] = 'edge' + i
          return Object.assign({}, edge)
        })
      })
      this.instance.render()

      const centerNodes = this.instance
        .getNodes()
        .filter((node) => !node.getModel().isLeaf)

      this.instance.on('afterlayout', () => {
        descriptionDiv.innerHTML = ''
        const hull1 = this.instance.createHull({
          id: 'centerNode-hull',
          type: 'bubble',
          members: centerNodes,
          //   nonMembers: ['node6', 'node7'],
          padding: 20,
          style: {
            fill: '#1890ff',
            stroke: '#FE9797',
            lineWidth: 2,
            lineDash: [5, 5],
            fillOpacity: 0.9
          }
        })

        const hull2 = this.instance.createHull({
          id: 'leafNode-hull1',
          members: ['node6', 'node7'],
          padding: 10,
          style: {
            fill: 'lightgreen',
            stroke: 'green'
          }
        })

        const hull3 = this.instance.createHull({
          id: 'leafNode-hull2',
          members: ['node8', 'node9', 'node10', 'node11', 'node12', 'node13'],
          padding: 10,
          style: {
            fill: 'lightgreen',
            stroke: 'green'
          }
        })

        this.instance.on('afterupdateitem', (e) => {
          hull1.updateData(hull1.members)
          hull2.updateData(hull2.members)
          hull3.updateData(hull3.members)
        })
      })

      if (typeof window !== 'undefined') {
        window.onresize = () => {
          if (!this.instance || this.instance.get('destroyed')) return
          if (!container || !container.scrollWidth || !container.scrollHeight) {
            return
          }
          this.instance.changeSize(
            container.scrollWidth,
            container.scrollHeight - 20
          )
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}
#graph-container {
  border: 1px dotted gray;
  width: 100%;
  height: calc(100% - 100px);
}
</style>
