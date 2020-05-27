(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@appfibre/core')) :
	typeof define === 'function' && define.amd ? define(['@appfibre/core'], factory) :
	(global = global || self, global.appfibre_rollup = factory(global.core));
}(this, (function (core) { 'use strict';

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

})));
//# sourceMappingURL=rollup-plugin-jst.js.map
