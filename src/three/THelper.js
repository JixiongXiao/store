import { AxesHelper, GridHelper, PointLightHelper, SpotLightHelper } from 'three'
import { pointLight, spotLight } from './TLight'

export const helperList = []
const axes = new AxesHelper(500) // 辅助坐标轴
// 辅助栅栏格
const grid = new GridHelper(500, 100, 'rgb(200, 200, 200)', 'rgb(100, 100, 100)')

const pointLightHelper = new PointLightHelper(pointLight, pointLight.distance, pointLight.color)
const spotLightHelper = new SpotLightHelper(spotLight, spotLight.color)

helperList.push(axes, spotLightHelper)
