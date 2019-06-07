import * as types from "../types";
export declare class Transformer implements types.ITransformer {
    type: "Transformer";
    settings: types.ITransformSettings;
    constructor(settings?: types.ITransformSettings);
    private loadModule;
    reservedWords: string[];
    private format;
    _process(obj: any, esc: boolean, et: boolean, parseSettings: types.ITransformOutput, offset: number): string;
    private processExports;
    private processImports;
    private bundleModule;
    transform(input: string | object, name?: string): types.ITransformOutput;
}
