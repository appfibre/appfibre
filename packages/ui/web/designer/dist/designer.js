(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, basedir, module) {
		return module = {
		  path: basedir,
		  exports: {},
		  require: function (path, base) {
	      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
	    }
		}, fn(module, module.exports), module.exports;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	var s = createCommonjsModule(function (module) {
	/*
	* SJS 6.3.2
	* Minimal SystemJS Build
	*/
	(function () {
	  function errMsg(errCode, msg) {
	    return (msg || "") + " (SystemJS https://git.io/JvFET#" + errCode + ")";
	  }

	  var hasSymbol = typeof Symbol !== 'undefined';
	  var hasSelf = typeof self !== 'undefined';
	  var hasDocument = typeof document !== 'undefined';

	  var envGlobal = hasSelf ? self : commonjsGlobal;

	  var baseUrl;

	  if (hasDocument) {
	    var baseEl = document.querySelector('base[href]');
	    if (baseEl)
	      baseUrl = baseEl.href;
	  }

	  if (!baseUrl && typeof location !== 'undefined') {
	    baseUrl = location.href.split('#')[0].split('?')[0];
	    var lastSepIndex = baseUrl.lastIndexOf('/');
	    if (lastSepIndex !== -1)
	      baseUrl = baseUrl.slice(0, lastSepIndex + 1);
	  }

	  var backslashRegEx = /\\/g;
	  function resolveIfNotPlainOrUrl (relUrl, parentUrl) {
	    if (relUrl.indexOf('\\') !== -1)
	      relUrl = relUrl.replace(backslashRegEx, '/');
	    // protocol-relative
	    if (relUrl[0] === '/' && relUrl[1] === '/') {
	      return parentUrl.slice(0, parentUrl.indexOf(':') + 1) + relUrl;
	    }
	    // relative-url
	    else if (relUrl[0] === '.' && (relUrl[1] === '/' || relUrl[1] === '.' && (relUrl[2] === '/' || relUrl.length === 2 && (relUrl += '/')) ||
	        relUrl.length === 1  && (relUrl += '/')) ||
	        relUrl[0] === '/') {
	      var parentProtocol = parentUrl.slice(0, parentUrl.indexOf(':') + 1);
	      // Disabled, but these cases will give inconsistent results for deep backtracking
	      //if (parentUrl[parentProtocol.length] !== '/')
	      //  throw Error('Cannot resolve');
	      // read pathname from parent URL
	      // pathname taken to be part after leading "/"
	      var pathname;
	      if (parentUrl[parentProtocol.length + 1] === '/') {
	        // resolving to a :// so we need to read out the auth and host
	        if (parentProtocol !== 'file:') {
	          pathname = parentUrl.slice(parentProtocol.length + 2);
	          pathname = pathname.slice(pathname.indexOf('/') + 1);
	        }
	        else {
	          pathname = parentUrl.slice(8);
	        }
	      }
	      else {
	        // resolving to :/ so pathname is the /... part
	        pathname = parentUrl.slice(parentProtocol.length + (parentUrl[parentProtocol.length] === '/'));
	      }

	      if (relUrl[0] === '/')
	        return parentUrl.slice(0, parentUrl.length - pathname.length - 1) + relUrl;

	      // join together and split for removal of .. and . segments
	      // looping the string instead of anything fancy for perf reasons
	      // '../../../../../z' resolved to 'x/y' is just 'z'
	      var segmented = pathname.slice(0, pathname.lastIndexOf('/') + 1) + relUrl;

	      var output = [];
	      var segmentIndex = -1;
	      for (var i = 0; i < segmented.length; i++) {
	        // busy reading a segment - only terminate on '/'
	        if (segmentIndex !== -1) {
	          if (segmented[i] === '/') {
	            output.push(segmented.slice(segmentIndex, i + 1));
	            segmentIndex = -1;
	          }
	        }

	        // new segment - check if it is relative
	        else if (segmented[i] === '.') {
	          // ../ segment
	          if (segmented[i + 1] === '.' && (segmented[i + 2] === '/' || i + 2 === segmented.length)) {
	            output.pop();
	            i += 2;
	          }
	          // ./ segment
	          else if (segmented[i + 1] === '/' || i + 1 === segmented.length) {
	            i += 1;
	          }
	          else {
	            // the start of a new segment as below
	            segmentIndex = i;
	          }
	        }
	        // it is the start of a new segment
	        else {
	          segmentIndex = i;
	        }
	      }
	      // finish reading out the last segment
	      if (segmentIndex !== -1)
	        output.push(segmented.slice(segmentIndex));
	      return parentUrl.slice(0, parentUrl.length - pathname.length) + output.join('');
	    }
	  }

	  /*
	   * Import maps implementation
	   *
	   * To make lookups fast we pre-resolve the entire import map
	   * and then match based on backtracked hash lookups
	   *
	   */

	  function resolveUrl (relUrl, parentUrl) {
	    return resolveIfNotPlainOrUrl(relUrl, parentUrl) || (relUrl.indexOf(':') !== -1 ? relUrl : resolveIfNotPlainOrUrl('./' + relUrl, parentUrl));
	  }

	  function objectAssign (to, from) {
	    for (var p in from)
	      to[p] = from[p];
	    return to;
	  }

	  function resolveAndComposePackages (packages, outPackages, baseUrl, parentMap, parentUrl) {
	    for (var p in packages) {
	      var resolvedLhs = resolveIfNotPlainOrUrl(p, baseUrl) || p;
	      var rhs = packages[p];
	      // package fallbacks not currently supported
	      if (typeof rhs !== 'string')
	        continue;
	      var mapped = resolveImportMap(parentMap, resolveIfNotPlainOrUrl(rhs, baseUrl) || rhs, parentUrl);
	      if (!mapped) {
	        targetWarning('W1', p, rhs);
	      }
	      else
	        outPackages[resolvedLhs] = mapped;
	    }
	  }

	  function resolveAndComposeImportMap (json, baseUrl, parentMap) {
	    var outMap = { imports: objectAssign({}, parentMap.imports), scopes: objectAssign({}, parentMap.scopes) };

	    if (json.imports)
	      resolveAndComposePackages(json.imports, outMap.imports, baseUrl, parentMap, null);

	    if (json.scopes)
	      for (var s in json.scopes) {
	        var resolvedScope = resolveUrl(s, baseUrl);
	        resolveAndComposePackages(json.scopes[s], outMap.scopes[resolvedScope] || (outMap.scopes[resolvedScope] = {}), baseUrl, parentMap, resolvedScope);
	      }

	    return outMap;
	  }

	  function getMatch (path, matchObj) {
	    if (matchObj[path])
	      return path;
	    var sepIndex = path.length;
	    do {
	      var segment = path.slice(0, sepIndex + 1);
	      if (segment in matchObj)
	        return segment;
	    } while ((sepIndex = path.lastIndexOf('/', sepIndex - 1)) !== -1)
	  }

	  function applyPackages (id, packages) {
	    var pkgName = getMatch(id, packages);
	    if (pkgName) {
	      var pkg = packages[pkgName];
	      if (pkg === null) return;
	      if (id.length > pkgName.length && pkg[pkg.length - 1] !== '/') {
	        targetWarning('W2', pkgName, pkg);
	      }
	      else
	        return pkg + id.slice(pkgName.length);
	    }
	  }

	  function targetWarning (code, match, target, msg) {
	    console.warn(errMsg(code,  [target, match].join(', ') ));
	  }

	  function resolveImportMap (importMap, resolvedOrPlain, parentUrl) {
	    var scopes = importMap.scopes;
	    var scopeUrl = parentUrl && getMatch(parentUrl, scopes);
	    while (scopeUrl) {
	      var packageResolution = applyPackages(resolvedOrPlain, scopes[scopeUrl]);
	      if (packageResolution)
	        return packageResolution;
	      scopeUrl = getMatch(scopeUrl.slice(0, scopeUrl.lastIndexOf('/')), scopes);
	    }
	    return applyPackages(resolvedOrPlain, importMap.imports) || resolvedOrPlain.indexOf(':') !== -1 && resolvedOrPlain;
	  }

	  /*
	   * SystemJS Core
	   * 
	   * Provides
	   * - System.import
	   * - System.register support for
	   *     live bindings, function hoisting through circular references,
	   *     reexports, dynamic import, import.meta.url, top-level await
	   * - System.getRegister to get the registration
	   * - Symbol.toStringTag support in Module objects
	   * - Hookable System.createContext to customize import.meta
	   * - System.onload(err, id, deps) handler for tracing / hot-reloading
	   * 
	   * Core comes with no System.prototype.resolve or
	   * System.prototype.instantiate implementations
	   */

	  var toStringTag = hasSymbol && Symbol.toStringTag;
	  var REGISTRY = hasSymbol ? Symbol() : '@';

	  function SystemJS () {
	    this[REGISTRY] = {};
	  }

	  var systemJSPrototype = SystemJS.prototype;

	  systemJSPrototype.import = function (id, parentUrl) {
	    var loader = this;
	    return Promise.resolve(loader.prepareImport())
	    .then(function() {
	      return loader.resolve(id, parentUrl);
	    })
	    .then(function (id) {
	      var load = getOrCreateLoad(loader, id);
	      return load.C || topLevelLoad(loader, load);
	    });
	  };

	  // Hookable createContext function -> allowing eg custom import meta
	  systemJSPrototype.createContext = function (parentId) {
	    return {
	      url: parentId
	    };
	  };
	  function loadToId (load) {
	    return load.id;
	  }
	  function triggerOnload (loader, load, err) {
	    loader.onload(err, load.id, load.d && load.d.map(loadToId));
	    if (err)
	      throw err;
	  }

	  var lastRegister;
	  systemJSPrototype.register = function (deps, declare) {
	    lastRegister = [deps, declare];
	  };

	  /*
	   * getRegister provides the last anonymous System.register call
	   */
	  systemJSPrototype.getRegister = function () {
	    var _lastRegister = lastRegister;
	    lastRegister = undefined;
	    return _lastRegister;
	  };

	  function getOrCreateLoad (loader, id, firstParentUrl) {
	    var load = loader[REGISTRY][id];
	    if (load)
	      return load;

	    var importerSetters = [];
	    var ns = Object.create(null);
	    if (toStringTag)
	      Object.defineProperty(ns, toStringTag, { value: 'Module' });
	    
	    var instantiatePromise = Promise.resolve()
	    .then(function () {
	      return loader.instantiate(id, firstParentUrl);
	    })
	    .then(function (registration) {
	      if (!registration)
	        throw Error(errMsg(2,  id ));
	      function _export (name, value) {
	        // note if we have hoisted exports (including reexports)
	        load.h = true;
	        var changed = false;
	        if (typeof name !== 'object') {
	          if (!(name in ns) || ns[name] !== value) {
	            ns[name] = value;
	            changed = true;
	          }
	        }
	        else {
	          for (var p in name) {
	            var value = name[p];
	            if (!(p in ns) || ns[p] !== value) {
	              ns[p] = value;
	              changed = true;
	            }
	          }

	          if (name.__esModule) {
	            ns.__esModule = name.__esModule;
	          }
	        }
	        if (changed)
	          for (var i = 0; i < importerSetters.length; i++)
	            importerSetters[i](ns);
	        return value;
	      }
	      var declared = registration[1](_export, registration[1].length === 2 ? {
	        import: function (importId) {
	          return loader.import(importId, id);
	        },
	        meta: loader.createContext(id)
	      } : undefined);
	      load.e = declared.execute || function () {};
	      return [registration[0], declared.setters || []];
	    });

	    var linkPromise = instantiatePromise
	    .then(function (instantiation) {
	      return Promise.all(instantiation[0].map(function (dep, i) {
	        var setter = instantiation[1][i];
	        return Promise.resolve(loader.resolve(dep, id))
	        .then(function (depId) {
	          var depLoad = getOrCreateLoad(loader, depId, id);
	          // depLoad.I may be undefined for already-evaluated
	          return Promise.resolve(depLoad.I)
	          .then(function () {
	            if (setter) {
	              depLoad.i.push(setter);
	              // only run early setters when there are hoisted exports of that module
	              // the timing works here as pending hoisted export calls will trigger through importerSetters
	              if (depLoad.h || !depLoad.I)
	                setter(depLoad.n);
	            }
	            return depLoad;
	          });
	        })
	      }))
	      .then(function (depLoads) {
	        load.d = depLoads;
	      });
	    });

	    linkPromise.catch(function (err) {
	      load.e = null;
	      load.er = err;
	    });

	    // Capital letter = a promise function
	    return load = loader[REGISTRY][id] = {
	      id: id,
	      // importerSetters, the setters functions registered to this dependency
	      // we retain this to add more later
	      i: importerSetters,
	      // module namespace object
	      n: ns,

	      // instantiate
	      I: instantiatePromise,
	      // link
	      L: linkPromise,
	      // whether it has hoisted exports
	      h: false,

	      // On instantiate completion we have populated:
	      // dependency load records
	      d: undefined,
	      // execution function
	      // set to NULL immediately after execution (or on any failure) to indicate execution has happened
	      // in such a case, C should be used, and E, I, L will be emptied
	      e: undefined,

	      // On execution we have populated:
	      // the execution error if any
	      er: undefined,
	      // in the case of TLA, the execution promise
	      E: undefined,

	      // On execution, L, I, E cleared

	      // Promise for top-level completion
	      C: undefined
	    };
	  }

	  function instantiateAll (loader, load, loaded) {
	    if (!loaded[load.id]) {
	      loaded[load.id] = true;
	      // load.L may be undefined for already-instantiated
	      return Promise.resolve(load.L)
	      .then(function () {
	        return Promise.all(load.d.map(function (dep) {
	          return instantiateAll(loader, dep, loaded);
	        }));
	      })
	    }
	  }

	  function topLevelLoad (loader, load) {
	    return load.C = instantiateAll(loader, load, {})
	    .then(function () {
	      return postOrderExec(loader, load, {});
	    })
	    .then(function () {
	      return load.n;
	    });
	  }

	  // the closest we can get to call(undefined)
	  var nullContext = Object.freeze(Object.create(null));

	  // returns a promise if and only if a top-level await subgraph
	  // throws on sync errors
	  function postOrderExec (loader, load, seen) {
	    if (seen[load.id])
	      return;
	    seen[load.id] = true;

	    if (!load.e) {
	      if (load.er)
	        throw load.er;
	      if (load.E)
	        return load.E;
	      return;
	    }

	    // deps execute first, unless circular
	    var depLoadPromises;
	    load.d.forEach(function (depLoad) {
	      if (false) {
	        try {
	          var depLoadPromise;
	        }
	        catch (err) {
	        }
	      }
	      else {
	        var depLoadPromise = postOrderExec(loader, depLoad, seen);
	        if (depLoadPromise)
	          (depLoadPromises = depLoadPromises || []).push(depLoadPromise);
	      }
	    });
	    if (depLoadPromises)
	      return Promise.all(depLoadPromises).then(doExec);

	    return doExec();

	    function doExec () {
	      try {
	        var execPromise = load.e.call(nullContext);
	        if (execPromise) {
	          if (!true)
	            execPromise = execPromise.then(function () {
	              load.C = load.n;
	              load.E = null; // indicates completion
	              triggerOnload(loader, load, null);
	            }, function (err) {
	              triggerOnload(loader, load, err);
	            });
	          else
	            execPromise = execPromise.then(function () {
	              load.C = load.n;
	              load.E = null;
	            });
	          return load.E = load.E || execPromise;
	        }
	        // (should be a promise, but a minify optimization to leave out Promise.resolve)
	        load.C = load.n;
	        if (!true) triggerOnload(loader, load, null);
	      }
	      catch (err) {
	        load.er = err;
	        throw err;
	      }
	      finally {
	        load.L = load.I = undefined;
	        load.e = null;
	      }
	    }
	  }

	  envGlobal.System = new SystemJS();

	  /*
	   * Import map support for SystemJS
	   * 
	   * <script type="systemjs-importmap">{}</script>
	   * OR
	   * <script type="systemjs-importmap" src=package.json></script>
	   * 
	   * Only those import maps available at the time of SystemJS initialization will be loaded
	   * and they will be loaded in DOM order.
	   * 
	   * There is no support for dynamic import maps injection currently.
	   */

	  var IMPORT_MAP = hasSymbol ? Symbol() : '#';
	  var IMPORT_MAP_PROMISE = hasSymbol ? Symbol() : '$';

	  iterateDocumentImportMaps(function (script) {
	    script._t = fetch(script.src).then(function (res) {
	      return res.text();
	    });
	  }, '[src]');

	  systemJSPrototype.prepareImport = function () {
	    var loader = this;
	    if (!loader[IMPORT_MAP_PROMISE]) {
	      loader[IMPORT_MAP] = { imports: {}, scopes: {} };
	      loader[IMPORT_MAP_PROMISE] = Promise.resolve();
	      iterateDocumentImportMaps(function (script) {
	        loader[IMPORT_MAP_PROMISE] = loader[IMPORT_MAP_PROMISE].then(function () {
	          return (script._t || script.src && fetch(script.src).then(function (res) { return res.text(); }) || Promise.resolve(script.innerHTML))
	          .then(function (text) {
	            try {
	              return JSON.parse(text);
	            } catch (err) {
	              throw Error( errMsg(1) );
	            }
	          })
	          .then(function (newMap) {
	            loader[IMPORT_MAP] = resolveAndComposeImportMap(newMap, script.src || baseUrl, loader[IMPORT_MAP]);
	          });
	        });
	      }, '');
	    }
	    return loader[IMPORT_MAP_PROMISE];
	  };

	  systemJSPrototype.resolve = function (id, parentUrl) {
	    parentUrl = parentUrl || !true  || baseUrl;
	    return resolveImportMap(this[IMPORT_MAP], resolveIfNotPlainOrUrl(id, parentUrl) || id, parentUrl) || throwUnresolved(id, parentUrl);
	  };

	  function throwUnresolved (id, parentUrl) {
	    throw Error(errMsg(8,  [id, parentUrl].join(', ') ));
	  }

	  function iterateDocumentImportMaps(cb, extraSelector) {
	    if (hasDocument)
	      [].forEach.call(document.querySelectorAll('script[type="systemjs-importmap"]' + extraSelector), cb);
	  }

	  /*
	   * Supports loading System.register via script tag injection
	   */

	  var systemRegister = systemJSPrototype.register;
	  systemJSPrototype.register = function (deps, declare) {
	    systemRegister.call(this, deps, declare);
	  };

	  systemJSPrototype.createScript = function (url) {
	    var script = document.createElement('script');
	    script.charset = 'utf-8';
	    script.async = true;
	    script.crossOrigin = 'anonymous';
	    script.src = url;
	    return script;
	  };

	  var lastWindowErrorUrl, lastWindowError;
	  systemJSPrototype.instantiate = function (url, firstParentUrl) {
	    var loader = this;
	    return new Promise(function (resolve, reject) {
	      var script = systemJSPrototype.createScript(url);
	      script.addEventListener('error', function () {
	        reject(Error(errMsg(3,  [url, firstParentUrl].join(', ') )));
	      });
	      script.addEventListener('load', function () {
	        document.head.removeChild(script);
	        // Note that if an error occurs that isn't caught by this if statement,
	        // that getRegister will return null and a "did not instantiate" error will be thrown.
	        if (lastWindowErrorUrl === url) {
	          reject(lastWindowError);
	        }
	        else {
	          resolve(loader.getRegister());
	        }
	      });
	      document.head.appendChild(script);
	    });
	  };

	  if (hasDocument) {
	    window.addEventListener('error', function (evt) {
	      lastWindowErrorUrl = evt.filename;
	      lastWindowError = evt.error;
	    });

	    window.addEventListener('DOMContentLoaded', loadScriptModules);
	    loadScriptModules();
	  }


	  function loadScriptModules() {
	    [].forEach.call(
	      document.querySelectorAll('script[type=systemjs-module]'), function (script) {
	        if (script.src) {
	          System.import(script.src.slice(0, 7) === 'import:' ? script.src.slice(7) : resolveUrl(script.src, baseUrl));
	        }
	      });
	  }

	  /*
	   * Supports loading System.register in workers
	   */

	  if (hasSelf && typeof importScripts === 'function')
	    systemJSPrototype.instantiate = function (url) {
	      var loader = this;
	      return Promise.resolve().then(function () {
	        importScripts(url);
	        return loader.getRegister();
	      });
	    };

	}());
	});

	unwrapExports(s);

	(function(){/*
	 * Named exports support for legacy module formats in SystemJS 2.0
	 */
	(function (global) {
	  var systemJSPrototype = global.System.constructor.prototype;

	  // hook System.register to know the last declaration binding
	  var lastRegisterDeclare;
	  var systemRegister = systemJSPrototype.register;
	  systemJSPrototype.register = function (name, deps, declare) {
	    lastRegisterDeclare = typeof name === 'string' ? declare : deps;
	    systemRegister.apply(this, arguments);
	  };

	  var getRegister = systemJSPrototype.getRegister;
	  systemJSPrototype.getRegister = function () {
	    var register = getRegister.call(this);
	    // if it is an actual System.register call, then its ESM
	    // -> dont add named exports
	    if (!register || register[1] === lastRegisterDeclare || register[1].length === 0)
	      return register;

	    // otherwise it was provided by a custom instantiator
	    // -> extend the registration with named exports support
	    var registerDeclare = register[1];
	    register[1] = function (_export, _context) {
	      // hook the _export function to note the default export
	      var defaultExport, hasDefaultExport = false;
	      var declaration = registerDeclare.call(this, function (name, value) {
	        if (typeof name === 'object' && name.__useDefault)
	          defaultExport = name.default, hasDefaultExport = true;
	        else if (name === 'default')
	          defaultExport = value;
	        else if (name === '__useDefault')
	          hasDefaultExport = true;
	        _export(name, value);
	      }, _context);
	      // hook the execute function
	      var execute = declaration.execute;
	      if (execute)
	        declaration.execute = function () {
	          execute.call(this);
	          // do a bulk export of the default export object
	          // to export all its names as named exports

	          if (hasDefaultExport)
	            for (var exportName in defaultExport) {
	              if (
	                Object.prototype.hasOwnProperty.call(defaultExport,  exportName) // Check if epoxrt name is not inherited, safe for Object.create(null)
	                && exportName !== 'default' // default is not a named export
	              ) {
	                _export(exportName, defaultExport[exportName]);
	              }
	            }
	        };
	      return declaration;
	    };
	    return register;
	  };
	})(typeof self !== 'undefined' ? self : commonjsGlobal);}());

	(function(){/*
	 * SystemJS named register extension
	 * Supports System.register('name', [..deps..], function (_export, _context) { ... })
	 * 
	 * Names are written to the registry as-is
	 * System.register('x', ...) can be imported as System.import('x')
	 */
	(function (global) {
	  var System = global.System;
	  setRegisterRegistry(System);
	  var systemJSPrototype = System.constructor.prototype;
	  var constructor = System.constructor;
	  var SystemJS = function () {
	    constructor.call(this);
	    setRegisterRegistry(this);
	  };
	  SystemJS.prototype = systemJSPrototype;
	  System.constructor = SystemJS;

	  var firstNamedDefine;

	  function setRegisterRegistry(systemInstance) {
	    systemInstance.registerRegistry = Object.create(null);
	  }

	  var register = systemJSPrototype.register;
	  systemJSPrototype.register = function (name, deps, declare) {
	    if (typeof name !== 'string')
	      return register.apply(this, arguments);
	    var define = [deps, declare];
	    this.registerRegistry[name] = define;
	    if (!firstNamedDefine) {
	      firstNamedDefine = define;
	      Promise.resolve().then(function () {
	        firstNamedDefine = null;
	      });
	    }
	    return register.apply(this, arguments);
	  };

	  var resolve = systemJSPrototype.resolve;
	  systemJSPrototype.resolve = function (id, parentURL) {
	    try {
	      // Prefer import map (or other existing) resolution over the registerRegistry
	      return resolve.call(this, id, parentURL);
	    } catch (err) {
	      if (id in this.registerRegistry) {
	        return id;
	      }
	      throw err;
	    }
	  };

	  var instantiate = systemJSPrototype.instantiate;
	  systemJSPrototype.instantiate = function (url, firstParentUrl) {
	    var result = this.registerRegistry[url];
	    if (result) {
	      this.registerRegistry[url] = null;
	      return result;
	    } else {
	      return instantiate.call(this, url, firstParentUrl);
	    }
	  };

	  var getRegister = systemJSPrototype.getRegister;
	  systemJSPrototype.getRegister = function () {
	    // Calling getRegister() because other extras need to know it was called so they can perform side effects
	    var register = getRegister.call(this);

	    var result = firstNamedDefine || register;
	    firstNamedDefine = null;
	    return result;
	  };
	})(typeof self !== 'undefined' ? self : commonjsGlobal);}());

	(function(){function errMsg(errCode, msg) {
	  return (msg || "") + " (SystemJS Error#" + errCode + " " + "https://git.io/JvFET#" + errCode + ")";
	}/*
	 * Support for AMD loading
	 */
	(function (global) {
	  var systemPrototype = global.System.constructor.prototype;

	  var emptyInstantiation = [[], function () { return {} }];

	  function unsupportedRequire () {
	    throw Error( errMsg(5, 'AMD require not supported.'));
	  }

	  var tmpRegister, firstNamedDefine;

	  function emptyFn () {}

	  var requireExportsModule = ['require', 'exports', 'module'];

	  function createAMDRegister (amdDefineDeps, amdDefineExec) {
	    var exports = {};
	    var module = { exports: exports };
	    var depModules = [];
	    var setters = [];
	    var splice = 0;
	    for (var i = 0; i < amdDefineDeps.length; i++) {
	      var id = amdDefineDeps[i];
	      var index = setters.length;
	      if (id === 'require') {
	        depModules[i] = unsupportedRequire;
	        splice++;
	      }
	      else if (id === 'module') {
	        depModules[i] = module;
	        splice++;
	      }
	      else if (id === 'exports') {
	        depModules[i] = exports;
	        splice++;
	      }
	      else {
	        createSetter(i);
	      }
	      if (splice)
	        amdDefineDeps[index] = id;
	    }
	    if (splice)
	      amdDefineDeps.length -= splice;
	    var amdExec = amdDefineExec;
	    return [amdDefineDeps, function (_export) {
	      _export({ default: exports, __useDefault: true });
	      return {
	        setters: setters,
	        execute: function () {
	          var amdResult = amdExec.apply(exports, depModules);
	          if (amdResult !== undefined)
	            module.exports = amdResult;
	          if (exports !== module.exports)
	            _export('default', module.exports);
	        }
	      };
	    }];

	    // needed to avoid iteration scope issues
	    function createSetter(idx) {
	      setters.push(function (ns) {
	        depModules[idx] = ns.__useDefault ? ns.default : ns;
	      });
	    }
	  }

	  // hook System.register to know the last declaration binding
	  var lastRegisterDeclare;
	  var systemRegister = systemPrototype.register;
	  systemPrototype.register = function (name, deps, declare) {
	    lastRegisterDeclare = typeof name === 'string' ? declare : deps;
	    systemRegister.apply(this, arguments);
	  };

	  var instantiate = systemPrototype.instantiate;
	  systemPrototype.instantiate = function() {
	    // Reset "currently executing script"
	    amdDefineDeps = null;
	    return instantiate.apply(this, arguments);
	  };

	  var getRegister = systemPrototype.getRegister;
	  systemPrototype.getRegister = function () {
	    if (tmpRegister)
	      return tmpRegister;

	    var _firstNamedDefine = firstNamedDefine;
	    firstNamedDefine = null;

	    var register = getRegister.call(this);
	    // if its an actual System.register leave it
	    if (register && register[1] === lastRegisterDeclare)
	      return register;

	    var _amdDefineDeps = amdDefineDeps;
	    amdDefineDeps = null;

	    // If the script registered a named module, return that module instead of re-instantiating it.
	    if (_firstNamedDefine)
	      return _firstNamedDefine;

	    // otherwise AMD takes priority
	    // no registration -> attempt AMD detection
	    if (!_amdDefineDeps)
	      return register || emptyInstantiation;

	    return createAMDRegister(_amdDefineDeps, amdDefineExec);
	  };
	  var amdDefineDeps, amdDefineExec;
	  global.define = function (name, deps, execute) {
	    var depsAndExec;
	    // define('', [], function () {})
	    if (typeof name === 'string') {
	      depsAndExec = getDepsAndExec(deps, execute);
	      if (amdDefineDeps) {
	        if (!System.registerRegistry) {
	          throw Error( errMsg(6, 'Include the named register extension for SystemJS named AMD support.'));
	        }
	        addToRegisterRegistry(name, createAMDRegister(depsAndExec[0], depsAndExec[1]));
	        amdDefineDeps = [];
	        amdDefineExec = emptyFn;
	        return;
	      }
	      else {
	        if (System.registerRegistry)
	          addToRegisterRegistry(name, createAMDRegister([].concat(depsAndExec[0]), depsAndExec[1]));
	        name = deps;
	        deps = execute;
	      }
	    }
	    depsAndExec = getDepsAndExec(name, deps);
	    amdDefineDeps = depsAndExec[0];
	    amdDefineExec = depsAndExec[1];
	  };
	  global.define.amd = {};

	  function getDepsAndExec(arg1, arg2) {
	    // define([], function () {})
	    if (arg1 instanceof Array) {
	      return [arg1, arg2];
	    }
	    // define({})
	    else if (typeof arg1 === 'object') {
	      return [[], function () { return arg1 }];
	    }
	    // define(function () {})
	    else if (typeof arg1 === 'function') {
	      return [requireExportsModule, arg1];
	    }
	  }

	  function addToRegisterRegistry(name, define) {
	    if (!firstNamedDefine) {
	      firstNamedDefine = define;
	      Promise.resolve().then(function () {
	        firstNamedDefine = null;
	      });
	    }

	    // We must call System.getRegister() here to give other extras, such as the named-exports extra,
	    // a chance to modify the define before it's put into the registerRegistry.
	    // See https://github.com/systemjs/systemjs/issues/2073
	    tmpRegister = define;
	    System.registerRegistry[name] = System.getRegister();
	    tmpRegister = null;
	  }
	})(typeof self !== 'undefined' ? self : commonjsGlobal);}());

	var TabContainer_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.TabContainer = void 0;
	const template = document.createElement('template');
	template.innerHTML = `
<style>
    :host {
      font-family: sans-serif;
    }
 
    .dropdown {
      padding: 3px 8px 8px;
    }
 
    .label {
      display: block;
      margin-bottom: 5px;
      color: #000000;
      font-size: 16px;
      font-weight: normal;
      line-height: 16px;
    }
 
    .dropdown-list-container {
      position: relative;
    }
 
    .dropdown-list {
      position: absolute;
      width: 100%;
      display: none;
      max-height: 192px;
      overflow-y: auto;
      margin: 4px 0 0;
      padding: 0;
      background-color: #ffffff;
      border: 1px solid #a1a1a1;
      box-shadow: 0 2px 4px 0 rgba(0,0,0, 0.05), 0 2px 8px 0 rgba(161,161,161, 0.4);
      list-style: none;
    }
 
    .dropdown-list li {
      display: flex;
      align-items: center;
      margin: 4px 0;
      padding: 0 7px;
      font-size: 16px;
      height: 40px;
      cursor: pointer;
    }
  </style>
 
  <div class="dropdown">
    <span class="label">Label</span>
 
    <my-button as-atom>Content</my-button>
 
    <div class="dropdown-list-container">
      <ul class="dropdown-list"></ul>
    </div>
  </div>
`;
	class tabContainer extends HTMLElement {
	    constructor() {
	        super();
	        this._sR = this.attachShadow({ mode: 'open' });
	        this._sR.appendChild(template.content.cloneNode(true));
	        this.label = this._sR.querySelector('.label');
	        this.button = this._sR.querySelector('my-button');
	        this.dropdownList = this._sR.querySelector('.dropdown-list');
	    }
	    static get observedAttributes() {
	        return ['label', 'option', 'options'];
	    }
	    get label() {
	        return this.getAttribute('label');
	    }
	    set label(value) {
	        this.setAttribute('label', value);
	    }
	    get option() {
	        return this.getAttribute('option');
	    }
	    set option(value) {
	        this.setAttribute('option', value);
	    }
	    get options() {
	        return JSON.parse(this.getAttribute('options'));
	    }
	    set options(value) {
	        this.setAttribute('options', JSON.stringify(value));
	    }
	    static get observedAttributes() {
	        return ['label', 'option', 'options'];
	    }
	    attributeChangedCallback(name, oldVal, newVal) {
	        this.render();
	    }
	    render() {
	    }
	}
	//window.customElements.define('af-tab', Button);
	let TabContainer = {
	    control: tabContainer,
	    type: 'webcomponent',
	    designer: null
	};
	exports.TabContainer = TabContainer;
	});

	unwrapExports(TabContainer_1);
	var TabContainer_2 = TabContainer_1.TabContainer;

	var Tab_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Tab = void 0;
	const template = document.createElement('template');
	template.innerHTML = `
  <style>
    .container {
      padding: 8px;
    }

    button {
      display: block;
      overflow: hidden;
      position: relative;
      padding: 0 16px;
      font-size: 16px;
      font-weight: bold;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      outline: none;

      width: 100%;
      height: 40px;

      box-sizing: border-box;
      border: 1px solid #a1a1a1;
      background: #ffffff;
      box-shadow: 0 2px 4px 0 rgba(0,0,0, 0.05), 0 2px 8px 0 rgba(161,161,161, 0.4);
      color: #363636;
      cursor: pointer;
    }
  </style>

  <div class="container">
    <button>Label</button>
  </div>
`;
	class tab extends HTMLElement {
	    constructor() {
	        super();
	        this._shadowRoot = this.attachShadow({ mode: 'open' });
	        this._shadowRoot.appendChild(template.content.cloneNode(true));
	        this._button = this._shadowRoot.querySelector('button');
	        this._container = this._shadowRoot.querySelector('.container');
	        this._button.addEventListener('click', () => {
	            this.dispatchEvent(new CustomEvent('onClick', {
	                detail: 'Hello from within the Custom Element',
	            }));
	        });
	        //let child = this._shadowRoot.appendChild(template.content.cloneNode(true));
	    }
	    get label() {
	        return this.getAttribute('label') || '';
	    }
	    set label(value) {
	        this.setAttribute('label', value);
	    }
	    static get observedAttributes() {
	        return ['label'];
	    }
	    attributeChangedCallback(name, oldVal, newVal) {
	        this.render();
	    }
	    render() {
	        this._button.innerHTML = this.label || '';
	    }
	    connectedCallback() {
	        if (this.hasAttribute('as-atom')) {
	            this._container.style.padding = '0px';
	        }
	    }
	}
	//window.customElements.define('af-tab', Button);
	let Tab = {
	    control: tab,
	    type: 'webcomponent',
	    designer: null
	};
	exports.Tab = Tab;
	});

	unwrapExports(Tab_1);
	var Tab_2 = Tab_1.Tab;

	var layout = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Tab = exports.TabContainer = void 0;

	Object.defineProperty(exports, "TabContainer", { enumerable: true, get: function () { return TabContainer_1.TabContainer; } });

	Object.defineProperty(exports, "Tab", { enumerable: true, get: function () { return Tab_1.Tab; } });
	});

	unwrapExports(layout);
	var layout_1 = layout.Tab;
	var layout_2 = layout.TabContainer;

	var dist = createCommonjsModule(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.layout = void 0;
	const layout$1 = __importStar(layout);
	exports.layout = layout$1;
	});

	unwrapExports(dist);
	var dist_1 = dist.layout;

	window.customElements.define('layout-tabcontainer', dist.layout.TabContainer.control);
	window.customElements.define('layout-tab', dist.layout.Tab.control);

	const editor = monaco.editor.create(document.getElementById('container'), {
	    value: [
	        'function x() {',
	        '\tconsole.log("Hello world!");',
	        '}'
	    ].join('\n'),
	    language: 'javascript'
	});

	editor.focus();
	editor.setPosition({ lineNumber: 2, column: 30 });

	const initialVersion = editor.getModel().getAlternativeVersionId();
	let currentVersion = initialVersion;
	let lastVersion = initialVersion;

	editor.onDidChangeModelContent(e => {
	    const versionId = editor.getModel().getAlternativeVersionId();
	    // undoing
	    if (versionId < currentVersion) {
	        enableRedoButton();
	        // no more undo possible
	        if (versionId === initialVersion) {
	            disableUndoButton();
	        }
	    } else {
	        // redoing
	        if (versionId <= lastVersion) {
	            // redoing the last change
	            if (versionId == lastVersion) {
	                disableRedoButton();
	            }
	        } else { // adding new change, disable redo when adding new changes
	            disableRedoButton();
	            if (currentVersion > lastVersion) {
	                lastVersion = currentVersion;
	            }
	        }
	        enableUndoButton();
	    }
	    currentVersion = versionId;
	});

	function enableUndoButton() {
	    document.getElementById("undoButton").disabled = false;
	}

	function disableUndoButton() {
	    document.getElementById("undoButton").disabled = true;
	}

	function enableRedoButton() {
	    document.getElementById("redoButton").disabled = false;
	}

	function disableRedoButton() {
	    document.getElementById("redoButton").disabled = true;
	}

}());
//# sourceMappingURL=designer.js.map
