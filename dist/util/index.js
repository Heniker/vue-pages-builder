export const deepGet = (obj, path) => {
    return path.reduce((val, key) => val && val[key], obj);
};
export const deepSet = (obj, path, val) => {
    path.slice(0, -1).reduce((val, key) => (val && val[key]) || ((val[key] = {}), val[key]), obj)[path.slice(-1)[0]] = val;
};
