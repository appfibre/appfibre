import { types } from '@appfibre/types';
export interface IEmitPluginArgs {
    name?: string;
}
export interface ILoaderPluginArgs extends types.app.ITransformSettings {
    name?: string;
}
