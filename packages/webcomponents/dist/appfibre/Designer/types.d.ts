import { types } from '@appfibre/types';
export interface Designer_Select {
    editMode: boolean;
    canEdit: boolean;
    control?: {
        url: string;
    };
}
export interface Designer_Load {
    url: string;
}
declare let events: {
    "Designer.Load": (data?: Designer_Load | undefined) => types.app.IEventType & {
        data: Designer_Load | undefined;
    };
    "Designer.Intercept.Select": (data?: Designer_Select | undefined) => types.app.IEventType & {
        data: Designer_Select | undefined;
    };
    "Designer.Select": (event?: types.app.IEventData<Designer_Select | undefined> | undefined) => types.app.IEventData<Designer_Select | undefined>;
};
export { events };
//# sourceMappingURL=types.d.ts.map