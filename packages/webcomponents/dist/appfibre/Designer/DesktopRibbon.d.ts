import { Designer_Select } from "./types";
import { types } from "@appfibre/types";
declare let DesktopRibbon: (app: types.app.IAppLoaded<{}, {}>) => {
    new (props: any): {
        componentDidMount(): void;
        componentWillUnmount(): void;
        url_change(ev: any): void;
        navigate_click(): void;
        edit_click(): void;
        render(): any;
        onSelect(ev: types.app.IEventData<Designer_Select>): void;
        state: Readonly<{
            selectedContext: types.app.IEventData<Designer_Select> | null;
            source?: string | null | undefined;
            url: string;
        }>;
        props: Readonly<any>;
        context: any;
        setState<K extends "selectedContext" | "source" | "url">(state: Pick<{
            selectedContext: types.app.IEventData<Designer_Select> | null;
            source?: string | null | undefined;
            url: string;
        }, K>, callback?: (() => void) | undefined): void;
        setState<K extends "selectedContext" | "source" | "url">(fn: (prevState: {
            selectedContext: types.app.IEventData<Designer_Select> | null;
            source?: string | null | undefined;
            url: string;
        }, props: any) => Pick<{
            selectedContext: types.app.IEventData<Designer_Select> | null;
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