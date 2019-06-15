var appfibre_rollup = (function (core) {
	'use strict';

	function jst (options = { module: 'ES'}) {
		//const filter = createFilter(options.include, options.exclude);
		if (!options.module) options.module = 'ES';
		if (options.dangerouslyProcessJavaScript === undefined) options.dangerouslyProcessJavaScript = false;
		return {
			name: 'json',

			transform (input, id) {
				if (id.slice(-5) !== '.json' && id.slice(-4) !== '.jst') return null;
				//if (!filter(id)) return null;
				return { code: new core.Transformer(options).transform(input, id).code, map: { mappings: '' } };
			}
		};
	}

	return jst;

}(core));
//# sourceMappingURL=rollup-plugin-jst.js.map
