<template>
  <div class="container">
    <div class="btn-container">
      <el-button @click="refreshGraph">刷新数据</el-button>
      <div class="add-item">
        <el-input v-model="newId" placeholder="id" />
        <el-input v-model="newLable" placeholder="label" />
        <el-button @click="addNode">添加节点</el-button>
      </div>
      <div class="add-item">
        <el-input v-model="newSource" placeholder="source" />
        <el-input v-model="newTarget" placeholder="target" />
        <el-button @click="addEdge">添加关联</el-button>
      </div>
      <div class="type-menu">
        <el-select
          v-model="layoutType"
          placeholder="请选择"
          @change="changeLayout"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <div class="btn-container">
      <!-- <div class="add-item">
        <el-input v-model="newId" placeholder="id" />
        <el-input v-model="newLable" placeholder="label" />
        <el-button @click="addNode">添加节点</el-button>
      </div>
      <div class="add-item">
        <el-input v-model="newSource" placeholder="source" />
        <el-input v-model="newTarget" placeholder="target" />
        <el-button @click="addEdge">添加节点</el-button>
      </div> -->
    </div>
    <div id="graph-container" />
  </div>
</template>

<script>
import G6 from '@antv/g6'
export default {
  name: 'AntVGraph',
  data() {
    return {
      data: {
        nodes: [
          {
            id: '0',
            label: '0'
          },
          {
            id: '1',
            label: '1'
          },
          {
            id: '2',
            label: '2'
          },
          {
            id: '3',
            label: '3'
          },
          {
            id: '4',
            label: '4'
          },
          {
            id: '5',
            label: '5'
          },
          {
            id: '6',
            label: '6'
          },
          {
            id: '7',
            label: '7'
          },
          {
            id: '8',
            label: '8'
          },
          {
            id: '9',
            label: '9'
          }
        ],
        edges: [
          {
            source: '0',
            target: '1'
          },
          {
            source: '0',
            target: '2'
          },
          {
            source: '0',
            target: '3'
          },
          {
            source: '0',
            target: '4'
          },
          {
            source: '0',
            target: '5'
          },
          {
            source: '0',
            target: '7'
          },
          {
            source: '0',
            target: '8'
          },
          {
            source: '0',
            target: '9'
          },
          {
            source: '2',
            target: '3'
          },
          {
            source: '4',
            target: '5'
          },
          {
            source: '4',
            target: '6'
          },
          {
            source: '8',
            target: '9'
          }
        ]
      },
      options: [
        {
          value: 'random',
          label: 'random'
        },
        {
          value: 'gForce',
          label: 'gForce'
        },
        {
          value: 'force',
          label: 'force'
        },
        {
          value: 'radial',
          label: 'radial'
        },
        {
          value: 'circular',
          label: 'circular'
        },
        {
          value: 'concentric',
          label: 'concentric'
        }
      ],
      instance: '',
      newId: '',
      newLable: '',
      newSource: '',
      newTarget: '',
      layoutType: 'gForce'
    }
  },
  mounted() {
    this.drawGraph()
  },
  methods: {
    addEdge() {
      const newEdge = {
        source: this.newSource,
        target: this.newTarget
      }
      this.instance.addItem('edge', newEdge)
      this.instance.layout()
      this.newSource = ''
      this.newTarget = ''
    },
    addNode() {
      const newNode = {
        id: this.newId,
        label: this.newLable
      }
      this.instance.addItem('node', newNode)
      this.instance.layout()
      this.newId = ''
      this.newLable = ''
    },
    refreshGraph() {
      // this.instance.read(this.data)
      this.instance.data(this.data)
      this.instance.render()
    },
    drawGraph() {
      const container = document.getElementById('graph-container')
      const width = container.scrollWidth
      const height = container.scrollHeight
      this.instance = new G6.Graph({
        container: 'graph-container', // dom id
        width,
        height,
        fitView: false,
        fitViewPadding: 40,
        autoPaint: true,
        layout: {
          // type: 'circular', // 环形
          // type: 'radial', // 放射形
          type: this.layoutType,
          preventOverlap: true
        },
        modes: {
          default: [
            { type: 'drag-node' },
            'zoom-canvas',
            {
              type: 'tooltip',
              formatText(model) {
                return model.id
              },
              offset: 0
            }
          ]
        },
        defaultNode: {
          size: 30,
          type: 'circular',
          style: {
            fill: 'lightgreen', // 节点填充色
            stroke: 'lightblue', // 节点描边色
            lineWidth: 0,
            shadowOffsetX: 3,
            // shadowOffsetY: 3,
            shadowColor: 'gray',
            shadowBlur: 8,
            cursor: 'pointer'
          },
          labelCfg: {
            style: {
              fill: 'white',
              fontSize: 16
            }
          }
        },
        defaultEdge: {
          style: {
            lineWidth: 3,
            stroke: 'grey'
          }
        },
        nodeStateStyles: {
          // 鼠标 hover 上节点，即 hover 状态为 true 时的样式
          hover: {
            fill: 'lightsteelblue'
          },
          // 鼠标点击节点，即 click 状态为 true 时的样式
          click: {
            stroke: '#000',
            lineWidth: 3
          }
        },
        // 边不同状态下的样式集合
        edgeStateStyles: {
          // 鼠标点击边，即 click 状态为 true 时的样式
          click: {
            stroke: 'steelblue'
          }
        }
      })
      const data = JSON.parse(JSON.stringify(this.data))
      // data在渲染时G6会更改data的某些属性，所以最好使用深拷贝的数据
      this.instance.data(data)
      this.instance.render()

      function refreshDragedNodePosition(e) {
        // 获取每个节点原本的位置
        const model = e.item.get('model')
        model.fx = e.x
        model.fy = e.y
      }
      // this.instance.on('node:dragstart', (e) => {
      //   this.instance.layout()
      //   refreshDragedNodePosition(e)
      // })
      // this.instance.on('node:drag', (e) => {
      //   refreshDragedNodePosition(e)
      // })
      this.instance.on('node:mouseenter', (e) => {
        const nodeItem = e.item
        this.instance.setItemState(nodeItem, 'hover', true)
      })
      this.instance.on('node:mouseleave', (e) => {
        const nodeItem = e.item
        this.instance.setItemState(nodeItem, 'hover', false)
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
    },
    changeLayout() {
      this.instance.destroy()
      this.drawGraph()
    }
  }
}
</script>

<style>
.container {
  width: 100%;
  height: 100%;
}
.btn-container {
  height: 40px;
  display: flex;
}
.add-item {
  display: flex;
  margin-left: 20px;
}
.type-menu {
  width: 200px;
  margin-left: 20px;
}
#graph-container {
  border: 1px dotted gray;
  width: 100%;
  height: calc(100% - 100px);
}
.el-button {
  height: 36px;
}
.g6-tooltip {
  padding: 10px 6px;
  color: #444;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #e2e2e2;
  border-radius: 4px;
}
</style>
