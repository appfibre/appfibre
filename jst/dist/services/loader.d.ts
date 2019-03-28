import { IModuleSystem, IAppLoaded } from '../types';
export declare class Loader implements IModuleSystem {
    type: "ModuleSystem";
    static app: IAppLoaded;
    constructor(app: IAppLoaded);
    load(url: string, parent?: any): Promise<string>;
    require(url: string): any;
    private run;
    exec(source: string, url?: string): Promise<any>;
    instanciate(url: string, parent?: any): any;
}
