// See this in case of TS erros. Probably update your TS version
// https://github.com/microsoft/TypeScript/issues/1863

import { deepSet } from './util'

type ContextT = ReturnType<typeof require.context>

const mainKey: unique symbol = Symbol('main')

type RouterTreeT = {
  [key: string | number]: RouterTreeT
  [mainKey]: import('vue-router').RouteRecordRaw
}

const traverseTree = (
  tree: RouterTreeT,
  routeSegment: import('vue-router').RouteRecordRaw[],
  path: string
) => {
  const names = Object.getOwnPropertyNames(tree)

  if (tree[mainKey]) {
    const children: import('vue-router').RouteRecordRaw[] = []

    tree[mainKey].children = children
    tree[mainKey].path = path
    routeSegment.push(tree[mainKey])

    names.forEach((it) => {
      traverseTree(tree[it], children, `${path}${it === 'index' ? '' : '/' + it}`)
    })
  } else {
    names.forEach((it) => {
      traverseTree(tree[it], routeSegment, `${path}${it === 'index' ? '' : '/' + it}`)
    })
  }

  return routeSegment
}

export const buildPages = (weakContext: ContextT, persistentContext: ContextT) => {
  const routerTree = {} as RouterTreeT
  const keys = weakContext.keys().filter((it) => it.endsWith('.vue'))

  keys.forEach((it) => {
    const path = it.slice(2).slice(0, -4).split('/') as string[]
    deepSet(routerTree, [...path, mainKey], {
      name: weakContext.resolve(it),
      component: () => persistentContext(it),
    })
  })

  return traverseTree(routerTree, [], '')
}
