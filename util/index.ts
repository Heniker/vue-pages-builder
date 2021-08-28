export const deepGet = (
  obj: Record<string | symbol | number, any>,
  path: (string | symbol | number)[]
) => {
  return path.reduce((val, key) => (val && val[key]) || null, obj)
}

export const deepSet = (
  obj: Record<string | symbol | number, any>,
  path: (string | symbol | number)[],
  val: any
) => {
  path.slice(0, -1).reduce((val, key) => (val && val[key]) || ((val[key] = {}), val[key]), obj)[path.slice(-1)[0]] =
    val
  return true
}
