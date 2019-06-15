import appfibre from "@appfibre/types";
export interface SplitContainer_Attributes {
    direction?: "row" | "column" | "row-reverse" | "column-reverse";
    defaults?: Array<initial>;
    children?: Array<any>;
}
export interface state {
    direction: "row" | "column" | "row-reverse" | "column-reverse";
    vertical: boolean;
    container?: HTMLElement;
    panels: Array<panel>;
    resize?: {
        splitter: number;
        prev: number;
        next: number;
        prev_ratio: number;
        next_ratio: number;
        start: number;
    };
}
export interface initial {
    size?: number;
    min?: number;
    max?: number;
}
export interface panel extends initial {
    ratio?: any;
    content: any;
}
declare let SplitContainer: (app: appfibre.webapp.IWebAppLoaded) => {
    new (props: SplitContainer_Attributes): {
        state: state;
        distributeSpace(panels: panel[], available: number): panel[];
        window_mousemove(e: MouseEvent): void;
        splitter_mousedown(e: MouseEvent, index: number): void;
        window_mouseup(e: MouseEvent): void;
        render(): any;
        props: Readonly<SplitContainer_Attributes>;
        context: any;
        base?: HTMLElement | undefined;
        setState<K extends "resize" | "direction" | "vertical" | "container" | "panels">(state: Pick<state, K>, callback?: (() => void) | undefined): void;
        setState<K extends "resize" | "direction" | "vertical" | "container" | "panels">(fn: (prevState: state, props: SplitContainer_Attributes) => Pick<state, K>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName?: string | undefined;
    defaultProps?: any;
};
export { SplitContainer };
//# sourceMappingURL=SplitContainer.d.ts.map