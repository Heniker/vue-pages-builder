type ValidKeyT = string | number | symbol

export const deepSet = (obj: Record<ValidKeyT, unknown>, path: ValidKeyT[], value: unknown) => {
  path.slice(0, -1).reduce((acc, key) => (acc && acc[key]) || ((acc[key] = {}), acc[key]), obj)[
    path.slice(-1)[0]
  ] = value
}
