require('systemjs/dist/s.js');
require('systemjs/dist/extras/transform');
require('systemjs/dist/extras/amd.js');
require('systemjs/dist/extras/named-register.js');

const jst = require('@appfibre/jst');
if (!this.Promise) this.Promise = require('pinkie');

const systemJSPrototype = System.constructor.prototype;

const instantiate = systemJSPrototype.instantiate;
systemJSPrototype.instantiate = function (url, parent) {
	if (url.slice(-5) === '.wasm')
		return instantiate.call(this, url, parent);

	const loader = this;
	if (url[0] === '@')
		return [[], function (_export) {
			_export('default', jst);
			const k = Object.keys(jst);
			for (let i in k) _export(k[i], jst[k[i]]);
			return { execute (z) {}};
		}];

	let u = url.indexOf('#') > -1 ? url.slice(0, url.indexOf('#')) : url;
	let b = url.slice(u.length - url.length).split('#');

	return fetch(u)
		.then(function (source) {
			try {
				return transform.call(this, url.toLowerCase(), source); 
			} catch (ex) {
				console.error('Error transforming ' + u + ': ' + ex.description || ex.message, ex.stack || '', [source]);
				throw ex;
			}
		}, (reason) => {throw new Error('Fetch error: ' + reason + (parent ? ' loading from  ' + parent : ''));})
		.then((source) => {   
    try{
      (0, eval)(source + '\n//# sourceURL=' + url);
    } catch (ex) {
      console.error('Error evaluating ' + u + ': ' + ex.description || ex.message, ex.stack || '', [source]);
      throw ex;
    }
    return loader.getRegister();
  }).catch((message) => {console.error('Error instanciating ' + u + ': ' + message.description || message.message, message.stack || ""); throw new Error(message);});
};

// Hookable transform function!
function transform (id, source) {
	return (id.indexOf('.json')>-1 || id.indexOf('.jst')>-1) ? new jst.Transformer({ module: 'amd'}).transform(source, id).code/*.replace('function (_0) {', 'function (_0) { debugger;')*/ : source;
}

const resolve = systemJSPrototype.resolve;
systemJSPrototype.resolve = function (id, parentUrl) {
	if (id[0] === '@') 
		return id;
	return resolve.call(this, id, parentUrl);
};

function fetch (url) {
	return new Promise(((resolve, reject) => {
    let rq = new XMLHttpRequest();
    rq.open('GET', url);
    rq.credentials = 'same-origin';
    rq.onload = function() { if (rq.status == 200) resolve(rq.responseText); else reject(rq.status + ':' + rq.statusText)}
    rq.onerror = function() {reject(rq.status + ': ' + rq.statusText);}
    rq.send();
  }));
}