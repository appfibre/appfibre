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
    processElement(ar: Array<any>, supportAsync?: boolean, light?: boolean): any;
    parse(obj: any, key?: number | undefined, supportAsync?: boolean): any;
    resolve(fullpath: string): any;
    process(obj: any): IPromise<any>;
    instanciate(url: string, parent?: any): any;
}
