export function createObj(ins) {
  const that = ins
  return { a: [{ b: { c: 3, d: that }}] }
}
