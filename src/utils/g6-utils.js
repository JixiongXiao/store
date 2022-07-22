import G6 from '@antv/g6'

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
G6.registerNode(
  'customNode',
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
    draw(cfg, group) {
      const location = 22 * Math.sin(Math.PI / 3)
      const keyShape = group.addShape('polygon', {
        attrs: {
          points: [
            [-11, location],
            [11, location],
            [22, 0],
            [11, -location],
            [-11, -location],
            [-22, 0]
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
      const r = cfg.size / 2
      const location = 22 * Math.sin(Math.PI / 3)
      // const back1 = group.addShape('polygon', {
      //   zIndex: -3,
      //   attrs: {
      //     x: 0,
      //     y: 0,
      //     r,
      //     points: [
      //       [-11, location],
      //       [11, location],
      //       [22, 0],
      //       [11, -location],
      //       [-11, -location],
      //       [-22, 0]
      //     ],
      //     fill: '#F25C61',
      //     opacity: 0.6
      //   },
      //   name: 'back1-shape'
      // })
      // const back2 = group.addShape('polygon', {
      //   zIndex: -2,
      //   attrs: {
      //     x: 0,
      //     y: 0,
      //     r,
      //     points: [
      //       [-11, location],
      //       [11, location],
      //       [22, 0],
      //       [11, -location],
      //       [-11, -location],
      //       [-22, 0]
      //     ],
      //     fill: '#F25C61',
      //     opacity: 0.6
      //   },
      //   name: 'back1-shape'
      // })
      // const back3 = group.addShape('polygon', {
      //   zIndex: -1,
      //   attrs: {
      //     x: 0,
      //     y: 0,
      //     r,
      //     points: [
      //       [-11, location],
      //       [11, location],
      //       [22, 0],
      //       [11, -location],
      //       [-11, -location],
      //       [-22, 0]
      //     ],
      //     fill: '#F25C61',
      //     opacity: 0.6
      //   },
      //   name: 'back1-shape'
      // })

      const back1 = group.addShape('circle', {
        zIndex: -3,
        attrs: {
          x: 0,
          y: 0,
          r,
          fill: '#F25C61',
          opacity: 0.2
        },
        name: 'back1-shape'
      })
      const back2 = group.addShape('circle', {
        zIndex: -2,
        attrs: {
          x: 0,
          y: 0,
          r,
          fill: '#F25C61',
          // 为了显示清晰，随意设置了颜色
          opacity: 0.2
        },
        name: 'back2-shape'
      })
      const back3 = group.addShape('circle', {
        zIndex: -1,
        attrs: {
          x: 0,
          y: 0,
          r,
          fill: '#F25C61',
          opacity: 0.2
        },
        name: 'back3-shape'
      })
      group.sort() // 排序，根据zIndex 排序
      const delayBase = Math.random() * 2000
      back1.animate(
        {
          // 逐渐放大，并消失
          r: r + 10,
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
          r: r + 10,
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
          r: r + 10,
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
  },
  'circle'
)
