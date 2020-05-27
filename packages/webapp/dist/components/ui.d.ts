declare function createElement(type: any, props: object, children: any): {
    type: any;
    props: {
        children: any;
    };
};
declare function render(element: any, container: any): void;
import { types } from '@appfibre/types';
export declare class Component<P, S> {
    constructor(props: P | undefined, context?: any);
    static displayName?: string;
    static defaultProps?: any;
    state: Readonly<S>;
    props: Readonly<P>;
    context: any;
    setState<K extends keyof S>(fn: (prevState: S, props: P) => Pick<S, K>, callback?: () => void): void;
    setState<K extends keyof S>(state: Pick<S, K>, callback?: () => void): void;
    forceUpdate(_callback?: () => void): void;
    render(props?: Readonly<P> | types.app.UI.Element<any, any, any>): any;
}
export { render, createElement };
