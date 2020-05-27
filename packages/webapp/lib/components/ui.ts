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

const requestIdleCallback = (<any>global).requestIdleCallback;

function createElement(type:any, props:object, children:any) {
    return {
      type,
      props: {
        ...props,
        children: children != undefined ? typeof children === "string" ? [createTextElement(children)] : children : []
      },
    }
  }
  
  function createTextElement(text:string) {
    return {
      type: "TEXT_ELEMENT",
      props: {
        nodeValue: text,
        children: [],
      },
    }
  }
  
  function createDom(fiber:{type: string, props: {children?: any, nodeValue?: string}}) {
    if (fiber.type == "TEXT_ELEMENT") 
        return document.createTextNode(fiber.props.nodeValue || "");

    const dom = document.createElement(fiber.type);
    updateDom(dom, {}, fiber.props)
    return dom
  }
  
  const isEvent = (key:string) => key.startsWith("on")
  const isProperty = (key:string) =>
    key !== "children" && !isEvent(key)
  const isNew = (prev:any, next:any) => (key:string) =>
    prev[key] !== next[key]
  const isGone = (_prev:any, next:any) => (key:string) => !(key in next)
  function updateDom(dom:HTMLElement, prevProps:any, nextProps:any) {
    //Remove old or changed event listeners
    Object.keys(prevProps)
      .filter(isEvent)
      .filter(
        key =>
          !(key in nextProps) ||
          isNew(prevProps, nextProps)(key)
      )
      .forEach(name => {
        const eventType = name
          .toLowerCase()
          .substring(2)
        dom.removeEventListener(
          eventType,
          prevProps[name]
        )
      })
  
    // Remove old properties
    Object.keys(prevProps)
      .filter(isProperty)
      .filter(isGone(prevProps, nextProps))
      .forEach(name => dom.setAttribute(name, ""))
  
    // Set new or changed properties
    Object.keys(nextProps)
      .filter(isProperty)
      .filter(isNew(prevProps, nextProps))
      .forEach(name => dom.setAttribute(name, typeof nextProps[name] === 'string' ? nextProps[name] : JSON.stringify(nextProps[name])))
      
    // Add event listeners
    Object.keys(nextProps)
      .filter(isEvent)
      .filter(isNew(prevProps, nextProps))
      .forEach(name => {
        const eventType = name
          .toLowerCase()
          .substring(2)
        dom.addEventListener(
          eventType,
          nextProps[name]
        )
      })
  }
  
  function commitRoot() {
    deletions.forEach(commitWork)
    commitWork(wipRoot.child)
    currentRoot = wipRoot
    wipRoot = null
  }
  
  function commitWork(fiber:any) {
    if (!fiber) {
      return
    }
  
    let domParentFiber = fiber.parent
    while (!domParentFiber.dom) {
      domParentFiber = domParentFiber.parent
    }
    const domParent = domParentFiber.dom
    if (
      fiber.effectTag === "PLACEMENT" &&
      fiber.dom != null
    ) {
      domParent.appendChild(fiber.dom)
    } else if (
      fiber.effectTag === "UPDATE" &&
      fiber.dom != null
    ) {
      updateDom(
        fiber.dom,
        fiber.alternate.props,
        fiber.props
      )
    } else if (fiber.effectTag === "DELETION") {
      commitDeletion(fiber, domParent)
    }
  
    commitWork(fiber.child)
    commitWork(fiber.sibling)
  }
  
  function commitDeletion(fiber:any, domParent:any) {
    if (fiber.dom) {
      domParent.removeChild(fiber.dom)
    } else {
      commitDeletion(fiber.child, domParent)
    }
  }
  
  function render(element:any, container:any) {
    wipRoot = {
      dom: container,
      props: {
        children: [element],
      },
      alternate: currentRoot,
    }
    deletions = []
    nextUnitOfWork = wipRoot
  }
  
  let nextUnitOfWork:any = null
  let currentRoot:any = null
  let wipRoot:any = null
  let deletions:any = null
  
  function workLoop(deadline:any) {
    let shouldYield = false
    while (nextUnitOfWork && !shouldYield) {
      nextUnitOfWork = performUnitOfWork(
        nextUnitOfWork
      )
      shouldYield = deadline.timeRemaining() < 1
    }
  
    if (!nextUnitOfWork && wipRoot) {
      commitRoot()
    }
  
    requestIdleCallback(workLoop)
  }
  
  requestIdleCallback(workLoop)
  
  function performUnitOfWork(fiber:any) {
    const isFunctionComponent =
      fiber.type instanceof Function
    if (isFunctionComponent) {
      updateFunctionComponent(fiber)
    } else {
      updateHostComponent(fiber)
    }
    if (fiber.child) {
      return fiber.child
    }
    let nextFiber = fiber
    while (nextFiber) {
      if (nextFiber.sibling) {
        return nextFiber.sibling
      }
      nextFiber = nextFiber.parent
    }
  }
  
  let wipFiber:any = null
  let hookIndex:any = null
  
  function updateFunctionComponent(fiber:any) {
    wipFiber = fiber
    hookIndex = 0
    wipFiber.hooks = []
    const children = [fiber.type(fiber.props)]
    reconcileChildren(fiber, children)
  }
  
  function useState(initial:any) {
    const oldHook =
      wipFiber.alternate &&
      wipFiber.alternate.hooks &&
      wipFiber.alternate.hooks[hookIndex]
    const hook:any = {
      state: oldHook ? oldHook.state : initial,
      queue: [],
    }

    const actions = oldHook ? oldHook.queue : []
    actions.forEach((action:any) => {
      hook.state = action(hook.state)
    })
  
    const setState = (action:any) => {
      hook.queue.push(action)
        wipRoot = {
            dom: currentRoot.dom,
            props: currentRoot.props,
            alternate: currentRoot,
        }
        nextUnitOfWork = wipRoot
        deletions = []
    }
  
    wipFiber.hooks.push(hook)
    hookIndex++
    return [hook.state, setState]
  }
  
  function updateHostComponent(fiber:any) {
    if (!fiber.dom) {
      fiber.dom = createDom(fiber)
    }
    reconcileChildren(fiber, fiber.props.children)
  }
  
  function reconcileChildren(wipFiber:any, elements:any) {
    let index = 0
    let oldFiber =
      wipFiber.alternate && wipFiber.alternate.child
    let prevSibling = null
  
    while (
      index < elements.length ||
      oldFiber != null
    ) {
      const element = elements[index]
      let newFiber:any = null
  
      const sameType =
        oldFiber &&
        element &&
        element.type == oldFiber.type
  
      if (sameType) {
        newFiber = {
          type: oldFiber.type,
          props: element.props,
          dom: oldFiber.dom,
          parent: wipFiber,
          alternate: oldFiber,
          effectTag: "UPDATE",
        }
      }
      if (element && !sameType) {
        newFiber = {
          type: element.type,
          props: element.props,
          dom: null,
          parent: wipFiber,
          alternate: null,
          effectTag: "PLACEMENT",
        }
      }
      if (oldFiber && !sameType) {
        oldFiber.effectTag = "DELETION"
        deletions.push(oldFiber)
      }
  
      if (oldFiber) {
        oldFiber = oldFiber.sibling
      }
  
      if (index === 0) {
        wipFiber.child = newFiber
      } else if (element && prevSibling && !prevSibling.sibling) {
        prevSibling.sibling = newFiber
      } 
  
      prevSibling = newFiber
      index++
    }
  }


  /*
  const Didact = {
    createElement,
    render,
    useState,
  }
  
  /** @jsx Didact.createElement * /
  function Counter() {
    const [state, setState] = Didact.useState(1)
    return (
      <h1 onClick={() => setState(c => c + 1)}>
        Count: {state}
      </h1>
    )
  }
  const element = <Counter />
  const container = document.getElementById("root")
  Didact.render(element, container)
  */

  import {types} from '@appfibre/types';

export class Component<P, S> {
    constructor(props: P | undefined, context?: any) {
        this.props = props || {} as Readonly<P>;
        this.context = context;
        this.state = {} as Readonly<S>;

        let s = useState({});
        this.state = s[0];
        this.setState = function(_args:any) {
            //console.log(args);
        };
        this.render = function() {
            debugger;
            return 'ok';
        }
    }

    static displayName?: string;
    static defaultProps?: any;

    state: Readonly<S>;
    props: Readonly<P>;
    context: any;
    //base?: HTMLElement;

    setState<K extends keyof S>(fn: (prevState: S, props: P) => Pick<S, K>, callback?: () => void): void;
    setState<K extends keyof S>(state: Pick<S, K>, callback?: () => void): void
    setState(_state:any, _callback?: () => void)
    {
        
    }

    forceUpdate(_callback?: () => void): void
    {
        debugger;
        //this.setState((prevState: S, _props: P) => prevState, callback);
        //updateHostComponent()
    }

    render(props?: Readonly<P>|types.app.UI.Element<any, any, any>,/*, state?: Readonly<S>, context?: any*/): any
    {
        alert(JSON.stringify(props));
        debugger;
        //return createElement(this, props, props.children);
    }
}

export {render, createElement};
