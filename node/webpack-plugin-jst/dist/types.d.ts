import { types } from '@appfibre/core';
export interface IEmitPluginArgs {
    name?: string;
}
export interface ILoaderPluginArgs extends types.ITransformSettings {
    name?: string;
}
