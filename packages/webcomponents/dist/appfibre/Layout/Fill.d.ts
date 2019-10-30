export interface attr {
    direction?: "horizontal" | "vertical";
    index: number;
    style?: {
        height?: string;
    };
    ref?: Function;
}
declare var Fill: (a: attr, children: object[]) => (string | (string | object[] | {
    ref: (e: HTMLDivElement) => void;
})[][] | {
    style: {
        height?: string | undefined;
    };
    ref: (e: HTMLDivElement, index?: number | undefined) => void;
})[];
export { Fill };
//# sourceMappingURL=Fill.d.ts.map