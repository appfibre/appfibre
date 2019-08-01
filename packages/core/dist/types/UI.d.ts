export declare type Key = string | number;
export declare type Ref<T> = (instance: T) => void;
export declare type ComponentChild = VNode<any> | object | string | number | boolean | null;
export declare type ComponentChildren = ComponentChild[] | ComponentChild;
export interface Attributes {
    key?: Key;
    jsx?: boolean;
}
export interface ClassAttributes<T> extends Attributes {
    ref?: Ref<T>;
}
export declare type ComponentFactory<P> = ComponentConstructor<P> | FunctionalComponent<P>;
/**
 * Define the contract for a virtual node in preact.
 *
 * A virtual node has a name, a map of attributes, an array
 * of child {VNode}s and a key. The key is used by preact for
 * internal purposes.
 */
export interface VNode<P = any> {
    nodeName: ComponentFactory<P> | string;
    attributes: P;
    children: Array<VNode<any> | string>;
    key?: Key | null;
}
export declare type RenderableProps<P, RefType = any> = Readonly<P & Attributes & {
    children?: ComponentChildren;
    ref?: Ref<RefType>;
}>;
export interface FunctionalComponent<P = {}> {
    (props: RenderableProps<P>, context?: any): VNode<any> | null;
    displayName?: string;
    defaultProps?: Partial<P>;
}
export interface ComponentConstructor<P = {}, S = {}> {
    new (props: P, context?: any): Component<P, S>;
    displayName?: string;
    defaultProps?: Partial<P>;
}
export declare type AnyComponent<P = {}, S = {}> = FunctionalComponent<P> | ComponentConstructor<P, S>;
export interface Component<P = {}, S = {}> {
    componentWillMount?(): void;
    componentDidMount?(): void;
    componentWillUnmount?(): void;
    getChildContext?(): object;
    componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void;
    shouldComponentUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean;
    componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void;
    componentDidUpdate?(previousProps: Readonly<P>, previousState: Readonly<S>, previousContext: any): void;
}
export declare abstract class Component<P, S> {
    constructor(props?: P, context?: any);
    static displayName?: string;
    static defaultProps?: any;
    state: Readonly<S>;
    props: RenderableProps<P>;
    context: any;
    base?: HTMLElement;
    setState<K extends keyof S>(state: Pick<S, K>, callback?: () => void): void;
    setState<K extends keyof S>(fn: (prevState: S, props: P) => Pick<S, K>, callback?: () => void): void;
    forceUpdate(callback?: () => void): void;
    abstract render(props?: RenderableProps<P>, state?: Readonly<S>, context?: any): ComponentChild;
}
