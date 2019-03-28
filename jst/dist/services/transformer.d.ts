import { ITransformer, ITransformSettings, IParseSettings } from '../types';
export declare class Transformer implements ITransformer {
    type: "Transformer";
    settings: ITransformSettings;
    constructor(settings?: ITransformSettings);
    loadModule(val: string, parseSettings: IParseSettings): string;
    reservedWords: string[];
    format(lines: string[], parseSettings: IParseSettings, indent: number): string;
    process(obj: any, esc: boolean, et: boolean, parseSettings: IParseSettings, offset: number): string;
    bundleModule(obj: any, parseSettings: IParseSettings): string;
    transform(obj: any, name?: string): string;
}
