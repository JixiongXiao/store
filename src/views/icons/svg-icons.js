const req = require.context('../../icons/svg', false, /\.svg$/)
const requireAll = (requireContext) => {
  const result = requireContext.keys()
  return result
}

const re = /\.\/(.*)\.svg/

const svgIcons = requireAll(req).map((i) => {
  return i.match(re)[1]
})
export default svgIcons
