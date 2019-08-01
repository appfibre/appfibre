import appfibre from '@appfibre/types';
export interface IEmitPluginArgs {
    name?: string;
}
export interface ILoaderPluginArgs extends appfibre.app.ITransformSettings {
    name?: string;
}
