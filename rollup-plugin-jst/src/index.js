import {createFilter} from 'rollup-pluginutils';
import {Transformer} from '@appfibre/jst';

export default function jst (options = { module: 'ES'}) {
	const filter = createFilter(options.include, options.exclude);
	if (!options.module) options.module = 'ES';
	return {
		name: 'json',

		transform (json, id) {
			if (id.slice(-5) !== '.json' && id.slice(-4) !== '.jst') return null;
			if (!filter(id)) return null;
			return { code: new Transformer(options).transform(JSON.parse(json), options), map: { mappings: '' } };
		}
	};
}
