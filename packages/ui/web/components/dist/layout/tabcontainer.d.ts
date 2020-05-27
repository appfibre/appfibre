declare class tabContainer extends HTMLElement {
    _sR: ShadowRoot;
    constructor();
    static get observedAttributes(): string[];
    get label(): string | null;
    set label(value: string | null);
    get option(): string | null;
    set option(value: string | null);
    get options(): any;
    set options(value: any);
    static get observedAttributes(): string[];
    attributeChangedCallback(name: any, oldVal: any, newVal: any): void;
    render(): void;
}
declare let TabContainer: {
    control: typeof tabContainer;
    designer: null;
};
export { TabContainer };
