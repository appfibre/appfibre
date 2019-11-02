import { types } from "@appfibre/types";
declare type props = {
    placement?: "left" | "right" | "top" | "bottom";
    name?: string;
    tabs?: Array<string>;
};
declare type state = {
    selectedIndex: number;
};
declare let SidePanel: (app: types.webapp.IWebAppLoaded) => {
    new (props: props): {
        context: any;
        base?: HTMLElement | undefined;
        props: props;
        state: state;
        componentWillMount(): void;
        componentWillUnmount(): void;
        render(): any;
        componentDidMount?(): void;
        getChildContext?(): object;
        componentWillReceiveProps?(nextProps: Readonly<props>, nextContext: any): void;
        shouldComponentUpdate?(nextProps: Readonly<props>, nextState: Readonly<state>, nextContext: any): boolean;
        componentWillUpdate?(nextProps: Readonly<props>, nextState: Readonly<state>, nextContext: any): void;
        componentDidUpdate?(previousProps: Readonly<props>, previousState: Readonly<state>, previousContext: any): void;
        setState<K extends "selectedIndex">(state: Pick<state, K>, callback?: (() => void) | undefined): void;
        setState<K_1 extends "selectedIndex">(fn: (prevState: state, props: props) => Pick<state, K_1>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName?: string | undefined;
    defaultProps?: any;
};
export { SidePanel };
//# sourceMappingURL=SidePanel.d.ts.map