import types from "@appfibre/types";
export declare class Transformer implements types.app.ITransformer {
    type: "Transformer";
    settings: types.app.ITransformSettings;
    constructor(settings?: types.app.ITransformSettings);
    loadModule(tc: types.app.ITransformContext, val: string, depth: number): string;
    reservedWords: string[];
    private format;
    process(obj: any, tc: types.app.ITransformContext, context: types.app.ITransformProcessingContext): types.app.IProcessOutput;
    private skey;
    private processExports;
    private resolve;
    private processImports;
    transformTemplate(template: types.jst.template, name?: string): types.app.ITransformOutput;
    transform(input: string, name?: string): types.app.ITransformOutput;
}
