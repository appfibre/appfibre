import { types } from "@appfibre/types";
export interface command_attr {
    title: string;
    commandType?: "button";
    style?: object;
    className?: string;
    hoverStyle: object;
    onClick?: () => void;
}
export interface section_attr {
    title: string;
    className?: string;
    commands: Array<command_attr>;
}
export interface attr {
    style?: object;
    className?: string;
    sections?: Array<section_attr>;
    section_style?: object;
    placement?: "top" | "bottom" | "left" | "right";
}
declare let CommandBar: (this: types.app.IAppLoaded<{}, {}>, props: attr, children: any[]) => ["div", attr, any[]];
export { CommandBar };
//# sourceMappingURL=CommandBar.d.ts.map