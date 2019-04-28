var sjst = (function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	function _typeof(obj) {
	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    _typeof = function (obj) {
	      return typeof obj;
	    };
	  } else {
	    _typeof = function (obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	/*
	* SJS 3.1.3
	* Minimal SystemJS Build
	*/

	(function () {
	  var hasSelf = typeof self !== 'undefined';
	  var envGlobal = hasSelf ? self : commonjsGlobal;
	  var baseUrl;

	  if (typeof location !== 'undefined') {
	    baseUrl = location.href.split('#')[0].split('?')[0];
	    var lastSepIndex = baseUrl.lastIndexOf('/');
	    if (lastSepIndex !== -1) baseUrl = baseUrl.slice(0, lastSepIndex + 1);
	  }

	  var backslashRegEx = /\\/g;

	  function resolveIfNotPlainOrUrl(relUrl, parentUrl) {
	    if (relUrl.indexOf('\\') !== -1) relUrl = relUrl.replace(backslashRegEx, '/'); // protocol-relative

	    if (relUrl[0] === '/' && relUrl[1] === '/') {
	      return parentUrl.slice(0, parentUrl.indexOf(':') + 1) + relUrl;
	    } // relative-url
	    else if (relUrl[0] === '.' && (relUrl[1] === '/' || relUrl[1] === '.' && (relUrl[2] === '/' || relUrl.length === 2 && (relUrl += '/')) || relUrl.length === 1 && (relUrl += '/')) || relUrl[0] === '/') {
	        var parentProtocol = parentUrl.slice(0, parentUrl.indexOf(':') + 1); // Disabled, but these cases will give inconsistent results for deep backtracking
	        //if (parentUrl[parentProtocol.length] !== '/')
	        //  throw new Error('Cannot resolve');
	        // read pathname from parent URL
	        // pathname taken to be part after leading "/"

	        var pathname;

	        if (parentUrl[parentProtocol.length + 1] === '/') {
	          // resolving to a :// so we need to read out the auth and host
	          if (parentProtocol !== 'file:') {
	            pathname = parentUrl.slice(parentProtocol.length + 2);
	            pathname = pathname.slice(pathname.indexOf('/') + 1);
	          } else {
	            pathname = parentUrl.slice(8);
	          }
	        } else {
	          // resolving to :/ so pathname is the /... part
	          pathname = parentUrl.slice(parentProtocol.length + (parentUrl[parentProtocol.length] === '/'));
	        }

	        if (relUrl[0] === '/') return parentUrl.slice(0, parentUrl.length - pathname.length - 1) + relUrl; // join together and split for removal of .. and . segments
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
	          } // new segment - check if it is relative
	          else if (segmented[i] === '.') {
	              // ../ segment
	              if (segmented[i + 1] === '.' && (segmented[i + 2] === '/' || i + 2 === segmented.length)) {
	                output.pop();
	                i += 2;
	              } // ./ segment
	              else if (segmented[i + 1] === '/' || i + 1 === segmented.length) {
	                  i += 1;
	                } else {
	                  // the start of a new segment as below
	                  segmentIndex = i;
	                }
	            } // it is the start of a new segment
	            else {
	                segmentIndex = i;
	              }
	        } // finish reading out the last segment


	        if (segmentIndex !== -1) output.push(segmented.slice(segmentIndex));
	        return parentUrl.slice(0, parentUrl.length - pathname.length) + output.join('');
	      }
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
	   * - System.onload(id, err?) handler for tracing / hot-reloading
	   * 
	   * Core comes with no System.prototype.resolve or
	   * System.prototype.instantiate implementations
	   */


	  var hasSymbol = typeof Symbol !== 'undefined';
	  var toStringTag = hasSymbol && Symbol.toStringTag;
	  var REGISTRY = hasSymbol ? Symbol() : '@';

	  function SystemJS() {
	    this[REGISTRY] = {};
	  }

	  var systemJSPrototype = SystemJS.prototype;

	  systemJSPrototype.import = function (id, parentUrl) {
	    var loader = this;
	    return Promise.resolve(loader.resolve(id, parentUrl)).then(function (id) {
	      var load = getOrCreateLoad(loader, id);
	      return load.C || topLevelLoad(loader, load);
	    });
	  }; // Hookable createContext function -> allowing eg custom import meta


	  systemJSPrototype.createContext = function (parentId) {
	    return {
	      url: parentId
	    };
	  };

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

	  function getOrCreateLoad(loader, id, firstParentUrl) {
	    var load = loader[REGISTRY][id];
	    if (load) return load;
	    var importerSetters = [];
	    var ns = Object.create(null);
	    if (toStringTag) Object.defineProperty(ns, toStringTag, {
	      value: 'Module'
	    });
	    var instantiatePromise = Promise.resolve().then(function () {
	      return loader.instantiate(id, firstParentUrl);
	    }).then(function (registration) {
	      if (!registration) throw new Error('Module ' + id + ' did not instantiate');

	      function _export(name, value) {
	        // note if we have hoisted exports (including reexports)
	        load.h = true;
	        var changed = false;

	        if (_typeof(name) !== 'object') {
	          if (!(name in ns) || ns[name] !== value) {
	            ns[name] = value;
	            changed = true;
	          }
	        } else {
	          for (var p in name) {
	            var _value = name[p];

	            if (!(p in ns) || ns[p] !== _value) {
	              ns[p] = _value;
	              changed = true;
	            }
	          }
	        }

	        if (changed) for (var i = 0; i < importerSetters.length; i++) {
	          importerSetters[i](ns);
	        }
	        return value;
	      }

	      var declared = registration[1](_export, registration[1].length === 2 ? {
	        import: function _import(importId) {
	          return loader.import(importId, id);
	        },
	        meta: loader.createContext(id)
	      } : undefined);

	      load.e = declared.execute || function () {};

	      return [registration[0], declared.setters || []];
	    });
	    var linkPromise = instantiatePromise.then(function (instantiation) {
	      return Promise.all(instantiation[0].map(function (dep, i) {
	        var setter = instantiation[1][i];
	        return Promise.resolve(loader.resolve(dep, id)).then(function (depId) {
	          var depLoad = getOrCreateLoad(loader, depId, id); // depLoad.I may be undefined for already-evaluated

	          return Promise.resolve(depLoad.I).then(function () {
	            if (setter) {
	              depLoad.i.push(setter); // only run early setters when there are hoisted exports of that module
	              // the timing works here as pending hoisted export calls will trigger through importerSetters

	              if (depLoad.h || !depLoad.I) setter(depLoad.n);
	            }

	            return depLoad;
	          });
	        });
	      })).then(function (depLoads) {
	        load.d = depLoads;
	      });
	    });
	    linkPromise.catch(function (err) {
	      load.e = null;
	      load.er = err;
	    }); // Captial letter = a promise function

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
	      // in such a case, pC should be used, and pLo, pLi will be emptied
	      e: undefined,
	      // On execution we have populated:
	      // the execution error if any
	      er: undefined,
	      // in the case of TLA, the execution promise
	      E: undefined,
	      // On execution, pLi, pLo, e cleared
	      // Promise for top-level completion
	      C: undefined
	    };
	  }

	  function instantiateAll(loader, load, loaded) {
	    if (!loaded[load.id]) {
	      loaded[load.id] = true; // load.L may be undefined for already-instantiated

	      return Promise.resolve(load.L).then(function () {
	        return Promise.all(load.d.map(function (dep) {
	          return instantiateAll(loader, dep, loaded);
	        }));
	      });
	    }
	  }

	  function topLevelLoad(loader, load) {
	    return load.C = instantiateAll(loader, load, {}).then(function () {
	      return postOrderExec(loader, load, {});
	    }).then(function () {
	      return load.n;
	    });
	  } // the closest we can get to call(undefined)


	  var nullContext = Object.freeze(Object.create(null)); // returns a promise if and only if a top-level await subgraph
	  // throws on sync errors

	  function postOrderExec(loader, load, seen) {
	    if (seen[load.id]) return;
	    seen[load.id] = true;

	    if (!load.e) {
	      if (load.er) throw load.er;
	      if (load.E) return load.E;
	      return;
	    } // deps execute first, unless circular


	    var depLoadPromises;
	    load.d.forEach(function (depLoad) {
	      {
	        var depLoadPromise = postOrderExec(loader, depLoad, seen);
	        if (depLoadPromise) (depLoadPromises = depLoadPromises || []).push(depLoadPromise);
	      }
	    });

	    if (depLoadPromises) {
	      return Promise.all(depLoadPromises).then(doExec);
	    }

	    return doExec();

	    function doExec() {
	      try {
	        var execPromise = load.e.call(nullContext);

	        if (execPromise) {
	          execPromise = execPromise.then(function () {
	            load.C = load.n;
	            load.E = null;
	          });
	          return load.E = load.E || execPromise;
	        } // (should be a promise, but a minify optimization to leave out Promise.resolve)


	        load.C = load.n;
	      } catch (err) {
	        load.er = err;
	        throw err;
	      } finally {
	        load.L = load.I = undefined;
	        load.e = null;
	      }
	    }
	  }

	  envGlobal.System = new SystemJS();
	  /*
	   * Supports loading System.register via script tag injection
	   */

	  var err;
	  if (typeof window !== 'undefined') window.addEventListener('error', function (e) {
	    err = e.error;
	  });
	  var systemRegister = systemJSPrototype.register;

	  systemJSPrototype.register = function (deps, declare) {
	    err = undefined;
	    systemRegister.call(this, deps, declare);
	  };

	  systemJSPrototype.instantiate = function (url, firstParentUrl) {
	    var loader = this;
	    return new Promise(function (resolve, reject) {
	      var script = document.createElement('script');
	      script.charset = 'utf-8';
	      script.async = true;
	      script.crossOrigin = 'anonymous';
	      script.addEventListener('error', function () {
	        reject(new Error('Error loading ' + url + (firstParentUrl ? ' from ' + firstParentUrl : '')));
	      });
	      script.addEventListener('load', function () {
	        document.head.removeChild(script); // Note URL normalization issues are going to be a careful concern here

	        if (err) {
	          reject(err);
	          return err = undefined;
	        } else {
	          resolve(loader.getRegister());
	        }
	      });
	      script.src = url;
	      document.head.appendChild(script);
	    });
	  };
	  /*
	   * Supports loading System.register in workers
	   */


	  if (hasSelf && typeof importScripts === 'function') systemJSPrototype.instantiate = function (url) {
	    var loader = this;
	    return new Promise(function (resolve, reject) {
	      try {
	        importScripts(url);
	      } catch (e) {
	        reject(e);
	      }

	      resolve(loader.getRegister());
	    });
	  };

	  systemJSPrototype.resolve = function (id, parentUrl) {
	    var resolved = resolveIfNotPlainOrUrl(id, parentUrl || baseUrl);

	    if (!resolved) {
	      if (id.indexOf(':') !== -1) return Promise.resolve(id);
	      throw new Error('Cannot resolve "' + id + (parentUrl ? '" from ' + parentUrl : '"'));
	    }

	    return Promise.resolve(resolved);
	  };
	})();

	/*
	 * Support for a "transform" loader interface
	 */
	(function () {
	  var systemJSPrototype = System.constructor.prototype;
	  var instantiate = systemJSPrototype.instantiate;

	  systemJSPrototype.instantiate = function (url, parent) {
	    if (url.slice(-5) === '.wasm') return instantiate.call(this, url, parent);
	    var loader = this;
	    return fetch(url, {
	      credentials: 'same-origin'
	    }).then(function (res) {
	      if (!res.ok) throw new Error('Fetch error: ' + res.status + ' ' + res.statusText + (parent ? ' loading from ' + parent : ''));
	      return res.text();
	    }).then(function (source) {
	      return loader.transform.call(this, url, source);
	    }).then(function (source) {
	      (0, eval)(source + '\n//# sourceURL=' + url);
	      return loader.getRegister();
	    });
	  }; // Hookable transform function!


	  systemJSPrototype.transform = function (_id, source) {
	    return source;
	  };
	})();

	/*
	 * Support for AMD loading
	 */

	(function (global) {
	  var systemPrototype = System.constructor.prototype;
	  var emptyInstantiation = [[], function () {
	    return {};
	  }];

	  function unsupportedRequire() {
	    throw new Error('AMD require not supported.');
	  }

	  function emptyFn() {}

	  var requireExportsModule = ['require', 'exports', 'module'];

	  function createAMDRegister(amdDefineDeps, amdDefineExec) {
	    var exports = {};
	    var module = {
	      exports: exports
	    };
	    var depModules = [];
	    var setters = [];
	    var splice = 0;

	    for (var i = 0; i < amdDefineDeps.length; i++) {
	      var id = amdDefineDeps[i];
	      var index = setters.length;

	      if (id === 'require') {
	        depModules[i] = unsupportedRequire;
	        splice++;
	      } else if (id === 'module') {
	        depModules[i] = module;
	        splice++;
	      } else if (id === 'exports') {
	        depModules[i] = exports;
	        splice++;
	      } else {
	        (function () {
	          // needed for ie11 lack of iteration scope
	          var idx = i;
	          setters.push(function (ns) {
	            depModules[idx] = ns.default;
	          });
	        })();
	      }

	      if (splice) amdDefineDeps[index] = id;
	    }

	    if (splice) amdDefineDeps.length -= splice;
	    var amdExec = amdDefineExec;
	    return [amdDefineDeps, function (_export) {
	      _export('default', exports);

	      return {
	        setters: setters,
	        execute: function execute() {
	          module.exports = amdExec.apply(exports, depModules) || module.exports;
	          if (exports !== module.exports) _export('default', module.exports);
	        }
	      };
	    }];
	  } // hook System.register to know the last declaration binding


	  var lastRegisterDeclare;
	  var systemRegister = systemPrototype.register; // if we have named register support continue to use it

	  if (systemRegister.length === 3) {
	    systemPrototype.register = function (name, deps, declare) {
	      if (typeof name !== 'string') lastRegisterDeclare = deps;
	      systemRegister.apply(this, arguments);
	    };
	  } else {
	    systemPrototype.register = function (deps, declare) {
	      lastRegisterDeclare = declare;
	      systemRegister.apply(this, arguments);
	    };
	  }

	  var getRegister = systemPrototype.getRegister;

	  systemPrototype.getRegister = function () {
	    var register = getRegister.call(this); // if its an actual System.register leave it

	    if (register && register[1] === lastRegisterDeclare) return register; // otherwise AMD takes priority
	    // no registration -> attempt AMD detection

	    if (!amdDefineDeps) return register || emptyInstantiation;
	    var registration = createAMDRegister(amdDefineDeps, amdDefineExec);
	    amdDefineDeps = null;
	    return registration;
	  };

	  var amdDefineDeps, amdDefineExec;

	  global.define = function (name, deps, execute) {
	    // define('', [], function () {})
	    if (typeof name === 'string') {
	      if (amdDefineDeps) {
	        if (!System.registerRegistry) throw new Error('Include the named register extension for SystemJS named AMD support.');
	        System.registerRegistry[name] = createAMDRegister(deps, execute);
	        amdDefineDeps = [];
	        amdDefineExec = emptyFn;
	        return;
	      } else {
	        if (System.registerRegistry) System.registerRegistry[name] = createAMDRegister(deps, execute);
	        name = deps;
	        deps = execute;
	      }
	    } // define([], function () {})


	    if (name instanceof Array) {
	      amdDefineDeps = name;
	      amdDefineExec = deps;
	    } // define({})
	    else if (_typeof(name) === 'object') {
	        amdDefineDeps = [];

	        amdDefineExec = function amdDefineExec() {
	          return name;
	        };
	      } // define(function () {})
	      else if (typeof name === 'function') {
	          amdDefineDeps = requireExportsModule;
	          amdDefineExec = name;
	        }
	  };

	  global.define.amd = {};
	})(typeof self !== 'undefined' ? self : commonjsGlobal);

	/*
	 * SystemJS named register extension
	 * Supports System.register('name', [..deps..], function (_export, _context) { ... })
	 * 
	 * Names are written to the registry as-is
	 * System.register('x', ...) can be imported as System.import('x')
	 */
	(function () {
	  var systemJSPrototype = System.constructor.prototype;
	  var constructor = System.constructor;

	  var SystemJS = function SystemJS() {
	    constructor.call(this);
	    this.registerRegistry = Object.create(null);
	  };

	  SystemJS.prototype = systemJSPrototype;
	  System = new SystemJS();
	  var register = systemJSPrototype.register;

	  systemJSPrototype.register = function (name, deps, declare) {
	    if (typeof name !== 'string') return register.apply(this, arguments);
	    this.registerRegistry[name] = [deps, declare]; // Provide an empty module to signal success.

	    return register.call(this, [], function () {
	      return {};
	    });
	  };

	  var resolve = systemJSPrototype.resolve;

	  systemJSPrototype.resolve = function (id, parentURL) {
	    if (id[0] === '/' || id[0] === '.' && (id[1] === '/' || id[1] === '.' && id[2] === '/')) return resolve.call(this, id, parentURL);
	    if (id in this.registerRegistry) return id;
	    return resolve.call(this, id, parentURL);
	  };

	  var instantiate = systemJSPrototype.instantiate;

	  systemJSPrototype.instantiate = function (url, firstParentUrl) {
	    return this.registerRegistry[url] || instantiate.call(this, url, firstParentUrl);
	  };
	})();

	var types = createCommonjsModule(function (module, exports) {

	  exports.__esModule = true;
	  var ModuleSystem;

	  (function (ModuleSystem) {
	    ModuleSystem["None"] = "none";
	    ModuleSystem["CommonJS"] = "commonjs";
	    ModuleSystem["AMD"] = "amd";
	    ModuleSystem["UMD"] = "umd";
	    ModuleSystem["ES"] = "es";
	  })(ModuleSystem = exports.ModuleSystem || (exports.ModuleSystem = {}));

	  var LogLevel;

	  (function (LogLevel) {
	    LogLevel[LogLevel["None"] = 0] = "None";
	    LogLevel[LogLevel["Exception"] = 1] = "Exception";
	    LogLevel[LogLevel["Error"] = 2] = "Error";
	    LogLevel[LogLevel["Warn"] = 3] = "Warn";
	    LogLevel[LogLevel["Info"] = 4] = "Info";
	    LogLevel[LogLevel["Trace"] = 5] = "Trace";
	  })(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
	});
	unwrapExports(types);
	var types_1 = types.ModuleSystem;
	var types_2 = types.LogLevel;

	var loader = createCommonjsModule(function (module, exports) {

	  var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	      function fulfilled(value) {
	        try {
	          step(generator.next(value));
	        } catch (e) {
	          reject(e);
	        }
	      }

	      function rejected(value) {
	        try {
	          step(generator["throw"](value));
	        } catch (e) {
	          reject(e);
	        }
	      }

	      function step(result) {
	        result.done ? resolve(result.value) : new P(function (resolve) {
	          resolve(result.value);
	        }).then(fulfilled, rejected);
	      }

	      step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	  };

	  var __generator = commonjsGlobal && commonjsGlobal.__generator || function (thisArg, body) {
	    var _ = {
	      label: 0,
	      sent: function sent() {
	        if (t[0] & 1) throw t[1];
	        return t[1];
	      },
	      trys: [],
	      ops: []
	    },
	        f,
	        y,
	        t,
	        g;
	    return g = {
	      next: verb(0),
	      "throw": verb(1),
	      "return": verb(2)
	    }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
	      return this;
	    }), g;

	    function verb(n) {
	      return function (v) {
	        return step([n, v]);
	      };
	    }

	    function step(op) {
	      if (f) throw new TypeError("Generator is already executing.");

	      while (_) {
	        try {
	          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	          if (y = 0, t) op = [op[0] & 2, t.value];

	          switch (op[0]) {
	            case 0:
	            case 1:
	              t = op;
	              break;

	            case 4:
	              _.label++;
	              return {
	                value: op[1],
	                done: false
	              };

	            case 5:
	              _.label++;
	              y = op[1];
	              op = [0];
	              continue;

	            case 7:
	              op = _.ops.pop();

	              _.trys.pop();

	              continue;

	            default:
	              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
	                _ = 0;
	                continue;
	              }

	              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
	                _.label = op[1];
	                break;
	              }

	              if (op[0] === 6 && _.label < t[1]) {
	                _.label = t[1];
	                t = op;
	                break;
	              }

	              if (t && _.label < t[2]) {
	                _.label = t[2];

	                _.ops.push(op);

	                break;
	              }

	              if (t[2]) _.ops.pop();

	              _.trys.pop();

	              continue;
	          }

	          op = body.call(thisArg, _);
	        } catch (e) {
	          op = [6, e];
	          y = 0;
	        } finally {
	          f = t = 0;
	        }
	      }

	      if (op[0] & 5) throw op[1];
	      return {
	        value: op[0] ? op[1] : void 0,
	        done: true
	      };
	    }
	  };

	  var _this = commonjsGlobal;
	  exports.__esModule = true;
	  var basePath = '';

	  function nodeRequire(url) {
	    return new Function('url', 'tmpdir', 'tmpdir = tmpdir ? tmpdir : global.process.env.INIT_CWD; var __dirname__ = global.process.cwd(); if (__dirname__ != tmpdir) global.process.chdir(tmpdir); var _exp = (global.require || global.process.mainModule.constructor._load)(url); if (global.process.cwd() != __dirname__) global.process.chdir(__dirname__); return _exp;')(url, basePath);
	  }

	  function run(source, url, basePath) {
	    var m = {
	      exports: {}
	    };

	    try {
	      new Function('require', 'module', source + ";\n//# sourceURL=' + " + url)(nodeRequire, m);
	    } catch (f) {
	      console.log('Error running script from from source' + url || source);
	      throw f;
	    }

	    return m.exports;
	  }

	  var Loader = {
	    instantiate: function instantiate(url, parent) {
	      return __awaiter(_this, void 0, void 0, function () {
	        var res;
	        return __generator(this, function (_a) {
	          switch (_a.label) {
	            case 0:
	              return [4
	              /*yield*/
	              , fetch(url, {
	                credentials: 'same-origin'
	              })];

	            case 1:
	              res = _a.sent();
	              if (!res.ok) throw new Error('Fetch error: ' + res.status + ' ' + res.statusText + (parent ? ' loading from  ' + parent : ''));
	              return [2
	              /*return*/
	              , res.text()];
	          }
	        });
	      });
	    },
	    "import": function _import(source, url) {
	      return __awaiter(_this, void 0, void 0, function () {
	        var output;
	        return __generator(this, function (_a) {
	          try {
	            output = run(source, url, basePath);
	            return [2
	            /*return*/
	            , output];
	          } catch (e) {
	            console.log('Error executing script ' + url + ': ');
	            throw e;
	          }

	          return [2
	          /*return*/
	          ];
	        });
	      });
	    },
	    init: function init(basePath) {
	      return void {};
	    }
	  };
	  exports["default"] = Loader;
	});
	unwrapExports(loader);

	var loader$1 = createCommonjsModule(function (module, exports) {

	  var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	      function fulfilled(value) {
	        try {
	          step(generator.next(value));
	        } catch (e) {
	          reject(e);
	        }
	      }

	      function rejected(value) {
	        try {
	          step(generator["throw"](value));
	        } catch (e) {
	          reject(e);
	        }
	      }

	      function step(result) {
	        result.done ? resolve(result.value) : new P(function (resolve) {
	          resolve(result.value);
	        }).then(fulfilled, rejected);
	      }

	      step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	  };

	  var __generator = commonjsGlobal && commonjsGlobal.__generator || function (thisArg, body) {
	    var _ = {
	      label: 0,
	      sent: function sent() {
	        if (t[0] & 1) throw t[1];
	        return t[1];
	      },
	      trys: [],
	      ops: []
	    },
	        f,
	        y,
	        t,
	        g;
	    return g = {
	      next: verb(0),
	      "throw": verb(1),
	      "return": verb(2)
	    }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
	      return this;
	    }), g;

	    function verb(n) {
	      return function (v) {
	        return step([n, v]);
	      };
	    }

	    function step(op) {
	      if (f) throw new TypeError("Generator is already executing.");

	      while (_) {
	        try {
	          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	          if (y = 0, t) op = [op[0] & 2, t.value];

	          switch (op[0]) {
	            case 0:
	            case 1:
	              t = op;
	              break;

	            case 4:
	              _.label++;
	              return {
	                value: op[1],
	                done: false
	              };

	            case 5:
	              _.label++;
	              y = op[1];
	              op = [0];
	              continue;

	            case 7:
	              op = _.ops.pop();

	              _.trys.pop();

	              continue;

	            default:
	              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
	                _ = 0;
	                continue;
	              }

	              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
	                _.label = op[1];
	                break;
	              }

	              if (op[0] === 6 && _.label < t[1]) {
	                _.label = t[1];
	                t = op;
	                break;
	              }

	              if (t && _.label < t[2]) {
	                _.label = t[2];

	                _.ops.push(op);

	                break;
	              }

	              if (t[2]) _.ops.pop();

	              _.trys.pop();

	              continue;
	          }

	          op = body.call(thisArg, _);
	        } catch (e) {
	          op = [6, e];
	          y = 0;
	        } finally {
	          f = t = 0;
	        }
	      }

	      if (op[0] & 5) throw op[1];
	      return {
	        value: op[0] ? op[1] : void 0,
	        done: true
	      };
	    }
	  };

	  var _this = commonjsGlobal;
	  exports.__esModule = true;
	  var basepath;

	  function nodeRequire(url) {
	    return new Function('url', 'tmpdir', 'tmpdir = tmpdir ? tmpdir : global.process.env.INIT_CWD; var __dirname__ = global.process.cwd(); if (__dirname__ != tmpdir) global.process.chdir(tmpdir); var _exp = (global.require || global.process.mainModule.constructor._load)(url); if (global.process.cwd() != __dirname__) global.process.chdir(__dirname__); return _exp;')(url, basepath || '');
	  }

	  function run(source, url) {
	    var m = {
	      exports: {}
	    };

	    try {
	      new Function('require', 'module', source + ";\n//# sourceURL=' + " + url)(nodeRequire, m);
	    } catch (f) {
	      console.log('Error running script from source "' + (url || source) + '"', f);
	      throw f;
	    }

	    return m.exports;
	  }

	  var Loader = {
	    instantiate: function instantiate(url, parent) {
	      return __awaiter(_this, void 0, void 0, function () {
	        var res;
	        return __generator(this, function (_a) {
	          switch (_a.label) {
	            case 0:
	              return [4
	              /*yield*/
	              , fetch(url, {
	                credentials: 'same-origin'
	              })];

	            case 1:
	              res = _a.sent();
	              if (!res.ok) throw new Error('Fetch error: ' + res.status + ' ' + res.statusText + (parent ? ' loading from  ' + parent : ''));
	              return [2
	              /*return*/
	              , res.text()];
	          }
	        });
	      });
	    },
	    "import": function _import(source, url) {
	      return __awaiter(_this, void 0, void 0, function () {
	        var output;
	        return __generator(this, function (_a) {
	          try {
	            output = run(source, url);
	            return [2
	            /*return*/
	            , output];
	          } catch (e) {
	            console.log('Error executing script "' + url + '": ' + e);
	            throw e;
	          }

	          return [2
	          /*return*/
	          ];
	        });
	      });
	    },
	    init: function init(basePath) {
	      basepath = basePath;
	    }
	  };
	  exports["default"] = Loader;
	});
	unwrapExports(loader$1);

	var loader$2 = createCommonjsModule(function (module, exports) {

	  exports.__esModule = true;

	  var Loader =
	  /** @class */
	  function () {
	    function Loader(basePath) {
	      try {
	        //nodeJS does not regocnise "window"
	        if (window) {
	          var systemjs = Object.getOwnPropertyDescriptor(window, "System");
	          if (systemjs) this.proxy = {
	            "import": systemjs.value["import"].bind(systemjs.value),
	            instantiate: systemjs.value.instantiate.bind(systemjs.value),
	            init: function init(basePath) {
	              return void {};
	            }
	          };else this.proxy = loader["default"];
	        }
	      } catch (_a) {}

	      if (this['proxy'] == null) this.proxy = loader$1["default"];
	      this.proxy.init(basePath);
	    }

	    Loader.prototype["import"] = function (moduleName, normalizedParentName) {
	      return this.proxy["import"](moduleName, normalizedParentName);
	    };

	    Loader.prototype.instantiate = function (url, parent) {
	      return this.proxy.instantiate(url, parent);
	    };

	    Loader.prototype.init = function (basePath) {};

	    return Loader;
	  }();

	  exports.Loader = Loader;
	});
	unwrapExports(loader$2);
	var loader_1 = loader$2.Loader;

	var transformer = createCommonjsModule(function (module, exports) {

	  var __assign = commonjsGlobal && commonjsGlobal.__assign || function () {
	    __assign = Object.assign || function (t) {
	      for (var s, i = 1, n = arguments.length; i < n; i++) {
	        s = arguments[i];

	        for (var p in s) {
	          if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
	        }
	      }

	      return t;
	    };

	    return __assign.apply(this, arguments);
	  };

	  exports.__esModule = true;

	  var Transformer =
	  /** @class */
	  function () {
	    function Transformer(settings) {
	      var _this = this;

	      this.reservedWords = ['function', 'for', 'var', 'this', 'self', 'null'];
	      this.type = "Transformer";
	      this.settings = settings ? __assign({}, settings, {
	        indent: settings.indent || '\t',
	        compact: settings.compact || false,
	        module: settings.module || types.ModuleSystem.None,
	        namedExports: settings.namedExports === undefined ? true : settings.namedExports
	      }) : {
	        module: types.ModuleSystem.ES
	      };
	      this.settings.parsers = this.settings.parsers || {};

	      this.settings.parsers[".require"] = this.settings.parsers[".import"] = function (obj, parseSettings, offset) {
	        return _this.loadModule(_this.process(obj[".import"] || obj[".require"], false, false, parseSettings, offset), parseSettings, offset);
	      };

	      this.settings.parsers[".function"] = function (obj, parseSettings, offset) {
	        return "function " + (obj[".function"] ? obj[".function"] : "") + "(" + (obj["arguments"] ? _this.process(obj["arguments"], false, true, parseSettings, offset) : "") + "){ return " + _this.process(obj["return"], true, false, parseSettings, offset) + " }";
	      };

	      this.settings.parsers[".map"] = function (obj, parseSettings, offset) {
	        return _this.process(obj[".map"], false, false, parseSettings, offset) + ".map(function(" + obj["arguments"] + ") {return " + (settings && settings.indent ? new Array(offset).join(' ') : "") + _this.process(obj["return"], true, false, parseSettings, offset) + " })";
	      };

	      this.settings.parsers[".filter"] = function (obj, parseSettings, offset) {
	        return _this.process(obj[".filter"], false, false, parseSettings, offset) + ".filter(function(" + obj["arguments"] + ") {return " + _this.process(obj["condition"], true, false, parseSettings, offset) + " })";
	      };

	      this.settings.parsers[".call"] = function (obj, parseSettings, offset) {
	        return _this.process(obj[".call"], false, false, parseSettings, offset) + ".call(" + (obj["arguments"] ? _this.process(obj["arguments"], false, true, parseSettings, offset) : "") + ")";
	      };

	      this.settings.parsers[".exec"] = function (obj, parseSettings, offset) {
	        return _this.process(obj[".exec"], true, false, parseSettings, offset) + "(" + (obj["arguments"] ? _this.process(obj["arguments"], true, true, parseSettings, offset) : "") + ")";
	      };

	      this.settings.parsers[".new"] = function (obj, parseSettings, offset) {
	        return "new " + _this.process(obj[".new"], true, false, parseSettings, offset) + "(" + (obj["arguments"] ? _this.process(obj["arguments"], true, true, parseSettings, offset) : "") + ")";
	      };

	      this.settings.parsers[".id"] = this.settings.parsers[".code"] = function (obj, parseSettings, offset) {
	        return obj[".code"] || obj[".id"];
	      };

	      this.settings.parsers[".app"] = function (obj, parseSettings, offset) {
	        var obj2 = {};
	        var keys = Object.keys(obj);

	        for (var key in keys) {
	          obj2[keys[key] == ".app" ? "main" : keys[key]] = obj[keys[key]];
	        }

	        return _this.process({
	          ".new": {
	            ".require": "@appfibre/jst#App"
	          },
	          "arguments": [obj2]
	        }, true, true, parseSettings, offset) + ".run()";
	      };

	      this.settings.parsers["."] = function (obj, parseSettings, offset) {
	        return obj["."];
	      };
	    }

	    Transformer.prototype.loadModule = function (val, parseSettings, offset) {
	      var m = val.indexOf('#') > 0 ? val.substr(0, val.indexOf('#')) : val;

	      if (val[0] === "~") {
	        return "" + this.process({
	          ".function": null,
	          arguments: "loader",
	          "return": {
	            ".code": "loader.load('" + (m[1] === "/" ? '.' : '') + m.substr(1) + "')" + (val.length > m.length ? val.substring(m.length).replace('#', '.') : '') + ";"
	          }
	        }, false, false, parseSettings, offset);
	      }

	      if (this.settings.module.toLowerCase() === types.ModuleSystem.ES.toLowerCase()) m = val.indexOf('#', m.length + 2) > -1 ? val.substr(0, val.indexOf('#', m.length + 2) - 1) : val;
	      if (parseSettings.imports.indexOf(m) === -1) parseSettings.imports.push(m);
	      return "_" + parseSettings.imports.indexOf(m) + (val.length > m.length ? val.substring(m.length).replace('#', '.') : '');
	    };

	    Transformer.prototype.format = function (lines, parseSettings, indent) {
	      var lt = this.settings.compact ? "" : "\n";
	      var tab = this.settings.compact ? "" : this.settings.indent || "\t";
	      return lt + new Array(indent + 1).join(tab) + lines.join("," + lt + new Array(indent + 1).join(tab)) + lt + new Array(indent).join(tab);
	    };

	    Transformer.prototype.process = function (obj, esc, et, parseSettings, offset) {
	      var _this = this;

	      var output;
	      if (obj === null) output = "null";else if (Array.isArray(obj)) output = (et ? "" : "[") + this.format(obj.map(function (e, i) {
	        return _this.process(e, esc, false, parseSettings, offset + 1);
	      }), parseSettings, offset) + (et ? "" : "]");else if (_typeof(obj) === "object") {
	        var keys = Object.keys(obj);
	        var processed = false;

	        for (var k in keys) {
	          if (!processed && keys[k].length > 0 && keys[k].charAt(0) == '.') {
	            if (this.settings.parsers && this.settings.parsers[keys[k]]) {
	              processed = true;
	              output = this.settings.parsers[keys[k]](obj, parseSettings, offset) || '';
	            } else throw new Error("Could not locate parser " + keys[k].substr(1));
	          }
	        }

	        if (!processed) output = (et ? "" : "{") + this.format(keys.filter(function (k) {
	          return k.length < 2 || k.substr(0, 2) != '..';
	        }).map(function (k, i) {
	          return (_this.reservedWords.indexOf(k) > -1 ? "\"" + k + "\"" : k) + ":" + (_this.settings.compact ? '' : ' ') + _this.process(obj[k], esc, false, parseSettings, offset + 1);
	        }), parseSettings, offset) + (et ? "" : "}");
	      } else if (typeof obj === "function") // object not JSON...
	        output = obj.toString();else output = typeof obj === "string" && esc ? JSON.stringify(obj) : obj;
	      return output;
	    };

	    Transformer.prototype.processExports = function (output, obj) {
	      var _this = this;

	      var keys = Object.keys(obj);
	      var validkeys = keys.filter(function (k) {
	        return k.indexOf(' ') === -1 && k.indexOf('/') === -1 && k.indexOf('-') === -1 && _this.reservedWords.indexOf(k) === -1;
	      });
	      var isDefault = keys.length === 1 && keys[0] === 'default';
	      var nl = this.settings.compact ? '' : '\n';
	      var sp = this.settings.compact ? '' : ' ';
	      var vr = this.settings.preferConst ? 'const' : 'var';

	      switch (this.settings.module.toLowerCase()) {
	        case "umd":
	        case "commonjs":
	        case "cjs":
	          //for (var req in r) output.code += `${vr} _${r[req]}${sp}=${sp}require('${req}');${nl}`;
	          output.code += keys.map(function (key) {
	            return "module.exports['" + key + "']" + sp + "=" + sp + _this.process(obj[key], true, false, output, 0) + ";";
	          }).join(nl);
	          if (!isDefault) output.code += nl + "module.exports['default']" + sp + "=" + sp + "{" + sp + keys.map(function (key) {
	            return key + ": " + _this.process(obj[key], true, false, output, 0);
	          }).join(nl) + " };";
	          if (output.name) output.code += nl + "module.exports['__jst'] = '" + name + ";";
	          break;

	        case "es":
	          if (isDefault) output.code += "export default" + sp + this.process(obj["default"], true, false, output, 0) + ";";else {
	            output.code += "export default" + sp + "{" + this.format(keys.map(function (key) {
	              return validkeys.indexOf(key) === -1 ? "\"" + key + "\": " + _this.process(obj[key], true, false, output, 0) : key + ":" + sp + (_this.settings.namedExports ? key : _this.process(obj[key], true, false, output, 2));
	            }), output, 1) + "};";
	            if (this.settings.namedExports && validkeys.length > 0) output.code = validkeys.map(function (key) {
	              return "export " + vr + " " + key + sp + "=" + sp + _this.process(obj[key], true, false, output, 1) + ";";
	            }).join(nl) + ("" + (nl + output.code + nl));
	          }
	          break;

	        default:
	          if (output.name) output.code += "return " + (isDefault ? "{'default' : " + this.process(obj["default"], true, false, output, 1) + ", \"__jst\": \"" + output.name + "\"}" : "{" + this.format(keys.map(function (key) {
	            return validkeys.indexOf(key) === -1 ? "\"" + key + "\": " + _this.process(obj[key], true, false, output, 1) : key + ":" + sp + _this.process(obj[key], true, false, output, 2);
	          }), output, 1) + ", \"__jst\": \"" + output.name + "\"}") + (output.name.indexOf('#') > -1 ? output.name.slice(output.name.indexOf('#') + 1).split('#').map(function (p) {
	            return "['" + p + "']";
	          }) : '') + ";";else output.code += "return " + (isDefault ? this.process(obj["default"], true, false, output, 1) : "{" + this.format(keys.map(function (key) {
	            return validkeys.indexOf(key) === -1 ? "\"" + key + "\": " + _this.process(obj[key], true, false, output, 1) : key + ":" + sp + _this.process(obj[key], true, false, output, 2);
	          }), output, 1) + "}") + ";";
	      }
	    };

	    Transformer.prototype.processImports = function (output, name) {
	      var nl = this.settings.compact ? '' : '\n';
	      var sp = this.settings.compact ? '' : ' ';
	      var vr = this.settings.preferConst ? 'const' : 'var';
	      var s = {};
	      var r = {};
	      var s2 = {};
	      var r2 = {};
	      if (output.imports.length > 0) for (var i = 0; i < output.imports.length; i++) {
	        var ext = output.imports[i][0] === "~";

	        if (output.imports[i].indexOf('#') > -1) {
	          var module_name = output.imports[i].substr(0, output.imports[i].indexOf('#'));
	          if ((ext ? s2 : s)[module_name] === undefined) (ext ? s2 : s)[module_name] = {};
	          (ext ? s2 : s)[module_name][output.imports[i].substr(module_name.length + 1)] = i;
	        } else (ext ? r2 : r)[output.imports[i]] = i;
	      }

	      switch (this.settings.module.toLowerCase()) {
	        case "umd":
	        case "commonjs":
	        case "cjs":
	          for (var req in r) {
	            output.code = vr + " _" + r[req] + sp + "=" + sp + "require(\"" + req + "\");" + nl + output.code;
	          }

	          break;

	        case "amd":
	          output.code = "define(" + (Object.keys(r).length > 0 ? "[" + Object.keys(r).map(function (key) {
	            return "'" + key + "'";
	          }).join(", ") + "], " : '') + "function (" + Object.keys(r).map(function (key) {
	            return '_' + r[key];
	          }).join(", ") + ") { " + output.code + " });" + nl;
	          break;

	        case "es":
	          output.code = Object.keys(s).map(function (key) {
	            return "import {" + Object.keys(s[key]).map(function (k) {
	              return k + " as _" + s[key][k];
	            }).join(',' + sp) + "} from '" + key + "';" + nl;
	          }).join('') + Object.keys(r).map(function (key) {
	            return "import * as _" + r[key] + " from '" + key.substr(key[0] == "~" ? 1 : 0) + "';" + nl;
	          }).join('') + output.code;
	          break;

	        default:
	          for (var req in r) {
	            output.code = vr + " _" + r[req] + sp + "=" + sp + "require(\"" + req + "\");" + nl + output.code;
	          }

	      }

	      if (Object.keys(s2).length > 0 || Object.keys(r2).length > 0) {
	        /*output.code += ';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;' + JSON.stringify(s2) + ' ' + JSON.stringify(r2);
	        if (this.settings.runtimeModule)
	            output.code += this.settings.runtimeModule;*/
	        switch (this.settings.runtimeModule ? this.settings.runtimeModule.toLowerCase() : "none") {
	          case "umd":
	          case "commonjs":
	          case "cjs":
	            //throw new Error(JSON.stringify(s2));
	            for (var req in r2) {
	              output.code = vr + " _" + r2[req] + sp + "=" + sp + "require(\"" + req + "\");" + nl + output.code;
	            }

	            break;

	          case "amd":
	            output.code = "define(" + (Object.keys(r2).length > 0 ? "[" + Object.keys(r).map(function (key) {
	              return "'" + key + "'";
	            }).join(", ") + "], " : '') + "function (" + Object.keys(r2).map(function (key) {
	              return '_' + r2[key];
	            }).join(", ") + ") { " + output.code + " });" + nl;
	            break;

	          case "es":
	            output.code = Object.keys(s2).map(function (key) {
	              return "import {" + Object.keys(s2[key]).map(function (k) {
	                return k.substr(1) + " as _" + s[key][k];
	              }).join(',' + sp) + "} from '" + key.substr(1) + "';" + nl;
	            }).join('') + Object.keys(r2).map(function (key) {
	              return "import * as _" + r2[key] + " from '" + key.substr(1) + "';" + nl;
	            }).join('') + output.code;
	            break;

	          default:
	            for (var req in r2) {
	              output.code = vr + " _" + r2[req] + sp + "=" + sp + "require(\"" + req + "\");" + nl + output.code;
	            }

	        }
	      }
	    };

	    Transformer.prototype.bundleModule = function (obj, name) {
	      var output = {
	        name: name,
	        imports: [],
	        exports: {},
	        compositeObject: false,
	        code: ''
	      };
	      this.processExports(output, obj);
	      this.processImports(output, name || '');
	      return output;
	    };

	    Transformer.prototype.transform = function (input, name) {
	      var obj;

	      try {
	        obj = typeof input === "string" ? JSON.parse(input) : input;
	      } catch (e) {
	        //console.log(JSON.stringify(this.settings));
	        if (this.settings.dangerouslyProcessJavaScript || this.settings.dangerouslyProcessJavaScript === undefined) {
	          try {
	            obj = Function("return (" + input + ");")();
	            if (this.settings.dangerouslyProcessJavaScript === undefined) console.warn("Warning: " + (name || '') + " is not JSON compliant: " + e.message + ".  Set option \"dangerouslyProcessJavaScript\" to true to hide this message.\r\n" + input);
	          } catch (f) {
	            throw new Error("Unable to process " + (name || '') + " as JavaScript: " + f.message);
	          }
	        } else throw new Error("Unable to parse JSON file " + (name || '') + ": " + e.message);
	      }

	      try {
	        return this.bundleModule(Array.isArray(obj) || _typeof(obj || '') !== 'object' || Object.keys(obj).filter(function (k) {
	          return k[0] == '.';
	        }).length > 0 ? {
	          "default": obj
	        } : obj, name);
	      } catch (e) {
	        throw new Error("Unable to transform js template: " + e.message + "\r\n" + e.stack);
	      }
	    };

	    return Transformer;
	  }();

	  exports.Transformer = Transformer;
	});
	unwrapExports(transformer);
	var transformer_1 = transformer.Transformer;

	var intercept = createCommonjsModule(function (module, exports) {

	  var __extends = commonjsGlobal && commonjsGlobal.__extends || function () {
	    var _extendStatics = function extendStatics(d, b) {
	      _extendStatics = Object.setPrototypeOf || {
	        __proto__: []
	      } instanceof Array && function (d, b) {
	        d.__proto__ = b;
	      } || function (d, b) {
	        for (var p in b) {
	          if (b.hasOwnProperty(p)) d[p] = b[p];
	        }
	      };

	      return _extendStatics(d, b);
	    };

	    return function (d, b) {
	      _extendStatics(d, b);

	      function __() {
	        this.constructor = d;
	      }

	      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	  }();

	  exports.__esModule = true;

	  var Intercept = function inject(_a) {
	    var Component = _a.Component;
	    return (
	      /** @class */
	      function (_super) {
	        __extends(Intercept, _super);

	        function Intercept() {
	          var _this = _super.call(this) || this;

	          _this.state = {
	            focus: false,
	            selected: false,
	            editMode: null,
	            canEdit: true
	          };
	          _this.onMessage = _this.onMessage.bind(_this);
	          _this.click = _this.click.bind(_this);
	          _this.mouseEnter = _this.mouseEnter.bind(_this);
	          _this.mouseLeave = _this.mouseLeave.bind(_this);
	          return _this;
	        }

	        Intercept.prototype.componentDidMount = function () {
	          window.addEventListener("message", this.onMessage);

	          window.onclick = function () {
	            parent.postMessage({
	              eventType: "select",
	              correlationId: Date.now().toString()
	            }, location.href);
	          };
	        };

	        Intercept.prototype.componentWillUnmount = function () {
	          window.removeEventListener("message", this.onMessage);
	        };

	        Intercept.prototype.reconstruct = function (obj) {
	          if (!obj[1]) obj[1] = {};
	          if (!obj[1].style) obj[1].style = {};

	          if (!obj[1].style.border && !obj[1].style.padding && !obj[1].onMouseEnter && !obj[1].onMouseLeave) {
	            obj[1].style.padding = this.state.focus || this.state.selected ? "1px" : "2px";
	            if (this.state.editMode) obj[1].style.background = "lightblue";
	            if (this.state.selected) obj[1].style.border = "1px solid black";else if (this.state.focus) obj[1].style.border = "1px dashed grey";
	            obj[1].onMouseEnter = this.mouseEnter;
	            obj[1].onMouseLeave = this.mouseLeave;
	            obj[1].onClick = this.click;
	          }

	          return obj;
	        };

	        Intercept.prototype.render = function () {
	          //return super.render(Array.isArray(this.props.children) ? this.reconstruct(["div", {style: {display: "inline-block"}}, this.props.children])  : this.reconstruct(this.props.children));
	          return _super.prototype.render.call(this, this.reconstruct(["div", {
	            style: {
	              display: "inline-block"
	            },
	            key: 0
	          }, this.props.children]));
	        };

	        Intercept.prototype.mouseEnter = function () {
	          //x.Designer.notify("x");
	          this.setState({
	            "focus": true
	          });
	        };

	        Intercept.prototype.mouseLeave = function () {
	          //x.Designer.notify("y");
	          this.setState({
	            "focus": false
	          });
	        };

	        Intercept.prototype.click = function (ev) {
	          ev.stopPropagation(); //Designer.notify(this.props.file);

	          var parent = window;

	          while (parent.parent !== parent && window.parent != null) {
	            parent = parent.parent;
	          }

	          var correlationId = Date.now().toString();
	          parent.postMessage({
	            eventType: "select",
	            editMode: this.state.editMode,
	            canEdit: this.state.canEdit,
	            correlationId: correlationId,
	            control: {
	              file: this.props.file,
	              method: this.props.method
	            }
	          }, location.href);
	          this.setState({
	            "selected": correlationId
	          });
	        };

	        Intercept.prototype.onMessage = function (ev) {
	          if (location.href.substr(0, ev.origin.length) == ev.origin && ev.type == "message" && ev.data) {
	            if (this.state.selected == ev.data.correlationId) switch (ev.data.eventType) {
	              case "deselect":
	                this.setState({
	                  selected: false
	                });
	                break;

	              case "edit":
	                this.setState({
	                  editMode: ev.data.editMode
	                });
	                break;
	            }
	          }
	        };

	        return Intercept;
	      }(Component)
	    );
	  };

	  exports.Intercept = Intercept;
	});
	unwrapExports(intercept);
	var intercept_1 = intercept.Intercept;

	var processor = createCommonjsModule(function (module, exports) {

	  var __extends = commonjsGlobal && commonjsGlobal.__extends || function () {
	    var _extendStatics = function extendStatics(d, b) {
	      _extendStatics = Object.setPrototypeOf || {
	        __proto__: []
	      } instanceof Array && function (d, b) {
	        d.__proto__ = b;
	      } || function (d, b) {
	        for (var p in b) {
	          if (b.hasOwnProperty(p)) d[p] = b[p];
	        }
	      };

	      return _extendStatics(d, b);
	    };

	    return function (d, b) {
	      _extendStatics(d, b);

	      function __() {
	        this.constructor = d;
	      }

	      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	  }();

	  exports.__esModule = true;

	  function s_xa(a, b) {
	    return Object.prototype.hasOwnProperty.call(a, b);
	  }

	  function clone(a, b) {
	    for (var c = 1; c < arguments.length; c++) {
	      var d = arguments[c];
	      if (d) for (var e in d) {
	        s_xa(d, e) && (a[e] = d[e]);
	      }
	    }

	    return a;
	  }

	  function Inject(app, Proxy) {
	    var inj = clone(app);
	    inj.services.UI.Component = Proxy || app.services.UI.Component;
	    /*let { title, designer, ui, target, ...inject } = app;
	    return { Component
	        , Context
	        , Loader
	        , components : app.components
	        , ...inject
	    };*/

	    return inj;
	  }

	  var Processor =
	  /** @class */
	  function () {
	    function Processor(app) {
	      this.cache = Object();
	      this.type = "Processor";
	      this.app = app;
	    }

	    Processor.prototype.construct = function (jstComponent) {
	      var ctx = this;
	      return (
	        /** @class */
	        function (_super) {
	          __extends(class_1, _super);

	          function class_1() {
	            return _super !== null && _super.apply(this, arguments) || this;
	          }

	          class_1.prototype.render = function (obj) {
	            if (Array.isArray(obj) && obj.length === 1 && !Array.isArray(obj[0])) return typeof obj[0] == "string" ? ctx.parse(obj, 0, '') : obj[0];
	            return obj == null || typeof obj === "string" || obj.$$typeof ? obj : ctx.parse(obj, 0, '');
	          };

	          return class_1;
	        }(jstComponent)
	      );
	    };

	    Processor.prototype.locate = function (resource, path) {
	      var parts = path.split('.');
	      var jst = false;
	      var obj = resource;

	      for (var part = 0; part < parts.length; part++) {
	        if (obj[parts[part]] !== undefined) {
	          if (part == path.length - 1) jst = obj.__jst;
	          obj = obj[path[part]];
	        } else obj = null;
	      }

	      return obj;
	    };

	    Processor.prototype.getFunctionName = function (obj) {
	      if (obj.name) return obj.name;
	      var name = obj.toString();
	      if (name.indexOf('(') > -1) name = name.substr(0, name.indexOf('('));
	      if (name.indexOf('function') > -1) name = name.substr(name.indexOf('function') + 'function'.length);
	      return name.trim();
	    };

	    Processor.prototype.parse = function (obj, level, path, index) {
	      this.app.services.logger.log.call(this, types.LogLevel.Trace, 'Processor.parse', obj);
	      var processor = this;
	      return new Promise(function (r, f) {
	        if (Array.isArray(obj)) {
	          if (typeof obj[0] === "string") obj[0] = processor.resolve(obj[0]);
	          if (typeof obj[0] === "function" && processor.getFunctionName(obj[0]) === "transform") processor.parse(obj[0].apply(processor.app, obj.slice(1)), level, path + '[0]()', index).then(r, f);else if (typeof obj[0] === "function" && processor.getFunctionName(obj[0]) === "inject") {
	            obj[0] = obj[0](Inject(processor.app, processor.construct(processor.app.services.UI.Component)));
	            processor.parse(obj, level, path, index).then(r, f);
	          } else Promise.all(obj.map(function (v, i) {
	            return processor.parse(v, level + 1, path + '.[' + i + ']', i);
	          })).then(function (o) {
	            try {
	              r(processor.app.services.UI.processElement(o, level, index));
	            } catch (e) {
	              processor.app.services.logger.log(types.LogLevel.Error, 'Processor.parse: ' + e.stack, [o]);
	              f(e);
	            }
	          }, f);
	        } else if (typeof obj === "function" && processor.getFunctionName(obj) === "inject") Promise.all([obj(Inject(processor.app, processor.construct(processor.app.services.UI.Component)))]).then(function (o) {
	          return r(processor.parse(o[0], level, path, index));
	        }, f);else if (obj && obj.then) Promise.all([obj]).then(function (o) {
	          return processor.parse(o[0], level, path, index).then(function (o2) {
	            return r(o2);
	          }, f);
	        }, f);else if (obj) {
	          try {
	            r(processor.app.services.UI.processElement(obj, level, index));
	          } catch (e) {
	            processor.app.services.logger.log(types.LogLevel.Error, 'Processor.parse: ' + e.stack, obj);
	            f(e);
	          }
	        } else r(obj);
	      });
	    };

	    Processor.prototype.resolve = function (fullpath) {
	      var _this = this;

	      this.app.services.logger.log.call(this, types.LogLevel.Trace, 'Processor.resolve', [fullpath]);
	      if (this.cache[fullpath]) return this.cache[fullpath];

	      if (fullpath.substring(0, 1) == "~") {
	        var parts = fullpath.substring(1, fullpath.length).split('#');
	        var obj = this.app.services.moduleSystem.instantiate(parts[0], this);
	        if (parts.length == 1) return obj;
	        return obj.then(function (x) {
	          return _this.locate(x, parts.slice(1, parts.length).join("."));
	        });
	      } else {
	        var path = fullpath ? fullpath.split('.') : [''];
	        var obj_1 = this.app.components || Object;
	        var jst_1 = false;
	        var prop_1 = "default";

	        for (var part = 0; part < path.length; part++) {
	          if (typeof obj_1 === "function" && this.getFunctionName(obj_1) === "inject") obj_1 = obj_1(Inject(this.app, this.construct(this.app.services.UI.Component)));

	          if (obj_1[path[part]] !== undefined) {
	            if (part == path.length - 1) jst_1 = obj_1.__jst;
	            obj_1 = obj_1[path[part]];
	          } else if (path.length == 1 && path[0].length > 0 && path[0].toLowerCase() == path[0]) obj_1 = path[part];else {
	            if (fullpath === "Exception") return function transform(obj) {
	              return ["pre", {
	                "style": {
	                  "color": "red"
	                }
	              }, obj[1].stack ? obj[1].stack : obj[1]];
	            };else {
	              this.app.services.logger.log.call(this, types.LogLevel.Error, 'Unable to resolve "App.components.' + (fullpath || 'undefined') + "'");
	              return (
	                /** @class */
	                function (_super) {
	                  __extends(class_2, _super);

	                  function class_2() {
	                    return _super !== null && _super.apply(this, arguments) || this;
	                  }

	                  class_2.prototype.render = function () {
	                    return _super.prototype.render.call(this, ["span", {
	                      "style": {
	                        "color": "red"
	                      }
	                    }, (fullpath || 'undefined') + " not found!"]);
	                  };

	                  return class_2;
	                }(this.app.services.UI.Component)
	              );
	            }
	          }
	        }

	        if (obj_1["default"]) {
	          if (obj_1.__jst) jst_1 = obj_1.__jst;
	          obj_1 = obj_1["default"];
	        } else if (jst_1) prop_1 = path[path.length - 1];

	        if (typeof obj_1 == "function" && this.getFunctionName(obj_1) === "inject") obj_1 = obj_1(Inject(this.app, jst_1 ?
	        /** @class */
	        function (_super) {
	          __extends(Component, _super);

	          function Component() {
	            return _super !== null && _super.apply(this, arguments) || this;
	          }

	          Component.prototype.render = function (obj) {
	            return this.parse(!this.app.disableIntercept && window.parent !== null && window !== window.parent ? [intercept.Intercept, {
	              "file": jst_1,
	              "method": prop_1
	            }, this.construct(this.app.UI.Component)] : obj);
	          };

	          return Component;
	        }(this.app.services.UI.Component) : this.construct(this.app.services.UI.Component)));
	        return this.cache[fullpath] = Array.isArray(obj_1) ?
	        /** @class */
	        function (_super) {
	          __extends(Wrapper, _super);

	          function Wrapper() {
	            return _super !== null && _super.apply(this, arguments) || this;
	          }

	          Wrapper.prototype.shouldComponentUpdate = function () {
	            return true;
	          };

	          Wrapper.prototype.render = function () {
	            if (!obj_1[1]) obj_1[1] = {};
	            if (!obj_1[1].key) obj_1[1].key = 0;
	            return this.parse(jst_1 && !this.app.disableIntercept && window.parent !== null && window !== window.parent ? [intercept.Intercept, {
	              "file": jst_1,
	              "method": prop_1
	            }, [obj_1]] : obj_1);
	          };

	          return Wrapper;
	        }(this.app.services.UI.Component) : obj_1;
	      }
	    };

	    Processor.prototype.process = function (obj) {
	      var _this = this;

	      this.app.services.logger.log.call(this, types.LogLevel.Trace, 'Processor.process', obj);

	      function visit(obj) {
	        if (Array.isArray(obj)) {
	          for (var i in obj) {
	            if (visit(obj[i])) return true;
	          }
	        } else if (_typeof(obj) === "object" && obj != null) {
	          var keys = Object.keys(obj);

	          for (var i in keys) {
	            if (keys[i].substr(0, 1) == ".") return true;else if (visit(obj[keys[i]])) return true;
	          }
	        }

	        return false;
	      }

	      return new Promise(function (resolve, reject) {
	        var isTemplate = visit(obj);

	        try {
	          if (isTemplate) {
	            _this.app.services.moduleSystem.init(_this.app.options.basePath);

	            _this.app.services.moduleSystem["import"](_this.app.services.transformer.transform(JSON.stringify(obj)).code).then(function (exported) {
	              try {
	                _this.parse(exported["default"] || exported, 0, '').then(resolve, reject);
	              } catch (e) {
	                reject(e);
	              }
	            }, function (rs) {
	              return reject(rs);
	            });
	          } else _this.parse(obj, 0, '').then(resolve, reject);
	        } catch (e) {
	          reject(e);
	        }
	      });
	    };

	    return Processor;
	  }();

	  exports.Processor = Processor;
	});
	unwrapExports(processor);
	var processor_1 = processor.Processor;

	var webui = createCommonjsModule(function (module, exports) {

	  exports.__esModule = true;

	  var WebUI =
	  /** @class */
	  function () {
	    function WebUI(app) {
	      this.type = "UI";
	      this.app = app;
	      this.app.options = this.app.options || {};

	      try {
	        if (window) {
	          var obj = Object.getOwnPropertyDescriptor(window, "preact") || Object.getOwnPropertyDescriptor(window, "React");

	          if (obj) {
	            this.processElementInternal = obj.value.h || obj.value.createElement;
	            this.Component = obj.value.Component;
	            this.renderInternal = obj.value.render || (Object.getOwnPropertyDescriptor(window, "ReactDOM") || {
	              value: null
	            }).value.render;
	          }
	        }
	      } catch (_a) {
	        debugger; //TODO: find a workaround. in NodeJS ReferenceError: window is not defined
	      }
	    }

	    WebUI.prototype.render = function (ui, parent, mergeWith) {
	      if (this.renderInternal) {
	        this.app.services.logger.log.call(this, types.LogLevel.Trace, "WebUI.render", [ui]);
	        return this.renderInternal(ui, parent, mergeWith);
	      } else this.app.services.logger.log.call(this, types.LogLevel.Error, "Unable to render UI - No UI framework detected. \nEnsure that you have referenced a UI framework before executing the application, or specify using app.services.UI");
	    };

	    WebUI.prototype.processElement = function (element, depth, index) {
	      if (depth % 2 === 0) {
	        if (typeof element != "string" && !Array.isArray(element)) {
	          this.app.services.logger.log.call(this, types.LogLevel.Error, "Child element [2] should be either a string or array", [{
	            element: element
	          }]);
	          throw new Error("Child element [2] should be either a string or array");
	        } else if (index !== undefined && Array.isArray(element)) {
	          element[1] = element[1] || {};
	          if (!element[1].key) element[1].key = index;
	        }
	      } //console.log({element, index, depth, code: JSON.stringify(element)});


	      return depth % 2 === 1 || !this.processElementInternal || !Array.isArray(element) ? element : this.processElementInternal.apply(this, element);
	    };

	    return WebUI;
	  }();

	  exports.WebUI = WebUI;
	});
	unwrapExports(webui);
	var webui_1 = webui.WebUI;

	var navigation = createCommonjsModule(function (module, exports) {

	  var __extends = commonjsGlobal && commonjsGlobal.__extends || function () {
	    var _extendStatics = function extendStatics(d, b) {
	      _extendStatics = Object.setPrototypeOf || {
	        __proto__: []
	      } instanceof Array && function (d, b) {
	        d.__proto__ = b;
	      } || function (d, b) {
	        for (var p in b) {
	          if (b.hasOwnProperty(p)) d[p] = b[p];
	        }
	      };

	      return _extendStatics(d, b);
	    };

	    return function (d, b) {
	      _extendStatics(d, b);

	      function __() {
	        this.constructor = d;
	      }

	      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	  }();

	  var __assign = commonjsGlobal && commonjsGlobal.__assign || function () {
	    __assign = Object.assign || function (t) {
	      for (var s, i = 1, n = arguments.length; i < n; i++) {
	        s = arguments[i];

	        for (var p in s) {
	          if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
	        }
	      }

	      return t;
	    };

	    return __assign.apply(this, arguments);
	  };

	  exports.__esModule = true;
	  var Navigation = {
	    resolve: function transform(container) {
	      var url = Object.getOwnPropertyDescriptor(commonjsGlobal, "location") ? location.href : '';
	      if (Object.keys(this.controllers).length === 0) return this.main;

	      for (var c in this.controllers) {
	        if (this.controllers[c].container ? this.controllers[c].container : '' == (container || '')) {
	          var match = this.controllers[c].match ? this.controllers[c].match.test(url) : true;
	          this.services.logger.log(types.LogLevel.Trace, "Route \"" + url + "\" " + (match ? 'matched' : 'did not match') + " controller \"" + c + "\"");

	          if (match) {
	            var qs = /(?:\?)([^#]*)(?:#.*)?$/.exec(url);
	            var params = {};
	            var index = 0;
	            if (qs) qs[1].split('&').forEach(function (p) {
	              var v = p.split('=');
	              params[v.length === 2 ? v[0] : index++] = v[v.length - 1];
	            });
	            return this.controllers[c].resolve.call(this, params);
	          }
	        } else this.services.logger.log(types.LogLevel.Trace, "Container " + (container || '(blank)') + " does not match controller " + c + "'s container " + (this.controllers[c].container || '(blank)'));
	      }

	      return ["Error", {}, "Could not locate controller matching " + url];
	    },
	    a: function inject(app) {
	      return (
	        /** @class */
	        function (_super) {
	          __extends(a, _super);

	          function a() {
	            return _super !== null && _super.apply(this, arguments) || this;
	          }

	          a.prototype.click = function () {
	            alert(this.props.href);
	            if (event) event.preventDefault();
	          };

	          a.prototype.render = function () {
	            return app.services.UI.processElement(["a", __assign({}, this.props, {
	              onClick: this.click.bind(this)
	            }), this.props.children], 0, undefined);
	          };

	          return a;
	        }(app.services.UI.Component)
	      );
	    },
	    container: function transform(app, t, a, c) {
	      return (
	        /** @class */
	        function (_super) {
	          __extends(Container, _super);

	          function Container() {
	            return _super.call(this) || this;
	          }

	          Container.prototype.render = function () {
	            return app.services.UI.processElement([t, __assign({}, a, {
	              onClick: this.click.bind(this)
	            }), c], 0, undefined); //return app.services.UI.processElement(["a", {...this.props, onClick: this.click.bind(this)}, this.props.children], 0, undefined);
	          };

	          return Container;
	        }(app.services.UI.Component)
	      );
	    }
	  };
	  exports.Navigation = Navigation;
	});
	unwrapExports(navigation);
	var navigation_1 = navigation.Navigation;

	var app = createCommonjsModule(function (module, exports) {

	  exports.__esModule = true; //import { Intercept } from "./intercept";

	  var App =
	  /** @class */
	  function () {
	    function App(app) {
	      if (app === void 0) {
	        app = {
	          main: []
	        };
	      }

	      var _this = this;

	      try {
	        Object.keys(app).forEach(function (k) {
	          var d = Object.getOwnPropertyDescriptor(app, k);
	          if (d) Object.defineProperty(_this, k, d);
	        });
	        this.main = app.main;
	        this.options = app.options || {};
	        this.options.logLevel = this.options.logLevel || types.LogLevel.Error;
	        var logger_1 = app.services && app.services.logger ? _typeof(app.services.logger) === "object" ? app.services.logger : new app.services.logger(this) : null;
	        var s = app.services || {};
	        s.logger = {
	          log: function log(logLevel, title, optionalParameters) {
	            if (logLevel <= (_this && _this.options && _this.options.logLevel ? types.LogLevel[_this.options.logLevel] || 2 : 2)) logger_1 ? logger_1.log.bind(_this, logLevel, title, optionalParameters) : [function (title, optionalParameters) {}, console.error, console.error, console.warn, console.info, console.info][logLevel](title + '\r\n', optionalParameters || [_this]);
	          }
	        };
	        s.transformer = s.transformer ? _typeof(s.transformer) === "object" ? s.transformer : new s.transformer(this) : new transformer.Transformer({
	          module: types.ModuleSystem.None
	        });
	        s.moduleSystem = s.moduleSystem ? _typeof(s.moduleSystem) === "object" ? s.moduleSystem : new s.moduleSystem(this) : new loader$2.Loader(this.options.basePath);
	        s.navigation = s.navigation ? _typeof(s.navigation) === "object" ? s.navigation : new s.navigation(this) : navigation.Navigation;
	        s.UI = s.UI ? _typeof(s.UI) === "object" ? s.UI : new s.UI(this) : new webui.WebUI(this);
	        this.services = {
	          moduleSystem: s.moduleSystem,
	          processor: new processor.Processor(this),
	          transformer: s.transformer,
	          logger: s.logger,
	          UI: s.UI,
	          navigation: s.navigation
	        };
	        this.controllers = {};
	        if (app.controllers) for (var c in app.controllers) {
	          var co = app.controllers[c];
	          this.controllers[c] = _typeof(co) === "object" ? co : new co(this);
	        }
	        this.components = app.components;
	        if (_typeof(this.components) === "object" && !this.components["Navigation"]) this.components["Navigation"] = navigation.Navigation;
	      } catch (ex) {
	        console.error(ex);
	        throw ex;
	      }
	    }

	    App.prototype.initApp = function () {
	      if (!this.options.web) this.options.web = {};

	      try {
	        if (document) {
	          // web app
	          if (!document.body) document.body = document.createElement('body');
	          this.options.web.target = this.options.web.target || document.body;

	          if (this.options.web.target === document.body) {
	            this.options.web.target = document.getElementById("main") || document.body.appendChild(document.createElement("div"));
	            if (!this.options.web.target.id) this.options.web.target.setAttribute("id", "main");
	          } else if (typeof this.options.web.target === "string") this.options.web.target = document.getElementById(this.options.web.target);

	          if (this.options.web.target == null) throw new Error("Cannot locate target (" + (this.options.web.target ? 'not specified' : this.options.web.target) + ") in html document body.");
	          if (this.options.title) document.title = this.options.title; //if (module && module.hot) module.hot.accept();

	          if (this.options.web.target.hasChildNodes()) this.options.web.target.innerHTML = "";
	        }
	      } catch (_a) {//TODO: workaround for nodeJs as document element is not defined in Node runtime
	      }
	    };

	    App.prototype.run = function () {
	      var _this = this;

	      this.services.logger.log.call(this, types.LogLevel.Trace, 'App.run');
	      var main = null;
	      return new Promise(function (resolve, reject) {
	        try {
	          _this.initApp();

	          main = _this.services.navigation.resolve.apply(_this);
	        } catch (e) {
	          _this.services.logger.log.call(_this, types.LogLevel.Error, e);

	          reject(e);
	        }

	        _this.render(main).then(resolve, function (err) {
	          _this.services.logger.log.call(_this, types.LogLevel.Error, err.message, err.stack);

	          reject(err);

	          _this.render(["pre", {}, err.stack]);
	        });
	      });
	    };

	    App.prototype.render = function (ui) {
	      var _this = this;

	      return new Promise(function (resolve, reject) {
	        _this.services.logger.log.call(_this, types.LogLevel.Trace, 'App.render', [{
	          ui: ui
	        }]);

	        _this.services.processor.process(ui).then(function (value) {
	          try {
	            resolve(_this.services.UI.render(value, _this.options.web && _this.options.web.target ? _this.options.web.target : undefined));
	          } catch (e) {
	            reject(e);
	          }
	        }, function (r) {
	          return reject(r);
	        });
	      });
	    };

	    return App;
	  }();

	  exports.App = App;
	});
	unwrapExports(app);
	var app_1 = app.App;

	var dist = createCommonjsModule(function (module, exports) {

	  var __importStar = commonjsGlobal && commonjsGlobal.__importStar || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) {
	      if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
	    }
	    result["default"] = mod;
	    return result;
	  };

	  exports.__esModule = true;
	  exports.App = app.App;
	  exports.Transformer = transformer.Transformer;
	  exports.Loader = loader$2.Loader;

	  var types$1 = __importStar(types);

	  exports.types = types$1;
	});
	unwrapExports(dist);
	var dist_1 = dist.App;
	var dist_2 = dist.Transformer;
	var dist_3 = dist.Loader;
	var dist_4 = dist.types;

	var PENDING = 'pending';
	var SETTLED = 'settled';
	var FULFILLED = 'fulfilled';
	var REJECTED = 'rejected';

	var NOOP = function NOOP() {};

	var isNode = typeof commonjsGlobal !== 'undefined' && typeof commonjsGlobal.process !== 'undefined' && typeof commonjsGlobal.process.emit === 'function';
	var asyncSetTimer = typeof setImmediate === 'undefined' ? setTimeout : setImmediate;
	var asyncQueue = [];
	var asyncTimer;

	function asyncFlush() {
	  // run promise callbacks
	  for (var i = 0; i < asyncQueue.length; i++) {
	    asyncQueue[i][0](asyncQueue[i][1]);
	  } // reset async asyncQueue


	  asyncQueue = [];
	  asyncTimer = false;
	}

	function asyncCall(callback, arg) {
	  asyncQueue.push([callback, arg]);

	  if (!asyncTimer) {
	    asyncTimer = true;
	    asyncSetTimer(asyncFlush, 0);
	  }
	}

	function invokeResolver(resolver, promise) {
	  function resolvePromise(value) {
	    resolve(promise, value);
	  }

	  function rejectPromise(reason) {
	    reject(promise, reason);
	  }

	  try {
	    resolver(resolvePromise, rejectPromise);
	  } catch (e) {
	    rejectPromise(e);
	  }
	}

	function invokeCallback(subscriber) {
	  var owner = subscriber.owner;
	  var settled = owner._state;
	  var value = owner._data;
	  var callback = subscriber[settled];
	  var promise = subscriber.then;

	  if (typeof callback === 'function') {
	    settled = FULFILLED;

	    try {
	      value = callback(value);
	    } catch (e) {
	      reject(promise, e);
	    }
	  }

	  if (!handleThenable(promise, value)) {
	    if (settled === FULFILLED) {
	      resolve(promise, value);
	    }

	    if (settled === REJECTED) {
	      reject(promise, value);
	    }
	  }
	}

	function handleThenable(promise, value) {
	  var resolved;

	  try {
	    if (promise === value) {
	      throw new TypeError('A promises callback cannot return that same promise.');
	    }

	    if (value && (typeof value === 'function' || _typeof(value) === 'object')) {
	      // then should be retrieved only once
	      var then = value.then;

	      if (typeof then === 'function') {
	        then.call(value, function (val) {
	          if (!resolved) {
	            resolved = true;

	            if (value === val) {
	              fulfill(promise, val);
	            } else {
	              resolve(promise, val);
	            }
	          }
	        }, function (reason) {
	          if (!resolved) {
	            resolved = true;
	            reject(promise, reason);
	          }
	        });
	        return true;
	      }
	    }
	  } catch (e) {
	    if (!resolved) {
	      reject(promise, e);
	    }

	    return true;
	  }

	  return false;
	}

	function resolve(promise, value) {
	  if (promise === value || !handleThenable(promise, value)) {
	    fulfill(promise, value);
	  }
	}

	function fulfill(promise, value) {
	  if (promise._state === PENDING) {
	    promise._state = SETTLED;
	    promise._data = value;
	    asyncCall(publishFulfillment, promise);
	  }
	}

	function reject(promise, reason) {
	  if (promise._state === PENDING) {
	    promise._state = SETTLED;
	    promise._data = reason;
	    asyncCall(publishRejection, promise);
	  }
	}

	function publish(promise) {
	  promise._then = promise._then.forEach(invokeCallback);
	}

	function publishFulfillment(promise) {
	  promise._state = FULFILLED;
	  publish(promise);
	}

	function publishRejection(promise) {
	  promise._state = REJECTED;
	  publish(promise);

	  if (!promise._handled && isNode) {
	    commonjsGlobal.process.emit('unhandledRejection', promise._data, promise);
	  }
	}

	function notifyRejectionHandled(promise) {
	  commonjsGlobal.process.emit('rejectionHandled', promise);
	}
	/**
	 * @class
	 */


	function Promise$1(resolver) {
	  if (typeof resolver !== 'function') {
	    throw new TypeError('Promise resolver ' + resolver + ' is not a function');
	  }

	  if (this instanceof Promise$1 === false) {
	    throw new TypeError('Failed to construct \'Promise\': Please use the \'new\' operator, this object constructor cannot be called as a function.');
	  }

	  this._then = [];
	  invokeResolver(resolver, this);
	}

	Promise$1.prototype = {
	  constructor: Promise$1,
	  _state: PENDING,
	  _then: null,
	  _data: undefined,
	  _handled: false,
	  then: function then(onFulfillment, onRejection) {
	    var subscriber = {
	      owner: this,
	      then: new this.constructor(NOOP),
	      fulfilled: onFulfillment,
	      rejected: onRejection
	    };

	    if ((onRejection || onFulfillment) && !this._handled) {
	      this._handled = true;

	      if (this._state === REJECTED && isNode) {
	        asyncCall(notifyRejectionHandled, this);
	      }
	    }

	    if (this._state === FULFILLED || this._state === REJECTED) {
	      // already resolved, call callback async
	      asyncCall(invokeCallback, subscriber);
	    } else {
	      // subscribe
	      this._then.push(subscriber);
	    }

	    return subscriber.then;
	  },
	  catch: function _catch(onRejection) {
	    return this.then(null, onRejection);
	  }
	};

	Promise$1.all = function (promises) {
	  if (!Array.isArray(promises)) {
	    throw new TypeError('You must pass an array to Promise.all().');
	  }

	  return new Promise$1(function (resolve, reject) {
	    var results = [];
	    var remaining = 0;

	    function resolver(index) {
	      remaining++;
	      return function (value) {
	        results[index] = value;

	        if (! --remaining) {
	          resolve(results);
	        }
	      };
	    }

	    for (var i = 0, promise; i < promises.length; i++) {
	      promise = promises[i];

	      if (promise && typeof promise.then === 'function') {
	        promise.then(resolver(i), reject);
	      } else {
	        results[i] = promise;
	      }
	    }

	    if (!remaining) {
	      resolve(results);
	    }
	  });
	};

	Promise$1.race = function (promises) {
	  if (!Array.isArray(promises)) {
	    throw new TypeError('You must pass an array to Promise.race().');
	  }

	  return new Promise$1(function (resolve, reject) {
	    for (var i = 0, promise; i < promises.length; i++) {
	      promise = promises[i];

	      if (promise && typeof promise.then === 'function') {
	        promise.then(resolve, reject);
	      } else {
	        resolve(promise);
	      }
	    }
	  });
	};

	Promise$1.resolve = function (value) {
	  if (value && _typeof(value) === 'object' && value.constructor === Promise$1) {
	    return value;
	  }

	  return new Promise$1(function (resolve) {
	    resolve(value);
	  });
	};

	Promise$1.reject = function (reason) {
	  return new Promise$1(function (resolve, reject) {
	    reject(reason);
	  });
	};

	var pinkie = Promise$1;

	if (!commonjsGlobal.Promise) commonjsGlobal.Promise = pinkie;
	var systemJSPrototype = System.constructor.prototype;
	var instantiate = systemJSPrototype.instantiate;

	systemJSPrototype.instantiate = function (url, parent) {
	  if (url.slice(-5) === '.wasm') return instantiate.call(this, url, parent);
	  var loader = this;
	  if (url[0] === '@') return [[], function (_export) {
	    _export('default', dist);

	    var k = Object.keys(dist);

	    for (var i in k) {
	      _export(k[i], dist[k[i]]);
	    }

	    return {
	      execute: function execute(z) {}
	    };
	  }];
	  var u = url.indexOf('#') > -1 ? url.slice(0, url.indexOf('#')) : url;
	  var b = url.slice(u.length - url.length).split('#');
	  return fetch$1(u).then(function (source) {
	    try {
	      return transform.call(this, url.toLowerCase(), source);
	    } catch (ex) {
	      console.error('Error transforming ' + u + ': ' + ex.description || ex.message, ex.stack || '', [source]);
	      throw ex;
	    }
	  }, function (reason) {
	    throw new Error('Fetch error: ' + reason + (parent ? ' loading from  ' + parent : ''));
	  }).then(function (source) {
	    try {
	      (0, eval)(source + '\n//# sourceURL=' + url);
	    } catch (ex) {
	      console.error('Error evaluating ' + u + ': ' + ex.description || ex.message, ex.stack || '', [source]);
	      throw ex;
	    }

	    return loader.getRegister();
	  }).catch(function (message) {
	    console.error('Error instanciating ' + u + ': ' + message.description || message.message, message.stack || "");
	    throw new Error(message);
	  });
	}; // Hookable transform function!


	function transform(id, source) {
	  return id.indexOf('.json') > -1 || id.indexOf('.jst') > -1 ? new dist.Transformer({
	    module: 'amd'
	  }).transform(source, id).code
	  /*.replace('function (_0) {', 'function (_0) { debugger;')*/
	  : source;
	}

	var resolve$1 = systemJSPrototype.resolve;

	systemJSPrototype.resolve = function (id, parentUrl) {
	  if (id[0] === '@') return id;
	  return resolve$1.call(this, id, parentUrl);
	};

	function fetch$1(url) {
	  return new Promise(function (resolve, reject) {
	    var rq = new XMLHttpRequest();
	    rq.open('GET', url);
	    rq.credentials = 'same-origin';

	    rq.onload = function () {
	      if (rq.status == 200) resolve(rq.responseText);else reject(rq.status + ':' + rq.statusText);
	    };

	    rq.onerror = function () {
	      reject(rq.status + ': ' + rq.statusText);
	    };

	    rq.send();
	  });
	}

	var system = {};

	return system;

}());
//# sourceMappingURL=systemjs-jst.js.map
