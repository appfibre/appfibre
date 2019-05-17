var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

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
/*
function test(e:element) {
  
}

test("Hello");
test(["div"]);
test(["div", {}, []]);
test(["div", {}, "Test"]);
test(["div", {}, ["Test"]]);// must fail
test(["div", {}, [["div"]]]);
test(["div", {}, [[function() {}, {}, []]]]);
*/
});

unwrapExports(types);
var types_1 = types.ModuleSystem;
var types_2 = types.LogLevel;

var BaseComponent_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var BaseComponent = function inject(app) {
    return /** @class */ (function (_super) {
        __extends(BaseComponent, _super);
        function BaseComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BaseComponent.prototype.renderInternal = function (e, index) {
            var _this = this;
            if (Array.isArray(e)) {
                //if (Promise.resolve(e[0]) === e[0]) debugger;
                if (typeof e[0] === "string" || typeof e[0] === "function" || Promise.resolve(e[0]) === e[0])
                    return app.services.processor.processElement(e, index);
                else {
                    return e.map(function (c, idx) { if (Array.isArray(c)) {
                        if (!c[1])
                            c[1] = {};
                        c[1]["key"] = c[1]["key"] || idx;
                    } return _this.renderInternal(c, idx); });
                }
            }
            //if (!e) debugger;
            return !e || typeof e === "string" ? e : app.services.processor.processElement(e, index);
        };
        BaseComponent.prototype.render = function (e) {
            return this.renderInternal(e || this.props.children);
        };
        return BaseComponent;
    }(app.services.UI.Component));
};
exports.BaseComponent = BaseComponent;
});

unwrapExports(BaseComponent_1);
var BaseComponent_2 = BaseComponent_1.BaseComponent;

var Async_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Async = function inject(app) {
    return /** @class */ (function (_super) {
        __extends(Async, _super);
        function Async(props) {
            var _this = _super.call(this, props) || this;
            _this.state = {};
            //(Array.isArray(this.props.children) ? Promise.all : Promise.resolve)(this.props.children).then(o => this.setState({value: o  }));
            if (Array.isArray(_this.props.children))
                Promise.all(_this.props.children).then(function (o) { return _this.setState({ value: o }); });
            else //if (Promise.resolve(this.props.children) === this.props.children)
                Promise.resolve(_this.props.children).then(function (o) { return _this.setState({ value: o }); });
            return _this;
        }
        Async.prototype.render = function () {
            return !!this.state.value ? _super.prototype.render.call(this, this.state.value) : null;
        };
        return Async;
    }(app.services.UI.Component));
};
exports.Async = Async;
});

unwrapExports(Async_1);
var Async_2 = Async_1.Async;

var Intercept_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Intercept = function inject(_a) {
    var Component = _a.Component;
    return /** @class */ (function (_super) {
        __extends(Intercept, _super);
        function Intercept() {
            var _this = _super.call(this) || this;
            _this.state = { focus: false, selected: false, editMode: null, canEdit: true };
            _this.onMessage = _this.onMessage.bind(_this);
            _this.click = _this.click.bind(_this);
            _this.mouseEnter = _this.mouseEnter.bind(_this);
            _this.mouseLeave = _this.mouseLeave.bind(_this);
            return _this;
        }
        Intercept.prototype.componentDidMount = function () {
            window.addEventListener("message", this.onMessage);
            window.onclick = function () { parent.postMessage({ eventType: "select", correlationId: Date.now().toString() }, location.href); };
        };
        Intercept.prototype.componentWillUnmount = function () {
            window.removeEventListener("message", this.onMessage);
        };
        Intercept.prototype.reconstruct = function (obj) {
            if (!obj[1])
                obj[1] = {};
            if (!obj[1].style)
                obj[1].style = {};
            if (!obj[1].style.border && !obj[1].style.padding && !obj[1].onMouseEnter && !obj[1].onMouseLeave) {
                obj[1].style.padding = this.state.focus || this.state.selected ? "1px" : "2px";
                if (this.state.editMode)
                    obj[1].style.background = "lightblue";
                if (this.state.selected)
                    obj[1].style.border = "1px solid black";
                else if (this.state.focus)
                    obj[1].style.border = "1px dashed grey";
                obj[1].onMouseEnter = this.mouseEnter;
                obj[1].onMouseLeave = this.mouseLeave;
                obj[1].onClick = this.click;
            }
            return obj;
        };
        Intercept.prototype.render = function () {
            //return super.render(Array.isArray(this.props.children) ? this.reconstruct(["div", {style: {display: "inline-block"}}, this.props.children])  : this.reconstruct(this.props.children));
            return _super.prototype.render.call(this, this.reconstruct(["div", { style: { display: "inline-block" }, key: 0 }, this.props.children]));
        };
        Intercept.prototype.mouseEnter = function () {
            //x.Designer.notify("x");
            this.setState({ "focus": true });
        };
        Intercept.prototype.mouseLeave = function () {
            //x.Designer.notify("y");
            this.setState({ "focus": false });
        };
        Intercept.prototype.click = function (ev) {
            ev.stopPropagation();
            //Designer.notify(this.props.file);
            var parent = window;
            while (parent.parent !== parent && window.parent != null)
                parent = parent.parent;
            var correlationId = Date.now().toString();
            parent.postMessage({ eventType: "select", editMode: this.state.editMode, canEdit: this.state.canEdit, correlationId: correlationId, control: { file: this.props.file, method: this.props.method } }, location.href);
            this.setState({ "selected": correlationId });
        };
        Intercept.prototype.onMessage = function (ev) {
            if (location.href.substr(0, ev.origin.length) == ev.origin && ev.type == "message" && ev.data) {
                if (this.state.selected == ev.data.correlationId)
                    switch (ev.data.eventType) {
                        case "deselect":
                            this.setState({ selected: false });
                            break;
                        case "edit":
                            this.setState({ editMode: ev.data.editMode });
                            break;
                    }
            }
        };
        return Intercept;
    }(Component));
};
exports.Intercept = Intercept;
});

unwrapExports(Intercept_1);
var Intercept_2 = Intercept_1.Intercept;

var components = createCommonjsModule(function (module, exports) {
exports.__esModule = true;

exports.BaseComponent = BaseComponent_1.BaseComponent;

exports.Async = Async_1.Async;

exports.Intercept = Intercept_1.Intercept;
});

unwrapExports(components);
var components_1 = components.BaseComponent;
var components_2 = components.Async;
var components_3 = components.Intercept;

var Data_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;

function clone(o) {
    if (Array.isArray(o))
        return o.map(function (o) { return clone(o); });
    else if (typeof o === "object") {
        var z = Object.create(o);
        Object.keys(o).forEach(function (k) { return z[k] = o[k]; });
        return z;
    }
    else
        return o;
}
var SM = function inject(app) {
    return /** @class */ (function (_super) {
        __extends(Bind, _super);
        function Bind(props) {
            var _this = _super.call(this) || this;
            _this.state = { data: clone(props.data) };
            var s = {};
            _this.visit.call(_this, props.childArray, s);
            _this.state.subscribers = s;
            _this.render = _this.render.bind(_this);
            return _this;
        }
        Bind.prototype.setValue = function (path, value) {
            this.state.subscribers[path].forEach(function (s) { if (s.value != value)
                s.value = value; });
            this.setState({ data: (new Function('data', 'path', 'value', 'data' + (path[0] === '[' ? '' : '.') + path + ' = value; return data;'))(this.state.data, path, value) });
        };
        Bind.prototype.getValue = function (path, obj) {
            return (new Function('data', 'path', 'return data' + (path[0] === '[' ? '' : '.') + path))(this.state.data, path);
        };
        Bind.prototype.subscribe = function (a, s) {
            var _this = this;
            var path = a["bind"];
            a.onChange = function (v) { return _this.setValue.call(_this, path, v.target.value); };
            a.value = this.getValue.call(this, path);
            if (s[path] === undefined)
                s[path] = [];
            s[path].push(a);
        };
        Bind.prototype.visit = function (obj, s) {
            var _this = this;
            if (Array.isArray(obj)) {
                obj.forEach(function (e) {
                    if (Array.isArray(e) && e[0] != "Data.bind") {
                        if (e[1] && typeof e[1] === "object" && e[1]["bind"])
                            _this.subscribe(e[1], s);
                        if (e[2] && Array.isArray(e[2]))
                            _this.visit(e[2], s);
                    }
                });
            }
        };
        Bind.prototype.render = function (e) {
            return _super.prototype.render.call(this, !!e ? e : this.props.childArray);
        };
        return Bind;
    }(components.BaseComponent(app)));
};
var Data = {
    bind: function transform(a, c) {
        return [SM, { data: a, childArray: c }];
        //return ["div", a, c];
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
var Events = /** @class */ (function () {
    function Events(app) {
        this.callbacks = {};
    }
    Events.prototype.subscribe = function (eventType, callback) {
        //console.log(callback);
        if (!this.callbacks[eventType.type])
            this.callbacks[eventType.type] = [];
        this.callbacks[eventType.type].push({ type: eventType, correlationId: eventType.correlationId, callback: callback });
    };
    Events.prototype.unsubscribe = function (eventType, callback) {
        //console.log(callback);
        var callbacks;
        if (callbacks = this.callbacks[eventType.type]) {
            for (var i = callbacks.length - 1; i >= 0; i--)
                if (callbacks[i].callback === callback)
                    callbacks.splice(i, 1);
        }
    };
    Events.prototype.publish = function (event) {
        var subscriptions = this.callbacks[event.type];
        var response = null;
        for (var s in subscriptions)
            if (subscriptions[s].correlationId === undefined || subscriptions[s].correlationId == event.correlationId) {
                if (subscriptions[s].callback)
                    response = subscriptions[s].callback(event);
            }
        return response;
    };
    return Events;
}());
exports.Events = Events;
});

unwrapExports(Events_1);
var Events_2 = Events_1.Events;

var loader = createCommonjsModule(function (module, exports) {
var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = commonjsGlobal;
exports.__esModule = true;
var basePath = '';
function nodeRequire(url) {
    return new Function('url', 'tmpdir', 'tmpdir = tmpdir ? tmpdir : global.process.env.INIT_CWD; var __dirname__ = global.process.cwd(); if (__dirname__ != tmpdir) global.process.chdir(tmpdir); var _exp = (global.require || global.process.mainModule.constructor._load)(url); if (global.process.cwd() != __dirname__) global.process.chdir(__dirname__); return _exp;')(url, basePath);
}
function run(source, url, basePath) {
    var m = { exports: {} };
    try {
        new Function('require', 'module', source + ";\n//# sourceURL=' + " + url)(nodeRequire, m);
    }
    catch (f) {
        console.log('Error running script from from source' + url || source);
        throw f;
    }
    return m.exports;
}
var Loader = {
    instantiate: function (url, parent) { return __awaiter(_this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url, { credentials: 'same-origin' })];
                case 1:
                    res = _a.sent();
                    if (!res.ok)
                        throw new Error('Fetch error: ' + res.status + ' ' + res.statusText + (parent ? ' loading from  ' + parent : ''));
                    return [2 /*return*/, res.text()];
            }
        });
    }); },
    "import": function (source, url) { return __awaiter(_this, void 0, void 0, function () {
        var output;
        return __generator(this, function (_a) {
            try {
                output = run(source, url, basePath);
                return [2 /*return*/, output];
            }
            catch (e) {
                console.log('Error executing script ' + url + ': ');
                throw (e);
            }
            return [2 /*return*/];
        });
    }); },
    init: function (basePath) { return void {}; }
};
exports["default"] = Loader;
});

unwrapExports(loader);

var loader$1 = createCommonjsModule(function (module, exports) {
var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = commonjsGlobal;
exports.__esModule = true;
var basepath;
function nodeRequire(url) {
    return new Function('url', 'tmpdir', 'tmpdir = tmpdir ? tmpdir : global.process.env.INIT_CWD; var __dirname__ = global.process.cwd(); if (__dirname__ != tmpdir) global.process.chdir(tmpdir); var _exp = (global.require || global.process.mainModule.constructor._load)(url); if (global.process.cwd() != __dirname__) global.process.chdir(__dirname__); return _exp;')(url, basepath || '');
}
function run(source, url) {
    var m = { exports: {} };
    try {
        new Function('require', 'module', source + ";\n//# sourceURL=' + " + url)(nodeRequire, m);
    }
    catch (f) {
        console.log('Error running script from source "' + (url || source) + '"', f);
        throw f;
    }
    return m.exports;
}
var Loader = {
    instantiate: function (url, parent) { return __awaiter(_this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url, { credentials: 'same-origin' })];
                case 1:
                    res = _a.sent();
                    if (!res.ok)
                        throw new Error('Fetch error: ' + res.status + ' ' + res.statusText + (parent ? ' loading from  ' + parent : ''));
                    return [2 /*return*/, res.text()];
            }
        });
    }); },
    "import": function (source, url) { return __awaiter(_this, void 0, void 0, function () {
        var output;
        return __generator(this, function (_a) {
            try {
                output = run(source, url);
                return [2 /*return*/, output];
            }
            catch (e) {
                console.log('Error executing script "' + url + '": ' + e);
                throw (e);
            }
            return [2 /*return*/];
        });
    }); },
    init: function (basePath) {
        basepath = basePath;
    }
};
exports["default"] = Loader;
});

unwrapExports(loader$1);

var Loader_1 = createCommonjsModule(function (module, exports) {
exports.__esModule = true;
var Loader = /** @class */ (function () {
    function Loader(basePath) {
        try {
            //nodeJS does not regocnise "window"
            if (window) {
                var systemjs = Object.getOwnPropertyDescriptor(window, "System");
                if (systemjs)
                    this.proxy = { "import": systemjs.value["import"].bind(systemjs.value), instantiate: systemjs.value.instantiate.bind(systemjs.value), init: function (basePath) { return void {}; } };
                else
                    this.proxy = loader["default"];
            }
        }
        catch (_a) {
        }
        if (this['proxy'] == null)
            this.proxy = loader$1["default"];
        this.proxy.init(basePath);
    }
    Loader.prototype["import"] = function (moduleName, normalizedParentName) {
        return this.proxy["import"](moduleName, normalizedParentName);
    };
    Loader.prototype.instantiate = function (url, parent) {
        return this.proxy.instantiate(url, parent);
    };
    Loader.prototype.init = function (basePath) {
    };
    return Loader;
}());
exports.Loader = Loader;
});

unwrapExports(Loader_1);
var Loader_2 = Loader_1.Loader;

var Processor_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;


function s_xa(a, b) { return Object.prototype.hasOwnProperty.call(a, b); }
function clone(a, b) { for (var c = 1; c < arguments.length; c++) {
    var d = arguments[c];
    if (d)
        for (var e in d)
            s_xa(d, e) && (a[e] = d[e]);
} return a; }
function Inject(app, Proxy) {
    var inj = clone(app);
    inj.services.UI.Component = Proxy || components.BaseComponent(app) /*app.services.UI.Component*/;
    /*let { title, designer, ui, target, ...inject } = app;
    return { Component
        , Context
        , Loader
        , components : app.components
        , ...inject
    };*/
    return inj;
}
var Processor = /** @class */ (function () {
    function Processor(app) {
        this.cache = Object();
        this.type = "Processor";
        this.app = app;
    }
    Processor.prototype.Async = function () {
        this.async = this.async || components.Async(this.app);
        return this.async;
    };
    Processor.prototype.createClass = function (B, d) {
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var _this = this;
                var b = _this = _super.call(this, arguments) || this;
                var i = typeof d === "function" ? d.call(b, b) : d;
                if (b !== undefined)
                    for (var p in b.__proto__)
                        if (!i[p])
                            i[p] = b[p];
                if (i["constructor"])
                    i.constructor.apply(i, arguments);
                return i;
            }
            return class_1;
        }(B));
    };
    Processor.prototype.locate = function (resource, path) {
        var parts = path.split('.');
        var jst = false;
        var obj = resource;
        for (var part = 0; part < parts.length; part++)
            if (obj[parts[part]] !== undefined) {
                if (part == path.length - 1)
                    jst = obj.__jst;
                obj = obj[path[part]];
            }
            else
                obj = null;
        return obj;
    };
    Processor.prototype.getFunctionName = function (obj) {
        if (obj.name)
            return obj.name;
        var name = obj.toString();
        if (name.indexOf('(') > -1)
            name = name.substr(0, name.indexOf('('));
        if (name.indexOf('function') > -1)
            name = name.substr(name.indexOf('function') + 'function'.length);
        return name.trim();
    };
    Processor.prototype.parse = function (obj, level, path, index) {
        this.app.services.logger.log.call(this, types.LogLevel.Trace, 'Processor.parse', obj);
        var processor = this;
        return new Promise(function (r, f) {
            if (Array.isArray(obj)) {
                if (typeof obj[0] === "string") {
                    obj[0] = processor.resolve(obj[0]);
                }
                if (typeof obj[0] === "function" && processor.getFunctionName(obj[0]) === "transform")
                    processor.parse(obj[0].apply(processor.app, obj.slice(1)), level, path + '[0]()', index).then(r, f);
                else
                    Promise.all(obj.map(function (v, i) { return processor.parse(v, level + 1, path + '[' + i + ']', i); })).then(function (o) { try {
                        r(processor.app.services.UI.processElement(o, level, index));
                    }
                    catch (e) {
                        processor.app.services.logger.log(types.LogLevel.Error, 'Processor.parse: ' + e.stack, [o]);
                        f(e);
                    } }, f);
            }
            else if (typeof obj === "function" && processor.getFunctionName(obj) === "inject")
                Promise.resolve((obj)(Inject(processor.app))).then(function (o) { return processor.parse(o, level, path, index).then(r, f); }, f);
            else if (typeof obj === "function" && processor.getFunctionName(obj) === "Component")
                try {
                    r(processor.createClass(components.BaseComponent(processor.app), obj));
                }
                catch (e) {
                    processor.app.services.logger.log(types.LogLevel.Error, 'Processor.parse: ' + e.stack, obj);
                    f(e);
                }
            else if (Promise.resolve(obj) === obj) {
                Promise.resolve(obj).then(function (o) { return processor.parse(o, level, path, index).then(function (o2) { return r(o2); }, f); }, f);
            }
            else if (obj) {
                try {
                    r(processor.app.services.UI.processElement(obj, level, index));
                }
                catch (e) {
                    processor.app.services.logger.log(types.LogLevel.Error, 'Processor.parse: ' + e.stack, obj);
                    f(e);
                }
            }
            else
                r(obj);
        });
    };
    Processor.prototype.resolve = function (fullpath) {
        var _this = this;
        this.app.services.logger.log.call(this, types.LogLevel.Trace, 'Processor.resolve', [fullpath]);
        if (this.cache[fullpath])
            return this.cache[fullpath];
        if (fullpath.substring(0, 1) == "~") {
            var parts = fullpath.substring(1, fullpath.length).split('#');
            var obj = this.app.services.moduleSystem.instantiate(parts[0], this);
            if (parts.length == 1)
                return obj;
            return obj.then(function (x) { return _this.locate(x, parts.slice(1, parts.length).join(".")); });
        }
        else {
            var path = fullpath ? fullpath.split('.') : [''];
            var obj_1 = this.app.components || Object;
            var jst = false;
            var prop = "default";
            for (var part = 0; part < path.length; part++) {
                if (typeof obj_1 === "function" && this.getFunctionName(obj_1) === "inject")
                    obj_1 = obj_1(Inject(this.app, components.BaseComponent(this.app)));
                if (obj_1[path[part]] !== undefined) {
                    if (part == path.length - 1)
                        jst = obj_1.__jst;
                    obj_1 = obj_1[path[part]];
                    if (typeof obj_1 === "function" && this.getFunctionName(obj_1) == "inject")
                        obj_1 = obj_1(Inject(this.app, components.BaseComponent(this.app)));
                }
                else if (path.length == 1 && path[0].length > 0 && path[0].toLowerCase() == path[0])
                    obj_1 = path[part];
                else {
                    if (fullpath === "Exception")
                        return function transform(obj) { return ["pre", { "style": { "color": "red" } }, obj[1].stack ? obj[1].stack : obj[1]]; };
                    else {
                        this.app.services.logger.log.call(this, types.LogLevel.Error, 'Unable to resolve "App.components.' + (fullpath || 'undefined') + "'");
                        return /** @class */ (function (_super) {
                            __extends(class_2, _super);
                            function class_2() {
                                return _super !== null && _super.apply(this, arguments) || this;
                            }
                            class_2.prototype.render = function () { return _super.prototype.render ? _super.prototype.render.call(this, ["span", { "style": { "color": "red" } }, (fullpath || 'undefined') + " not found!"]) : (fullpath || 'undefined') + " not found!"; };
                            return class_2;
                        }(this.app.services.UI.Component));
                    }
                }
            }
            if (obj_1["default"]) {
                if (obj_1.__jst)
                    jst = obj_1.__jst;
                obj_1 = obj_1["default"];
            }
            else if (jst)
                prop = path[path.length - 1];
            //if (typeof obj == "function" && this.getFunctionName(obj) === "inject")
            //    obj = obj(Inject(this.app, jst ? class Component extends this.app.services.UI.Component { render(obj:any):any { return this.parse(!this.app.disableIntercept && window.parent !== null && window !== window.parent ? [Intercept, {"file": jst, "method": prop}, this.construct(this.app.UI.Component)] : obj); }} : this.construct(this.app.services.UI.Component)));
            //return this.cache[fullpath] = Array.isArray(obj) ? class Wrapper extends this.app.services.UI.Component { shouldComponentUpdate() { return true; } render() {if (!obj[1]) obj[1] = {}; if   (!obj[1].key) obj[1].key = 0; return this.parse(jst && !this.app.disableIntercept && window.parent !== null && window !== window.parent ? [Intercept, {"file": jst, "method": prop}, [obj]] : obj); }} : obj;
            return this.cache[fullpath] = obj_1;
        }
    };
    Processor.prototype.processElement = function (obj, index) {
        var _this = this;
        if (Array.isArray(obj)) {
            if (typeof obj[0] === "string") {
                obj[0] = this.resolve(obj[0]);
            }
            if (typeof obj[0] === "function") {
                var name = this.getFunctionName(obj[0]);
                switch (name) {
                    case "transform":
                        var key = index;
                        if (obj[1] && obj[1].key)
                            key = obj[1].key;
                        return this.processElement(obj[0].apply(this.app, obj.slice(1)), key);
                    case "inject":
                        obj[0] = (obj[0])(Inject(this.app));
                        return this.processElement(obj);
                    case "Component":
                        obj[0] = this.createClass(components.BaseComponent(this.app), obj[0]);
                        return this.processElement(obj);
                }
            }
        }
        if (Array.isArray(obj) && obj.some(function (c) { return Promise.resolve(c) === c; }))
            return this.app.services.UI.processElement([this.Async(), { id: Date.now() }, obj], 0, obj && obj[1] && obj[1].key !== undefined ? obj[1].key : index);
        else if (typeof obj === "string" || !obj)
            return obj;
        //else if (obj.then)  
        //    Promise.all( [ obj ]).then(o => processor.parse(o[0], level, path, index).then((o2:any) => r(o2), f), f);
        if (Promise.resolve(obj) === obj)
            obj = [this.Async(), { index: index }, obj];
        if (Array.isArray(obj))
            return this.app.services.UI.processElement([obj[0], obj[1], Array.isArray(obj[2]) ? obj[2].map(function (c, idx) { return Array.isArray(c) ? _this.processElement(c, idx) : c; }) : obj[2]], 0, index);
        else
            return obj;
    };
    Processor.prototype.process = function (obj) {
        var _this = this;
        this.app.services.logger.log.call(this, types.LogLevel.Trace, 'Processor.process', obj);
        function visit(obj) {
            if (Array.isArray(obj)) {
                for (var i in obj)
                    if (visit(obj[i]))
                        return true;
            }
            else if (typeof obj === "object" && obj != null) {
                var keys = Object.keys(obj);
                for (var i in keys)
                    if (keys[i].substr(0, 1) == ".")
                        return true;
                    else if (visit(obj[keys[i]]))
                        return true;
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
                        }
                        catch (e) {
                            reject(e);
                        }
                    }, function (rs) { return reject(rs); });
                }
                else
                    _this.parse(obj, 0, '').then(resolve, reject);
            }
            catch (e) {
                reject(e);
            }
        });
    };
    return Processor;
}());
exports.Processor = Processor;
});

unwrapExports(Processor_1);
var Processor_2 = Processor_1.Processor;

var Navigation_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;


function parse(url) {
    var qs = /(?:\?)([^#]*)(?:#.*)?$/.exec(url);
    var params = {};
    var index = 0;
    if (qs)
        qs[1].split('&').forEach(function (p) {
            var v = p.split('=');
            params[v.length === 2 ? v[0] : index++] = v[v.length - 1];
        });
    return {
        path: qs && qs[1] ? qs[1] : ''
    };
}
function clone(o) {
    if (Array.isArray(o))
        return o.map(function (o) { return clone(o); });
    else if (typeof o === "object") {
        var z = Object.create(o);
        Object.keys(o).forEach(function (k) { return z[k] = o[k]; });
        return z;
    }
    else
        return o;
}
var Navigation = {
    current: parse(typeof location === "object" ? location.href : ''),
    resolve: function transform(container) {
        var url = typeof location === "undefined" ? '' : location.href;
        if (this.controllers && Object.keys(this.controllers).length === 0)
            return this.main;
        for (var c in this.controllers)
            if ((this.controllers[c].container ? this.controllers[c].container : '') == (container || '')) {
                var match = this.controllers[c].match ? this.controllers[c].match.test(url) : true;
                this.services.logger.log(types.LogLevel.Trace, "Route \"" + url + "\" " + (match ? 'matched' : 'did not match') + " controller \"" + c + "\"");
                if (match) {
                    var qs = /(?:\?)([^#]*)(?:#.*)?$/.exec(url);
                    var params = {};
                    var index = 0;
                    if (qs)
                        qs[1].split('&').forEach(function (p) {
                            var v = p.split('=');
                            params[v.length === 2 ? v[0] : index++] = v[v.length - 1];
                        });
                    return this.controllers[c].resolve.call(this, params);
                }
            }
            else
                this.services.logger.log(types.LogLevel.Trace, "Container " + (container || '(blank)') + " does not match controller " + c + "'s container " + (this.controllers[c].container || '(blank)'));
        return ["Error", {}, "Could not locate controller matching " + url];
    },
    a: function inject(app) {
        return /** @class */ (function (_super) {
            __extends(a, _super);
            function a() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            a.prototype.click = function () {
                app.services.navigation.current = parse(this.props.href);
                if (history && history.pushState)
                    history.pushState(null, '', this.props.href);
                else
                    location.replace(this.props.href);
                app.services.events.publish({ type: "Navigation.Redirect", correlationId: this.props.container, data: this.props.href });
                if (event)
                    event.preventDefault();
            };
            a.prototype.render = function () {
                return app.services.UI.processElement(["a", __assign({}, this.props, { onClick: this.click.bind(this) }), this.props.children], 0, undefined);
            };
            return a;
        }(app.services.UI.Component));
    },
    Container: function transform(a, c) {
        var app = this;
        return [/** @class */ (function (_super) {
                __extends(Container, _super);
                function Container(props) {
                    var _this = _super.call(this) || this;
                    _this.state = { a: props.a, c: props.c };
                    _this.onRedirect = _this.onRedirect.bind(_this);
                    return _this;
                }
                Container.prototype.onRedirect = function (event) {
                    var e = clone(this.props.c);
                    if (Array.isArray(e))
                        e.forEach(function (c, i) { if (Array.isArray(c))
                            c[1].key = Date.now() + i; });
                    this.setState({ c: e });
                };
                Container.prototype.componentWillMount = function () {
                    app.services.events.subscribe({ type: "Navigation.Redirect" }, this.onRedirect);
                };
                Container.prototype.componentWillUnmount = function () {
                    app.services.events.unsubscribe({ type: "Navigation.Redirect" }, this.onRedirect);
                };
                Container.prototype.render = function () {
                    return _super.prototype.render.call(this, this.state.c);
                };
                return Container;
            }(components.BaseComponent(app))), { a: a, c: c }];
    }
};
exports.Navigation = Navigation;
});

unwrapExports(Navigation_1);
var Navigation_2 = Navigation_1.Navigation;

var Transformer_1 = createCommonjsModule(function (module, exports) {
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;

var Transformer = /** @class */ (function () {
    function Transformer(settings) {
        var _this = this;
        this.reservedWords = ['function', 'for', 'var', 'this', 'self', 'null'];
        this.type = "Transformer";
        this.settings = settings ? __assign({}, settings, { indent: settings.indent || '\t', compact: settings.compact || false, module: settings.module || types.ModuleSystem.None, namedExports: settings.namedExports === undefined ? true : settings.namedExports }) : { module: types.ModuleSystem.ES };
        this.settings.parsers = this.settings.parsers || {};
        this.settings.parsers[".require"] = this.settings.parsers[".import"] = function (obj, parseSettings, offset) { return _this.loadModule(_this.process(obj[".import"] || obj[".require"], false, false, parseSettings, offset), parseSettings, offset); };
        this.settings.parsers[".function"] = function (obj, parseSettings, offset) { return "function " + (obj[".function"] ? obj[".function"] : "") + "(" + (obj["arguments"] ? _this.process(obj["arguments"], false, true, parseSettings, offset) : "") + "){ return " + _this.process(obj["return"], true, false, parseSettings, offset) + " }"; };
        this.settings.parsers[".map"] = function (obj, parseSettings, offset) { return _this.process(obj[".map"], false, false, parseSettings, offset) + ".map(function(" + obj["arguments"] + ") {return " + (settings && settings.indent ? new Array(offset).join(' ') : "") + _this.process(obj["return"], true, false, parseSettings, offset) + " })"; };
        this.settings.parsers[".filter"] = function (obj, parseSettings, offset) { return _this.process(obj[".filter"], false, false, parseSettings, offset) + ".filter(function(" + obj["arguments"] + ") {return " + _this.process(obj["condition"], true, false, parseSettings, offset) + " })"; };
        this.settings.parsers[".call"] = function (obj, parseSettings, offset) { return _this.process(obj[".call"], false, false, parseSettings, offset) + ".call(" + (obj["arguments"] ? _this.process(obj["arguments"], false, true, parseSettings, offset) : "") + ")"; };
        this.settings.parsers[".exec"] = function (obj, parseSettings, offset) { return _this.process(obj[".exec"], true, false, parseSettings, offset) + "(" + (obj["arguments"] ? _this.process(obj["arguments"], true, true, parseSettings, offset) : "") + ")"; };
        this.settings.parsers[".new"] = function (obj, parseSettings, offset) { return "new " + _this.process(obj[".new"], true, false, parseSettings, offset) + "(" + (obj["arguments"] ? _this.process(obj["arguments"], true, true, parseSettings, offset) : "") + ")"; };
        this.settings.parsers[".id"] = this.settings.parsers[".code"] = function (obj, parseSettings, offset) { return obj[".code"] || obj[".id"]; };
        this.settings.parsers[".app"] = function (obj, parseSettings, offset) {
            var obj2 = {};
            var keys = Object.keys(obj);
            for (var key in keys)
                obj2[keys[key] == ".app" ? "main" : keys[key]] = obj[keys[key]];
            return _this.process({ ".new": { ".require": "@appfibre/jst#App" }, "arguments": [obj2] }, true, true, parseSettings, offset) + ".run()";
        };
        this.settings.parsers["."] = function (obj, parseSettings, offset) { return obj["."]; };
    }
    Transformer.prototype.loadModule = function (val, parseSettings, offset) {
        var m = val.indexOf('#') > 0 ? val.substr(0, val.indexOf('#')) : val;
        if (val[0] === "~") {
            return "" + this.process({ ".function": null, arguments: "loader", "return": { ".code": "loader.load('" + (m[1] === "/" ? '.' : '') + m.substr(1) + "')" + (val.length > m.length ? val.substring(m.length).replace('#', '.') : '') + ";" } }, false, false, parseSettings, offset);
        }
        if (this.settings.module.toLowerCase() === types.ModuleSystem.ES.toLowerCase())
            m = val.indexOf('#', m.length + 2) > -1 ? val.substr(0, val.indexOf('#', m.length + 2) - 1) : val;
        if (parseSettings.imports.indexOf(m) === -1)
            parseSettings.imports.push(m);
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
        if (obj === null)
            output = "null";
        else if (Array.isArray(obj))
            output = (et ? "" : "[") + this.format(obj.map(function (e, i) { return _this.process(e, esc, false, parseSettings, offset + 1); }), parseSettings, offset) + (et ? "" : "]");
        else if (typeof obj === "object") {
            var keys = Object.keys(obj);
            var processed = false;
            for (var k in keys)
                if (!processed && keys[k].length > 0 && keys[k].charAt(0) == '.') {
                    if (this.settings.parsers && this.settings.parsers[keys[k]]) {
                        processed = true;
                        output = this.settings.parsers[keys[k]](obj, parseSettings, offset) || '';
                    }
                    else
                        throw new Error("Could not locate parser " + keys[k].substr(1));
                }
            if (!processed)
                output = (et ? "" : "{") + this.format(keys.filter(function (k) { return k.length < 2 || k.substr(0, 2) != '..'; }).map(function (k, i) { return (_this.reservedWords.indexOf(k) > -1 || /[^a-z0-9]/i.test(k) ? "\"" + k + "\"" : k) + ":" + (_this.settings.compact ? '' : ' ') + _this.process(obj[k], esc, false, parseSettings, offset + 1); }), parseSettings, offset) + (et ? "" : "}");
        }
        else if (typeof obj === "function") // object not JSON...
            output = obj.toString();
        else
            output = typeof obj === "string" && esc ? JSON.stringify(obj) : obj;
        return output;
    };
    Transformer.prototype.processExports = function (output, obj) {
        var _this = this;
        var keys = Object.keys(obj);
        var validkeys = keys.filter(function (k) { return k.indexOf(' ') === -1 && k.indexOf('/') === -1 && k.indexOf('-') === -1 && _this.reservedWords.indexOf(k) === -1; });
        var isDefault = keys.length === 1 && keys[0] === 'default';
        var nl = this.settings.compact ? '' : '\n';
        var sp = this.settings.compact ? '' : ' ';
        var vr = this.settings.preferConst ? 'const' : 'var';
        switch (this.settings.module.toLowerCase()) {
            case "umd":
            case "commonjs":
            case "cjs":
                //for (var req in r) output.code += `${vr} _${r[req]}${sp}=${sp}require('${req}');${nl}`;
                output.code += keys.map(function (key) { return "module.exports['" + key + "']" + sp + "=" + sp + _this.process(obj[key], true, false, output, 0) + ";"; }).join(nl);
                if (!isDefault)
                    output.code += nl + "module.exports['default']" + sp + "=" + sp + "{" + sp + keys.map(function (key) { return key + ": " + _this.process(obj[key], true, false, output, 0); }).join(nl) + " };";
                if (output.name)
                    output.code += nl + "module.exports['__jst'] = '" + name + ";";
                break;
            case "es":
                if (isDefault)
                    output.code += "export default" + sp + this.process(obj["default"], true, false, output, 0) + ";";
                else {
                    output.code += "export default" + sp + "{" + this.format(keys.map(function (key) { return validkeys.indexOf(key) === -1 ? "\"" + key + "\": " + _this.process(obj[key], true, false, output, 0) : key + ":" + sp + (_this.settings.namedExports ? key : _this.process(obj[key], true, false, output, 2)); }), output, 1) + "};";
                    if (this.settings.namedExports && validkeys.length > 0)
                        output.code = validkeys.map(function (key) { return "export " + vr + " " + key + sp + "=" + sp + _this.process(obj[key], true, false, output, 1) + ";"; }).join(nl) + ("" + (nl + output.code + nl));
                }
                break;
            default:
                if (output.name)
                    output.code += "return " + (isDefault ? "{'default' : " + this.process(obj["default"], true, false, output, 1) + ", \"__jst\": \"" + output.name + "\"}" : "{" + this.format(keys.map(function (key) { return validkeys.indexOf(key) === -1 ? "\"" + key + "\": " + _this.process(obj[key], true, false, output, 1) : key + ":" + sp + _this.process(obj[key], true, false, output, 2); }), output, 1) + ", \"__jst\": \"" + output.name + "\"}") + (output.name.indexOf('#') > -1 ? output.name.slice(output.name.indexOf('#') + 1).split('#').map(function (p) { return "['" + p + "']"; }) : '') + ";";
                else
                    output.code += "return " + (isDefault ? this.process(obj["default"], true, false, output, 1) : "{" + this.format(keys.map(function (key) { return validkeys.indexOf(key) === -1 ? "\"" + key + "\": " + _this.process(obj[key], true, false, output, 1) : key + ":" + sp + _this.process(obj[key], true, false, output, 2); }), output, 1) + "}") + ";";
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
        if (output.imports.length > 0)
            for (var i = 0; i < output.imports.length; i++) {
                var ext = output.imports[i][0] === "~";
                if (output.imports[i].indexOf('#') > -1) {
                    var module_name = output.imports[i].substr(0, output.imports[i].indexOf('#'));
                    if ((ext ? s2 : s)[module_name] === undefined)
                        (ext ? s2 : s)[module_name] = {};
                    (ext ? s2 : s)[module_name][output.imports[i].substr(module_name.length + 1)] = i;
                }
                else
                    (ext ? r2 : r)[output.imports[i]] = i;
            }
        switch (this.settings.module.toLowerCase()) {
            case "umd":
            case "commonjs":
            case "cjs":
                for (var req in r)
                    output.code = vr + " _" + r[req] + sp + "=" + sp + "require(\"" + req + "\");" + nl + output.code;
                break;
            case "amd":
                output.code = "define(" + (Object.keys(r).length > 0 ? "[" + Object.keys(r).map(function (key) { return "'" + key + "'"; }).join(", ") + "], " : '') + "function (" + Object.keys(r).map(function (key) { return '_' + r[key]; }).join(", ") + ") { " + output.code + " });" + nl;
                break;
            case "es":
                output.code = Object.keys(s).map(function (key) { return "import {" + Object.keys(s[key]).map(function (k) { return k + " as _" + s[key][k]; }).join(',' + sp) + "} from '" + key + "';" + nl; }).join('') + Object.keys(r).map(function (key) { return "import * as _" + r[key] + " from '" + key.substr(key[0] == "~" ? 1 : 0) + "';" + nl; }).join('') + output.code;
                break;
            default:
                for (var req in r)
                    output.code = vr + " _" + r[req] + sp + "=" + sp + "require(\"" + req + "\");" + nl + output.code;
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
                    for (var req in r2)
                        output.code = vr + " _" + r2[req] + sp + "=" + sp + "require(\"" + req + "\");" + nl + output.code;
                    break;
                case "amd":
                    output.code = "define(" + (Object.keys(r2).length > 0 ? "[" + Object.keys(r).map(function (key) { return "'" + key + "'"; }).join(", ") + "], " : '') + "function (" + Object.keys(r2).map(function (key) { return '_' + r2[key]; }).join(", ") + ") { " + output.code + " });" + nl;
                    break;
                case "es":
                    output.code = Object.keys(s2).map(function (key) { return "import {" + Object.keys(s2[key]).map(function (k) { return k.substr(1) + " as _" + s[key][k]; }).join(',' + sp) + "} from '" + key.substr(1) + "';" + nl; }).join('') + Object.keys(r2).map(function (key) { return "import * as _" + r2[key] + " from '" + key.substr(1) + "';" + nl; }).join('') + output.code;
                    break;
                default:
                    for (var req in r2)
                        output.code = vr + " _" + r2[req] + sp + "=" + sp + "require(\"" + req + "\");" + nl + output.code;
            }
        }
    };
    Transformer.prototype.bundleModule = function (obj, name) {
        var output = { name: name, imports: [], exports: {}, compositeObject: false, code: '' };
        this.processExports(output, obj);
        this.processImports(output, name || '');
        return output;
    };
    Transformer.prototype.transform = function (input, name) {
        var obj;
        try {
            obj = typeof input === "string" ? JSON.parse(input) : input;
        }
        catch (e) {
            //console.log(JSON.stringify(this.settings));
            if (this.settings.dangerouslyProcessJavaScript || this.settings.dangerouslyProcessJavaScript === undefined) {
                try {
                    obj = Function("return (" + input + ");")();
                    if (this.settings.dangerouslyProcessJavaScript === undefined)
                        console.warn("Warning: " + (name || '') + " is not JSON compliant: " + e.message + ".  Set option \"dangerouslyProcessJavaScript\" to true to hide this message.\r\n" + input);
                }
                catch (f) {
                    throw new Error("Unable to process " + (name || '') + " as JavaScript: " + f.message);
                }
            }
            else
                throw new Error("Unable to parse JSON file " + (name || '') + ": " + e.message);
        }
        try {
            return this.bundleModule(Array.isArray(obj) || typeof (obj || '') !== 'object' || Object.keys(obj).filter(function (k) { return k[0] == '.'; }).length > 0 ? { "default": obj } : obj, name);
        }
        catch (e) {
            throw new Error("Unable to transform js template: " + e.message + "\r\n" + e.stack);
        }
    };
    return Transformer;
}());
exports.Transformer = Transformer;
});

unwrapExports(Transformer_1);
var Transformer_2 = Transformer_1.Transformer;

var WebUI_1 = createCommonjsModule(function (module, exports) {
exports.__esModule = true;

var WebUI = /** @class */ (function () {
    function WebUI(app) {
        this.type = "UI";
        this.app = app;
        this.app.options = this.app.options || {};
        try {
            if (window) {
                var obj = (Object.getOwnPropertyDescriptor(window, "preact") || Object.getOwnPropertyDescriptor(window, "React"));
                if (obj) {
                    this.processElementInternal = obj.value.h || obj.value.createElement;
                    this.Component = obj.value.Component;
                    this.renderInternal = obj.value.render || (Object.getOwnPropertyDescriptor(window, "ReactDOM") || { value: null }).value.render;
                }
            }
        }
        catch (_a) {
            debugger;
            //TODO: find a workaround. in NodeJS ReferenceError: window is not defined
        }
    }
    WebUI.prototype.render = function (ui, parent, mergeWith) {
        if (this.renderInternal) {
            this.app.services.logger.log.call(this, types.LogLevel.Trace, "WebUI.render", [ui]);
            return this.renderInternal(ui, parent, mergeWith);
        }
        else
            this.app.services.logger.log.call(this, types.LogLevel.Error, "Unable to render UI - No UI framework detected. \nEnsure that you have referenced a UI framework before executing the application, or specify using app.services.UI");
    };
    // ether an element, or array of elements depending on depth == even or odd
    WebUI.prototype.processElement = function (element, depth, index) {
        if (depth % 2 === 0) {
            if (typeof element != "string" && !Array.isArray(element)) {
                debugger;
                this.app.services.logger.log.call(this, types.LogLevel.Error, "Child element [2] should be either a string or array", [{ element: element }]);
                //throw new Error("Child element [2] should be either a string or array");
                return element;
            }
            else if (index !== undefined && Array.isArray(element)) {
                element[1] = element[1] || {};
                if (!element[1].key)
                    element[1].key = index;
            }
        }
        //console.log({element, index, depth, code: JSON.stringify(element)});
        return depth % 2 === 1 || !this.processElementInternal || !Array.isArray(element) ? element : this.processElementInternal.apply(this, element);
    };
    return WebUI;
}());
exports.WebUI = WebUI;
});

unwrapExports(WebUI_1);
var WebUI_2 = WebUI_1.WebUI;

var services = createCommonjsModule(function (module, exports) {
exports.__esModule = true;

exports.Data = Data_1.Data;

exports.Events = Events_1.Events;

exports.Loader = Loader_1.Loader;

exports.Processor = Processor_1.Processor;

exports.Navigation = Navigation_1.Navigation;

exports.Transformer = Transformer_1.Transformer;

exports.WebUI = WebUI_1.WebUI;
});

unwrapExports(services);
var services_1 = services.Data;
var services_2 = services.Events;
var services_3 = services.Loader;
var services_4 = services.Processor;
var services_5 = services.Navigation;
var services_6 = services.Transformer;
var services_7 = services.WebUI;

var app = createCommonjsModule(function (module, exports) {
exports.__esModule = true;

//import { Intercept } from "./intercept";

var App = /** @class */ (function () {
    function App(app) {
        if (app === void 0) { app = { main: [] }; }
        var _this = this;
        try {
            Object.keys(app).forEach(function (k) { var d = Object.getOwnPropertyDescriptor(app, k); if (d)
                Object.defineProperty(_this, k, d); });
            this.main = app.main;
            this.options = app.options || {};
            this.options.logLevel = this.options.logLevel || types.LogLevel.Error;
            var logger_1 = app.services && app.services.logger ? (typeof app.services.logger === "object" ? app.services.logger : new app.services.logger(this)) : null;
            var s = app.services || {};
            s.logger = { log: function (logLevel, title, optionalParameters) {
                    if (logLevel <= (_this && _this.options && _this.options.logLevel ? (types.LogLevel[_this.options.logLevel] || 2) : 2))
                        logger_1 ? logger_1.log.bind(_this, logLevel, title, optionalParameters) : [function (title, optionalParameters) { }, console.error, console.error, console.warn, console.info, console.info][logLevel](title + '\r\n', optionalParameters || [_this]);
                } };
            s.transformer = s.transformer ? (typeof s.transformer === "object" ? s.transformer : new s.transformer(this)) : new services.Transformer({ module: types.ModuleSystem.None });
            s.moduleSystem = s.moduleSystem ? (typeof s.moduleSystem === "object" ? s.moduleSystem : new s.moduleSystem(this)) : new services.Loader(this.options.basePath);
            s.navigation = s.navigation ? (typeof s.navigation === "object" ? s.navigation : new s.navigation(this)) : services.Navigation;
            s.data = s.data ? (typeof s.data === "object" ? s.data : new s.data(this)) : services.Data;
            s.UI = s.UI ? (typeof s.UI === "object" ? s.UI : new s.UI(this)) : new services.WebUI(this);
            this.services = { moduleSystem: s.moduleSystem, processor: new services.Processor(this), transformer: s.transformer, logger: s.logger, UI: s.UI, navigation: s.navigation, events: new services.Events(this) };
            this.controllers = {};
            if (app.controllers)
                for (var c in app.controllers) {
                    var co = app.controllers[c];
                    this.controllers[c] = typeof co === "object" ? co : new (co)(this);
                }
            this.components = app.components;
            if (typeof this.components === "object" && !this.components["Navigation"])
                this.components["Navigation"] = services.Navigation;
            if (typeof this.components === "object" && !this.components["Data"])
                this.components["Data"] = services.Data;
        }
        catch (ex) {
            console.error(ex);
            throw ex;
        }
    }
    App.prototype.initApp = function () {
        if (!this.options.web)
            this.options.web = {};
        try {
            if (document) { // web app
                if (!document.body)
                    document.body = document.createElement('body');
                this.options.web.target = this.options.web.target || document.body;
                if (this.options.web.target === document.body) {
                    this.options.web.target = document.getElementById("main") || document.body.appendChild(document.createElement("div"));
                    if (!this.options.web.target.id)
                        this.options.web.target.setAttribute("id", "main");
                }
                else if (typeof this.options.web.target === "string")
                    this.options.web.target = document.getElementById(this.options.web.target);
                if (this.options.web.target == null)
                    throw new Error("Cannot locate target (" + (this.options.web.target ? 'not specified' : this.options.web.target) + ") in html document body.");
                if (this.options.title)
                    document.title = this.options.title;
                //if (module && module.hot) module.hot.accept();
                if (this.options.web.target.hasChildNodes())
                    this.options.web.target.innerHTML = "";
            }
        }
        catch (_a) {
            //TODO: workaround for nodeJs as document element is not defined in Node runtime
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
            }
            catch (e) {
                _this.services.logger.log.call(_this, types.LogLevel.Error, e);
                reject(e);
            }
            _this.render(main).then(resolve, function (err) { _this.services.logger.log.call(_this, types.LogLevel.Error, err.message, err.stack); reject(err); _this.render(["pre", {}, err.stack]); });
        });
    };
    App.prototype.render = function (ui) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.services.logger.log.call(_this, types.LogLevel.Trace, 'App.render', [{ ui: ui }]);
            _this.services.processor.process(ui).then(function (value) {
                try {
                    resolve(_this.services.UI.render(value, _this.options.web && _this.options.web.target ? _this.options.web.target : undefined));
                }
                catch (e) {
                    reject(e);
                }
            }, function (r) { return reject(r); });
        });
    };
    return App;
}());
exports.App = App;
});

unwrapExports(app);
var app_1 = app.App;

var transformer = createCommonjsModule(function (module, exports) {
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;

var Transformer = /** @class */ (function () {
    function Transformer(settings) {
        var _this = this;
        this.reservedWords = ['function', 'for', 'var', 'this', 'self', 'null'];
        this.type = "Transformer";
        this.settings = settings ? __assign({}, settings, { indent: settings.indent || '\t', compact: settings.compact || false, module: settings.module || types.ModuleSystem.None, namedExports: settings.namedExports === undefined ? true : settings.namedExports }) : { module: types.ModuleSystem.ES };
        this.settings.parsers = this.settings.parsers || {};
        this.settings.parsers[".require"] = this.settings.parsers[".import"] = function (obj, parseSettings, offset) { return _this.loadModule(_this.process(obj[".import"] || obj[".require"], false, false, parseSettings, offset), parseSettings, offset); };
        this.settings.parsers[".function"] = function (obj, parseSettings, offset) { return "function " + (obj[".function"] ? obj[".function"] : "") + "(" + (obj["arguments"] ? _this.process(obj["arguments"], false, true, parseSettings, offset) : "") + "){ return " + _this.process(obj["return"], true, false, parseSettings, offset) + " }"; };
        this.settings.parsers[".map"] = function (obj, parseSettings, offset) { return _this.process(obj[".map"], false, false, parseSettings, offset) + ".map(function(" + obj["arguments"] + ") {return " + (settings && settings.indent ? new Array(offset).join(' ') : "") + _this.process(obj["return"], true, false, parseSettings, offset) + " })"; };
        this.settings.parsers[".filter"] = function (obj, parseSettings, offset) { return _this.process(obj[".filter"], false, false, parseSettings, offset) + ".filter(function(" + obj["arguments"] + ") {return " + _this.process(obj["condition"], true, false, parseSettings, offset) + " })"; };
        this.settings.parsers[".call"] = function (obj, parseSettings, offset) { return _this.process(obj[".call"], false, false, parseSettings, offset) + ".call(" + (obj["arguments"] ? _this.process(obj["arguments"], false, true, parseSettings, offset) : "") + ")"; };
        this.settings.parsers[".exec"] = function (obj, parseSettings, offset) { return _this.process(obj[".exec"], true, false, parseSettings, offset) + "(" + (obj["arguments"] ? _this.process(obj["arguments"], true, true, parseSettings, offset) : "") + ")"; };
        this.settings.parsers[".new"] = function (obj, parseSettings, offset) { return "new " + _this.process(obj[".new"], true, false, parseSettings, offset) + "(" + (obj["arguments"] ? _this.process(obj["arguments"], true, true, parseSettings, offset) : "") + ")"; };
        this.settings.parsers[".id"] = this.settings.parsers[".code"] = function (obj, parseSettings, offset) { return obj[".code"] || obj[".id"]; };
        this.settings.parsers[".app"] = function (obj, parseSettings, offset) {
            var obj2 = {};
            var keys = Object.keys(obj);
            for (var key in keys)
                obj2[keys[key] == ".app" ? "main" : keys[key]] = obj[keys[key]];
            return _this.process({ ".new": { ".require": "@appfibre/jst#App" }, "arguments": [obj2] }, true, true, parseSettings, offset) + ".run()";
        };
        this.settings.parsers["."] = function (obj, parseSettings, offset) { return obj["."]; };
    }
    Transformer.prototype.loadModule = function (val, parseSettings, offset) {
        var m = val.indexOf('#') > 0 ? val.substr(0, val.indexOf('#')) : val;
        if (val[0] === "~") {
            return "" + this.process({ ".function": null, arguments: "loader", "return": { ".code": "loader.load('" + (m[1] === "/" ? '.' : '') + m.substr(1) + "')" + (val.length > m.length ? val.substring(m.length).replace('#', '.') : '') + ";" } }, false, false, parseSettings, offset);
        }
        if (this.settings.module.toLowerCase() === types.ModuleSystem.ES.toLowerCase())
            m = val.indexOf('#', m.length + 2) > -1 ? val.substr(0, val.indexOf('#', m.length + 2) - 1) : val;
        if (parseSettings.imports.indexOf(m) === -1)
            parseSettings.imports.push(m);
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
        if (obj === null)
            output = "null";
        else if (Array.isArray(obj))
            output = (et ? "" : "[") + this.format(obj.map(function (e, i) { return _this.process(e, esc, false, parseSettings, offset + 1); }), parseSettings, offset) + (et ? "" : "]");
        else if (typeof obj === "object") {
            var keys = Object.keys(obj);
            var processed = false;
            for (var k in keys)
                if (!processed && keys[k].length > 0 && keys[k].charAt(0) == '.') {
                    if (this.settings.parsers && this.settings.parsers[keys[k]]) {
                        processed = true;
                        output = this.settings.parsers[keys[k]](obj, parseSettings, offset) || '';
                    }
                    else
                        throw new Error("Could not locate parser " + keys[k].substr(1));
                }
            if (!processed)
                output = (et ? "" : "{") + this.format(keys.filter(function (k) { return k.length < 2 || k.substr(0, 2) != '..'; }).map(function (k, i) { return (_this.reservedWords.indexOf(k) > -1 || /[^a-z0-9]/i.test(k) ? "\"" + k + "\"" : k) + ":" + (_this.settings.compact ? '' : ' ') + _this.process(obj[k], esc, false, parseSettings, offset + 1); }), parseSettings, offset) + (et ? "" : "}");
        }
        else if (typeof obj === "function") // object not JSON...
            output = obj.toString();
        else
            output = typeof obj === "string" && esc ? JSON.stringify(obj) : obj;
        return output;
    };
    Transformer.prototype.processExports = function (output, obj) {
        var _this = this;
        var keys = Object.keys(obj);
        var validkeys = keys.filter(function (k) { return k.indexOf(' ') === -1 && k.indexOf('/') === -1 && k.indexOf('-') === -1 && _this.reservedWords.indexOf(k) === -1; });
        var isDefault = keys.length === 1 && keys[0] === 'default';
        var nl = this.settings.compact ? '' : '\n';
        var sp = this.settings.compact ? '' : ' ';
        var vr = this.settings.preferConst ? 'const' : 'var';
        switch (this.settings.module.toLowerCase()) {
            case "umd":
            case "commonjs":
            case "cjs":
                //for (var req in r) output.code += `${vr} _${r[req]}${sp}=${sp}require('${req}');${nl}`;
                output.code += keys.map(function (key) { return "module.exports['" + key + "']" + sp + "=" + sp + _this.process(obj[key], true, false, output, 0) + ";"; }).join(nl);
                if (!isDefault)
                    output.code += nl + "module.exports['default']" + sp + "=" + sp + "{" + sp + keys.map(function (key) { return key + ": " + _this.process(obj[key], true, false, output, 0); }).join(nl) + " };";
                if (output.name)
                    output.code += nl + "module.exports['__jst'] = '" + name + ";";
                break;
            case "es":
                if (isDefault)
                    output.code += "export default" + sp + this.process(obj["default"], true, false, output, 0) + ";";
                else {
                    output.code += "export default" + sp + "{" + this.format(keys.map(function (key) { return validkeys.indexOf(key) === -1 ? "\"" + key + "\": " + _this.process(obj[key], true, false, output, 0) : key + ":" + sp + (_this.settings.namedExports ? key : _this.process(obj[key], true, false, output, 2)); }), output, 1) + "};";
                    if (this.settings.namedExports && validkeys.length > 0)
                        output.code = validkeys.map(function (key) { return "export " + vr + " " + key + sp + "=" + sp + _this.process(obj[key], true, false, output, 1) + ";"; }).join(nl) + ("" + (nl + output.code + nl));
                }
                break;
            default:
                if (output.name)
                    output.code += "return " + (isDefault ? "{'default' : " + this.process(obj["default"], true, false, output, 1) + ", \"__jst\": \"" + output.name + "\"}" : "{" + this.format(keys.map(function (key) { return validkeys.indexOf(key) === -1 ? "\"" + key + "\": " + _this.process(obj[key], true, false, output, 1) : key + ":" + sp + _this.process(obj[key], true, false, output, 2); }), output, 1) + ", \"__jst\": \"" + output.name + "\"}") + (output.name.indexOf('#') > -1 ? output.name.slice(output.name.indexOf('#') + 1).split('#').map(function (p) { return "['" + p + "']"; }) : '') + ";";
                else
                    output.code += "return " + (isDefault ? this.process(obj["default"], true, false, output, 1) : "{" + this.format(keys.map(function (key) { return validkeys.indexOf(key) === -1 ? "\"" + key + "\": " + _this.process(obj[key], true, false, output, 1) : key + ":" + sp + _this.process(obj[key], true, false, output, 2); }), output, 1) + "}") + ";";
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
        if (output.imports.length > 0)
            for (var i = 0; i < output.imports.length; i++) {
                var ext = output.imports[i][0] === "~";
                if (output.imports[i].indexOf('#') > -1) {
                    var module_name = output.imports[i].substr(0, output.imports[i].indexOf('#'));
                    if ((ext ? s2 : s)[module_name] === undefined)
                        (ext ? s2 : s)[module_name] = {};
                    (ext ? s2 : s)[module_name][output.imports[i].substr(module_name.length + 1)] = i;
                }
                else
                    (ext ? r2 : r)[output.imports[i]] = i;
            }
        switch (this.settings.module.toLowerCase()) {
            case "umd":
            case "commonjs":
            case "cjs":
                for (var req in r)
                    output.code = vr + " _" + r[req] + sp + "=" + sp + "require(\"" + req + "\");" + nl + output.code;
                break;
            case "amd":
                output.code = "define(" + (Object.keys(r).length > 0 ? "[" + Object.keys(r).map(function (key) { return "'" + key + "'"; }).join(", ") + "], " : '') + "function (" + Object.keys(r).map(function (key) { return '_' + r[key]; }).join(", ") + ") { " + output.code + " });" + nl;
                break;
            case "es":
                output.code = Object.keys(s).map(function (key) { return "import {" + Object.keys(s[key]).map(function (k) { return k + " as _" + s[key][k]; }).join(',' + sp) + "} from '" + key + "';" + nl; }).join('') + Object.keys(r).map(function (key) { return "import * as _" + r[key] + " from '" + key.substr(key[0] == "~" ? 1 : 0) + "';" + nl; }).join('') + output.code;
                break;
            default:
                for (var req in r)
                    output.code = vr + " _" + r[req] + sp + "=" + sp + "require(\"" + req + "\");" + nl + output.code;
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
                    for (var req in r2)
                        output.code = vr + " _" + r2[req] + sp + "=" + sp + "require(\"" + req + "\");" + nl + output.code;
                    break;
                case "amd":
                    output.code = "define(" + (Object.keys(r2).length > 0 ? "[" + Object.keys(r).map(function (key) { return "'" + key + "'"; }).join(", ") + "], " : '') + "function (" + Object.keys(r2).map(function (key) { return '_' + r2[key]; }).join(", ") + ") { " + output.code + " });" + nl;
                    break;
                case "es":
                    output.code = Object.keys(s2).map(function (key) { return "import {" + Object.keys(s2[key]).map(function (k) { return k.substr(1) + " as _" + s[key][k]; }).join(',' + sp) + "} from '" + key.substr(1) + "';" + nl; }).join('') + Object.keys(r2).map(function (key) { return "import * as _" + r2[key] + " from '" + key.substr(1) + "';" + nl; }).join('') + output.code;
                    break;
                default:
                    for (var req in r2)
                        output.code = vr + " _" + r2[req] + sp + "=" + sp + "require(\"" + req + "\");" + nl + output.code;
            }
        }
    };
    Transformer.prototype.bundleModule = function (obj, name) {
        var output = { name: name, imports: [], exports: {}, compositeObject: false, code: '' };
        this.processExports(output, obj);
        this.processImports(output, name || '');
        return output;
    };
    Transformer.prototype.transform = function (input, name) {
        var obj;
        try {
            obj = typeof input === "string" ? JSON.parse(input) : input;
        }
        catch (e) {
            //console.log(JSON.stringify(this.settings));
            if (this.settings.dangerouslyProcessJavaScript || this.settings.dangerouslyProcessJavaScript === undefined) {
                try {
                    obj = Function("return (" + input + ");")();
                    if (this.settings.dangerouslyProcessJavaScript === undefined)
                        console.warn("Warning: " + (name || '') + " is not JSON compliant: " + e.message + ".  Set option \"dangerouslyProcessJavaScript\" to true to hide this message.\r\n" + input);
                }
                catch (f) {
                    throw new Error("Unable to process " + (name || '') + " as JavaScript: " + f.message);
                }
            }
            else
                throw new Error("Unable to parse JSON file " + (name || '') + ": " + e.message);
        }
        try {
            return this.bundleModule(Array.isArray(obj) || typeof (obj || '') !== 'object' || Object.keys(obj).filter(function (k) { return k[0] == '.'; }).length > 0 ? { "default": obj } : obj, name);
        }
        catch (e) {
            throw new Error("Unable to transform js template: " + e.message + "\r\n" + e.stack);
        }
    };
    return Transformer;
}());
exports.Transformer = Transformer;
});

unwrapExports(transformer);
var transformer_1 = transformer.Transformer;

var loader$2 = createCommonjsModule(function (module, exports) {
exports.__esModule = true;
var Loader = /** @class */ (function () {
    function Loader(basePath) {
        try {
            //nodeJS does not regocnise "window"
            if (window) {
                var systemjs = Object.getOwnPropertyDescriptor(window, "System");
                if (systemjs)
                    this.proxy = { "import": systemjs.value["import"].bind(systemjs.value), instantiate: systemjs.value.instantiate.bind(systemjs.value), init: function (basePath) { return void {}; } };
                else
                    this.proxy = loader["default"];
            }
        }
        catch (_a) {
        }
        if (this['proxy'] == null)
            this.proxy = loader$1["default"];
        this.proxy.init(basePath);
    }
    Loader.prototype["import"] = function (moduleName, normalizedParentName) {
        return this.proxy["import"](moduleName, normalizedParentName);
    };
    Loader.prototype.instantiate = function (url, parent) {
        return this.proxy.instantiate(url, parent);
    };
    Loader.prototype.init = function (basePath) {
    };
    return Loader;
}());
exports.Loader = Loader;
});

unwrapExports(loader$2);
var loader_1 = loader$2.Loader;

var dist = createCommonjsModule(function (module, exports) {
var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
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

//import {createFilter} from 'rollup-pluginutils';

function jst (options = { module: 'ES'}) {
	//const filter = createFilter(options.include, options.exclude);
	if (!options.module) options.module = 'ES';
	if (options.dangerouslyProcessJavaScript === undefined) options.dangerouslyProcessJavaScript = false;
	return {
		name: 'json',

		transform (input, id) {
			if (id.slice(-5) !== '.json' && id.slice(-4) !== '.jst') return null;
			//if (!filter(id)) return null;
			return { code: new dist_2(options).transform(input, id).code, map: { mappings: '' } };
		}
	};
}

export default jst;
//# sourceMappingURL=rollup-plugin-jst.es.js.map
