import { Designer_Select, Edit_Event } from "./types";
import { types } from "@appfibre/types";
declare let Intercept: (app: types.app.IAppLoaded<{}, {}>) => {
    new (props: any): {
        state: {
            focus: boolean;
            selected: boolean;
            editing: boolean;
            selectedCorrelationId?: string;
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
        componentWillMount?(): void;
        getChildContext?(): object;
        componentWillReceiveProps?(nextProps: Readonly<{
            file?: string | undefined;
            children?: any;
        }>, nextContext: any): void;
        shouldComponentUpdate?(nextProps: Readonly<{
            file?: string | undefined;
            children?: any;
        }>, nextState: Readonly<{
            focus: boolean;
            selected: boolean;
            editing: boolean;
            selectedCorrelationId?: string | undefined;
            editMode: any;
            canEdit: boolean;
        }>, nextContext: any): boolean;
        componentWillUpdate?(nextProps: Readonly<{
            file?: string | undefined;
            children?: any;
        }>, nextState: Readonly<{
            focus: boolean;
            selected: boolean;
            editing: boolean;
            selectedCorrelationId?: string | undefined;
            editMode: any;
            canEdit: boolean;
        }>, nextContext: any): void;
        componentDidUpdate?(previousProps: Readonly<{
            file?: string | undefined;
            children?: any;
        }>, previousState: Readonly<{
            focus: boolean;
            selected: boolean;
            editing: boolean;
            selectedCorrelationId?: string | undefined;
            editMode: any;
            canEdit: boolean;
        }>, previousContext: any): void;
        props: Readonly<{
            file?: string | undefined;
            children?: any;
        }>;
        context: any;
        setState<K extends "focus" | "editMode" | "editing" | "selected" | "selectedCorrelationId" | "canEdit">(state: Pick<{
            focus: boolean;
            selected: boolean;
            editing: boolean;
            selectedCorrelationId?: string | undefined;
            editMode: any;
            canEdit: boolean;
        }, K>, callback?: (() => void) | undefined): void;
        setState<K_1 extends "focus" | "editMode" | "editing" | "selected" | "selectedCorrelationId" | "canEdit">(fn: (prevState: {
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
        }, K_1>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName?: string | undefined;
    defaultProps?: any;
};
export { Intercept };
//# sourceMappingURL=Intercept.d.ts.map