import { ITransformer, ITransformSettings, ITransformOutput } from '../types';
export declare class Transformer implements ITransformer {
    type: "Transformer";
    settings: ITransformSettings;
    constructor(settings?: ITransformSettings);
    private loadModule;
    reservedWords: string[];
    private format;
    private process;
    private processExports;
    private processImports;
    private bundleModule;
    transform(input: string | object, name?: string): ITransformOutput;
}
