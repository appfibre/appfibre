import { types } from "@appfibre/types";
import { Designer_Load, Designer_Select, Ribbon_Event, EditMode, Edit_Event } from "./types";
declare type file = {
    content: string;
};
declare type state = {
    selectedIndex?: number;
    editMode?: EditMode;
    sources: {
        [filename: string]: file;
    };
};
declare let DesignerViewPort: (app: types.webapp.IWebAppLoaded) => {
    new (props: {}): {
        props: {};
        iframe?: HTMLFrameElement | undefined;
        componentWillMount(): void;
        componentWillUnmount(): void;
        load_file(target: {
            [filename: string]: file;
        }, file: string): Promise<unknown>;
        edit_event(ev: types.app.IEventData<Edit_Event>): void;
        ribbon_event(ev: types.app.IEventData<Ribbon_Event>): void;
        designer_select(ev: types.app.IEventData<Designer_Select>): void;
        designer_load(ev: types.app.IEventData<Designer_Load>): void;
        designer_relay<T>(ev: types.app.IEventData<T>): void;
        onRedirect(event: types.app.IEventData<any>): void;
        intercept_mounted(ev: types.app.IEventData<{
            file?: string | undefined;
        }>): void;
        onSelectedIndexChanged(index: number): void;
        onCodeChange(file: string, value: string): void;
        render(): any;
        componentDidMount?(): void;
        getChildContext?(): object;
        componentWillReceiveProps?(nextProps: Readonly<{}>, nextContext: any): void;
        shouldComponentUpdate?(nextProps: Readonly<{}>, nextState: Readonly<state>, nextContext: any): boolean;
        componentWillUpdate?(nextProps: Readonly<{}>, nextState: Readonly<state>, nextContext: any): void;
        componentDidUpdate?(previousProps: Readonly<{}>, previousState: Readonly<state>, previousContext: any): void;
        state: Readonly<state>;
        context: any;
        setState<K extends "selectedIndex" | "editMode" | "sources">(state: Pick<state, K>, callback?: (() => void) | undefined): void;
        setState<K_1 extends "selectedIndex" | "editMode" | "sources">(fn: (prevState: state, props: {}) => Pick<state, K_1>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName?: string | undefined;
    defaultProps?: any;
};
export { DesignerViewPort };
//# sourceMappingURL=DesignerViewport.d.ts.map