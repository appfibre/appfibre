import appfibre from "@appfibre/types";
import { Designer_Load } from "./types";
declare let DesignerFrame: (app: appfibre.webapp.IWebAppLoaded) => {
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
        designer_Load(ev: appfibre.app.IEventData<Designer_Load>): void;
        render(): any;
        setState<K extends "content">(state: Pick<{
            content: any;
        }, K>, callback?: (() => void) | undefined): void;
        setState<K extends "content">(fn: (prevState: {
            content: any;
        }, props: {}) => Pick<{
            content: any;
        }, K>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName?: string | undefined;
    defaultProps?: any;
};
export { DesignerFrame };
//# sourceMappingURL=DesignerFrame.d.ts.map