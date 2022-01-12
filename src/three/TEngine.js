import { Vector3, WebGLRenderer, Scene, PerspectiveCamera, AmbientLight, AxesHelper, GridHelper, MOUSE } from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 创建一个类，可渲染一个3D场景，场景内元素分离，在文件TBasicObject.js中，在vue页面中通过类中的addObject方法加入3D元素
export class TEngine {
  constructor(dom) {
    this.dom = dom
    this.renderer = new WebGLRenderer({
      antialias: true // 开启渲染器抗锯齿
    })

    this.renderer.shadowMap.enabled = true
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(45, dom.offsetWidth / dom.offsetHeight, 1, 1000)
    // 相机位置，相机指向，相机角度
    this.camera.position.set(20, 20, 20)
    this.camera.lookAt(new Vector3(0, 0, 0))
    this.camera.up = new Vector3(0, 1, 0)

    this.renderer.setSize(dom.offsetWidth, dom.offsetHeight, true)

    // 轨道控制器 开启后必须在重复render的方法中调用update方法
    const orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
    // orbitControls.autoRotate = true // 轨道自动旋转
    orbitControls.enableDamping = true // 开启阻尼，产生重量感
    // 设置鼠标 MOUSE为three内置对象
    orbitControls.mouseButtons = {
      LEFT: '',
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.ROTATE
    }

    // 性能监视器
    const stats = Stats()
    const statsDom = stats.domElement
    statsDom.style.position = 'fixed'
    statsDom.style.top = '86px'
    statsDom.style.right = '0'
    statsDom.style.left = 'unset'

    // 动画渲染
    const renderFn = () => {
      //   box.position.x += -0.01
      //   box.position.y += 0.001
      //   this.camera.position.x += -0.01
      stats.update()
      orbitControls.update() // 开启轨道控制器时必须再render之前调用该方法
      this.renderer.render(this.scene, this.camera)
      // 递归调用自身，实现重复渲染
      requestAnimationFrame(renderFn)
    }
    renderFn()
    dom.appendChild(this.renderer.domElement)
    dom.appendChild(statsDom)
    // this.renderer.render(this.scene, this.camera)
  }
  addObject(...object) {
    object.forEach((element) => {
      this.scene.add(element)
    })
  }
}
