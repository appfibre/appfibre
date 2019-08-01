//taken from preact
export namespace UI {
      
    export type Element<T=string, A extends { [key:string]:any } = {}, C=undefined> = Readonly<C> | [ Readonly<T>, Readonly<A>, Readonly<(Readonly<C>|{ [index:number]: Element<T,A,C>})>? ]
    export type ElementPromise = Promise<Element<any,any,any>>|Element<any, any, any|Promise<any>>

    //export type Element<T=string, A extends { [key:string]:any } = {}, C=undefined> = C | [ T, Readonly<A>, (C|{ [index:number]: Element<T,A,C>})? ]
    export type RenderableProps<P> = Readonly<P & { children?: Array<ElementPromise>}>;

    export interface Component<P = {}, S = {}> {
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
            props: Readonly<P>;
            context: any;
            //base?: HTMLElement;

            setState<K extends keyof S>(state: Pick<S, K>, callback?: () => void): void;
            setState<K extends keyof S>(fn: (prevState: S, props: P) => Pick<S, K>, callback?: () => void): void;

            forceUpdate(callback?: () => void): void;

            render(props?: Readonly<P>|Element<any, any, any>/*, state?: Readonly<S>, context?: any*/): any;
    }    
    
        /*
        export interface Component<P = {}, S = {}> {
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
            //base?: HTMLElement;

            setState<K extends keyof S>(state: Pick<S, K>, callback?: () => void): void;
            setState<K extends keyof S>(fn: (prevState: S, props: P) => Pick<S, K>, callback?: () => void): void;

            forceUpdate(callback?: () => void): void;

            render(props?: RenderableProps<P>, state?: Readonly<S>, context?: any): ComponentChild;
        }

        
	    export type Ref<T> = (instance: T) => void;
    
        export type RenderableProps<P, RefType = any> = Readonly<P & { children?: ComponentChildren; ref?: Ref<RefType> }>;
    */
        export type Key = string | number;
        
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

        export type ComponentFactory<P> = ComponentConstructor<P> | FunctionalComponent<P>;
        export interface VNode<P = any> {
            nodeName: ComponentFactory<P> | string;
            attributes: P;
            children: Array<VNode<any> | string>;
            key?: Key | null;
        }
        export type ComponentChild = VNode<any> | object | string | number | boolean | null;
        export type ComponentChildren = ComponentChild[] | ComponentChild;
}