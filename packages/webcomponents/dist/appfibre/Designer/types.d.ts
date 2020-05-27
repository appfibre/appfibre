import { types } from '@appfibre/types';
export interface Designer_Select {
    editMode: boolean;
    canEdit: boolean;
    control?: {
        url: string;
    };
}
export interface _url {
    url: string;
}
export interface Designer_Load extends _url {
}
export declare enum EditMode {
    "Inline" = 0,
    "Source" = 1
}
export interface Edit_Event {
    viewSource: boolean;
    activeFiles: Array<string>;
    selectedFile?: string;
}
export interface Ribbon_Event {
    editMode?: EditMode;
}
declare let events: {
    "Designer.Load": (data?: Designer_Load | undefined) => types.app.IEventType & {
        data: Designer_Load | undefined;
    };
    "Designer.Intercept.Select": (data?: Designer_Select | undefined) => types.app.IEventType & {
        data: Designer_Select | undefined;
    };
    "Designer.Select": (event?: types.app.IEventData<Designer_Select | undefined> | undefined) => types.app.IEventData<Designer_Select | undefined>;
    "Designer.Ribbon.ToggleEdit": () => types.app.IEventType;
    "Designer.EditMode.Inline": (data?: _url | undefined) => types.app.IEventType & {
        data: _url | undefined;
    };
    "Designer.EditMode.Source": (data?: _url | undefined) => types.app.IEventType & {
        data: _url | undefined;
    };
    "Ribbon.Event": (data?: Ribbon_Event | undefined, correlationId?: string | undefined) => types.app.IEventData<Ribbon_Event | undefined>;
    "Edit.Event": (data?: Edit_Event | undefined, correlationId?: string | undefined) => types.app.IEventData<Edit_Event | undefined>;
    "Intercept.Mounted": (data?: {
        file?: string | undefined;
    } | undefined, correlationId?: string | undefined) => types.app.IEventData<{
        file?: string;
    } | undefined>;
};
export { events };
//# sourceMappingURL=types.d.ts.map