export const deepSet = (obj, path, value) => {
    path.slice(0, -1).reduce((acc, key) => (acc && acc[key]) || ((acc[key] = {}), acc[key]), obj)[path.slice(-1)[0]] = value;
};
