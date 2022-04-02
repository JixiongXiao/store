import G6 from '@antv/g6'

// 自定义节点
G6.registerNode(
  'assetNode',
  {
    options: {
      style: {},
      stateStyles: {
        hover: {},
        selected: {}
      }
    },
    draw(cfg, group) {
      const keyShape = group.addShape('polygon', {
        attrs: {
          points: [
            [6, 0],
            [16, 0],
            [22, 8],
            [16, 16],
            [6, 16],
            [0, 8]
          ],
          stroke: 'black'
        },
        name: 'polygon-hexagon'
      })
      return keyShape
    }
  },
  'circle'
)
