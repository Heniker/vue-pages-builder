declare type ContextT = ReturnType<typeof require.context>;
export declare const buildPages: (weakContext: ContextT, persistentContext: ContextT, { prependPath, }?: {
    prependPath?: string;
}) => import("vue-router").RouteRecordRaw[];
export {};
