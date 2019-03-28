import { IAppLoaded } from "../types";
declare let Async: (app: IAppLoaded) => {
    new (props: any): {
        [x: string]: any;
        componentDidMount(): void;
        render(): any;
    };
    [x: string]: any;
};
export { Async };
