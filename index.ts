import { deepSet } from './util/index'

type ContextT = ReturnType<typeof require.context>

type RouterTreeT = {
  [key: string | number]: RouterTreeT
  [routeRecordKey]: import('vue-router').RouteRecordRaw
}

const routeRecordKey: unique symbol = Symbol('routeRecord')

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
      name: weakContext.resolve(it),
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

function getRoutePath(path_: string, lastSegment_: string) {
  const path = path_.endsWith('/') ? path_.slice(0, -1) : path_
  const lastSegment =
    lastSegment_ === 'index'
      ? ''
      : lastSegment_.startsWith('_')
      ? `:${lastSegment_.slice(1)}`
      : `${lastSegment_}`

  return `${path}/${lastSegment}`
}
