import appfibre from "@appfibre/types";
export declare class Transformer implements appfibre.app.ITransformer {
    type: "Transformer";
    settings: appfibre.app.ITransformSettings;
    constructor(settings?: appfibre.app.ITransformSettings);
    private loadModule;
    reservedWords: string[];
    private format;
    _process(obj: any, esc: boolean, et: boolean, parseSettings: appfibre.app.ITransformOutput, offset: number): string;
    private processExports;
    private processImports;
    private bundleModule;
    transform(input: string | object, name?: string): appfibre.app.ITransformOutput;
}
