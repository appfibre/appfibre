declare class tab extends HTMLElement {
    _shadowRoot: ShadowRoot;
    _button: HTMLButtonElement;
    _container: HTMLDivElement;
    constructor();
    get label(): string;
    set label(value: string);
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldVal: string, newVal: string): void;
    render(): void;
    connectedCallback(): void;
}
declare let Tab: {
    control: typeof tab;
    type: string;
    designer: null;
};
export { Tab };
