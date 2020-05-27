"use strict";
/*interface fiber
{
    dom?: any
    type:string,
    props: object,
    child: any,
    children: any[]
}

interface action
*/
var __assign = (this && this.__assign) || function () {
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
exports.createElement = exports.render = exports.Component = void 0;
var requestIdleCallback = global.requestIdleCallback;
function createElement(type, props, children) {
    return {
        type: type,
        props: __assign(__assign({}, props), { children: children != undefined ? typeof children === "string" ? [createTextElement(children)] : children : [] })
    };
}
exports.createElement = createElement;
function createTextElement(text) {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: []
        }
    };
}
function createDom(fiber) {
    if (fiber.type == "TEXT_ELEMENT")
        return document.createTextNode(fiber.props.nodeValue || "");
    var dom = document.createElement(fiber.type);
    updateDom(dom, {}, fiber.props);
    return dom;
}
var isEvent = function (key) { return key.startsWith("on"); };
var isProperty = function (key) {
    return key !== "children" && !isEvent(key);
};
var isNew = function (prev, next) { return function (key) {
    return prev[key] !== next[key];
}; };
var isGone = function (_prev, next) { return function (key) { return !(key in next); }; };
function updateDom(dom, prevProps, nextProps) {
    //Remove old or changed event listeners
    Object.keys(prevProps)
        .filter(isEvent)
        .filter(function (key) {
        return !(key in nextProps) ||
            isNew(prevProps, nextProps)(key);
    })
        .forEach(function (name) {
        var eventType = name
            .toLowerCase()
            .substring(2);
        dom.removeEventListener(eventType, prevProps[name]);
    });
    // Remove old properties
    Object.keys(prevProps)
        .filter(isProperty)
        .filter(isGone(prevProps, nextProps))
        .forEach(function (name) { return dom.setAttribute(name, ""); });
    // Set new or changed properties
    Object.keys(nextProps)
        .filter(isProperty)
        .filter(isNew(prevProps, nextProps))
        .forEach(function (name) { return dom.setAttribute(name, typeof nextProps[name] === 'string' ? nextProps[name] : JSON.stringify(nextProps[name])); });
    // Add event listeners
    Object.keys(nextProps)
        .filter(isEvent)
        .filter(isNew(prevProps, nextProps))
        .forEach(function (name) {
        var eventType = name
            .toLowerCase()
            .substring(2);
        dom.addEventListener(eventType, nextProps[name]);
    });
}
function commitRoot() {
    deletions.forEach(commitWork);
    commitWork(wipRoot.child);
    currentRoot = wipRoot;
    wipRoot = null;
}
function commitWork(fiber) {
    if (!fiber) {
        return;
    }
    var domParentFiber = fiber.parent;
    while (!domParentFiber.dom) {
        domParentFiber = domParentFiber.parent;
    }
    var domParent = domParentFiber.dom;
    if (fiber.effectTag === "PLACEMENT" &&
        fiber.dom != null) {
        domParent.appendChild(fiber.dom);
    }
    else if (fiber.effectTag === "UPDATE" &&
        fiber.dom != null) {
        updateDom(fiber.dom, fiber.alternate.props, fiber.props);
    }
    else if (fiber.effectTag === "DELETION") {
        commitDeletion(fiber, domParent);
    }
    commitWork(fiber.child);
    commitWork(fiber.sibling);
}
function commitDeletion(fiber, domParent) {
    if (fiber.dom) {
        domParent.removeChild(fiber.dom);
    }
    else {
        commitDeletion(fiber.child, domParent);
    }
}
function render(element, container) {
    wipRoot = {
        dom: container,
        props: {
            children: [element]
        },
        alternate: currentRoot
    };
    deletions = [];
    nextUnitOfWork = wipRoot;
}
exports.render = render;
var nextUnitOfWork = null;
var currentRoot = null;
var wipRoot = null;
var deletions = null;
function workLoop(deadline) {
    var shouldYield = false;
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        shouldYield = deadline.timeRemaining() < 1;
    }
    if (!nextUnitOfWork && wipRoot) {
        commitRoot();
    }
    requestIdleCallback(workLoop);
}
requestIdleCallback(workLoop);
function performUnitOfWork(fiber) {
    var isFunctionComponent = fiber.type instanceof Function;
    if (isFunctionComponent) {
        updateFunctionComponent(fiber);
    }
    else {
        updateHostComponent(fiber);
    }
    if (fiber.child) {
        return fiber.child;
    }
    var nextFiber = fiber;
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling;
        }
        nextFiber = nextFiber.parent;
    }
}
var wipFiber = null;
var hookIndex = null;
function updateFunctionComponent(fiber) {
    wipFiber = fiber;
    hookIndex = 0;
    wipFiber.hooks = [];
    var children = [fiber.type(fiber.props)];
    reconcileChildren(fiber, children);
}
function useState(initial) {
    var oldHook = wipFiber.alternate &&
        wipFiber.alternate.hooks &&
        wipFiber.alternate.hooks[hookIndex];
    var hook = {
        state: oldHook ? oldHook.state : initial,
        queue: []
    };
    var actions = oldHook ? oldHook.queue : [];
    actions.forEach(function (action) {
        hook.state = action(hook.state);
    });
    var setState = function (action) {
        hook.queue.push(action);
        wipRoot = {
            dom: currentRoot.dom,
            props: currentRoot.props,
            alternate: currentRoot
        };
        nextUnitOfWork = wipRoot;
        deletions = [];
    };
    wipFiber.hooks.push(hook);
    hookIndex++;
    return [hook.state, setState];
}
function updateHostComponent(fiber) {
    if (!fiber.dom) {
        fiber.dom = createDom(fiber);
    }
    reconcileChildren(fiber, fiber.props.children);
}
function reconcileChildren(wipFiber, elements) {
    var index = 0;
    var oldFiber = wipFiber.alternate && wipFiber.alternate.child;
    var prevSibling = null;
    while (index < elements.length ||
        oldFiber != null) {
        var element = elements[index];
        var newFiber = null;
        var sameType = oldFiber &&
            element &&
            element.type == oldFiber.type;
        if (sameType) {
            newFiber = {
                type: oldFiber.type,
                props: element.props,
                dom: oldFiber.dom,
                parent: wipFiber,
                alternate: oldFiber,
                effectTag: "UPDATE"
            };
        }
        if (element && !sameType) {
            newFiber = {
                type: element.type,
                props: element.props,
                dom: null,
                parent: wipFiber,
                alternate: null,
                effectTag: "PLACEMENT"
            };
        }
        if (oldFiber && !sameType) {
            oldFiber.effectTag = "DELETION";
            deletions.push(oldFiber);
        }
        if (oldFiber) {
            oldFiber = oldFiber.sibling;
        }
        if (index === 0) {
            wipFiber.child = newFiber;
        }
        else if (element && prevSibling && !prevSibling.sibling) {
            prevSibling.sibling = newFiber;
        }
        prevSibling = newFiber;
        index++;
    }
}
var Component = /** @class */ (function () {
    function Component(props, context) {
        this.props = props || {};
        this.context = context;
        this.state = {};
        var s = useState({});
        this.state = s[0];
        this.setState = function (_args) {
            //console.log(args);
        };
        this.render = function () {
            debugger;
            return 'ok';
        };
    }
    Component.prototype.setState = function (_state, _callback) {
    };
    Component.prototype.forceUpdate = function (_callback) {
        debugger;
        //this.setState((prevState: S, _props: P) => prevState, callback);
        //updateHostComponent()
    };
    Component.prototype.render = function (props) {
        alert(JSON.stringify(props));
        debugger;
        //return createElement(this, props, props.children);
    };
    return Component;
}());
exports.Component = Component;
