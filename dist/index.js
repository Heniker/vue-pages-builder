import { deepSet } from './util/index';
const routeRecordKey = Symbol('routeRecord');
export const buildPages = (weakContext, persistentContext, { prependPath = '/', } = {}) => {
    const routerTree = {};
    const keys = weakContext
        .keys()
        .flatMap((it) => /.+\.(((ts|js)x?)|vue)$/.exec(it)?.[0] || []);
    keys.forEach((it) => {
        const path = it.slice(2).split('.').slice(0, -1).join('').split('/');
        deepSet(routerTree, [...path, routeRecordKey], {
            name: weakContext.resolve(it),
            component: () => persistentContext(it),
        });
    });
    const result = traverseTree(routerTree, prependPath);
    return result;
};
function traverseTree(tree, path) {
    const names = Object.getOwnPropertyNames(tree);
    const routeRecord = tree[routeRecordKey];
    const result = [];
    let currentRoute = result;
    if (routeRecord) {
        result.push(routeRecord);
        routeRecord.path = path;
        routeRecord.children = [];
        currentRoute = routeRecord.children;
    }
    names.forEach((it) => {
        currentRoute.push(...traverseTree(tree[it], getRoutePath(path, it)));
    });
    return result;
}
function getRoutePath(path_, lastSegment_) {
    const path = path_.endsWith('/') ? path_.slice(0, -1) : path_;
    const lastSegment = lastSegment_ === 'index'
        ? ''
        : lastSegment_.startsWith('_')
            ? `:${lastSegment_.slice(1)}`
            : `${lastSegment_}`;
    return `${path}/${lastSegment}`;
}
