import { IAppLoaded } from "../types";
declare let Async: (app: IAppLoaded) => {
    new (props: any): {
        [x: string]: any;
        render(): any;
    };
    [x: string]: any;
};
export { Async };
