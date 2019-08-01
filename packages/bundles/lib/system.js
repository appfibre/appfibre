require('systemjs/dist/s.js');
//require('systemjs/dist/extras/transform');
require('systemjs/dist/extras/named-exports.js');
require('systemjs/dist/extras/named-register.js');
require('systemjs/dist/extras/amd.js');
//const externals = { "@appfibre/core": require('@appfibre/core'), "@appfibre/webapp": require('@appfibre/webapp'), "@appfibre/types": require('@appfibre/types')  };
//const externals = { "@appfibre/core": require('@appfibre/core'), "@appfibre/webapp": require('@appfibre/webapp'), "@appfibre/types": require('@appfibre/types')  };
if (!this.Promise) this.Promise = require('pinkie');
const _jst = new (require("@appfibre/webapp").Services.Transformer)({ module: 'amd'});
const WebApp = require("@appfibre/webapp").WebApp;

const systemJSPrototype = System.constructor.prototype;
//const _jst = new externals["@appfibre/core"].Transformer({ module: 'amd'});

systemJSPrototype.jst = function(input, name) {
	return _jst.transform(input, name);
}

const instantiate = systemJSPrototype.instantiate;
systemJSPrototype.instantiate = function (url, parent) {
	if (url[0] === '@') {
		if (externals[url])
			return [[], function (_export) {
				_export('default', externals[url]);
				const k = Object.keys(externals[url]);
				for (let i in k) _export(k[i], externals[url][k[i]]);
				return { execute () {}};
			}];
		else throw new Error(`Requested component (${url}) not embedded into bundle or cdn not registered`);
	}
	if (url.slice(-5) === '.wasm' /*|| url.slice(-3) === '.js'*/)
		return instantiate.call(this, url, parent);
	else if (url.slice(-4) === '.css' )
	{
		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = url;
		document.head.appendChild(link);
		return [[], function () { return {"execute": undefined }}];
	}

	const loader = this;
	return fetch(url)
		.then(function (response) {
			try {
				switch (response.contentType) {
					case "application/javascript":
							return {code: response.text};
					case "application/json":
							return systemJSPrototype.jst(response.text, url);
					default:
						 return {code: "define(function() { return \'" + response.text.replace(/\'/g, "\\\'").replace(/\"/g, "\\\"") + "\';})"};
				}
			} catch (ex) {
				console.error('Error transforming ' + url + ': ' + ex.description || ex.message, ex.stack || '', [response.text]);
				throw ex;
			}
		}, (reason) => {throw new Error('Fetch error: ' + reason + (parent ? ' loading from  ' + parent : ''));})
		.then((source) => {   
    try{
		let keys = source.references ? Object.keys(source.references) : [];
		let values = source.references ? Object.values(source.references) : [];
		keys.push(`${source.code};\n//# sourceURL=' + ${url}`);
		Function.apply({}, keys).apply({}, values); 
		//Function('WebApp', `${source.code};\n//# sourceURL=' + ${url}`)(WebApp); 
	  	return loader.getRegister();  
    } catch (ex) {
      console.error('Error evaluating ' + url + ': ' + ex.description || ex.message, ex.stack || '', [source]);
      throw ex;
    }
  }).catch((message) => {console.error('Error instantiating ' + url + ': ' + message.description || message.message, message.stack || ""); throw new Error(message);});
};

// Hookable transform function!
/*function transform (id, source, contentType) {
	switch (contentType) {

		default:
			return "return " + replace()
	}
	return (id.indexOf('.json')>-1 || id.indexOf('.jst')>-1) ? new externals['@appfibre/webapp'].Transformer({ module: 'amd'}).transform(source, id).code : source;
}*/

const resolve = systemJSPrototype.resolve;
systemJSPrototype.resolve = function (id, parentUrl) {
	// This is required because the plugins for codemirror refers to ../../lib/codemirror which doesn't exist when executing from within SystemJS
	// The code corresponds with a code entry when loading the component System.Register('../../lib/codemirror', [@cdnjs/codemirror/codemirror.js]);
	if (this.registerRegistry[id]){
		var r = this.registerRegistry[id];
		if (Array.isArray(r) && typeof r[0] === "string")
			return r[0];
	}
	if (id[0] === '@') 
		return id;
	return resolve.call(this, id, parentUrl);
};

function fetch (url) {
	return new Promise(((resolve, reject) => {
    let rq = new XMLHttpRequest();
    rq.open('GET', url);
    rq.credentials = 'same-origin';
    rq.onload = function() { if (rq.status == 200) resolve({text: rq.responseText, contentType: (rq.getResponseHeader('content-type')||'text/plain').split(';')[0].toLowerCase()}); else reject(rq.status + ':' + rq.statusText)}
    rq.onerror = function() {reject(rq.status + ': ' + rq.statusText);}
    rq.send();
  }));
}