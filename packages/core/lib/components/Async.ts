import appfibre from "@appfibre/types"

declare class Promise<T>  {
    constructor(resolver: Function);
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): Promise<T | TResult>;
    static all(promises: Promise<any>[]): Promise<any>;
    static resolve<T>(value: T | PromiseLike<T>): Promise<T>;
}

let Async = function inject(app:appfibre.app.IAppLoaded) {
    return class Async extends app.services.UI.Component<{}, {value?: any}>
    {
        state: {value?: any};
        constructor(props:any, context:any)
        {
            super(props, context);
            this.state = {};

            //(Array.isArray(this.props.children) ? Promise.all : Promise.resolve)(this.props.children).then(o => this.setState({value: o  }));
            if (Array.isArray(props.children))
                Promise.all(props.children).then(o => this.setState({value: o  }));
            else //if (Promise.resolve(this.props.children) === this.props.children)
                Promise.resolve(props.children).then(o => this.setState({value: o  }));
        }

        render() {
            return !!this.state.value ? super.render(this.state.value) : null;
        }
    }
}

export { Async }