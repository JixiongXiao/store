import {
  Mesh,
  MeshStandardMaterial,
  BufferGeometry,
  BufferAttribute
} from 'three'
const size = 10
export const codeModelList = []

const points = new Float32Array([
  -size,
  size,
  size,
  size,
  size,
  size,
  size,
  size,
  -size,
  -size,
  size,
  -size,

  -size,
  -size,
  size,
  size,
  -size,
  size,
  size,
  -size,
  -size,
  -size,
  -size,
  -size
])

const pointIndex = [
  0, 1, 2, 2, 3, 0, 0, 4, 5, 5, 1, 0, 1, 5, 6, 6, 2, 1, 2, 6, 7, 7, 3, 2, 0, 7,
  4, 0, 3, 7, 4, 6, 5, 7, 6, 4
]
const material = new MeshStandardMaterial({
  color: 'white'
})

const geometry = new BufferGeometry()
geometry.setAttribute('position', new BufferAttribute(points, 3))
geometry.setAttribute('normal', new BufferAttribute(points, 3))
geometry.setIndex(pointIndex)

const codeBox = new Mesh(geometry, material)
codeBox.position.y = 10

codeModelList.push(codeBox)
