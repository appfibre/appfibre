import { IAppLoaded, IProcessor } from "../types";
import { IPromise } from "./promise";
export declare class Processor implements IProcessor {
    app: IAppLoaded;
    cache: any;
    type: "Processor";
    constructor(app: IAppLoaded);
    construct(jstComponent: any): any;
    locate(resource: any, path: string): any;
    getFunctionName(obj: any): string;
    private parse;
    resolve(fullpath: string): any;
    process(obj: any): IPromise<any>;
}
