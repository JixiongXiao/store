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
        gravity: 1,
        clustering: true,
        clusterGravity: 1,
        gpuEnabled: true,
        workerEnabled: true
      },
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
      hullL2: []
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
      console.log(this.assetL2)
      console.log(this.allnodes)
      console.log(this.nodesInGroup)
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
        layout: this.fruchterman,
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
              const hull = createHullLevelB(mem, subGroup)
              this.hullL2.push(hull)
            }
          }
        }
        for (const key in this.assetL2) {
          const mem = []
          this.assetL2[key].forEach((node) => {
            mem.push(node.id)
          })
          const hull = createHullLevelA(mem, key)
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
      if (typeof window !== 'undefined') {
        window.onresize = () => {
          if (!graph || graph.get('destroyed')) return
          if (!container || !container.scrollWidth || !container.scrollHeight) {
            return
          }
          graph.changeSize(container.scrollWidth, container.scrollHeight)
        }
      }
      const createHullLevelA = (mem, index) => {
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
      const createHullLevelB = (mem, index) => {
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
    }
    // drawGraph() {
    //   const data = {
    //     nodes: [
    //       {
    //         id: 'group1_2',
    //         group: true,
    //         label: 'XXX资产组1_2',
    //         cluster: 'a',
    //         type: 'asset-group'
    //       },
    //       {
    //         id: '0',
    //         label: '0',
    //         cluster: 'a',
    //         type: 'assetA',
    //         img: this.serverImg
    //       },
    //       {
    //         id: '1',
    //         label: '1',
    //         cluster: 'a',
    //         type: 'assetA',
    //         img: this.serverImg
    //       },
    //       {
    //         id: '2',
    //         label: '2',
    //         cluster: 'a'
    //       },
    //       {
    //         id: '3',
    //         label: '3',
    //         cluster: 'a'
    //       },
    //       {
    //         id: '4',
    //         label: '4',
    //         cluster: 'a',
    //         type: 'assetA',
    //         img: this.serverImg
    //       },
    //       {
    //         id: '5',
    //         label: '5',
    //         cluster: 'a'
    //       },
    //       {
    //         id: '6',
    //         label: '6',
    //         cluster: 'a'
    //       },
    //       {
    //         id: '7',
    //         label: '7',
    //         cluster: 'a'
    //       },
    //       {
    //         id: '8',
    //         label: '8',
    //         cluster: 'a'
    //       },
    //       {
    //         id: '9',
    //         label: '9',
    //         cluster: 'a'
    //       },
    //       {
    //         id: 'group1-3',
    //         group: true,
    //         label: 'XXX资产组1-3',
    //         cluster: 'a',
    //         type: 'asset-group'
    //       },
    //       {
    //         id: '10',
    //         label: '10',
    //         cluster: 'a'
    //       },
    //       {
    //         id: '11',
    //         label: '11',
    //         cluster: 'a'
    //       },
    //       {
    //         id: 'group1',
    //         group: true,
    //         label: 'XXX资产组1',
    //         cluster: 'a',
    //         type: 'asset-group'
    //       },
    //       {
    //         id: '12',
    //         label: '12',
    //         cluster: 'a'
    //       },
    //       {
    //         id: '13',
    //         label: '13',
    //         cluster: 'b'
    //       },
    //       {
    //         id: '14',
    //         label: '14',
    //         cluster: 'b'
    //       },
    //       {
    //         id: '15',
    //         label: '15',
    //         cluster: 'b'
    //       },
    //       {
    //         id: '16',
    //         label: '16',
    //         cluster: 'b'
    //       },
    //       {
    //         id: '17',
    //         label: '17',
    //         cluster: 'b'
    //       },
    //       {
    //         id: '18',
    //         label: '18',
    //         cluster: 'c'
    //       },
    //       {
    //         id: '19',
    //         label: '19',
    //         cluster: 'c'
    //       },
    //       {
    //         id: '20',
    //         label: '20',
    //         cluster: 'c'
    //       },
    //       {
    //         id: '21',
    //         label: '21',
    //         cluster: 'c'
    //       },
    //       {
    //         id: '22',
    //         label: '22',
    //         cluster: 'c'
    //       },
    //       {
    //         id: '23',
    //         label: '23',
    //         cluster: 'c'
    //       },
    //       {
    //         id: '24',
    //         label: '24',
    //         cluster: 'c'
    //       },
    //       {
    //         id: '25',
    //         label: '25',
    //         cluster: 'c'
    //       },
    //       {
    //         id: '26',
    //         label: '26',
    //         cluster: 'c'
    //       },
    //       {
    //         id: '27',
    //         label: '27',
    //         cluster: 'c'
    //       },
    //       {
    //         id: '28',
    //         label: '28',
    //         cluster: 'c'
    //       },
    //       {
    //         id: '29',
    //         label: '29',
    //         cluster: 'c'
    //       },
    //       {
    //         id: '30',
    //         label: '30',
    //         cluster: 'c'
    //       },
    //       {
    //         id: '31',
    //         label: '31',
    //         cluster: 'd'
    //       },
    //       {
    //         id: '32',
    //         label: '32',
    //         cluster: 'd'
    //       },
    //       {
    //         id: '33',
    //         label: '33',
    //         cluster: 'd'
    //       },
    //       {
    //         id: '34',
    //         label: '34',
    //         cluster: 'e'
    //       },
    //       {
    //         id: '35',
    //         label: '35',
    //         cluster: 'e'
    //       },
    //       {
    //         id: '36',
    //         label: '36',
    //         cluster: 'e'
    //       },
    //       {
    //         id: '37',
    //         label: '37',
    //         cluster: 'e'
    //       }
    //     ],
    //     // 资产组名节点必须和所有节点都生成一条边，才可能被所有节点包围
    //     edges: [
    //       {
    //         source: '0',
    //         target: '1'
    //       },
    //       // {
    //       //   source: '0',
    //       //   target: '6'
    //       // },
    //       {
    //         source: '1',
    //         target: '2'
    //       },
    //       {
    //         source: '2',
    //         target: '3'
    //       },
    //       {
    //         source: '3',
    //         target: '4'
    //       },
    //       { source: '4', target: '5' },
    //       { source: 'group1_2', target: '0' },
    //       { source: 'group1_2', target: '1' },
    //       { source: 'group1_2', target: '2' },
    //       { source: 'group1_2', target: '3' },
    //       { source: 'group1_2', target: '4' },
    //       { source: 'group1_2', target: '5' },
    //       { source: 'group1_2', target: '6' },
    //       { source: 'group1_2', target: '7' },
    //       { source: 'group1_2', target: '8' },
    //       {
    //         source: '5',
    //         target: '6'
    //       },
    //       {
    //         source: '6',
    //         target: '7'
    //       },
    //       {
    //         source: '7',
    //         target: '8'
    //       },
    //       {
    //         source: '8',
    //         target: '0'
    //       },
    //       {
    //         source: '9',
    //         target: '10'
    //       },
    //       {
    //         source: '10',
    //         target: '11'
    //       },
    //       {
    //         source: 'group1-3',
    //         target: '9'
    //       },
    //       {
    //         source: 'group1-3',
    //         target: '10'
    //       },
    //       {
    //         source: 'group1-3',
    //         target: '11'
    //       },
    //       {
    //         source: '11',
    //         target: '9'
    //       },
    //       {
    //         source: '12',
    //         target: 'group1'
    //       }
    //     ]
    //   }
    //   data.nodes.forEach((node) => {
    //     if (node.group) {
    //       this.groupNodes.push(node.id)
    //     } else {
    //       const num1 = node.id % 2
    //       const num2 = node.id % 3
    //       node.type = num1 === 0 ? 'assetA' : 'assetB'
    //       node.img = num2 === 0 ? this.firewallImg : this.serverImg
    //       node.label = ''
    //     }
    //   })

    //   const nodes = data.nodes
    //   const clusterMap = new Map()
    //   const clusterId = 0
    //   //   nodes.forEach(function(node) {
    //   //     // cluster
    //   //     if (node.cluster && clusterMap.get(node.cluster) === undefined) {
    //   //       clusterMap.set(node.cluster, clusterId)
    //   //       clusterId++
    //   //     }
    //   //     const cid = clusterMap.get(node.cluster)
    //   //     if (!node.style) {
    //   //       node.style = {}
    //   //     }
    //   //     node.style.fill = colors[cid % colors.length]
    //   //     node.style.stroke = strokes[cid % strokes.length]
    //   //   })

    //   const container = document.getElementById('graph-container')
    //   const width = container.scrollWidth
    //   const height = container.scrollHeight || 500
    //   const tooltip = new G6.Tooltip({
    //     offsetX: 10,
    //     offsetY: 10,
    //     trigger: 'mouseEnter',
    //     itemTypes: ['node'],
    //     getContent: (e) => {
    //       const outDiv = document.createElement('div')
    //       outDiv.style.width = 'fit-content'
    //       outDiv.innerHTML = `
    //   <h4>资产: ${e.item.getModel().label || e.item.getModel().id}</h4>`
    //       return outDiv
    //     },
    //     shouldBegin: (e) => {
    //       if (e.item.getModel().group) return false
    //       else return true
    //     }
    //   })
    //   const graph = new G6.Graph({
    //     container: 'graph-container',
    //     width,
    //     height,
    //     plugins: [tooltip],
    //     modes: {
    //       default: ['drag-canvas', 'zoom-canvas', 'drag-node']
    //     },
    //     layout: this.fruchterman,
    //     animate: true,
    //     // defaultNode: {
    //     //   size: 40
    //     // },
    //     defaultEdge: {
    //       style: {
    //         lineWidth: 2
    //         // endArrow: {
    //         //   path: 'M 0,0 L 8,4 L 8,-4 Z',
    //         //   fill: '#e2e2e2'
    //         // }
    //       }
    //     }
    //   })
    //   graph.data(data)
    //   graph.render()
    //   graph.on('afterlayout', () => {
    //     locknode()
    //     const hull5 = graph.createHull({
    //       id: 'hull5',
    //       members: ['group1_2', '0', '1', '2', '3', '4', '5', '6', '7', '8'],
    //       padding: 20,
    //       style: {
    //         fill: '#ffffff',
    //         lineWidth: 0,
    //         // fill: '#ffffff',
    //         opacity: 0.8,
    //         shadowColor: '#8CAAF2',
    //         shadowOffsetX: 0,
    //         shadowOffsetY: 0,
    //         shadowBlur: 10
    //       }
    //     })
    //     const hull6 = graph.createHull({
    //       id: 'hull6',
    //       //   type: 'bubble',
    //       members: ['group1-3', '9', '10', '11'],
    //       //   nonMembers: ['9', '10', '11', '12'],
    //       padding: 3,
    //       style: {
    //         fill: '#ffffff',
    //         lineWidth: 0,
    //         // fill: '#ffffff',
    //         opacity: 0.7,
    //         shadowColor: '#8CAAF2',
    //         shadowOffsetX: 0,
    //         shadowOffsetY: 0,
    //         shadowBlur: 10
    //       }
    //     })
    //     const hull1 = graph.createHull({
    //       id: 'hull1',
    //       members: ['13', '14', '15', '16', '17'],
    //       padding: 10,
    //       style: {
    //         lineWidth: 0,
    //         fill: '#ffffff',
    //         opacity: 1,
    //         shadowColor: '#8CAAF2',
    //         shadowOffsetX: 1,
    //         shadowOffsetY: 5,
    //         shadowBlur: 20
    //       }
    //     })
    //     const hull2 = graph.createHull({
    //       id: 'hull2',
    //       type: 'smooth-convex ',
    //       members: [
    //         'group1',
    //         'group1_2',
    //         'group1-3',
    //         '0',
    //         '1',
    //         '2',
    //         '3',
    //         '4',
    //         '5',
    //         '6',
    //         '7',
    //         '8',
    //         '9',
    //         '10',
    //         '11',
    //         '12'
    //       ],
    //       padding: 40,
    //       style: {
    //         lineWidth: 0,
    //         fill: '#ffffff',
    //         opacity: 1,
    //         shadowColor: '#8CAAF2',
    //         shadowOffsetX: 1,
    //         shadowOffsetY: 5,
    //         shadowBlur: 20
    //       }
    //     })
    //     const hull3 = graph.createHull({
    //       id: 'hull3',
    //       members: [
    //         '18',
    //         '19',
    //         '20',
    //         '21',
    //         '22',
    //         '23',
    //         '24',
    //         '25',
    //         '26',
    //         '27',
    //         '28',
    //         '29',
    //         '30'
    //       ],
    //       padding: 10,
    //       style: {
    //         lineWidth: 0,
    //         fill: '#ffffff',
    //         opacity: 1,
    //         shadowColor: '#8CAAF2',
    //         shadowOffsetX: 1,
    //         shadowOffsetY: 5,
    //         shadowBlur: 20
    //       }
    //     })
    //     const hull4 = graph.createHull({
    //       id: 'hull4',
    //       members: ['31', '32', '33'],
    //       padding: 10,
    //       style: {
    //         lineWidth: 0,
    //         fill: '#ffffff',
    //         opacity: 1,
    //         shadowColor: '#8CAAF2',
    //         shadowOffsetX: 1,
    //         shadowOffsetY: 5,
    //         shadowBlur: 20
    //       }
    //     })
    //     graph.on('afterupdateitem', (e) => {
    //       // update时，4级资产组的hull要在3级资产组之前
    //       hull5.updateData(hull5.members)
    //       hull6.updateData(hull6.members)
    //       hull1.updateData(hull1.members)
    //       hull2.updateData(hull2.members)
    //       hull3.updateData(hull3.members)
    //       hull4.updateData(hull4.members)
    //     })
    //   })
    //   graph.on('node:click', (e) => {
    //     if (e.item.getModel().group) return
    //     if (this.hightlightNode) {
    //       const node = graph.findById(this.hightlightNode)
    //       graph.setItemState(node, 'selected', false)
    //     }
    //     graph.setItemState(e.item, 'selected', true)
    //     this.hightlightNode = e.item.getModel().id
    //     this.detail = e.item.getModel()
    //     this.showText = true
    //   })
    //   graph.on('node:mouseenter', (e) => {
    //     graph.setItemState(e.item, 'active', true)
    //   })
    //   graph.on('node:mouseleave', (e) => {
    //     graph.setItemState(e.item, 'active', false)
    //   })
    //   graph.on('node:dragstart', (e) => {
    //     this.pickedNode.x = e.item.getModel().x
    //     this.pickedNode.y = e.item.getModel().y
    //   })
    //   graph.on('node:dragend', (e) => {
    //     // graph.updateItem(e.item, {
    //     //   x: this.pickedNode.x,
    //     //   y: this.pickedNode.y
    //     // })
    //     const neighbors = graph.getNeighbors(e.item)
    //   })
    //   graph.on('node:drop', (e) => {
    //     console.log(e.item)
    //   })
    //   if (typeof window !== 'undefined') {
    //     window.onresize = () => {
    //       if (!graph || graph.get('destroyed')) return
    //       if (!container || !container.scrollWidth || !container.scrollHeight) {
    //         return
    //       }
    //       graph.changeSize(container.scrollWidth, container.scrollHeight)
    //     }
    //   }
    //   const locknode = () => {
    //     this.groupNodes.forEach((id) => {
    //       const node = graph.findById(id)
    //       node.lock()
    //     })
    //   }
    //   return graph
    // }
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
