import {
  Mesh,
  MeshStandardMaterial,
  BufferGeometry,
  BufferAttribute
} from 'three'

export const codeModelList = []

const points = new Float32Array([-5, 5, 5, 5, 5, 5, 5, 5, -5, -5, 5, -5])

const material = new MeshStandardMaterial()

const geometry = new BufferGeometry()
geometry.setAttribute('position', new BufferAttribute(points, 3))
const codeBox = new Mesh(geometry, material)

codeModelList.push(codeBox)
