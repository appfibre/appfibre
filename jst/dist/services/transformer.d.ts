import { ITransformer, ITransformSettings, ITransformOutput } from '../types';
export declare class Transformer implements ITransformer {
    type: "Transformer";
    settings: ITransformSettings;
    constructor(settings?: ITransformSettings);
    loadModule(val: string, parseSettings: ITransformOutput): string;
    reservedWords: string[];
    format(lines: string[], parseSettings: ITransformOutput, indent: number): string;
    process(obj: any, esc: boolean, et: boolean, parseSettings: ITransformOutput, offset: number): string;
    bundleModule(obj: any, name?: string): ITransformOutput;
    transform(input: string | object, name?: string): ITransformOutput;
}
