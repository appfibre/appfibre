import { IModuleSystem, IAppLoaded } from '../types';
export declare class CommonJS implements IModuleSystem {
    app: IAppLoaded;
    constructor(app: IAppLoaded);
    require: (url: string) => string;
    load(url: string, parent?: any): Promise<string>;
    exec(source: string, url?: string): any;
    instanciate(url: string, parent?: any): any;
}
