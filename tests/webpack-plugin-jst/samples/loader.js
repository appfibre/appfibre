import path from 'path';
import { Transformer } from '@appfibre/jst';

export default function (url) {
	const parts = url.split('#');
	const source = new Function('url', 'tmpdir', 'tmpdir = tmpdir ? tmpdir : global.process.env.INIT_CWD; var __dirname__ = global.process.cwd(); if (__dirname__ != tmpdir) global.process.chdir(tmpdir); var _exp = (global.require || global.process.mainModule.constructor._load)(url); if (global.process.cwd() != __dirname__) global.process.chdir(__dirname__); return _exp;')(parts[0], path.join(global.process.cwd(), 'dist'));
	const code = new Transformer( {module: 'cjs'} ).transform(source).code;
	let output = (eval)(code);
	for (let k = 1; k < parts.length; k++)
		output = output[parts[k]];
	return output;
}