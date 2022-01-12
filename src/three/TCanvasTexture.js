export class TCanvasTextureEditer {
  constructor(width = 512, height = 512) {
    this.canvas = document.createElement('canvas')
    this.canvas.width = width
    this.canvas.height = height
  }
  draw(fn) {
    const ctx = this.canvas.getContext('2d')
    if (ctx) {
      fn(ctx)
      return this
    } else {
      console.warn('browser cannot support canvas 2d')
      return this
    }
  }
  preview() {
    const canvas = this.canvas
    canvas.style.position = 'fixed'
    canvas.style.top = '25%'
    canvas.style.left = '25%'
    document.body.appendChild(this.canvas)
    return this
  }
}
