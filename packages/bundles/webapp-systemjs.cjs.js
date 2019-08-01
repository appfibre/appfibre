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
* SJS 3.1.6
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
 * Named exports support for legacy module formats in SystemJS 2.0
 */
(function () {
  var systemPrototype = System.constructor.prototype; // hook System.register to know the last declaration binding

  var lastRegisterDeclare;
  var systemRegister = systemPrototype.register;

  systemPrototype.register = function (deps, declare) {
    lastRegisterDeclare = declare;
    systemRegister.call(this, deps, declare);
  };

  var getRegister = systemPrototype.getRegister;

  systemPrototype.getRegister = function () {
    var register = getRegister.call(this); // if it is an actual System.register call, then its ESM
    // -> dont add named exports

    if (!register || register[1] === lastRegisterDeclare || register[1].length === 0) return register; // otherwise it was provided by a custom instantiator
    // -> extend the registration with named exports support

    var registerDeclare = register[1];

    register[1] = function (_export, _context) {
      // hook the _export function to note the default export
      var defaultExport;
      var declaration = registerDeclare.call(this, function (name, value) {
        if (name === 'default') defaultExport = value;

        _export(name, value);
      }, _context); // hook the execute function

      var execute = declaration.execute;
      if (execute) declaration.execute = function () {
        execute.call(this); // do a bulk export of the default export object
        // to export all its names as named exports

        if (_typeof(defaultExport) === 'object') _export(defaultExport);
      };
      return declaration;
    };

    return register;
  };
})();

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
        if (System.registerRegistry) System.registerRegistry[name] = createAMDRegister([].concat(deps), execute);
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

var UI_1 = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  var UI;

  (function (UI) {})(UI = exports.UI || (exports.UI = {}));
});
unwrapExports(UI_1);
var UI_2 = UI_1.UI;

var app_1 = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  var app;

  (function (app) {
    app.UI = UI_1.UI;
    var LogLevel;

    (function (LogLevel) {
      LogLevel[LogLevel["None"] = 0] = "None";
      LogLevel[LogLevel["Exception"] = 1] = "Exception";
      LogLevel[LogLevel["Error"] = 2] = "Error";
      LogLevel[LogLevel["Warn"] = 3] = "Warn";
      LogLevel[LogLevel["Info"] = 4] = "Info";
      LogLevel[LogLevel["Trace"] = 5] = "Trace";
    })(LogLevel = app.LogLevel || (app.LogLevel = {}));

    var ModuleSystem;

    (function (ModuleSystem) {
      ModuleSystem["None"] = "none";
      ModuleSystem["CommonJS"] = "commonjs";
      ModuleSystem["AMD"] = "amd";
      ModuleSystem["UMD"] = "umd";
      ModuleSystem["ES"] = "es";
    })(ModuleSystem = app.ModuleSystem || (app.ModuleSystem = {}));

    var LicenseType;

    (function (LicenseType) {
      LicenseType[LicenseType["MIT"] = 0] = "MIT";
      LicenseType[LicenseType["GNU"] = 1] = "GNU";
    })(LicenseType = app.LicenseType || (app.LicenseType = {}));
  })(app = exports.app || (exports.app = {}));
});
unwrapExports(app_1);
var app_2 = app_1.app;

var webapp_1 = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  var webapp;

  (function (webapp) {
    var browserType;

    (function (browserType) {
      browserType[browserType["Opera"] = 0] = "Opera";
      browserType[browserType["FireFox"] = 1] = "FireFox";
      browserType[browserType["Safari"] = 2] = "Safari";
      browserType[browserType["IE"] = 3] = "IE";
      browserType[browserType["Edge"] = 4] = "Edge";
      browserType[browserType["Chrome"] = 5] = "Chrome";
      browserType[browserType["Blink"] = 6] = "Blink";
      browserType[browserType["Unknown"] = 7] = "Unknown";
    })(browserType = webapp.browserType || (webapp.browserType = {}));
  })(webapp = exports.webapp || (exports.webapp = {}));
});
unwrapExports(webapp_1);
var webapp_2 = webapp_1.webapp;

var registry_1 = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  var registry;

  (function (registry) {
    var itemType;

    (function (itemType) {
      itemType[itemType["Service"] = 0] = "Service";
      itemType[itemType["Component"] = 1] = "Component";
    })(itemType = registry.itemType || (registry.itemType = {}));

    var licenseType;

    (function (licenseType) {
      licenseType[licenseType["MIT"] = 0] = "MIT";
      licenseType[licenseType["GNU"] = 1] = "GNU";
    })(licenseType = registry.licenseType || (registry.licenseType = {}));
  })(registry = exports.registry || (exports.registry = {}));
});
unwrapExports(registry_1);
var registry_2 = registry_1.registry;

var dist = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  var types;

  (function (types) {
    types.app = app_1.app;
    types.registry = registry_1.registry;
    types.webapp = webapp_1.webapp;
  })(types = exports.types || (exports.types = {}));

  exports["default"] = types;
});
unwrapExports(dist);
var dist_1 = dist.types;

var BaseComponent_1 = createCommonjsModule(function (module, exports) {

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

  var BaseComponent = function inject(app) {
    return (
      /** @class */
      function (_super) {
        __extends(BaseComponent, _super);
        /*implements types.Component<P,S>*/
        //state:S


        function BaseComponent(props, context) {
          var _this = _super.call(this, props, context) || this;

          _this.props = props;
          return _this;
        }

        BaseComponent.prototype.renderInternal = function (e, index) {
          var _this = this;

          if (Array.isArray(e)) {
            if (typeof e[0] === "string" || typeof e[0] === "function" || Promise.resolve(e[0]) === e[0]) return app.services.processor.processElement(e, index);else {
              return e.map(function (c, idx) {
                if (Array.isArray(c)) {
                  if (!c[1]) c[1] = {};
                  c[1]["key"] = c[1]["key"] || idx;
                }

                return _this.renderInternal(c, idx);
              });
            }
          }

          return !e || typeof e === "string" ? e : app.services.processor.processElement(e, index);
        };

        BaseComponent.prototype.render = function (props
        /*, state?: Readonly<S>, context?: any*/
        ) {
          return this.renderInternal(props || this.props.children);
        };

        return BaseComponent;
      }(app.services.UI.Component)
    );
  };

  exports.BaseComponent = BaseComponent;
});
unwrapExports(BaseComponent_1);
var BaseComponent_2 = BaseComponent_1.BaseComponent;

var Async_1 = createCommonjsModule(function (module, exports) {

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

  var Async = function inject(app) {
    return (
      /** @class */
      function (_super) {
        __extends(Async, _super);

        function Async(props, context) {
          var _this = _super.call(this, props, context) || this;

          _this.state = {}; //(Array.isArray(this.props.children) ? Promise.all : Promise.resolve)(this.props.children).then(o => this.setState({value: o  }));

          if (Array.isArray(props.children)) Promise.all(props.children).then(function (o) {
            return _this.setState({
              value: o
            });
          });else //if (Promise.resolve(this.props.children) === this.props.children)
            Promise.resolve(props.children).then(function (o) {
              return _this.setState({
                value: o
              });
            });
          return _this;
        }

        Async.prototype.render = function () {
          return !!this.state.value ? _super.prototype.render.call(this, this.state.value) : null;
        };

        return Async;
      }(app.services.UI.Component)
    );
  };

  exports.Async = Async;
});
unwrapExports(Async_1);
var Async_2 = Async_1.Async;

var components = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  exports.BaseComponent = BaseComponent_1.BaseComponent;
  exports.Async = Async_1.Async;
});
unwrapExports(components);
var components_1 = components.BaseComponent;
var components_2 = components.Async;

var Data_1 = createCommonjsModule(function (module, exports) {

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

  function clone(o) {
    if (Array.isArray(o)) return o.map(function (o) {
      return clone(o);
    });else if (_typeof(o) === "object") {
      var z = Object.create(o);
      Object.keys(o).forEach(function (k) {
        return z[k] = o[k];
      });
      return z;
    } else return o;
  }

  var SM = function inject(app) {
    return (
      /** @class */
      function (_super) {
        __extends(Bind, _super);

        function Bind(props, context) {
          var _this = _super.call(this, props, context) || this;

          var s = {};
          _this.state = {
            loaded: typeof props.data !== "string",
            data: clone(props.data),
            subscribers: s
          };
          if (typeof props.data === "string") app.services.moduleSystem["import"](props.data).then(function (x) {
            return _this.setState({
              data: clone(x)
            }, function () {
              _this.visit.call(_this, props.childArray, s);

              _this.setState({
                loaded: true
              });
            });
          });else _this.visit.call(_this, props.childArray, s);
          _this.render = _this.render.bind(_this);
          return _this;
        }

        Bind.prototype.setValue = function (path, value) {
          this.state.subscribers[path].forEach(function (s) {
            if (s.value != value) s.value = value;
          });
          this.setState({
            data: new Function('data', 'path', 'value', 'data' + (path[0] === '[' ? '' : '.') + path + ' = value; return data;')(this.state.data, path, value)
          });
        };

        Bind.prototype.getValue = function (path) {
          return new Function('data', 'path', 'return data' + (path[0] === '[' ? '' : '.') + path)(this.state.data, path);
        };

        Bind.prototype.subscribe = function (a, s) {
          var _this = this;

          var path = a["bind"];

          a.onChange = function (v) {
            return _this.setValue.call(_this, path, v.target.value);
          };

          a.value = this.getValue.call(this, path);
          if (s[path] === undefined) s[path] = [];
          s[path].push(a);
        };

        Bind.prototype.visit = function (obj, s) {
          var _this = this;

          if (Array.isArray(obj)) {
            obj.forEach(function (e) {
              if (Array.isArray(e) && e[0] != "Data.bind") {
                if (e[1] && _typeof(e[1]) === "object" && e[1]["bind"]) _this.subscribe(e[1], s);
                if (e[2] && Array.isArray(e[2])) _this.visit(e[2], s);
              }
            });
          }
        }; //render(e:types.app.promisedElement) {


        Bind.prototype.render = function (props
        /*, state?: Readonly<S>, context?: any*/
        ) {
          return this.state.loaded ? _super.prototype.render.call(this, !!props ? props : this.props.childArray) : null;
        };

        return Bind;
      }(components.BaseComponent(app))
    );
  };

  var Data = {
    bind: function transform(a, c) {
      return [SM, {
        data: a,
        childArray: c
      }]; //return ["div", a, c];
    },
    format: function transform(str) {
      var s = str.toString() || "";
      return s;
    }
  };
  exports.Data = Data;
});
unwrapExports(Data_1);
var Data_2 = Data_1.Data;

var Events_1 = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;

  var Events =
  /** @class */
  function () {
    function Events(_a) {
      this.callbacks = {};
      if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") window.addEventListener("message", this.onWindowMessage.bind(this));
    }

    Events.prototype.onWindowMessage = function (ev) {
      if (_typeof(ev.data) === "object" && typeof ev.data.type === "string") this.publish(ev.data);
    };

    Events.prototype.subscribe = function (eventType, callback) {
      //console.log(callback);
      if (!this.callbacks[eventType.type]) this.callbacks[eventType.type] = [];
      this.callbacks[eventType.type].push({
        type: eventType,
        correlationId: eventType.correlationId,
        callback: callback
      });
    };

    Events.prototype.unsubscribe = function (eventType, callback) {
      //console.log(callback);
      var callbacks;

      if (callbacks = this.callbacks[eventType.type]) {
        for (var i = callbacks.length - 1; i >= 0; i--) {
          if (callbacks[i].callback === callback) callbacks.splice(i, 1);
        }
      }
    };

    Events.prototype.publish = function (event, target) {
      var subscriptions = this.callbacks[event.type];
      var response = [];
      if (target) target.postMessage(event, location.href);else for (var s in subscriptions) {
        if (subscriptions[s].correlationId === undefined || subscriptions[s].correlationId == event.correlationId) if (subscriptions[s].callback) {
          var r = subscriptions[s].callback(event);
          if (!!r) response.push(r);
        }
      }
      return response;
    };

    return Events;
  }();

  exports.Events = Events;
});
unwrapExports(Events_1);
var Events_2 = Events_1.Events;

var Browser = createCommonjsModule(function (module, exports) {

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

  function run(source, url
  /*, basePath?:string*/
  ) {
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
            output = run(source, url
            /*, basePath*/
            );
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
    resolve: function resolve(name) {
      return name;
    },
    init: function init()
    /*basePath: string*/
    {
      return void {};
    }
  };
  exports["default"] = Loader;
});
unwrapExports(Browser);

var NodeJs = createCommonjsModule(function (module, exports) {

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
  exports.__esModule = true; //import path from 'path';

  var basepath;

  function nodeRequire(url) {
    var tmpdir = basepath || commonjsGlobal.process.env.INIT_CWD;

    var __dirname__ = commonjsGlobal.process.cwd();

    if (tmpdir && __dirname__ != tmpdir) commonjsGlobal.process.chdir(tmpdir);

    var _exp = (commonjsGlobal.require || (commonjsGlobal.process.mainModule ? commonjsGlobal.process.mainModule.constructor._load : url))(url);

    if (commonjsGlobal.process.cwd() != __dirname__) commonjsGlobal.process.chdir(__dirname__);
    return _exp; //return new Function('url', 'tmpdir', 'tmpdir = tmpdir ? tmpdir : global.process.env.INIT_CWD; var __dirname__ = global.process.cwd(); if (__dirname__ != tmpdir) global.process.chdir(tmpdir); var _exp = (global.require || global.process.mainModule.constructor._load)(url); if (global.process.cwd() != __dirname__) global.process.chdir(__dirname__); return _exp;')(url, basepath||'');
  }

  function run(source, url, references) {
    var m = {
      exports: {}
    };

    try {
      if (url) basepath = url; //path.resolve(url);

      var refkeys = references ? Object.keys(references) : [];
      var refs = references ? Object.values(references) : [];
      Function.apply(void 0, refkeys.concat(['require', 'module', source + ";\n//# sourceURL=' + " + url])).apply(void 0, refs.concat([nodeRequire, m]));
    } catch (f) {
      console.log('Error running script from source "' + (url || source) + '"', f);
      throw f;
    }

    return m.exports;
  }

  var Loader = {
    instantiate: function instantiate(url, parent, _references) {
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
    "import": function _import(source, url, references) {
      return __awaiter(_this, void 0, void 0, function () {
        var output;
        return __generator(this, function (_a) {
          try {
            output = run(source, url, references);
            return [2
            /*return*/
            , output];
          } catch (e) {
            console.log('Error executing script "' + url + '": ' + e + '\n "' + source + '"');
            throw e;
          }

          return [2
          /*return*/
          ];
        });
      });
    },
    resolve: function resolve(name) {
      return name;
    },
    init: function init(basePath) {
      basepath = basePath;
    }
  };
  exports.Loader = Loader;
});
unwrapExports(NodeJs);
var NodeJs_1 = NodeJs.Loader;

var Loader_1 = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;

  var Loader =
  /** @class */
  function () {
    function Loader(app) {
      var _this = this;

      this.app = app;

      if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") {
        var systemjs = Object.getOwnPropertyDescriptor(window, "System");

        if (systemjs) {
          systemjs.value.constructor.prototype.jst = function (input, name) {
            return _this.app.services.transformer.transform(input, name);
          };

          this.proxy = {
            "import": systemjs.value["import"].bind(systemjs.value),
            resolve: function resolve(name) {
              return name;
            },
            instantiate: systemjs.value.instantiate.bind(systemjs.value),
            init: function init()
            /*basePath: string*/
            {
              return void {};
            }
          };
          systemjs.value.constructor.prototype.instantiate = this.instantiate.bind(this);
          systemjs.value.constructor.prototype["import"] = this["import"].bind(this);
        } else this.proxy = Browser["Loader"];
      }

      if (this['proxy'] == null) this.proxy = NodeJs["Loader"];
    }

    Loader.prototype["import"] = function (moduleName, normalizedParentName, _references) {
      var _this = this;

      var u = moduleName.indexOf('#') > -1 ? moduleName.slice(0, moduleName.indexOf('#')) : moduleName;
      var b = u.length + 1 < moduleName.length ? moduleName.slice(u.length + 1).split('#') : [];
      return new Promise(function (r, rj) {
        return _this.proxy["import"](_this.resolve(u), normalizedParentName).then(function (x) {
          if (x["default"]) x = x["default"];

          for (var i = 0; i < b.length; i++) {
            if ((x = x[b[i]]) === undefined) {
              //debugger;
              rj("Could not resolve property " + b[i] + " on " + moduleName);
            }
          }
          r({
            "default": x,
            __esModule: moduleName
          });
        }, rj);
      });
    };

    Loader.prototype.resolve = function (url) {
      if (url[0] == '@' && this.app.settings.cdn) {
        var cdn = url.slice(0, url.indexOf('/'));
        if (this.app.settings.cdn[cdn]) url = this.app.settings.cdn[cdn] + url.substr(cdn.length);
      }

      return this.proxy.resolve(url);
    };

    Loader.prototype.instantiate = function (url, parent, references) {
      return this.proxy.instantiate(this.resolve(url), parent, references);
    };

    Loader.prototype.init = function (basePath) {
      Object.defineProperty(this.proxy["import"], "jst", this.app.services.transformer.transform);
      this.proxy.init(basePath);
    };

    return Loader;
  }();

  exports.Loader = Loader;
});
unwrapExports(Loader_1);
var Loader_2 = Loader_1.Loader;

var Parsers = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  exports.Parsers = {
    ".": function _(_transformer, _context, obj, _offset) {
      return obj["."];
    },
    ".import": function _import(transformer, context, obj, offset) {
      return transformer.loadModule(context, transformer.process(obj[".import"], context, false, false, offset), offset);
    },
    ".function": function _function(transformer, context, obj, offset) {
      return "function " + (obj[".function"] ? obj[".function"] : "") + "(" + (obj["arguments"] ? transformer.process(obj["arguments"], context, false, true, offset) : "") + "){ return " + transformer.process(obj["return"], context, true, false, offset) + " }";
    },
    ".map": function map(transformer, context, obj, offset) {
      return transformer.process(obj[".map"], context, false, false, offset) + ".map(function(" + obj["arguments"] + ") {return " + (transformer.settings && transformer.settings.indent ? new Array(offset).join(' ') : "") + transformer.process(obj["return"], context, true, false, offset) + " })";
    },
    ".filter": function filter(transformer, context, obj, offset) {
      return transformer.process(obj[".filter"], context, false, false, offset) + ".filter(function(" + obj["arguments"] + ") {return " + transformer.process(obj["condition"], context, true, false, offset) + " })";
    },
    ".call": function call(transformer, context, obj, offset) {
      return transformer.process(obj[".call"], context, false, false, offset) + ".call(" + (obj["arguments"] ? transformer.process(obj["arguments"], context, false, true, offset) : "") + ")";
    },
    ".exec": function exec(transformer, context, obj, offset) {
      return transformer.process(obj[".exec"], context, false, false, offset) + "(" + (obj["arguments"] ? transformer.process(obj["arguments"], context, true, true, offset) : "") + ")";
    },
    ".new": function _new(transformer, context, obj, offset) {
      return "new " + transformer.process(obj[".new"], context, false, false, offset) + "(" + (obj["arguments"] ? transformer.process(obj["arguments"], context, true, true, offset) : "") + ")";
    }
  };
});
unwrapExports(Parsers);
var Parsers_1 = Parsers.Parsers;

var Processor_1 = createCommonjsModule(function (module, exports) {

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

  exports.__esModule = true; //import { App } from "../app";

  function s_xa(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  }

  function clone(a
  /*,b?:any*/
  ) {
    for (var c = 1; c < arguments.length; c++) {
      var d = arguments[c];
      if (d) for (var e in d) {
        s_xa(d, e) && (a[e] = d[e]);
      }
    }

    return a;
  }

  function Inject(app, proxy) {
    var inj = clone(app);
    inj.services.UI.Component = proxy || components.BaseComponent(app)
    /*app.services.UI.Component*/
    ;
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

      this.cache[".App"] = function inject(app) {
        return (
          /** @class */
          function (_super) {
            __extends(Proxy, _super); //app:App;


            function Proxy(props, context) {
              return _super.call(this, props, context) || this; //this.app = new App(props);
            }

            Proxy.prototype.render = function () {
              return _super.prototype.render.call(this, this.props.main);
            };

            return Proxy;
          }(components.BaseComponent(app))
        );
      };
    }

    Processor.prototype.Async = function () {
      this.async = this.async || components.Async(this.app);
      return this.async;
    };

    Processor.prototype.createClass = function (B, d) {
      return (
        /** @class */
        function (_super) {
          __extends(class_1, _super);

          function class_1() {
            var _this = this;

            var b = _this = _super.call(this, arguments) || this;

            var i = typeof d === "function" ? d.call(b, b) : d;
            if (b !== undefined) for (var p in b.__proto__) {
              if (!i[p]) i[p] = b[p];
            }
            if (i["constructor"]) i.constructor.apply(i, arguments);
            return i;
          }

          return class_1;
        }(B)
      );
    };

    Processor.prototype.locate = function (resource, path) {
      var parts = path.split('.');
      var obj = resource;

      for (var part = 0; part < parts.length; part++) {
        if (obj[parts[part]] !== undefined) obj = obj[path[part]];else obj = null;
      }

      return obj;
    };

    Processor.prototype.getFunctionName = function (obj) {
      if (obj.name) return obj.name;
      var name = obj.toString();
      if (name.indexOf('(') > -1) name = name.substr(0, name.indexOf('('));
      if (name.indexOf('function') > -1) name = name.substr(name.indexOf('function') + 'function'.length);
      return name.trim();
    }; // ether an element, or array of elements depending on depth == even or odd


    Processor.prototype.processElementInternal = function (element, depth, index) {
      if (depth % 2 === 0) {
        if (typeof element != "string" && !Array.isArray(element)) {
          this.app.services.logger.log.call(this, dist.types.app.LogLevel.Error, "Child element [2] should be either a string or array", [{
            element: element
          }]);
          return element;
        } else if (Array.isArray(element)) {
          if (index !== undefined) {
            element[1] = element[1] || {};
            if (!element[1].key) element[1].key = index;
          }
        } //if (Array.isArray(element) && element[1] && element[1].context && typeof element[1].context.intercept === "function")
        //    element = element[1].context.intercept(element);

      } //console.log({element, index, depth, code: JSON.stringify(element)});


      return depth % 2 === 1 || !Array.isArray(element) ? element : this.app.services.UI.createElement(element[0], element[1], element[2]);
    };

    Processor.prototype.parse = function (obj, level, path, index) {
      this.app.services.logger.log.call(this, dist.types.app.LogLevel.Trace, 'Processor.parse', obj);
      var processor = this;
      return new Promise(function (r, f) {
        if (!obj) return r(obj);
        if (_typeof(obj) === "object" && !Array.isArray(obj) && obj["default"]) obj = processor.init(obj);

        if (Array.isArray(obj)) {
          if (_typeof(obj[0]) === "object" && obj[0]['default']) obj[0] = processor.init(obj[0]);
          if (typeof obj[0] === "string") obj[0] = processor.resolve(obj[0]);
          if (typeof obj[0] === "function" && processor.getFunctionName(obj[0]) === "transform") processor.parse(obj[0].apply(processor.app, obj.slice(1)), level, path + '[0]()', index).then(r, f);else Promise.all(obj.map(function (v, i) {
            return processor.parse(v, level + 1, path + '[' + i + ']', i);
          })).then(function (o) {
            try {
              r(processor.processElementInternal(o, level, index));
            } catch (e) {
              processor.app.services.logger.log(dist.types.app.LogLevel.Error, 'Processor.parse: ' + e.stack, [o]);
              f(e);
            }
          }, f);
        } else if (typeof obj === "function" && processor.getFunctionName(obj) === "inject") Promise.resolve(obj(Inject(processor.app))).then(function (o) {
          return processor.parse(o, level, path, index).then(r, f);
        }, f);else if (typeof obj === "function" && processor.getFunctionName(obj) === "Component") try {
          r(processor.createClass(components.BaseComponent(processor.app), obj));
        } catch (e) {
          processor.app.services.logger.log(dist.types.app.LogLevel.Error, 'Processor.parse: ' + e.stack, obj);
          f(e);
        } else if (Promise.resolve(obj) === obj) {
          Promise.resolve(obj).then(function (o) {
            return processor.parse(o, level, path, index).then(function (o2) {
              return r(o2);
            }, f);
          }, f);
        } else if (obj) {
          try {
            r(processor.processElementInternal(obj, level, index));
          } catch (e) {
            processor.app.services.logger.log(dist.types.app.LogLevel.Error, 'Processor.parse: ' + e.stack, obj);
            f(e);
          }
        } else r(obj);
      });
    };

    Processor.prototype.resolve = function (fullpath) {
      var _this = this;

      this.app.services.logger.log.call(this, dist.types.app.LogLevel.Trace, 'Processor.resolve', [fullpath]);
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

        for (var part = 0; part < path.length; part++) {
          if (typeof obj_1 === "function" && this.getFunctionName(obj_1) === "inject") obj_1 = obj_1(Inject(this.app, components.BaseComponent(this.app)));

          if (obj_1[path[part]] !== undefined) {
            obj_1 = obj_1[path[part]];
            if (typeof obj_1 === "function" && this.getFunctionName(obj_1) == "inject") obj_1 = obj_1(Inject(this.app, components.BaseComponent(this.app)));
          } else if (path.length == 1 && path[0].length > 0 && path[0].toLowerCase() == path[0]) obj_1 = path[part];else {
            if (fullpath === "Exception") return function transform(obj) {
              return ["pre", {
                "style": {
                  "color": "red"
                }
              }, obj[1].stack ? obj[1].stack : obj[1]];
            };else {
              this.app.services.logger.log.call(this, dist.types.app.LogLevel.Error, 'Unable to resolve "App.components.' + (fullpath || 'undefined') + "'");
              return (
                /** @class */
                function (_super) {
                  __extends(class_2, _super);

                  function class_2() {
                    return _super !== null && _super.apply(this, arguments) || this;
                  }

                  class_2.prototype.render = function () {
                    return _super.prototype.render ? _super.prototype.render.call(this, ["span", {
                      "style": {
                        "color": "red"
                      }
                    }, (fullpath || 'undefined') + " not found!"]) : (fullpath || 'undefined') + " not found!";
                  };

                  return class_2;
                }(components.BaseComponent(this.app))
              );
            }
          }
        } //return this.cache[fullpath] = Array.isArray(obj) ? class Wrapper extends this.app.services.UI.Component { shouldComponentUpdate() { return true; } render() {if (!obj[1]) obj[1] = {}; if   (!obj[1].key) obj[1].key = 0; return this.parse(jst && !this.app.disableIntercept && window.parent !== null && window !== window.parent ? [Intercept, {"file": jst, "method": prop}, [obj]] : obj); }} : obj;


        return this.cache[fullpath] = obj_1;
      }
    };

    Processor.prototype.init = function (obj) {
      return obj["default"];
    };

    Processor.prototype.processElement = function (obj, index) {
      var _this = this;

      if (!obj) return obj;
      if (_typeof(obj) === "object" && !Array.isArray(obj) && obj["default"]) obj = this.init(obj);

      if (Array.isArray(obj)) {
        if (_typeof(obj[0]) === "object" && obj[0]['default']) // TODO: Remove <never>
          //obj[0] = /*<never>*/this.init(obj[0]);
          debugger;

        if (typeof obj[0] === "string") {
          obj[0] = this.resolve(obj[0]);
        }

        if (typeof obj[0] === "function") {
          var name = this.getFunctionName(obj[0]);

          switch (name) {
            case "transform":
              var key = index;
              if (obj[1] && obj[1].key) key = obj[1].key;
              return this.processElement(obj[0].apply(this.app, obj.slice(1)), key);

            case "inject":
              obj[0] = obj[0](Inject(this.app));
              return this.processElement(obj);

            case "Component":
              obj[0] = this.createClass(components.BaseComponent(this.app), obj[0]);
              return this.processElement(obj);
          }
        }
      }

      if (Array.isArray(obj) && obj.some(function (c) {
        return Promise.resolve(c) === c;
      })) return this.processElementInternal([this.Async(), {
        id: Date.now()
      }, obj], 0, obj && obj[1] && obj[1].key !== undefined ? obj[1].key : index);else if (typeof obj === "string" || !obj) return obj; //else if (obj.then)  
      //    Promise.all( [ obj ]).then(o => processor.parse(o[0], level, path, index).then((o2:any) => r(o2), f), f);

      if (Promise.resolve(obj) === obj) obj = [this.Async(), {
        index: index
      }, obj];
      if (Array.isArray(obj)) return this.processElementInternal([obj[0], obj[1], Array.isArray(obj[2]) ? obj[2].map(function (c, idx) {
        return typeof c === "string" ? c : _this.processElement(c, idx);
      }) : obj[2]], 0, index);else return obj;
    };

    Processor.prototype.process = function (obj) {
      var _this = this;

      this.app.services.logger.log.call(this, dist.types.app.LogLevel.Trace, 'Processor.process', obj);

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
            _this.app.services.moduleSystem.init(_this.app.settings.baseExecutionPath);

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
unwrapExports(Processor_1);
var Processor_2 = Processor_1.Processor;

var Navigation_1 = createCommonjsModule(function (module, exports) {

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

  exports.__esModule = true; //import { INavigation, IAppLoaded, LogLevel, IEventData, IApp, promisedElement, element} from "../types";

  function parse(url) {
    var qs = /(?:\?)([^#]*)(?:#.*)?$/.exec(url);
    var params = {};
    var index = 0;
    if (qs) qs[1].split('&').forEach(function (p) {
      var v = p.split('=');
      params[v.length === 2 ? v[0] : index++] = v[v.length - 1];
    });
    return {
      path: qs && qs[1] ? qs[1] : ''
    };
  }

  function clone(o) {
    if (Array.isArray(o)) return o.map(function (o) {
      return clone(o);
    });else if (_typeof(o) === "object") {
      var z = Object.create(o);
      Object.keys(o).forEach(function (k) {
        return z[k] = o[k];
      });
      return z;
    } else return o;
  }

  var Navigation = {
    current: parse((typeof location === "undefined" ? "undefined" : _typeof(location)) === "object" ? location.href : ''),
    resolve: function transform(container) {
      var url = typeof location === "undefined" ? '' : location.href;
      if (this.controllers && Object.keys(this.controllers).length === 0) return this.main;

      for (var c in this.controllers) {
        if ((this.controllers[c].container ? this.controllers[c].container : '') == (container || '')) {
          var match = this.controllers[c].match ? this.controllers[c].match.test(url) : true;
          this.services.logger.log(dist.types.app.LogLevel.Trace, "Route \"" + url + "\" " + (match ? 'matched' : 'did not match') + " controller \"" + c + "\"");

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
        } else this.services.logger.log(dist.types.app.LogLevel.Trace, "Container " + (container || '(blank)') + " does not match controller " + c + "'s container " + (this.controllers[c].container || '(blank)'));
      }

      return ["Error", {}, "Could not locate controller matching " + url];
    },
    a: function inject(app) {
      return (
        /** @class */
        function (_super) {
          __extends(a, _super); //app.services.UI.Component 


          function a(props, context) {
            return _super.call(this, props, context) || this;
          }

          a.prototype.click = function (e) {
            app.services.navigation.current = parse(this.props.href);
            var topParent = parent;

            while (topParent.parent !== topParent) {
              topParent = topParent.parent;
            }

            if (topParent.history && topParent.history.pushState) topParent.history.pushState(null, '', this.props.href);else topParent.location.replace(this.props.href);
            app.services.events.publish({
              type: "Navigation.Redirect",
              correlationId: this.props.container,
              data: this.props.href
            });
            if (e && e.nativeEvent && e.nativeEvent.preventDefault) e.nativeEvent.preventDefault();
            return false;
          };

          a.prototype.render = function () {
            return _super.prototype.render.call(this, ["a", __assign({}, this.props, {
              onClick: this.click.bind(this)
            }), this.props.children]); //return app.services.UI.processElement(["a", {...this.props, onClick: this.click.bind(this)}, this.props.children], 0, undefined);
          };

          return a;
        }(components.BaseComponent(app) //app.services.UI.Component 
        )
      );
    },
    Container: function transform(a, c) {
      var app = this;
      return [
      /** @class */
      function (_super) {
        __extends(NavigationContainer, _super);

        function NavigationContainer(props, context) {
          var _this = _super.call(this, props, context) || this;

          _this.state = {
            a: props.a,
            c: props.c
          };
          _this.onRedirect = _this.onRedirect.bind(_this);
          return _this;
        }

        NavigationContainer.prototype.onRedirect = function ()
        /*event:types.app.IEventData<any>*/
        {
          var e = clone(this.props.c);
          if (Array.isArray(e)) e.forEach(function (c, i) {
            if (Array.isArray(c)) c[1].key = Date.now() + i;
          });
          this.setState({
            c: e
          });
        };

        NavigationContainer.prototype.componentWillMount = function () {
          app.services.events.subscribe({
            type: "Navigation.Redirect"
          }, this.onRedirect);
        };

        NavigationContainer.prototype.componentWillUnmount = function () {
          app.services.events.unsubscribe({
            type: "Navigation.Redirect"
          }, this.onRedirect);
        };

        NavigationContainer.prototype.render = function () {
          return _super.prototype.render.call(this, this.state.c);
        };

        return NavigationContainer;
      }(components.BaseComponent(app)), {
        a: a,
        c: c
      }];
    }
  };
  exports.Navigation = Navigation;
});
unwrapExports(Navigation_1);
var Navigation_2 = Navigation_1.Navigation;

var Transformer_1 = createCommonjsModule(function (module, exports) {

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

  var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : {
      "default": mod
    };
  };

  exports.__esModule = true;

  var types_1 = __importDefault(dist);

  var Transformer =
  /** @class */
  function () {
    function Transformer(settings) {
      this.reservedWords = ['function', 'for', 'var', 'this', 'self', 'null'];
      this.type = "Transformer";

      if (settings) {
        settings.parsers = settings.parsers || Parsers.Parsers;
        this.settings = __assign({}, settings, {
          indent: settings.indent || '\t',
          compact: settings.compact || false,
          module: settings.module || types_1["default"].app.ModuleSystem.None,
          namedExports: settings.namedExports === undefined ? true : settings.namedExports
        });
      } else this.settings = {
        module: types_1["default"].app.ModuleSystem.ES,
        parsers: Parsers.Parsers
      };
      /*this.settings.parsers[".app"] =  (obj:any, parseSettings:types.app.ITransformOutput, offset:number) => {
          var obj2:{[key:string]:any} = {};
          var keys = Object.keys(obj);
          for (var key in keys) obj2[keys[key] == ".app" ? "main" : keys[key]] = obj[keys[key]];
          return `${this.process.call(this, { ".new": {".require": "@appfibre/webapp#WebApp"}, "arguments": [obj2]}, true, true, offset)}`;
      };*/

    }

    Transformer.prototype.loadModule = function (context, val, offset) {
      var m = val.indexOf('#') > 0 ? val.substr(0, val.indexOf('#')) : val;

      if (val[0] === "~") {
        return "" + this.process({
          ".function": null,
          arguments: "loader",
          "return": {
            ".code": "loader.load('" + (m[1] === "/" ? '.' : '') + m.substr(1) + "')" + (val.length > m.length ? val.substring(m.length).replace('#', '.') : '') + ";"
          }
        }, context, false, false, offset);
      }

      if (this.settings.module.toLowerCase() === types_1["default"].app.ModuleSystem.ES.toLowerCase()) m = val.indexOf('#', m.length + 2) > -1 ? val.substr(0, val.indexOf('#', m.length + 2) - 1) : val;
      if (context.imports.indexOf(m) === -1) context.imports.push(m);
      return "_" + context.imports.indexOf(m) + (val.length > m.length ? val.substring(m.length).replace('#', '.') : '');
    }; // @ts-ignore


    Transformer.prototype.format = function (lines, indent) {
      var lt = this.settings.compact ? "" : "\n";
      var tab = this.settings.compact ? "" : this.settings.indent || "\t";
      return lt + new Array(indent + 1).join(tab) + lines.join("," + lt + new Array(indent + 1).join(tab)) + lt + new Array(indent).join(tab);
    };

    Transformer.prototype.process = function (obj, context, esc, et, offset) {
      var _this = this;

      var output;
      if (obj === null) output = "null";else if (Array.isArray(obj)) output = (et ? "" : "[") + this.format.call(this, obj.map(function (e) {
        return _this.process(e, context, esc, false, offset + 1);
      }), offset) + (et ? "" : "]");else if (_typeof(obj) === "object") {
        var keys = Object.keys(obj);
        var processed = false;

        for (var k in keys) {
          if (!processed && keys[k].length > 0 && keys[k].charAt(0) === '.') {
            if (keys[k].charAt(1) === ".") obj[keys[k]] = undefined;else if (this.settings.parsers && this.settings.parsers[keys[k]]) {
              processed = true;
              output = this.settings.parsers[keys[k]](this, context, obj, offset) || '';
            } else {
              debugger;
              throw new Error("Could not locate parser " + keys[k].substr(1));
            }
          }
        }

        if (!processed) output = (et ? "" : "{") + this.format.call(this, keys.filter(function (k) {
          return k.length < 2 || k.substr(0, 2) != '..';
        }).map(function (k) {
          return (_this.reservedWords.indexOf(k) > -1 || /[^a-z0-9]/i.test(k) ? _this.skey(k) : k) + ":" + (_this.settings.compact ? '' : ' ') + _this.process(obj[k], context, esc, false, offset + 1);
        }), offset) + (et ? "" : "}");
      } else if (typeof obj === "function") // object not JSON...
        output = obj.toString();else output = typeof obj === "string" && esc ? JSON.stringify(obj) : obj;
      return output;
    };

    Transformer.prototype.skey = function (key) {
      return JSON.stringify(key.charAt(0) === "'" && key.charAt(key.length - 1) === "'" || key.charAt(0) === '"' && key.charAt(key.length - 1) === '"' ? key.slice(1, key.length - 2) : key);
    };

    Transformer.prototype.processExports = function (context, obj) {
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
          context.code += keys.map(function (key) {
            return "module.exports[" + _this.skey(key) + "]" + sp + "=" + sp + _this.process(obj[key], context, true, false, 0) + ";";
          }).join(nl);
          if (!isDefault) context.code += nl + "module.exports[\"default\"]" + sp + "=" + sp + "{" + sp + keys.map(function (key) {
            return _this.skey(key) + ": " + _this.process(obj[key], context, true, false, 0);
          }).join(nl) + " };";
          break;

        case "es":
          if (isDefault) context.code += "export default" + sp + this.process(obj["default"], context, true, false, 0) + ";";else {
            context.code += "export default" + sp + "{" + this.format(keys.map(function (key) {
              return validkeys.indexOf(key) === -1 ? "\"" + key + "\": " + _this.process(obj[key], context, true, false, 0) : key + ":" + sp + (_this.settings.namedExports ? key : _this.process(obj[key], context, true, false, 2));
            }), 1) + "};";
            if (this.settings.namedExports && validkeys.length > 0) context.code = validkeys.map(function (key) {
              return "export " + vr + " " + key + sp + "=" + sp + _this.process(obj[key], context, true, false, 1) + ";";
            }).join(nl) + ("" + (nl + context.code + nl));
          }
          break;

        default:
          context.code += "return " + (isDefault ? this.process(obj["default"], context, true, false, 1) : "{" + this.format(keys.map(function (key) {
            return validkeys.indexOf(key) === -1 || /[^a-z0-9]/i.test(key) ? "\"" + key + "\": " + _this.process(obj[key], context, true, false, 1) : key + ":" + sp + _this.process(obj[key], context, true, false, 2);
          }), 1) + "}") + ";";
      }
    };

    Transformer.prototype.processImports = function (output) {
      var _this = this;

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
            return "" + _this.skey(key);
          }).join(", ") + "], " : '') + "function (" + Object.keys(r).map(function (key) {
            return '_' + r[key];
          }).join(", ") + ") { " + output.code + " });" + nl;
          break;

        case "es":
          output.code = Object.keys(s).map(function (key) {
            return "import {" + Object.keys(s[key]).map(function (k) {
              return k + " as _" + s[key][k];
            }).join(',' + sp) + "} from " + _this.skey(key) + ";" + nl;
          }).join('') + Object.keys(r).map(function (key) {
            return "import * as _" + r[key] + " from " + _this.skey(key.substr(key[0] == "~" ? 1 : 0)) + ";" + nl;
          }).join('') + output.code;
          break;

        default:
          for (var req in r) {
            output.code = vr + " _" + r[req] + sp + "=" + sp + "require(\"" + req + "\");" + nl + output.code;
          }

      }

      if (Object.keys(s2).length > 0 || Object.keys(r2).length > 0) {
        switch (this.settings.runtimeModule ? this.settings.runtimeModule.toLowerCase() : "none") {
          case "umd":
          case "commonjs":
          case "cjs":
            for (var req in r2) {
              output.code = vr + " _" + r2[req] + sp + "=" + sp + "require(\"" + req + "\");" + nl + output.code;
            }

            break;

          case "amd":
            output.code = "define(" + (Object.keys(r2).length > 0 ? "[" + Object.keys(r).map(function (key) {
              return "" + _this.skey(key);
            }).join(", ") + "], " : '') + "function (" + Object.keys(r2).map(function (key) {
              return '_' + r2[key];
            }).join(", ") + ") { " + output.code + " });" + nl;
            break;

          case "es":
            output.code = Object.keys(s2).map(function (key) {
              return "import {" + Object.keys(s2[key]).map(function (k) {
                return k.substr(1) + " as _" + s[key][k];
              }).join(',' + sp) + "} from " + _this.skey(key.substr(1)) + ";" + nl;
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

    Transformer.prototype.transformTemplate = function (template, name) {
      var output = {
        name: name,
        imports: [],
        exports: {},
        references: {},
        compositeObject: false,
        code: ''
      };
      this.processExports(output, template == undefined || template == null || Array.isArray(template) || _typeof(template) !== 'object' || Object.keys(template).filter(function (k) {
        return k[0] == '.';
      }).length > 0 ? {
        "default": template
      } : template);
      this.processImports(output);
      return output;
    };

    Transformer.prototype.transform = function (input, name) {
      var template;

      try {
        template = JSON.parse(input);
      } catch (e) {
        //console.log(JSON.stringify(this.settings));
        if (this.settings.dangerouslyProcessJavaScript || this.settings.dangerouslyProcessJavaScript === undefined) {
          try {
            template = Function("return (" + input + ");")();
            if (this.settings.dangerouslyProcessJavaScript === undefined) console.warn("Warning: " + (name || '') + " is not JSON compliant: " + e.message + ".  Set option \"dangerouslyProcessJavaScript\" to true to hide this message.\r\n" + input);
          } catch (f) {
            throw new Error("Unable to process JSON or Javascript " + (name || '') + ": " + f.message);
          }
        } else throw new Error("Unable to parse JSON " + (name || '') + ": " + e.message);
      }

      try {
        return this.transformTemplate(template == undefined || template == null || Array.isArray(template) || _typeof(template) !== 'object' || Object.keys(template).filter(function (k) {
          return k[0] == '.';
        }).length > 0 ? {
          "default": template
        } : template, name);
      } catch (e) {
        throw new Error("Unable to transform js template: " + e.message + "\r\n" + e.stack);
      }
    };

    return Transformer;
  }();

  exports.Transformer = Transformer;
});
unwrapExports(Transformer_1);
var Transformer_2 = Transformer_1.Transformer;

var services = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  exports.Data = Data_1.Data;
  exports.Events = Events_1.Events;
  exports.Loader = Loader_1.Loader;
  exports.Parsers = Parsers.Parsers;
  exports.Processor = Processor_1.Processor;
  exports.Navigation = Navigation_1.Navigation;
  exports.Transformer = Transformer_1.Transformer;
});
unwrapExports(services);
var services_1 = services.Data;
var services_2 = services.Events;
var services_3 = services.Loader;
var services_4 = services.Parsers;
var services_5 = services.Processor;
var services_6 = services.Navigation;
var services_7 = services.Transformer;

var app = createCommonjsModule(function (module, exports) {

  var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : {
      "default": mod
    };
  };

  exports.__esModule = true;

  var types_1 = __importDefault(dist);

  var App =
  /** @class */
  function () {
    function App(app) {
      var _this = this;

      try {
        Object.keys(app).forEach(function (k) {
          var d = Object.getOwnPropertyDescriptor(app, k);
          if (d) Object.defineProperty(_this, k, d);
        });
        this.main = app.main;
        this.settings = app.settings;
        this.info = app.info;
        this.settings.logLevel = this.settings.logLevel || types_1["default"].app.LogLevel.Error;
        this.settings.cdn = this.settings.cdn || {};
        var logger_1 = app.services && app.services.logger ? _typeof(app.services.logger) === "object" ? app.services.logger : new app.services.logger(this) : null;
        var s = app.services; //|| {};

        if (!s.UI) throw new Error("UI required");
        s.logger = {
          log: function log(logLevel, title, optionalParameters) {
            if (logLevel <= (_this && _this.settings && _this.settings.logLevel ? types_1["default"].app.LogLevel[_this.settings.logLevel] || 2 : 2)) logger_1 ? logger_1.log.bind(_this, logLevel, title, optionalParameters) : [function ()
            /*title?:any, optionalParameters?:any[]*/
            {}, console.error, console.error, console.warn, console.info, console.info][logLevel](title + '\r\n', optionalParameters || [_this]);
          }
        };
        s.transformer = s.transformer ? _typeof(s.transformer) === "object" ? s.transformer : new s.transformer(this) : new services.Transformer({
          module: types_1["default"].app.ModuleSystem.AMD
        });
        s.moduleSystem = s.moduleSystem ? _typeof(s.moduleSystem) === "object" ? s.moduleSystem : new s.moduleSystem(this) : new services.Loader(this);
        s.navigation = s.navigation ? _typeof(s.navigation) === "object" ? s.navigation : new s.navigation(this) : services.Navigation;
        s.data = s.data ? _typeof(s.data) === "object" ? s.data : new s.data(this) : services.Data;
        s.UI = _typeof(s.UI) === "object" ? s.UI : new s.UI(this);
        s.events = s.events ? _typeof(s.events) === "object" ? s.events : new s.events(this) : new services.Events(this);
        s.externals = s.externals || {};
        this.services = {
          moduleSystem: s.moduleSystem,
          processor: new services.Processor(this),
          transformer: s.transformer,
          logger: s.logger,
          UI: s.UI,
          navigation: s.navigation,
          events: s.events,
          externals: s.externals
        };
        this.controllers = {};
        if (app.controllers) for (var c in app.controllers) {
          var co = app.controllers[c];
          this.controllers[c] = _typeof(co) === "object" ? co : new co(this);
        }
        this.components = app.components;
        if (_typeof(this.components) === "object" && !this.components["Navigation"]) this.components["Navigation"] = services.Navigation;
        if (_typeof(this.components) === "object" && !this.components["Data"]) this.components["Data"] = services.Data;
      } catch (ex) {
        console.error(ex);
        throw ex;
      }
    }

    App.prototype.initApp = function () {
      //if (!this.options.web) this.options.web = { };
      var _this = this;

      this.services.moduleSystem.init(this.settings.baseExecutionPath);
      return Promise.resolve(this.services.UI).then(function (UI) {
        if (UI) {
          _this.services.UI = UI;
          if (_this.services.UI.init) _this.services.UI.init();
        } else throw new Error('Unable to initialize UI, ensure that you have loaded a UI framework');
      });
    };

    return App;
  }();

  exports.App = App;
});
unwrapExports(app);
var app_1$1 = app.App;

var dist$1 = createCommonjsModule(function (module, exports) {

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
  exports.types = dist.types;
  exports.App = app.App;

  var Services = __importStar(services);

  exports.Services = Services;
});
unwrapExports(dist$1);
var dist_1$1 = dist$1.types;
var dist_2 = dist$1.App;
var dist_3 = dist$1.Services;

var WebUI_1 = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;

  var WebUI =
  /** @class */
  function () {
    function WebUI(app) {
      this.type = "UI";
      this.app = app;
      this.app.settings = this.app.settings || {};
    }

    WebUI.prototype.init = function () {
      if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") {
        var obj = Object.getOwnPropertyDescriptor(window, "preact") || Object.getOwnPropertyDescriptor(window, "React");

        if (obj) {
          this.createElement = obj.value.h || obj.value.createElement;
          this.Component = obj.value.Component;
          this.renderInternal = obj.value.render || (Object.getOwnPropertyDescriptor(window, "ReactDOM") || {
            value: null
          }).value.render;
        }
      }
    };

    WebUI.prototype.render = function (ui, parent, mergeWith) {
      if (this.renderInternal) {
        this.app.services.logger.log.call(this, dist.types.app.LogLevel.Trace, "WebUI.render", [ui]);
        return this.renderInternal(ui, parent, mergeWith);
      } else this.app.services.logger.log.call(this, dist.types.app.LogLevel.Error, "Unable to render UI - No UI framework detected. \nEnsure that you have referenced a UI framework before executing the application, or specify using app.services.UI");
    };

    return WebUI;
  }();

  exports.WebUI = WebUI;
});
unwrapExports(WebUI_1);
var WebUI_2 = WebUI_1.WebUI;

var WebApp_1 = createCommonjsModule(function (module, exports) {

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

  var WebApp =
  /** @class */
  function (_super) {
    __extends(WebApp, _super); //info: fibre.IInfo


    function WebApp(app
    /*, context?:object*/
    ) {
      if (app === void 0) {
        app = {
          main: []
        };
      }

      var _this = this;

      var t = __assign({}, app, {
        info: __assign({
          browser: dist$1.types.webapp.browserType.Unknown
        }, app.info),
        services: __assign({
          UI: app.services && app.services.UI || WebUI_1.WebUI
        }, app.services),
        settings: app.settings || {},
        controllers: __assign({}, app.controllers),
        components: __assign({}, app.components)
      });

      _this = _super.call(this, t) || this;
      return _this;
    }

    WebApp.prototype.initApp = function () {
      if ((typeof document === "undefined" ? "undefined" : _typeof(document)) === "object") {
        // web app
        var w = window;
        var g = commonjsGlobal;
        var d = document;
        var bt = dist$1.types.webapp.browserType.Unknown;

        if (w && g && d) {
          if (g.InstallTrigger !== undefined) this.info.browser = dist$1.types.webapp.browserType.FireFox;else if (
          /*@cc_on!@*/
           !!d.documentMode) bt = dist$1.types.webapp.browserType.IE;else if (!!w.StyleMedia) bt = dist$1.types.webapp.browserType.Edge;else if (/constructor/i.test(w.HTMLElement) || function (p) {
            return p.toString() === "[object SafariRemoteNotification]";
          }(!w['safari'] || typeof g.safari !== 'undefined' && g.safari.pushNotification)) bt = dist$1.types.webapp.browserType.Safari;else if (!!w.chrome && (!!w.chrome.webstore || !!w.chrome.runtime)) bt = dist$1.types.webapp.browserType.Chrome;else if (Object.getOwnPropertyDescriptor(window, "opr") && Object.getOwnPropertyDescriptor(window, "addons") || Object.getOwnPropertyDescriptor(window, "opera") || navigator.userAgent.indexOf(' OPR/') >= 0) bt = dist$1.types.webapp.browserType.Opera;
          if ((bt === dist$1.types.webapp.browserType.Chrome || bt === dist$1.types.webapp.browserType.Opera) && !!w.CSS) bt = dist$1.types.webapp.browserType.Blink;
        }

        this.info.browser = bt;
        if (!this.settings.baseExecutionPath && document.head) this.settings.baseExecutionPath = document.head.baseURI;
      }

      return _super.prototype.initApp.call(this);
    };

    WebApp.prototype.run = function () {
      var _this = this;

      this.services.logger.log.call(this, dist$1.types.app.LogLevel.Trace, 'App.run');
      return new Promise(function (resolve, reject) {
        Promise.resolve(_this.initApp()).then(function () {
          var main = _this.services.navigation.resolve.apply(_this);

          _this.render(main).then(resolve, function (err) {
            _this.services.logger.log.call(_this, dist$1.types.app.LogLevel.Error, err.message, err.stack);

            reject(err);

            _this.render(["pre", {}, err.stack]);
          });
        }, function (e) {
          _this.services.logger.log.call(_this, dist$1.types.app.LogLevel.Error, e);

          reject(e);
        });
      });
    };

    WebApp.prototype.render = function (ui) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.services.logger.log.call(_this, dist$1.types.app.LogLevel.Trace, 'App.render', [{
          ui: ui
        }]);

        _this.services.processor.process(ui).then(function (value) {
          try {
            var target = null;

            if ((typeof document === "undefined" ? "undefined" : _typeof(document)) === "object") {
              // web app
              if (typeof _this.settings.target === "string") target = document.getElementById(_this.settings.target);else if (_this.settings.target && _this.settings.target.tagName === "IFRAME") {
                var fr = _this.settings.target;
                if (fr.contentDocument) target = !fr.contentDocument.body ? fr.contentDocument.createElement('BODY') : fr.contentDocument.body;
              } else if (!document.body) document.body = document.createElement('BODY');else target = document.body;

              if (target && target.tagName === "BODY") {
                var body_1 = target;
                var doc = body_1.ownerDocument ? body_1.ownerDocument : document.body;

                target = doc.getElementById("main") || function () {
                  var d = body_1.appendChild((body_1.ownerDocument ? body_1.ownerDocument : document.body).createElement("div"));

                  if (this.settings && this.settings.fullHeight) {
                    body_1.style.height = body_1.style.height || "100vh";
                    body_1.style.margin = body_1.style.margin || "0px";
                    d.style.height = "100vh";
                  }

                  return d;
                }.apply(_this);

                if (target && !target.id) target.setAttribute("id", "main");
              } else if (_this.settings.target !== null) throw new Error("Cannot locate target (" + (_this.settings.target ? 'not specified' : _this.settings.target) + ") in html document body.");

              if (_this.settings.title) document.title = _this.settings.title; //if (module && module.hot) module.hot.accept();

              if (target && target.hasChildNodes()) target.innerHTML = "";
            } //throw new Error("Document node undefined.  Are you running WebApp in the context of a browser?");


            resolve(_this.services.UI.render(value, target ? target : undefined));
          } catch (e) {
            reject(e);
          }
        }, function (r) {
          return reject(r);
        });
      });
    };

    return WebApp;
  }(dist$1.App);

  exports.WebApp = WebApp;
});
unwrapExports(WebApp_1);
var WebApp_2 = WebApp_1.WebApp;

var Parsers$1 = createCommonjsModule(function (module, exports) {

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
  exports.Parsers = __assign({}, dist$1.Services.Parsers, {
    /*".app": (transformer:types.app.ITransformer, context:types.app.ITransformContext, obj:any, offset:number) => {
        var obj2:{[key:string]:any} = {};
        var keys = Object.keys(obj);
        for (var key in keys) obj2[keys[key] == ".app" ? "main" : keys[key]] = obj[keys[key]];
        console.log(WebApp);
        return `${transformer.process({ ".new": {".import": "@appfibre/webapp#WebApp"}, "arguments": [obj2]}, context, true, true, offset)}`;
    }*/
    ".app": function app(transformer, context, obj, offset) {
      if (!context.references['WebApp']) context.references['WebApp'] = WebApp_1.WebApp;
      var obj2 = {};
      var keys = Object.keys(obj);

      for (var key in keys) {
        obj2[keys[key] == ".app" ? "main" : keys[key]] = obj[keys[key]];
      }

      return "" + transformer.process({
        ".new": "WebApp",
        "arguments": [obj2]
      }, context, true, true, offset);
    }
  });
});
unwrapExports(Parsers$1);
var Parsers_1$1 = Parsers$1.Parsers;

var Transformer_1$1 = createCommonjsModule(function (module, exports) {

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

  var Transformer =
  /** @class */
  function (_super) {
    __extends(Transformer, _super);

    function Transformer(settings) {
      var _this = this;

      if (settings && !settings.parsers) settings.parsers = Parsers$1.Parsers;
      _this = _super.call(this, settings || {
        module: dist.types.app.ModuleSystem.AMD,
        parsers: Parsers$1.Parsers
      }) || this;
      return _this;
    }

    return Transformer;
  }(dist$1.Services.Transformer);

  exports.Transformer = Transformer;
});
unwrapExports(Transformer_1$1);
var Transformer_2$1 = Transformer_1$1.Transformer;

var services$1 = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  dist$1.Services.Transformer = Transformer_1$1.Transformer;
  dist$1.Services.Parsers = Parsers$1.Parsers;
  exports["default"] = dist$1.Services;
});
unwrapExports(services$1);

var dist$2 = createCommonjsModule(function (module, exports) {

  var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : {
      "default": mod
    };
  };

  exports.__esModule = true;
  exports.App = dist$1.App;
  exports.WebApp = WebApp_1.WebApp; //import { HtmlUI } from './services/HtmlUI';

  var services_1 = __importDefault(services$1);

  exports.Services = services_1["default"];
});
unwrapExports(dist$2);
var dist_1$2 = dist$2.App;
var dist_2$1 = dist$2.WebApp;
var dist_3$1 = dist$2.Services;

//const externals = { "@appfibre/core": require('@appfibre/core'), "@appfibre/webapp": require('@appfibre/webapp'), "@appfibre/types": require('@appfibre/types')  };
//const externals = { "@appfibre/core": require('@appfibre/core'), "@appfibre/webapp": require('@appfibre/webapp'), "@appfibre/types": require('@appfibre/types')  };

if (!commonjsGlobal.Promise) commonjsGlobal.Promise = pinkie;

var _jst = new dist$2.Services.Transformer({
  module: 'amd'
});

var WebApp = dist$2.WebApp;
var systemJSPrototype = System.constructor.prototype; //const _jst = new externals["@appfibre/core"].Transformer({ module: 'amd'});

systemJSPrototype.jst = function (input, name) {
  return _jst.transform(input, name);
};

var instantiate = systemJSPrototype.instantiate;

systemJSPrototype.instantiate = function (url, parent) {
  if (url[0] === '@') {
    if (externals[url]) return [[], function (_export) {
      _export('default', externals[url]);

      var k = Object.keys(externals[url]);

      for (var i in k) {
        _export(k[i], externals[url][k[i]]);
      }

      return {
        execute: function execute() {}
      };
    }];else throw new Error("Requested component (".concat(url, ") not embedded into bundle or cdn not registered"));
  }

  if (url.slice(-5) === '.wasm'
  /*|| url.slice(-3) === '.js'*/
  ) return instantiate.call(this, url, parent);else if (url.slice(-4) === '.css') {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    document.head.appendChild(link);
    return [[], function () {
      return {
        "execute": undefined
      };
    }];
  }
  var loader = this;
  return fetch$1(url).then(function (response) {
    try {
      switch (response.contentType) {
        case "application/javascript":
          return {
            code: response.text
          };

        case "application/json":
          return systemJSPrototype.jst(response.text, url);

        default:
          return {
            code: "define(function() { return \'" + response.text.replace(/\'/g, "\\\'").replace(/\"/g, "\\\"") + "\';})"
          };
      }
    } catch (ex) {
      console.error('Error transforming ' + url + ': ' + ex.description || ex.message, ex.stack || '', [response.text]);
      throw ex;
    }
  }, function (reason) {
    throw new Error('Fetch error: ' + reason + (parent ? ' loading from  ' + parent : ''));
  }).then(function (source) {
    try {
      var keys = source.references ? Object.keys(source.references) : [];
      var values = source.references ? Object.values(source.references) : [];
      keys.push("".concat(source.code, ";\n//# sourceURL=' + ").concat(url));
      Function.apply({}, keys).apply({}, values); //Function('WebApp', `${source.code};\n//# sourceURL=' + ${url}`)(WebApp); 

      return loader.getRegister();
    } catch (ex) {
      console.error('Error evaluating ' + url + ': ' + ex.description || ex.message, ex.stack || '', [source]);
      throw ex;
    }
  }).catch(function (message) {
    console.error('Error instantiating ' + url + ': ' + message.description || message.message, message.stack || "");
    throw new Error(message);
  });
}; // Hookable transform function!

/*function transform (id, source, contentType) {
	switch (contentType) {

		default:
			return "return " + replace()
	}
	return (id.indexOf('.json')>-1 || id.indexOf('.jst')>-1) ? new externals['@appfibre/webapp'].Transformer({ module: 'amd'}).transform(source, id).code : source;
}*/


var resolve$1 = systemJSPrototype.resolve;

systemJSPrototype.resolve = function (id, parentUrl) {
  // This is required because the plugins for codemirror refers to ../../lib/codemirror which doesn't exist when executing from within SystemJS
  // The code corresponds with a code entry when loading the component System.Register('../../lib/codemirror', [@cdnjs/codemirror/codemirror.js]);
  if (this.registerRegistry[id]) {
    var r = this.registerRegistry[id];
    if (Array.isArray(r) && typeof r[0] === "string") return r[0];
  }

  if (id[0] === '@') return id;
  return resolve$1.call(this, id, parentUrl);
};

function fetch$1(url) {
  return new Promise(function (resolve, reject) {
    var rq = new XMLHttpRequest();
    rq.open('GET', url);
    rq.credentials = 'same-origin';

    rq.onload = function () {
      if (rq.status == 200) resolve({
        text: rq.responseText,
        contentType: (rq.getResponseHeader('content-type') || 'text/plain').split(';')[0].toLowerCase()
      });else reject(rq.status + ':' + rq.statusText);
    };

    rq.onerror = function () {
      reject(rq.status + ': ' + rq.statusText);
    };

    rq.send();
  });
}

var system = {};

module.exports = system;
//# sourceMappingURL=webapp-systemjs.cjs.js.map
