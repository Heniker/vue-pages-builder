type ContextT = ReturnType<typeof require.context>

type RouterTreeT = {
  [key: string | number]: RouterTreeT
  [routeRecordKey]: import('vue-router').RouteRecordRaw
}

type ValidKeyT = string | number | symbol

const routeRecordKey: unique symbol = Symbol('RouteRecord')

export const buildPages = (
  weakContext: ContextT,
  persistentContext: ContextT,
  {
    prependPath = '/',
  }: {
    prependPath?: string
  } = {}
) => {
  const routerTree = {} as RouterTreeT
  const keys = weakContext
    .keys()
    .flatMap((it) => /.+\.(((ts|js)x?)|vue)$/.exec(it)?.[0] || []) as string[]

  keys.forEach((it) => {
    const path = it.slice(2).split('.').slice(0, -1).join('').split('/')
    deepSet(routerTree, [...path, routeRecordKey], {
      name: weakContext.resolve(it), // Better provide unified key type. Webpack `resolve` can give numeric results
      component: () => persistentContext(it),
    })
  })

  const result = traverseTree(routerTree, prependPath)
  return result
}

function traverseTree(tree: RouterTreeT, path: string) {
  const names = Object.getOwnPropertyNames(tree)
  const routeRecord = tree[routeRecordKey]

  const result: import('vue-router').RouteRecordRaw[] = []

  let currentRoute: import('vue-router').RouteRecordRaw[] = result

  if (routeRecord) {
    result.push(routeRecord)

    routeRecord.path = path
    routeRecord.children = []

    currentRoute = routeRecord.children
  }

  names.forEach((it) => {
    currentRoute.push(...traverseTree(tree[it], getRoutePath(path, it)))
  })

  return result
}

function getRoutePath(path: string, lastSegment: string) {
  var path = path.endsWith('/') ? path.slice(0, -1) : path
  var lastSegment =
    lastSegment === 'index'
      ? ''
      : lastSegment.startsWith('_')
      ? `:${lastSegment.slice(1)}`
      : `${lastSegment}`

  return `${path}/${lastSegment}`
}

function deepSet(obj: Record<ValidKeyT, unknown>, path: ValidKeyT[], value: unknown) {
  path.slice(0, -1).reduce((acc, key) => (acc && acc[key]) || ((acc[key] = {}), acc[key]), obj)[path.slice(-1)[0]] = value
}