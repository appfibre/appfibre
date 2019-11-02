import { types } from "@appfibre/types";
import { Designer_Load } from "./types";
declare let DesignerFrame: (app: types.webapp.IWebAppLoaded) => {
    new (props: {}): {
        context: any;
        base?: HTMLElement | undefined;
        props: {};
        state: {
            content: any;
        };
        componentWillMount(): void;
        window_click(ev: Event): void;
        componentWillUnmount(): void;
        designer_Load(ev: types.app.IEventData<Designer_Load>): void;
        render(): any;
        componentDidMount?(): void;
        getChildContext?(): object;
        componentWillReceiveProps?(nextProps: Readonly<{}>, nextContext: any): void;
        shouldComponentUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{
            content: any;
        }>, nextContext: any): boolean;
        componentWillUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{
            content: any;
        }>, nextContext: any): void;
        componentDidUpdate?(previousProps: Readonly<{}>, previousState: Readonly<{
            content: any;
        }>, previousContext: any): void;
        setState<K extends "content">(state: Pick<{
            content: any;
        }, K>, callback?: (() => void) | undefined): void;
        setState<K_1 extends "content">(fn: (prevState: {
            content: any;
        }, props: {}) => Pick<{
            content: any;
        }, K_1>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName?: string | undefined;
    defaultProps?: any;
};
export { DesignerFrame };
//# sourceMappingURL=DesignerFrame.d.ts.map