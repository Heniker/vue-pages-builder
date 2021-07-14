export const deepGet = (
  obj: Record<string | symbol | number, any>,
  path: (string | symbol | number)[]
) => {
  return path.reduce((p, c) => (p && p[c]) || null, obj)
}

export const deepSet = (
  obj: Record<string | symbol | number, any>,
  path: (string | symbol)[],
  val: any
) => {
  path.slice(0, -1).reduce((p, c) => (p && p[c]) || ((p[c] = {}), p[c]), obj)[path.slice(-1)[0]] =
    val
  return true
}
