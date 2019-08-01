import types from "@appfibre/types";
export declare class Transformer implements types.app.ITransformer {
    type: "Transformer";
    settings: types.app.ITransformSettings;
    constructor(settings?: types.app.ITransformSettings);
    loadModule(context: types.app.ITransformContext, val: string, offset: number): string;
    reservedWords: string[];
    private format;
    process(obj: any, context: types.app.ITransformContext, esc: boolean, et: boolean, offset: number): string;
    private skey;
    private processExports;
    private processImports;
    transformTemplate(template: types.jst.template, name?: string): types.app.ITransformOutput;
    transform(input: string, name?: string): types.app.ITransformOutput;
}
