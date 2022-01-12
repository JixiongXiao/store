import { AmbientLight, PointLight, SpotLight } from 'three'

export const lightsList = []
const lightA = new AmbientLight('rgb(255, 255, 255', 0.3)
export const pointLight = new PointLight('rgb(255, 0, 0)', 0.7, 30, 0.1)
pointLight.position.set(20, 20, 20)
export const spotLight = new SpotLight('rgb(255, 255, 255', 1, 150, 35, 0.3, 0.3)
spotLight.position.set(-50, 50, -50)
spotLight.castShadow = true

lightsList.push(lightA, spotLight)
