import { IAppLoaded } from "../types";
declare let Async: (app: IAppLoaded) => {
    new (props: any): {
        componentDidMount(): void;
        render(): any;
    };
};
export { Async };
