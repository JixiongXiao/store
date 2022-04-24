import G6 from '@antv/g6'

G6.registerNode(
  'levelA-blue',

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
        shadowBlur: 20
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
          lineWidth: 3,
          stroke: '#1954E4',
          shadowColor: '#5780ee',
          shadowOffsetX: 1,
          shadowOffsetY: 5,
          shadowBlur: 20
        },

        // 选中节点状态下的配置

        selected: {
          lineWidth: 3
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
      var size = this.getSize(cfg)
      var width = size[0]
      // const height = size[1];
      var label = cfg.label
      if (label.length === 1) {
        // 绘制第一个label
        group.addShape('text', {
          attrs: {
            text: label[0] || '',
            x: 0 - width / 2 + 5,
            y: 0,
            fill: '#ffffff',
            textAlign: 'left',
            textBaseline: 'middle'
          }
        })
      } else if (label.length === 2) {
        // 绘制第一个label
        group.addShape('text', {
          attrs: {
            text: label[0] || '',
            x: 0 - width / 2 + 5,
            y: 0,
            fill: '#ffffff',
            textAlign: 'left'
          }
        })
        // 绘制第二个label
        group.addShape('text', {
          attrs: {
            text: label[1] || '',
            x: -14,
            y: 30,
            fill: '#ffffff',
            textAlign: 'left',
            fontSize: 22,
            fontWeight: 'bold',
            fontStyle: 'italic'
          }
        })
      } else if (label.length === 3) {
        // 绘制第一个label
        group.addShape('text', {
          attrs: {
            text: label[0] || '',
            x: 0 - width / 2 + 5,
            y: 0,
            fill: '#ffffff',
            fontSize: 18,
            textAlign: 'left'
          }
        })
        // 绘制第二个label
        group.addShape('text', {
          attrs: {
            text: label[1] || '',
            x: -14,
            y: 30,
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
            x: 8,
            y: 30,
            fill: '#ffffff',
            textAlign: 'left',
            fontSize: 14,
            fontWeight: 'bold'
          }
        })
      }
    }
  },

  'circle'
)
G6.registerNode(
  'levelB-blue',

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
        shadowBlur: 20
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
          lineWidth: 2,
          stroke: '#1954E4',
          shadowColor: '#5780ee',
          shadowOffsetX: 1,
          shadowOffsetY: 5,
          shadowBlur: 20
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
G6.registerNode(
  'levelC-blue',

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
        shadowBlur: 20
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
          lineWidth: 1,
          stroke: '#1954E4',
          shadowColor: '#5780ee',
          shadowOffsetX: 1,
          shadowOffsetY: 5,
          shadowBlur: 20
        },

        // 选中节点状态下的配置

        selected: {
          lineWidth: 3
        }
      }
    }

    // 绘制节点

    // draw: function draw(cfg,  group) {
    //   var shape = this.drawShape(cfg, group)

    //   if (cfg.label && cfg.label.length) {
    //     this.drawLabel(cfg, group)
    //   }

    //   return shape
    // },

    // // 绘制label

    // drawLabel: function drawLabel(cfg, group) {
    //   var size = this.getSize(cfg)

    //   var width = size[0]

    //   // const height = size[1];

    //   var label = cfg.label

    //   // 绘制第一个label

    //   group.addShape('text', {
    //     attrs: {
    //       text: label[0] || '',

    //       x: 0 - width / 2 + 5,

    //       y: -5,

    //       fill: '#595959',

    //       textAlign: 'left',

    //       textBaseline: 'middle'
    //     }
    //   })

    //   if (label.length > 1) {
    //     // 绘制第二个label

    //     group.addShape('text', {
    //       attrs: {
    //         text: '\n\n' + label[1] || '',

    //         x: -5,

    //         y: 0,

    //         fill: '#1890ff',

    //         textAlign: 'left',

    //         textBaseline: 'middle',

    //         fontWeight: 'bold'
    //       }
    //     })
    //   }
    // }
  },

  'circle'
)
G6.registerNode(
  'levelA-orange',

  {
    options: {
      size: 160,
      style: {
        lineWidth: 0,
        fill: 'r(0.6, 0.3, 0.8) 0:#ffc080 1:#ff8000',
        shadowColor: '#ffc080',
        shadowOffsetX: 1,
        shadowOffsetY: 5,
        shadowBlur: 20
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
          lineWidth: 3,
          stroke: '#ff8000',
          shadowColor: '#ffa24a',
          shadowOffsetX: 1,
          shadowOffsetY: 5,
          shadowBlur: 20
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
G6.registerNode(
  'levelA-red',

  {
    options: {
      size: 160,
      style: {
        lineWidth: 0,
        fill: 'r(0.6, 0.3, 0.7) 0:#f28c8c 1:#d72e2e',
        shadowColor: '#f28c8c',
        shadowOffsetX: 1,
        shadowOffsetY: 5,
        shadowBlur: 20
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
          lineWidth: 3,
          stroke: '#d72e2e',
          shadowColor: '#e8615e',
          shadowOffsetX: 1,
          shadowOffsetY: 5,
          shadowBlur: 20
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
G6.registerNode(
  'assetA',
  {
    options: {
      size: 140,
      style: {
        lineWidth: 0,
        fill: 'r(0.6, 0.3, 0.7) 0:#f28c8c 1:#d72e2e',
        // fillOpacity: 0,
        shadowColor: '#f28c8c',
        shadowOffsetX: 1,
        shadowOffsetY: 5,
        shadowBlur: 20,
        cursor: 'pointer'
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
G6.registerNode(
  'assetB',
  {
    options: {
      size: 140,
      style: {
        lineWidth: 0,
        fill: 'r(0.6, 0.3, 0.8) 0:#8CAAF2 1:#1954E4',
        shadowColor: '#8CAAF2',
        shadowOffsetX: 1,
        shadowOffsetY: 5,
        shadowBlur: 20
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
