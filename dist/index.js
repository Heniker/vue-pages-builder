const routeRecordKey = Symbol('RouteRecord');
export const buildPages = (weakContext, persistentContext, { prependPath = '/', } = {}) => {
    const routerTree = {};
    const keys = weakContext
        .keys()
        .flatMap((it) => /.+\.(((ts|js)x?)|vue)$/.exec(it)?.[0] || []);
    keys.forEach((it) => {
        const path = it.slice(2).split('.').slice(0, -1).join('').split('/');
        deepSet(routerTree, [...path, routeRecordKey], {
            name: String(weakContext.resolve(it)),
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
function getRoutePath(path, lastSegment) {
    var path = path.endsWith('/') ? path.slice(0, -1) : path;
    var lastSegment = lastSegment === 'index'
        ? ''
        : lastSegment.startsWith('_')
            ? `:${lastSegment.slice(1)}`
            : `${lastSegment}`;
    return `${path}/${lastSegment}`;
}
function deepSet(obj, path, value) {
    path.slice(0, -1).reduce((acc, key) => (acc && acc[key]) || ((acc[key] = {}), acc[key]), obj)[path.slice(-1)[0]] = value;
}
