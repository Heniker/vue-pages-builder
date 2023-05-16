type ContextT = ReturnType<typeof require.context>;
export declare const buildPages: (weakContext: ContextT, persistentContext: ContextT, { prependPath, getName, }?: {
    prependPath?: string;
    getName?(path: string): import('vue-router').RouteRecordName;
}) => import("vue-router").RouteRecordRaw[];
export {};
