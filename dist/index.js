// See this in case of TS erros. Probably update your TS version
// https://github.com/microsoft/TypeScript/issues/1863
import { deepSet } from './util';
const mainKey = Symbol('main');
const traverseTree = (tree, routeSegment, path) => {
    const names = Object.getOwnPropertyNames(tree);
    if (tree[mainKey]) {
        const children = [];
        tree[mainKey].children = children;
        tree[mainKey].path = path;
        routeSegment.push(tree[mainKey]);
        names.forEach((it) => {
            traverseTree(tree[it], children, `${path}${it === 'index' ? '' : '/' + it}`);
        });
    }
    else {
        names.forEach((it) => {
            traverseTree(tree[it], routeSegment, `${path}${it === 'index' ? '' : '/' + it}`);
        });
    }
    return routeSegment;
};
export const buildPages = (weakContext, persistentContext) => {
    const routerTree = {};
    const keys = weakContext.keys().filter((it) => it.endsWith('.vue'));
    keys.forEach((it) => {
        const path = it.slice(2).slice(0, -4).split('/');
        deepSet(routerTree, [...path, mainKey], {
            name: weakContext.resolve(it),
            component: () => persistentContext(it),
        });
    });
    return traverseTree(routerTree, [], '');
};
//# sourceMappingURL=index.js.map