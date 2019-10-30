import { Designer_Select, Edit_Event } from "./types";
import { types } from "@appfibre/types";
declare let Intercept: (app: types.app.IAppLoaded<{}, {}>) => {
    new (props: any): {
        state: {
            focus: boolean;
            selected: boolean;
            editing: boolean;
            selectedCorrelationId?: string | undefined;
            editMode: any;
            canEdit: boolean;
        };
        componentDidMount(): void;
        componentWillUnmount(): void;
        edit_event(ev: types.app.IEventData<Edit_Event>): void;
        designer_select(ev: types.app.IEventData<Designer_Select>): void;
        reconstruct(obj: any): any;
        render(): any;
        mouseEnter(): void;
        mouseLeave(): void;
        doubleclick(ev: MouseEvent): void;
        click(ev: MouseEvent): void;
        props: Readonly<{
            file?: string | undefined;
            children?: any;
        }>;
        context: any;
        setState<K extends "editMode" | "editing" | "focus" | "selected" | "selectedCorrelationId" | "canEdit">(state: Pick<{
            focus: boolean;
            selected: boolean;
            editing: boolean;
            selectedCorrelationId?: string | undefined;
            editMode: any;
            canEdit: boolean;
        }, K>, callback?: (() => void) | undefined): void;
        setState<K extends "editMode" | "editing" | "focus" | "selected" | "selectedCorrelationId" | "canEdit">(fn: (prevState: {
            focus: boolean;
            selected: boolean;
            editing: boolean;
            selectedCorrelationId?: string | undefined;
            editMode: any;
            canEdit: boolean;
        }, props: {
            file?: string | undefined;
            children?: any;
        }) => Pick<{
            focus: boolean;
            selected: boolean;
            editing: boolean;
            selectedCorrelationId?: string | undefined;
            editMode: any;
            canEdit: boolean;
        }, K>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName?: string | undefined;
    defaultProps?: any;
};
export { Intercept };
//# sourceMappingURL=Intercept.d.ts.map