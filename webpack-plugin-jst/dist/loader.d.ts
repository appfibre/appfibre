import { ILoaderPluginArgs } from './types';
import { loader } from 'webpack';
declare function Loader(this: loader.LoaderContext, input: string, options?: ILoaderPluginArgs): string;
export default Loader;
