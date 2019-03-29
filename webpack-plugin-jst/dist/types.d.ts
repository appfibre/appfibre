import { types } from '@appfibre/jst';
export interface IEmitPluginArgs {
    name?: string;
}
export interface ILoaderPluginArgs extends types.ITransformSettings {
    name?: string;
}
