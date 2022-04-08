<template>
  <div class="container">
    <div id="graph-container" />
    <el-button @click="test">测试</el-button>
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
      combos: [],
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
      },
      random: {
        type: 'random',
        preventOverlap: true
      },
      comboForce: {
        type: 'comboForce',
        // linkDistance: 200,
        nodeStrength: 0,
        preventOverlap: true,
        preventNodeOverlap: true,
        preventComboOverlap: true,
        comboSpacing: 10,
        comboPadding: 30,
        gravity: 0,
        comboGravity: 10,
        nodeSpacing: (d) => 20
      },
      comboCombined: {
        type: 'comboCombined',
        outerLayout: new G6.Layout['gForce']({
          gravity: 5,
          factor: 2
          // linkDistance: (edge, source, target) => {
          //   const nodeSize =
          //     ((source.size?.[0] || 30) + (target.size?.[0] || 30)) / 2
          //   return Math.min(nodeSize * 1.5, 700)
          // }
        }),
        innerLayout: new G6.Layout['concentric']({
          sortBy: 'id',
          minNodeSpacing: 10
        })
      }
    }
  },
  mounted() {
    this.createNode()
    this.createEdge()
    this.createCombo()
    this.drawGraph()
  },
  methods: {
    test() {
      // zoom
      // this.instance.zoom(3, { x: 300, y: 300 }, true, { duration: 300 })

      // focuse node
      // const nodeCfg = this.instance.findById('1node').get('model')
      // this.instance.focusItem('1node', true, {
      //   duration: 300
      // })

      // 获取zoom比例
      // console.log(this.instance.getZoom())

      // 手动关闭commbo
      this.instance.collapseExpandCombo('a')
    },
    createNode() {
      for (let i = 0; i < 60; i++) {
        const node = {
          id: i + 1 + 'node',
          label: i + 1,
          level: ''
        }
        if (i < 20) {
          node.level = 3
          node.comboId = 'combo3'
        } else if (i >= 20 && i < 40) {
          node.level = 2
          node.comboId = 'combo2'
        } else {
          node.level = 1
          node.comboId = 'combo1'
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
    createCombo() {
      this.combos = [
        { id: 'combo1', label: 'Combo 1' },
        { id: 'combo2', label: 'Combo 2' },
        { id: 'combo3', label: 'Combo 3' }
      ]
    },
    drawGraph() {
      const container = document.getElementById('graph-container')
      const width = container.scrollWidth
      const height = container.scrollHeight || 500
      // const data = {
      //   nodes: this.nodes,
      //   combos: this.combos
      // }
      const data = {
        nodes: [
          {
            id: '0',
            comboId: 'a'
          },
          {
            id: '1',
            comboId: 'a'
          },
          {
            id: '2',
            comboId: 'a'
          },
          {
            id: '3',
            comboId: 'a'
          },
          {
            id: '4',
            comboId: 'a'
          },
          {
            id: '5',
            comboId: 'a'
          },
          {
            id: '6',
            comboId: 'a'
          },
          {
            id: '7',
            comboId: 'a'
          },
          {
            id: '8',
            comboId: 'a'
          },
          {
            id: '9',
            comboId: 'a'
          },
          {
            id: '10',
            comboId: 'a'
          },
          {
            id: '11',
            comboId: 'a'
          },
          {
            id: '12',
            comboId: 'a'
          },
          {
            id: '13',
            comboId: 'a'
          },
          {
            id: '14',
            comboId: 'a'
          },
          {
            id: '15',
            comboId: 'a'
          },
          {
            id: '16',
            comboId: 'b'
          },
          {
            id: '17',
            comboId: 'b'
          },
          {
            id: '18',
            comboId: 'b'
          },
          {
            id: '19',
            comboId: 'b'
          },
          {
            id: '23',
            comboId: 'c'
          },
          {
            id: '24',
            comboId: 'a'
          },
          {
            id: '27',
            comboId: 'c'
          },
          {
            id: '28',
            comboId: 'c'
          },
          {
            id: '29',
            comboId: 'c'
          },
          {
            id: '30',
            comboId: 'c'
          },
          {
            id: '31',
            comboId: 'c'
          },
          {
            id: '32',
            comboId: 'd'
          },
          {
            id: '33',
            comboId: 'd'
          }
        ],
        combos: [
          {
            id: 'a',
            label: 'Combo A'
          },
          {
            id: 'b',
            label: 'Combo B'
          },
          {
            id: 'c',
            label: 'Combo c'
          },
          {
            id: 'd',
            label: 'Combo D'
          }
        ]
      }
      this.instance = new G6.Graph({
        container: 'graph-container',
        width,
        height,
        modes: {
          default: [
            'zoom-canvas',
            'drag-canvas',
            'drag-combo',
            {
              type: 'collapse-expand-combo',
              trigger: 'dbclick',
              relayout: false // 收缩展开后，不重新布局
            }
          ]
        },
        animate: false,
        animateCfg: {
          duration: 2000, // Number，一次动画的时长
          easing: 'linearEasing' // String，动画函数
        },
        groupByTypes: false,
        layout: this.comboCombined,
        defaultNode: {
          size: 20
        },
        defaultEdge: {
          style: {
            lineWidth: 3,
            stroke: 'grey'
          }
        },
        comboStateStyles: {
          dragenter: {
            lineWidth: 4,
            stroke: '#FE9797'
          }
        },
        defaultCombo: {
          type: 'circle',
          size: 40,
          padding: 10,
          style: {
            lineWidth: 1
          },
          labelCfg: {
            refY: 10,
            refX: 20,
            position: 'top'
          }
        }
        // defaultEdge: {
        //   style: {
        //     stroke: '#eaff8f',
        //     lineWidth: 5
        //   }
        // }
      })
      this.instance.data(data)
      this.instance.render()
      this.instance.collapseExpandCombo('a')
      this.instance.collapseExpandCombo('b')
      this.instance.collapseExpandCombo('c')
      this.instance.collapseExpandCombo('d')
      this.instance.on('combo:dragend', (e) => {
        this.instance.getCombos().forEach((combo) => {
          this.instance.setItemState(combo, 'dragenter', false)
        })
      })
      this.instance.on('node:dragend', (e) => {
        this.instance.getCombos().forEach((combo) => {
          this.instance.setItemState(combo, 'dragenter', false)
        })
      })

      this.instance.on('combo:dragenter', (e) => {
        this.instance.setItemState(e.item, 'dragenter', true)
      })
      this.instance.on('combo:dragleave', (e) => {
        this.instance.setItemState(e.item, 'dragenter', false)
      })

      this.instance.on('combo:mouseenter', (evt) => {
        const { item } = evt
        this.instance.setItemState(item, 'active', true)
      })

      this.instance.on('combo:mouseleave', (evt) => {
        const { item } = evt
        this.instance.setItemState(item, 'active', false)
      })
      if (typeof window !== 'undefined') {
        window.onresize = () => {
          if (!this.instance || this.instance.get('destroyed')) return
          if (!container || !container.scrollWidth || !container.scrollHeight) {
            return
          }
          this.instance.changeSize(
            container.scrollWidth,
            container.scrollHeight
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
