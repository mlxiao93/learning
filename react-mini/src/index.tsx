const isEvent = (key: string): boolean => key.startsWith("on");
const isProperty = (key: string): boolean =>
  key !== "children" && !isEvent(key);
const isNew = (prev, next) => (key) => prev[key] !== next[key];
const isGone = (prev, next) => (key) => !(key in next);

let nextUnitOfWork: MiniReact.Fiber | undefined;
let currentRoot: MiniReact.Fiber | undefined;
let wipRoot: MiniReact.Fiber | undefined;
let deletions: MiniReact.Fiber[] | undefined;

function updateDom(
  dom: MiniReact.Fiber["dom"],
  preProps: MiniReact.Fiber["props"],
  nextProps: MiniReact.Fiber["props"]
): void {
  // 删除事件
  Object.keys(preProps)
    .filter(isEvent)
    .filter((key) => !(key in nextProps) || isNew(preProps, nextProps)(key))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, preProps[name]);
    });
  // 删除属性
  Object.keys(preProps)
    .filter(isProperty)
    .filter(isGone(preProps, nextProps))
    .forEach((name) => {
      dom[name] = "";
    });
  // 新增属性
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(preProps, nextProps))
    .forEach((name) => {
      dom[name] = nextProps[name];
    });
  // 新增事件
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(preProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
}

function commitWork(fiber: MiniReact.Fiber): void {
  if (!fiber) return;
  const domParent = fiber.parent.dom;
  if (fiber.effectTag === "PLACEMENT" && fiber.dom !== null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === "UPDATE" && fiber.dom !== null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  } else if (fiber.effectTag === "DELETION") {
    domParent.removeChild(fiber.dom);
  }
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function commitRoot(): void {
  // 先删除
  deletions.forEach(commitWork);
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

function reconcileChildren(
  wipFiber: MiniReact.Fiber,
  elements: MiniReact.ReactElement[]
): void {
  let index = 0;
  let oldFiber = wipFiber.alternate?.child;
  let prevSibling = null;
  while (
    index < elements.length ||
    (oldFiber !== null && oldFiber !== undefined)
  ) {
    const element = elements[index];
    let newFiber: MiniReact.Fiber;

    const sameType = element?.type === oldFiber?.type;

    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: undefined,
        parent: wipFiber,
        alternate: undefined,
        effectTag: "PLACEMENT"
      };
    }
    if (sameType) {
      newFiber = {
        type: oldFiber?.type,
        props: element.props,
        dom: oldFiber?.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE"
      };
    }
    if (oldFiber && !sameType) {
      oldFiber.effectTag = "DELETION";
      deletions?.push(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (index === 0) {
      wipFiber.child = newFiber;
    } else if (element) {
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
    index++;
  }
}

function createDom(fiber: MiniReact.Fiber): HTMLElement | Text {
  const dom =
    fiber.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type);
  updateDom(dom, {}, fiber.props);
  return dom;
}

function performUnitOfWork(
  fiber: MiniReact.Fiber
): MiniReact.Fiber | undefined {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  const elements = fiber.props.children;

  reconcileChildren(fiber, elements);

  // 先child
  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber: MiniReact.Fiber | undefined = fiber;
  while (nextFiber) {
    // 再sibling
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    // 最后parent
    nextFiber = nextFiber.parent;
  }
}

const workLoop: IdleRequestCallback = (deadline) => {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
  requestIdleCallback(workLoop);
};
requestIdleCallback(workLoop);

function render(element: MiniReact.ReactElement, container: HTMLElement): void {
  wipRoot = {
    dom: container,
    type: container.tagName as any,

    props: {
      children: [element]
    },
    alternate: currentRoot
  };
  deletions = [];
  nextUnitOfWork = wipRoot;
}

function createTextElement(text: string): MiniReact.ReactElement {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: []
    }
  };
}

function createElement(
  type: MiniReact.ElementType,
  props: MiniReact.ElementProps,
  ...children: MiniReact.ReactElement[]
): MiniReact.ReactElement {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      )
    }
  };
}

const React = {
  createElement
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const ReactDOM = {
  render
};

/** ------------------------------------------------------------------- */

const container = document.getElementById("root");

// 输入时间回调
const updateValue = (e: MiniReact.InputEvent): void => {
  // 重新渲染组件
  renderComponent(e.target.value);
};

// 组件render方法
const renderComponent = (value: string): void => {
  const element = (
    <div>
      <input onInput={updateValue} value={value}></input>
      <h2>hello {value}</h2>
    </div>
  );
  ReactDOM.render(element, container);
};

// 组件初始渲染
// renderComponent("world");
