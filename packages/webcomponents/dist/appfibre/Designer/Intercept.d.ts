import { Designer_Select } from "./types";
import appfibre from "@appfibre/types";
declare let Intercept: (app: appfibre.app.IAppLoaded<{}, {}>) => {
    new (props: any): {
        state: {
            focus: boolean;
            selected: boolean;
            selectedCorrelationId?: string | undefined;
            editMode: any;
            canEdit: boolean;
        };
        componentDidMount(): void;
        componentWillUnmount(): void;
        designer_select(ev: appfibre.app.IEventData<Designer_Select>): void;
        reconstruct(obj: any): any;
        render(): any;
        mouseEnter(): void;
        mouseLeave(): void;
        click(ev: any): void;
        props: Readonly<{
            file?: string | undefined;
            children?: any;
        }>;
        context: any;
        base?: HTMLElement | undefined;
        setState<K extends "focus" | "selected" | "selectedCorrelationId" | "editMode" | "canEdit">(state: Pick<{
            focus: boolean;
            selected: boolean;
            selectedCorrelationId?: string | undefined;
            editMode: any;
            canEdit: boolean;
        }, K>, callback?: (() => void) | undefined): void;
        setState<K extends "focus" | "selected" | "selectedCorrelationId" | "editMode" | "canEdit">(fn: (prevState: {
            focus: boolean;
            selected: boolean;
            selectedCorrelationId?: string | undefined;
            editMode: any;
            canEdit: boolean;
        }, props: {
            file?: string | undefined;
            children?: any;
        }) => Pick<{
            focus: boolean;
            selected: boolean;
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