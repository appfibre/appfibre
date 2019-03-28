import { IResolver, ILoader } from '../types';
export declare class Resolver implements IResolver {
    cache: any;
    loader: ILoader;
    constructor(loader: ILoader);
    resolve(fullpath: string): void;
    locate(resource: any, path: string): any;
    getFunctionName(obj: any): string;
}
