import { Designer_Select } from "./types";
import appfibre from "@appfibre/types";
declare let DesktopRibbon: (app: appfibre.app.IAppLoaded<{}, {}>) => {
    new (props: any): {
        componentDidMount(): void;
        componentWillUnmount(): void;
        url_change(ev: any): void;
        navigate_click(): void;
        edit_click(): void;
        render(): any;
        onSelect(ev: appfibre.app.IEventData<Designer_Select>): void;
        state: Readonly<{
            selectedContext: appfibre.app.IEventData<Designer_Select> | null;
            source?: string | null | undefined;
            url: string;
        }>;
        props: Readonly<any>;
        context: any;
        base?: HTMLElement | undefined;
        setState<K extends "source" | "url" | "selectedContext">(state: Pick<{
            selectedContext: appfibre.app.IEventData<Designer_Select> | null;
            source?: string | null | undefined;
            url: string;
        }, K>, callback?: (() => void) | undefined): void;
        setState<K extends "source" | "url" | "selectedContext">(fn: (prevState: {
            selectedContext: appfibre.app.IEventData<Designer_Select> | null;
            source?: string | null | undefined;
            url: string;
        }, props: any) => Pick<{
            selectedContext: appfibre.app.IEventData<Designer_Select> | null;
            source?: string | null | undefined;
            url: string;
        }, K>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName?: string | undefined;
    defaultProps?: any;
};
export { DesktopRibbon };
//# sourceMappingURL=DesktopRibbon.d.ts.map