<template>
  <div class="container">
    <div class="btn-container">
      <el-button @click="refreshGraph">重新刷新</el-button>
      <div class="add-item">
        <el-input v-model="newId" placeholder="id" />
        <el-input v-model="newLable" placeholder="label" />
        <el-button @click="addNode">添加节点</el-button>
      </div>
      <div class="add-item">
        <el-input v-model="newSource" placeholder="source" />
        <el-input v-model="newTarget" placeholder="target" />
        <el-button @click="addEdge">添加节点</el-button>
      </div>
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
      instance: '',
      newId: '',
      newLable: '',
      newSource: '',
      newTarget: ''
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
      this.instance.read(this.data)
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
        layout: {
          // type: 'circular', // 环形
          // type: 'radial', // 放射形
          type: 'gForce',
          preventOverlap: true,
          nodeSize: 20
        },
        modes: {
          default: ['drag-node']
        },
        defaultNode: {
          size: 20
        }
      })
      this.instance.data(this.data)
      this.instance.render()

      function refreshDragedNodePosition(e) {
        // 获取每个节点原本的位置
        const model = e.item.get('model')
        model.fx = e.x
        model.fy = e.y
      }
      this.instance.on('node:dragstart', (e) => {
        this.instance.layout()
        refreshDragedNodePosition(e)
      })
      this.instance.on('node:drag', (e) => {
        this.instance.layout()
        refreshDragedNodePosition(e)
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

<style>
.container {
  width: 100%;
  height: 100%;
}
.btn-container {
  height: 100px;
  display: flex;
}
.add-item {
  display: flex;
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
</style>
