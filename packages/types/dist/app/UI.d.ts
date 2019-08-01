export declare namespace UI {
    type Element<T = string, A extends {
        [key: string]: any;
    } = {}, C = undefined> = Readonly<C> | [Readonly<T>, Readonly<A>, Readonly<(Readonly<C> | {
        [index: number]: Element<T, A, C>;
    })>?];
    type ElementPromise = Promise<Element<any, any, any>> | Element<any, any, any | Promise<any>>;
    type RenderableProps<P> = Readonly<P & {
        children?: Array<ElementPromise>;
    }>;
    interface Component<P = {}, S = {}> {
        componentWillMount?(): void;
        componentDidMount?(): void;
        componentWillUnmount?(): void;
        getChildContext?(): object;
        componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void;
        shouldComponentUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean;
        componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void;
        componentDidUpdate?(previousProps: Readonly<P>, previousState: Readonly<S>, previousContext: any): void;
    }
    abstract class Component<P, S> {
        constructor(props?: P, context?: any);
        static displayName?: string;
        static defaultProps?: any;
        state: Readonly<S>;
        props: Readonly<P>;
        context: any;
        setState<K extends keyof S>(state: Pick<S, K>, callback?: () => void): void;
        setState<K extends keyof S>(fn: (prevState: S, props: P) => Pick<S, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        render(props?: Readonly<P> | Element<any, any, any>): any;
    }
    type Key = string | number;
    interface FunctionalComponent<P = {}> {
        (props: RenderableProps<P>, context?: any): VNode<any> | null;
        displayName?: string;
        defaultProps?: Partial<P>;
    }
    interface ComponentConstructor<P = {}, S = {}> {
        new (props: P, context?: any): Component<P, S>;
        displayName?: string;
        defaultProps?: Partial<P>;
    }
    type ComponentFactory<P> = ComponentConstructor<P> | FunctionalComponent<P>;
    interface VNode<P = any> {
        nodeName: ComponentFactory<P> | string;
        attributes: P;
        children: Array<VNode<any> | string>;
        key?: Key | null;
    }
    type ComponentChild = VNode<any> | object | string | number | boolean | null;
    type ComponentChildren = ComponentChild[] | ComponentChild;
}
//# sourceMappingURL=UI.d.ts.map