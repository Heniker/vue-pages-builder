declare type ValidKeyT = string | number | symbol;
export declare const deepSet: (obj: Record<ValidKeyT, unknown>, path: ValidKeyT[], value: unknown) => void;
export {};
