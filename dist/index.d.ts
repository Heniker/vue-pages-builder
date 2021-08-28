declare type ContextT = ReturnType<typeof require.context>;
export declare const buildPages: (weakContext: ContextT, persistentContext: ContextT) => import("vue-router").RouteRecordRaw[];
export {};
