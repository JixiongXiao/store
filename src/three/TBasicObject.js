import {
  Mesh,
  BoxBufferGeometry,
  MeshStandardMaterial,
  SphereBufferGeometry,
  CylinderBufferGeometry,
  ConeBufferGeometry,
  Line
} from 'three'
export const objectList = []
const material = new MeshStandardMaterial({
  color: 'rgb(150, 150, 150)'
})

// const box = new Mesh(
//   // 新建物体
//   new BoxBufferGeometry(10, 10, 10),
//   new MeshStandardMaterial({ color: 'rgb(255, 0, 0)' })
// )
// box.position.y = -10

// const sphere = new Mesh(new SphereBufferGeometry(5), new MeshStandardMaterial({ color: 'rgb(255, 0, 0)' }))
// sphere.position.y = 10

// const cone = new Mesh(new ConeBufferGeometry(2, 20, 12), material)
// cone.position.z = 20

// const cylinder = new Line(new CylinderBufferGeometry(5, 5, 10, 32, 5), new MeshStandardMaterial())
// // cylinder.position.z = 10

// 地面
const stage = new Mesh(
  new BoxBufferGeometry(200, 10, 200),
  new MeshStandardMaterial({ color: 'rgb(0,75,75', roughness: 0 })
)
stage.position.y = -5
stage.receiveShadow = true

// 立方体
const box = new Mesh(
  new BoxBufferGeometry(20, 20, 20),
  new MeshStandardMaterial({ color: 'red', roughness: 0.5, metalness: 1 })
)
box.position.y = 10
box.castShadow = true
objectList.push(stage, box)
