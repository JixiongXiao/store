<template>
  <div class="container">
    <div id="graph-container" />
    <!-- <div id="g6-demo" /> -->
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
    // this.initDemo()
  },
  methods: {
    drawGraph() {
      const nodes = []
      for (let i = 0; i <18; i++) {
        const node = {
          id:`node${i}`,
          size:48,
          type: 'hexagonNode', 
          animate:false
        }
        nodes.push(node)
      }
      const data = {
        nodes: nodes
      }
      // const descriptionDiv = document.createElement('div')
      // descriptionDiv.innerHTML =
      //   'Double click the combo to collapse/expand it. Drag the node or combo to change the hierarchy.'
      const container = document.getElementById('graph-container')
      // container.appendChild(descriptionDiv)

      const width = container.scrollWidth
      const height = (container.scrollHeight || 500) - 20
      // const group =
      const graph = new G6.Graph({
        container: 'graph-container',
        width,
        height,
        groupByTypes: false,
        layout: {
        type: 'beehive-layout',
        gap:1,
        startPoint:[24,24]
        },
        defaultCombo: {
          type: 'circle',
          size: [40, 10], // The minimum size of the Combo
          padding: [30, 20, 10, 20],
          style: {
            lineWidth: 1
          },
          labelCfg: {
            refY: 10,
            refX: 20,
            position: 'top'
          }
        },
        comboStateStyles: {
          dragenter: {
            lineWidth: 4,
            stroke: '#FE9797'
          }
        },
        modes: {
          default: [
            'drag-canvas',
            'zoom-canvas',
            'drag-node',
            'drag-combo',
            'collapse-expand-combo',
            'click-select'
          ]
        }
      })

      graph.data(data)
      graph.render()

      graph.on('combo:dragend', (e) => {
        graph.getCombos().forEach((combo) => {
          graph.setItemState(combo, 'dragenter', false)
        })
      })
      graph.on('node:dragend', (e) => {
        graph.getCombos().forEach((combo) => {
          graph.setItemState(combo, 'dragenter', false)
        })
      })

      graph.on('combo:dragenter', (e) => {
        graph.setItemState(e.item, 'dragenter', true)
      })
      graph.on('combo:dragleave', (e) => {
        graph.setItemState(e.item, 'dragenter', false)
      })

      graph.on('combo:mouseenter', (evt) => {
        const { item } = evt
        graph.setItemState(item, 'active', true)
      })

      graph.on('combo:mouseleave', (evt) => {
        const { item } = evt
        graph.setItemState(item, 'active', false)
      })

      if (typeof window !== 'undefined') {
        window.onresize = () => {
          if (!graph || graph.get('destroyed')) return
          if (!container || !container.scrollWidth || !container.scrollHeight) {
            return
          }
          graph.changeSize(container.scrollWidth, container.scrollHeight - 20)
        }
      }
    },
    initDemo() {
      // 自定义节点样式

      G6.registerNode(
        'multipleLabelsNode',

        {
          options: {
            size: 60,
            style: {
              lineWidth: 1
            },

            stateStyles: {
              // 鼠标hover状态下的配置

              hover: {
                fillOpacity: 0.8,

                cursor: 'move' // 鼠标放到非label的位置，可交互
              },

              // 选中节点状态下的配置

              selected: {
                lineWidth: 3
              }
            }
          },

          // 绘制节点

          draw: function draw(cfg, group) {
            var shape = this.drawShape(cfg, group)

            if (cfg.label && cfg.label.length) {
              this.drawLabel(cfg, group)
            }

            return shape
          },

          // 绘制label

          drawLabel: function drawLabel(cfg, group) {
            var size = this.getSize(cfg)

            var width = size[0]

            // const height = size[1];

            var label = cfg.label

            // 绘制第一个label

            group.addShape('text', {
              attrs: {
                text: label[0] || '',

                x: 0 - width / 2 + 5,

                y: -5,

                fill: '#595959',

                textAlign: 'left',

                textBaseline: 'middle'
              }
            })

            if (label.length > 1) {
              // 绘制第二个label

              group.addShape('text', {
                attrs: {
                  text: '\n\n' + label[1] || '',

                  x: -5,

                  y: 0,

                  fill: '#1890ff',

                  textAlign: 'left',

                  textBaseline: 'middle',

                  fontWeight: 'bold'
                }
              })
            }
          }
        },

        'circle'
      )

      var data = {
        nodes: [
          {
            x: 300,

            y: 300,

            label: ['这个文案也有点长', 'A'],

            id: 'node1',

            // labelCfg: {

            //   position: 'center'

            // },

            size: 150,

            type: 'multipleLabelsNode'

            // anchorPoints: [

            //   [0, 0.5],

            //   [1, 0.5]

            // ]
          },

          {
            x: 600,

            y: 300,

            label: ['这个文案也有点长', 'B'],

            id: 'node2',

            // labelCfg: {

            //   position: 'center'

            // },

            size: 50,

            type: 'multipleLabelsNode'

            // anchorPoints: [

            //   [0, 0.5],

            //   [1, 0.5]

            // ]
          }
        ],

        edges: [
          {
            source: 'node1',

            target: 'node2',

            label: 'label上面这个文本太长了我需要换行',

            labelCfg: {
              refY: 15
            },

            style: {
              endArrow: true
            }
          }
        ]
      }

      // 鼠标悬浮框

      const tooltip = new G6.Tooltip({
        offsetX: 100,

        offsetY: 0,

        trigger: 'click',

        itemTypes: ['node'],

        getContent: (e) => {
          const outDiv = document.createElement('div')

          outDiv.style.width = 'fit-content'

          outDiv.innerHTML = `

            <h4>Custom Content</h4>

            <ul>

              <li>Label: ${e.item.getModel().label || e.item.getModel().id}</li>

            </ul>`

          // outDiv.innerHTML = `

          //   <h4>Custom Content</h4>

          //   // <ul>

          //   //   <li>level: ${e.item.getModel().level}</li>

          //   // </ul>

          //   <ul>

          //     <li>Label: ${e.item.getModel().label || e.item.getModel().id}</li>

          //   </ul>`

          return outDiv
        }
      })

      var graph = new G6.Graph({
        container: 'g6-demo',

        width: 1000,

        height: 600,

        // fitView: true,

        plugins: [tooltip],
        layout: {
          type: 'force'
        },
        nodeStateStyles: {
          hover: {
            // hover 状态为 true 时的样式

            fill: '#1890ff'
          },

          running: {
            // running 状态为 true 时的样式

            stroke: 'steelblue'
          }
        },

        edgeStateStyles: {
          hover: {
            opacity: 0.6
          }
        },

        defaultNode: {
          style: {
            fill: '#87e8de'
          },

          color: '#87e8de'
        },

        defaultEdge: {
          color: '#bae7ff'
        },

        modes: {
          default: [
            {
              type: 'drag-node',

              delegate: false
            },

            'drag-canvas',

            {
              type: 'zoom-canvas',

              sensitivity: 0.5
            }
          ]
        }
      })

      // 计算字符串的长度

      var calcStrLen = (str) => {
        var len = 0

        for (var i = 0; i < str.length; i++) {
          if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) {
            len++
          } else {
            len += 2
          }
        }

        return len
      }

      // 计算显示的字符串

      var fittingString = (str, maxWidth, fontSize) => {
        var fontWidth = fontSize * 1 // 字号+边距

        maxWidth = maxWidth * 1 // 需要根据自己项目调整

        var width = calcStrLen(str) * fontWidth

        var ellipsis = '…'

        if (width > maxWidth) {
          var actualLen = Math.floor((maxWidth - 10) / fontWidth)

          var result = str.substring(0, actualLen) + ellipsis

          return result
        }

        return str
      }

      // 直接修改原生数据中的label字段

      data.nodes.forEach(function(node) {
        return (node.label[0] = fittingString(node.label[0], 50, 12))
      })

      data.edges.forEach(function(edge) {
        return (edge.label = fittingString(edge.label, 120, 12))
      })

      graph.on('node:mouseenter', (e) => {
        graph.setItemState(e.item, 'hover', true)
      })

      graph.on('node:mouseleave', (e) => {
        graph.setItemState(e.item, 'hover', false)
      })

      graph.data(data)

      graph.render()
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
// #g6-demo {
//   border: 1px dotted gray;
//   width: 100%;
//   height: calc(100% - 100px);
// }
</style>
