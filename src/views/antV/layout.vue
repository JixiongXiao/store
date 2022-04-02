<template>
  <div class="container">
    <div id="graph-container" />
  </div>
</template>

<script>
import G6 from '@antv/g6'
export default {
  name: 'Layout',
  data() {
    return {
      instance: '',
      nodes: [],
      edges: [],
      concentric: {
        type: 'concentric',
        sortBy: 'level',
        minNodeSpacing: 2,
        preventOverlap: true,
        maxLevelDiff: 1,
        equidistant: true,
        startAngle: 5
      },
      circular: {
        type: 'circular',
        startRadius: 10,
        endRadius: 1800
      }
    }
  },
  mounted() {
    this.createNode()
    this.createEdge()
    this.drawGraph()
  },
  methods: {
    createNode() {
      for (let i = 0; i < 80; i++) {
        const node = {
          id: i + 1 + 'node',
          label: i + 1,
          level: ''
        }
        if (i < 20) {
          node.level = 3
        } else if (i >= 20 && i < 40) {
          node.level = 2
        } else {
          node.level = 1
        }
        this.nodes.push(node)
      }
    },
    createEdge() {
      this.edges = [
        {
          source: '11node',
          target: '80node'
        }
      ]
    },
    drawGraph() {
      const container = document.getElementById('graph-container')
      const width = container.scrollWidth
      const height = container.scrollHeight || 500
      const data = {
        nodes: this.nodes,
        edges: this.edges
      }
      const graph = new G6.Graph({
        container: 'graph-container',
        width,
        height,
        modes: {
          default: ['zoom-canvas', 'drag-canvas', 'drag-node']
        },
        layout: this.concentric,
        animate: false,
        defaultNode: {
          size: 20
        },
        defaultEdge: {
          style: {
            lineWidth: 3,
            stroke: 'grey'
          },
          type: 'cubic-vertical',
          label: '边'
        }
        // defaultEdge: {
        //   style: {
        //     stroke: '#eaff8f',
        //     lineWidth: 5
        //   }
        // }
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
      graph.data(data)
      graph.render()
      //   fetch(
      //     'https://gw.alipayobjects.com/os/basement_prod/8dacf27e-e1bc-4522-b6d3-4b6d9b9ed7df.json'
      //   )
      //     .then((res) => res.json())
      //     .then((data) => {
      //       graph.data(data)
      //       graph.render()
      //     })
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
