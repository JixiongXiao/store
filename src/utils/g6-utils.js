import G6 from '@antv/g6'
import { off } from 'codemirror'

// level1-blue
G6.registerNode(
  'level1-blue',
  {
    options: {
      size: 160,
      color: '#5B8FF9',
      style: {
        lineWidth: 0,
        fill: 'r(0.6, 0.3, 0.8) 0:#8CAAF2 1:#1954E4',
        shadowColor: '#8CAAF2',
        shadowOffsetX: 1,
        shadowOffsetY: 5,
        shadowBlur: 20,
        cursor: 'pointer'
      },

      stateStyles: {
        // 鼠标hover状态下的配置
        active: {
          lineWidth: 3,
          stroke: '#1954E4',
          shadowColor: '#5780ee',
          shadowOffsetX: 1,
          shadowOffsetY: 5,
          shadowBlur: 20
        }
      }
    },

    // 绘制节点
    draw(cfg, group) {
      var shape = this.drawShape(cfg, group)
      if (cfg.label && cfg.label.length) {
        this.drawLabel(cfg, group)
      }
      return shape
    },
    // 绘制label
    drawLabel(cfg, group) {
      // var size = this.getSize(cfg)
      // var width = size[0]
      const width = 160 // 节点大小
      // const height = size[1];
      var label = cfg.label
      // 绘制第一个label
      group.addShape('text', {
        attrs: {
          text: label[0] || '',
          x: 0 - width / 2 + 8,
          y: -15,
          fill: '#ffffff',
          fontSize: 18,
          fontWeight: 700,
          textAlign: 'left'
        }
      })
      // 绘制第二个label
      group.addShape('text', {
        attrs: {
          text: label[1] || '',
          x: -28,
          y: 60,
          fill: '#ffffff',
          textAlign: 'left',
          fontSize: 56,
          fontWeight: 'bold',
          fontStyle: 'italic'
        }
      })
      // 绘制第三个label
      group.addShape('text', {
        attrs: {
          text: label[2] || '',
          x: 24,
          y: 52,
          fill: '#ffffff',
          textAlign: 'left',
          fontSize: 24,
          fontWeight: 'bold'
        }
      })
    }
  },

  'circle'
)
// level2-blue
G6.registerNode(
  'level2-blue',
  {
    options: {
      size: 80,
      color: '#5B8FF9',
      style: {
        lineWidth: 0,
        fill: 'r(0.6, 0.3, 0.8) 0:#8CAAF2 1:#1954E4',
        shadowColor: '#8CAAF2',
        shadowOffsetX: 1,
        shadowOffsetY: 5,
        shadowBlur: 20,
        cursor: 'pointer'
      },

      stateStyles: {
        // 鼠标hover状态下的配置
        active: {
          lineWidth: 2,
          stroke: '#1954E4',
          shadowColor: '#5780ee',
          shadowOffsetX: 1,
          shadowOffsetY: 5,
          shadowBlur: 20
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
      const width = 80
      group.addShape('text', {
        attrs: {
          text: cfg.label || '',
          x: 0 - width / 2 + 5,
          y: 0,
          fill: '#ffffff',
          fontWeight: 700,
          textAlign: 'left',
          textBaseline: 'middle'
        }
      })
    }
  },
  'circle'
)
// level3-blue
G6.registerNode(
  'level3-blue',
  {
    options: {
      size: 24,
      color: '#5B8FF9',
      style: {
        lineWidth: 0,
        fill: 'r(0.6, 0.3, 0.8) 0:#8CAAF2 1:#1954E4',
        shadowColor: '#8CAAF2',
        shadowOffsetX: 1,
        shadowOffsetY: 5,
        shadowBlur: 20,
        cursor: 'pointer'
      },
      stateStyles: {
        // 鼠标hover状态下的配置
        active: {
          lineWidth: 1,
          stroke: '#1954E4',
          shadowColor: '#5780ee',
          shadowOffsetX: 1,
          shadowOffsetY: 5,
          shadowBlur: 20
        }
      }
    }
  },

  'circle'
)
// level1-orange
G6.registerNode(
  'level1-orange',
  {
    options: {
      size: 160,
      style: {
        lineWidth: 0,
        fill: 'r(0.6, 0.3, 0.8) 0:#ffc080 1:#ff8000',
        shadowColor: '#ffc080',
        shadowOffsetX: 1,
        shadowOffsetY: 5,
        shadowBlur: 20,
        cursor: 'pointer'
      },
      stateStyles: {
        // 鼠标hover状态下的配置
        active: {
          lineWidth: 3,
          stroke: '#ff8000',
          shadowColor: '#ffa24a',
          shadowOffsetX: 1,
          shadowOffsetY: 5,
          shadowBlur: 20
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
    drawLabel(cfg, group) {
      // var size = this.getSize(cfg)
      // var width = size[0]
      const width = 160 // 节点大小
      // const height = size[1];
      var label = cfg.label
      // 绘制第一个label
      group.addShape('text', {
        attrs: {
          text: label[0] || '',
          x: 0 - width / 2 + 8,
          y: -15,
          fill: '#ffffff',
          fontSize: 18,
          fontWeight: 700,
          textAlign: 'left'
        }
      })
      // 绘制第二个label
      group.addShape('text', {
        attrs: {
          text: label[1] || '',
          x: -28,
          y: 60,
          fill: '#ffffff',
          textAlign: 'left',
          fontSize: 56,
          fontWeight: 'bold',
          fontStyle: 'italic'
        }
      })
      // 绘制第三个label
      group.addShape('text', {
        attrs: {
          text: label[2] || '',
          x: 24,
          y: 52,
          fill: '#ffffff',
          textAlign: 'left',
          fontSize: 24,
          fontWeight: 'bold'
        }
      })
    }
  },
  'circle'
)
// level2-orange
G6.registerNode(
  'level2-orange',
  {
    options: {
      size: 80,
      color: '#5B8FF9',
      style: {
        lineWidth: 0,
        fill: 'r(0.6, 0.3, 0.8) 0:#ffc080 1:#ff8000',
        shadowColor: '#ffc080',
        shadowOffsetX: 1,
        shadowOffsetY: 5,
        shadowBlur: 20,
        cursor: 'pointer'
      },
      stateStyles: {
        // 鼠标hover状态下的配置
        active: {
          lineWidth: 2,
          stroke: '#ff8000',
          shadowColor: '#ffa24a',
          shadowOffsetX: 1,
          shadowOffsetY: 5,
          shadowBlur: 20
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
      const width = 80
      group.addShape('text', {
        attrs: {
          text: cfg.label || '',
          x: 0 - width / 2 + 5,
          y: 0,
          fill: '#ffffff',
          fontWeight: 700,
          textAlign: 'left',
          textBaseline: 'middle'
        }
      })
    }
  },
  'circle'
)
// level3-orange
G6.registerNode(
  'level3-orange',
  {
    options: {
      size: 24,
      color: '#5B8FF9',
      style: {
        lineWidth: 0,
        fill: 'r(0.6, 0.3, 0.8) 0:#ffc080 1:#ff8000',
        shadowColor: '#ffc080',
        shadowOffsetX: 1,
        shadowOffsetY: 5,
        shadowBlur: 20,
        cursor: 'pointer'
      },

      stateStyles: {
        active: {
          lineWidth: 1,
          stroke: '#ff8000',
          shadowColor: '#ffa24a',
          shadowOffsetX: 1,
          shadowOffsetY: 5,
          shadowBlur: 20
        }
      }
    }
  },

  'circle'
)
// level1-red
G6.registerNode(
  'level1-red',
  {
    options: {
      size: 160,
      style: {
        lineWidth: 0,
        fill: 'r(0.6, 0.3, 0.7) 0:#f28c8c 1:#d72e2e',
        shadowColor: '#f28c8c',
        shadowOffsetX: 1,
        shadowOffsetY: 5,
        shadowBlur: 20,
        cursor: 'pointer'
      },
      stateStyles: {
        active: {
          lineWidth: 3,
          stroke: '#d72e2e',
          shadowColor: '#e8615e',
          shadowOffsetX: 1,
          shadowOffsetY: 5,
          shadowBlur: 20
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
    drawLabel(cfg, group) {
      // var size = this.getSize(cfg)
      // var width = size[0]
      const width = 160 // 节点大小
      // const height = size[1];
      var label = cfg.label
      // 绘制第一个label
      group.addShape('text', {
        attrs: {
          text: label[0] || '',
          x: 0 - width / 2 + 8,
          y: -15,
          fill: '#ffffff',
          fontSize: 18,
          fontWeight: 700,
          textAlign: 'left'
        }
      })
      // 绘制第二个label
      group.addShape('text', {
        attrs: {
          text: label[1] || '',
          x: -28,
          y: 60,
          fill: '#ffffff',
          textAlign: 'left',
          fontSize: 56,
          fontWeight: 'bold',
          fontStyle: 'italic'
        }
      })
      // 绘制第三个label
      group.addShape('text', {
        attrs: {
          text: label[2] || '',
          x: 24,
          y: 52,
          fill: '#ffffff',
          textAlign: 'left',
          fontSize: 24,
          fontWeight: 'bold'
        }
      })
    }
  },
  'circle'
)
// level2-red
G6.registerNode(
  'level2-red',
  {
    options: {
      size: 80,
      color: '#5B8FF9',
      style: {
        lineWidth: 0,
        fill: 'r(0.6, 0.3, 0.7) 0:#f28c8c 1:#d72e2e',
        shadowColor: '#f28c8c',
        shadowOffsetX: 1,
        shadowOffsetY: 5,
        shadowBlur: 20,
        cursor: 'pointer'
      },
      stateStyles: {
        // 鼠标hover状态下的配置
        active: {
          lineWidth: 2,
          stroke: '#d72e2e',
          shadowColor: '#e8615e',
          shadowOffsetX: 1,
          shadowOffsetY: 5,
          shadowBlur: 20
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
      const width = 80
      group.addShape('text', {
        attrs: {
          text: cfg.label || '',
          x: 0 - width / 2 + 5,
          y: 0,
          fill: '#ffffff',
          fontWeight: 700,
          textAlign: 'left',
          textBaseline: 'middle'
        }
      })
    }
  },
  'circle'
)
// level3-red
G6.registerNode(
  'level3-red',
  {
    options: {
      size: 24,
      color: '#5B8FF9',
      style: {
        lineWidth: 0,
        fill: 'r(0.6, 0.3, 0.7) 0:#f28c8c 1:#d72e2e',
        shadowColor: '#f28c8c',
        shadowOffsetX: 1,
        shadowOffsetY: 5,
        shadowBlur: 20,
        cursor: 'pointer'
      },
      stateStyles: {
        active: {
          lineWidth: 1,
          stroke: '#d72e2e',
          shadowColor: '#e8615e',
          shadowOffsetX: 1,
          shadowOffsetY: 5,
          shadowBlur: 20
        }
      }
    }
  },
  'circle'
)
// assetRed
G6.registerNode(
  'assetA',
  {
    options: {
      size: 40,
      style: {
        lineWidth: 0,
        fill: 'r(0.6, 0.3, 0.7) 0:#f28c8c 1:#d72e2e',
        // fillOpacity: 0,
        shadowColor: '#f28c8c',
        shadowOffsetX: 1,
        shadowOffsetY: 5,
        shadowBlur: 20,
        cursor: 'move'
      },
      stateStyles: {
        // 鼠标hover状态下的配置
        hover: {
          lineWidth: 0,
          stroke: '#FE9797',
          shadowBlur: 10,
          shadowColor: '#FE9797'
          // opacity: 0
        },
        active: {
          stroke: '#d72e2e',
          shadowColor: '#e8615e',
          shadowOffsetX: 1,
          shadowOffsetY: 5,
          shadowBlur: 20
        },
        selected: {
          lineWidth: 2,
          stroke: '#ffffff'
        }
      }
    },
    afterDraw(cfg, group) {
      const width = 24
      const height = 24
      group.addShape('image', {
        attrs: {
          x: -12,
          y: -12,
          width: width,
          height: height,
          img: cfg.img,
          cursor: 'pointer'
        },
        name: 'img-icon'
      })
    }
  },
  'circle'
)
// assetBlue
G6.registerNode(
  'assetB',
  {
    options: {
      size: 40,
      style: {
        lineWidth: 0,
        fill: 'r(0.6, 0.3, 0.8) 0:#8CAAF2 1:#1954E4',
        shadowColor: '#8CAAF2',
        shadowOffsetX: 1,
        shadowOffsetY: 5,
        shadowBlur: 20,
        cursor: 'move'
      },
      stateStyles: {
        // 鼠标hover状态下的配置
        hover: {
          lineWidth: 0,
          stroke: '#FE9797',
          shadowBlur: 10,
          shadowColor: '#FE9797'
          // opacity: 0
        },
        active: {
          stroke: '#1954E4',
          shadowColor: '#5780ee',
          shadowOffsetX: 1,
          shadowOffsetY: 5,
          shadowBlur: 20
        },
        selected: {
          lineWidth: 2,
          stroke: '#ffffff'
        }
      }
    },
    afterDraw(cfg, group) {
      const width = 24
      const height = 24
      group.addShape('image', {
        attrs: {
          x: -12,
          y: -12,
          width: width,
          height: height,
          img: cfg.img,
          cursor: 'pointer'
        },
        name: 'img-icon'
      })
    }
  },
  'circle'
)
// 资产名节点
G6.registerNode(
  'asset-group',
  {
    options: {
      size: 50,
      style: {
        lineWidth: 0,
        stroke: '#ffffff'
      },
      labelCfg: {
        position: 'center',
        offset: 150,
        style: {
          fontSize: 18,
          opacity: 0.1,
          fontWeight: 700
        }
      }
    }
  },
  'circle'
)
// 攻击路线
G6.registerEdge(
  'atack-edge',
  {
    options: {
      style: {
        stroke: '#F16D90',
        lineWidth: 5,
        sourceAnchor: 0,
        targetAnchor: 0,
        cursor: 'pointer',
        endArrow: {
          path: G6.Arrow.triangle(2, 2, 5),
          d: 5
        }
      },
      stateStyles: {
        hover: {
          shadowColor: '#e8615e',
          shadowBlur: 10
        }
      }
    },
    afterDraw(cfg, group) {
      // get the first shape in the group, it is the edge's path here=
      const shape = group.get('children')[0]
      // the start position of the edge's path
      const startPoint = shape.getPoint(0)

      // add red circle shape
      const circle = group.addShape('circle', {
        attrs: {
          x: startPoint.x,
          y: startPoint.y,
          fill: '#1890ff',
          r: 5
        },
        name: 'circle-shape'
      })
      // animation for the red circle
      circle.animate(
        (ratio) => {
          // the operations in each frame. Ratio ranges from 0 to 1 indicating the prograss of the animation. Returns the modified configurations
          // get the position on the edge according to the ratio
          const tmpPoint = shape.getPoint(ratio)
          // returns the modified configurations here, x and y here
          return {
            x: tmpPoint.x,
            y: tmpPoint.y
          }
        },
        {
          repeat: true, // Whether executes the animation repeatly
          duration: 3000 // the duration for executing once
        }
      )
    }
  },
  'line'
)
// 隐藏线
G6.registerEdge(
  'hide-edge',
  {
    options: {
      style: {
        lineWidth: 0
      }
    }
  },
  'line'
)
// 带动画的六边形节点
G6.registerNode(
  'hexagonNode',
  {
    options: {
      style: {
        fill: '#steelblue',
        lineWidth: 5
      },
      stateStyles: {
        hover: {},
        selected: {}
      }
    },
    // 自定义六边形，修改尺寸只需在渲染节点时修改节点属性size即可
    draw(cfg, group) {
      cfg.size = cfg.size || 48
      const halfSize = cfg.size / 2 // 把节点视为一个圆形，该变量为节点的半径
      const quaterSize = halfSize / 2 // 半径的一半
      const locationY = halfSize * Math.sin(Math.PI / 3) // Y轴坐标
      const keyShape = group.addShape('polygon', {
        attrs: {
          points: [
            [-quaterSize, locationY],
            [quaterSize, locationY],
            [halfSize, 0],
            [quaterSize, -locationY],
            [-quaterSize, -locationY],
            [-halfSize, 0]
          ],
          stroke: 'white',
          lineWidth: 2,
          fill: '#F25C61',
          shadowColor: '#F25C61',
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 5
        },
        name: 'polygon-hexagon'
      })
      return keyShape
    },
    afterDraw(cfg, group) {
      const halfSize = cfg.size / 2 // 把节点视为一个圆形，该变量为节点的半径
      const quaterSize = halfSize / 2 // 半径的一半
      // 18是一个自定义数，用来决定动画外圈比原来的尺寸大多少像素
      const growSize = cfg.size / 2 + 18 // 动画结束后的节点半径
      const locationYBefore = halfSize * Math.sin(Math.PI / 3) // 动画中起始点Y轴
      const locationYAfter = growSize * Math.sin(Math.PI / 3) // 动画中结束点Y轴
      const width = 24
      const height = 24
      if(cfg.img){

        group.addShape('image', {
          attrs: {
            x: -12,
            y: -12,
            width: width,
            height: height,
            img: cfg.img,
            cursor: 'pointer'
          },
          name: 'img-icon'
        })
      }
      if(cfg.animate) {
        const back1 = group.addShape('polygon', {
          zIndex: -3,
          attrs: {
            x: 0,
            y: 0,
            points: [
              [-quaterSize, locationYBefore],
              [quaterSize, locationYBefore],
              [halfSize, 0],
              [quaterSize, -locationYBefore],
              [-quaterSize, -locationYBefore],
              [-halfSize, 0]
            ],
            fill: '#F25C61',
            opacity: 0.6
          },
          name: 'back1-shape'
        })
        const back2 = group.addShape('polygon', {
          zIndex: -2,
          attrs: {
            x: 0,
            y: 0,
            points: [
              [-quaterSize, locationYBefore],
              [quaterSize, locationYBefore],
              [halfSize, 0],
              [quaterSize, -locationYBefore],
              [-quaterSize, -locationYBefore],
              [-halfSize, 0]
            ],
            fill: '#F25C61',
            opacity: 0.6
          },
          name: 'back1-shape'
        })
        const back3 = group.addShape('polygon', {
          zIndex: -1,
          attrs: {
            x: 0,
            y: 0,
            points: [
              [-quaterSize, locationYBefore],
              [quaterSize, locationYBefore],
              [halfSize, 0],
              [quaterSize, -locationYBefore],
              [-quaterSize, -locationYBefore],
              [-halfSize, 0]
            ],
            fill: '#F25C61',
            opacity: 0.6
          },
          name: 'back1-shape'
        })
        group.sort() // 排序，根据zIndex 排序
        const delayBase = Math.random() * 2000
        back1.animate(
          {
            // 逐渐放大，并消失
            points: [
              [-(growSize / 2), locationYAfter],
              [growSize / 2, locationYAfter],
              [growSize, 0],
              [growSize / 2, -locationYAfter],
              [-(growSize / 2), -locationYAfter],
              [-growSize, 0]
            ],
            opacity: 0.0
          },
          {
            repeat: true, // 循环
            duration: 3000,
            easing: 'easeCubic',
            delay: delayBase // 无延迟
          }
        )
        back2.animate(
          {
            // 逐渐放大，并消失
            points: [
              [-(growSize / 2), locationYAfter],
              [growSize / 2, locationYAfter],
              [growSize, 0],
              [growSize / 2, -locationYAfter],
              [-(growSize / 2), -locationYAfter],
              [-growSize, 0]
            ],
            opacity: 0.0
          },
          {
            repeat: true, // 循环
            duration: 3000,
            easing: 'easeCubic',
            delay: delayBase + 1000 // 1 秒延迟
          }
        )
        back3.animate(
          {
            // 逐渐放大，并消失
            points: [
              [-(growSize / 2), locationYAfter],
              [growSize / 2, locationYAfter],
              [growSize, 0],
              [growSize / 2, -locationYAfter],
              [-(growSize / 2), -locationYAfter],
              [-growSize, 0]
            ],
            opacity: 0.0
          },
          {
            repeat: true, // 循环
            duration: 3000,
            easing: 'easeCubic',
            delay: delayBase + 2000 // 2 秒延迟
          }
        )
      }
    }
  },
  'circle'
)
G6.registerLayout('beehive-layout',{
  init(data) {
    const self = this
    self.gap = self.gap || 0
    // 此处data为所有node,edge,combo等
    // 此处的this为layout本身
    // 先获取data的所有数据
    self.nodes = data.nodes
    self.edges = data.edges
    self.combos = data.combos
  },
  execute() {
    const self = this
    const center = self.center
    const nodes = self.nodes
    // 节点实际半径，如果有gap值的话，节点半径为size+gap的一半
    const r = (self.nodes[0].size + self.gap) / 2 
    // 首个节点的起始位置
    const startPoint = self.startPoint || [100,100]
    // 所有节点的位置
    var locations = []
    // y轴偏移量
    const offset = r * Math.sin(Math.PI / 3)
    // 节点个数
    const nodeNum = nodes.length
    // 计算左1右2分布
    const normal = (x,y) =>{
      const group =  [
        {x:x,y:y},
        {x:x + r * 1.5, y: y - offset },
        {x:x + r* 1.5, y: y + offset }
      ]
     return group
    }
    // 计算左2右1分布
    const opposite = (x,y)=>{
      const group = [
        {x:x,y:y},
        {x: x+r * 1.5, y:y+offset},
        {x:x,y:y+2*offset}
      ]
    return group
    }
    const culculateGroup = (x,y) =>{
      const groupL1 = normal(x, y)
      const groupL2 = opposite(x, y + 2 * offset)
      const groupR1 = normal(x + 3 * r, y)
      const groupR2 = opposite(x + 3 * r, y + 2 * offset)
      locations = [...locations,...groupL1, ...groupL2, ...groupR1, ...groupR2]
    }
    // 遍历次数culTime，也就是遍历culTime次
    // 第一次计算1个，最后一次计算2*culTime - 1个 (2n -1)，每一次遍历中计算的个位数都是奇数个
    // 计算的方阵总个数为culTime^2个 (n^2)
    // 12代表当前设置的方阵个数，每个方阵由4组坐标组成，每组坐标内部含有3个坐标
    const tempNum = Math.sqrt(nodeNum / 12)
    const culTime = tempNum % 1 > 0 ? Math.floor(tempNum) + 1 : tempNum
    // 计算所有坐标，假设当前有48个节点，只要计算4个方阵即可算完所有坐标，也就是进行2次循环
    // 如果节点为49，则默认进行3次循环，依此类推，只要超出当前方阵可容纳的坐标数，就进行下一次方阵计算
    var x= startPoint[0]
    var y = startPoint[1]
    // culculateGroup(x,y)
    for(let i = 1; i <= culTime; i++) {
      var anchorX = startPoint[0] + (i - 1) * 6 * r // 锚点坐标的x坐标
      var anchorY = startPoint[1] 
      var groupNumY = i  // Y轴上的方阵个数
      var groupNumX = i - 1// X轴上方阵个数，事实上Y轴有一个方阵和X轴重合，归入X轴计算
      for ( let YAxis = 1; YAxis<= groupNumY; YAxis++ ) {
        // 计算Y轴上的方阵
        anchorY = anchorY + 6 * offset // 档次方阵计算的锚点的Y坐标
        culculateGroup(anchorX,anchorY)
        
      }
      // 计算完Y轴后计算X轴
      for (let XAxis = 1; XAxis <= groupNumX; XAxis++) {
        // 计算X轴上的方阵
        anchorX = anchorX - 6 * r
        culculateGroup(anchorX,anchorY)
      }
    }

    nodes.forEach((node,index)=>{
      node.x = locations[index].x
      node.y = locations[index].y
    })
  },
  layout(data) {
    // 该函数只有在直接调用时才执行，布局时不执行
  }
}

)