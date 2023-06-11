import type { ReactNode } from 'react';
import ReactReconciler from 'react-reconciler';
import type { OpaqueRoot } from 'react-reconciler';

const hostConfig = {
  getRootHostContext: function (nextRootInstance) {
    console.log('getRootHostContext', nextRootInstance);
    const rootContext = {
      from: 'from rootContext'
    };
    return rootContext;
  },
  getChildHostContext: function (
    parentHostContext,
    type,
    rootContainerInstance
  ) {
    console.log(
      'getChildHostContext',
      parentHostContext,
      type,
      rootContainerInstance
    );
    const context = {
      from: 'from getChildHostContext'
    };
    return context;
  },
  shouldSetTextContent: function (type, props) {
    console.log('shouldSetTextContent', type, props);
    return false;
  },
  prepareForCommit: function (containerInfo) {
    console.log('prepareForCommit', containerInfo);
  },
  resetAfterCommit: function (containerInfo) {
    console.log('resetAfterCommit', containerInfo);
  },
  commitMount: (domElement, type, newProps, fiberNode) => {
    domElement.focus();
    console.log('commitMount', domElement, type, newProps, fiberNode);
  },
  createTextInstance: function (
    text,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle
  ) {
    console.log(
      'createTextInstance',
      text,
      rootContainerInstance,
      hostContext,
      internalInstanceHandle
    );
    return document.createTextNode(text);
  },
  createInstance: function (
    type,
    props,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle
  ) {
    console.log(
      'createInstance',
      type,
      props,
      rootContainerInstance,
      hostContext,
      internalInstanceHandle
    );
    const element = document.createElement(type);
    element.className = props.className || '';
    element.style = props.style;
    // ....
    // ....
    // if (newProps.onClick) {
    //   element.addEventListener('click', newProps.onClick)
    // }
    return element;
  },
  supportsMutation: function (...args) {
    console.log('createInstance', ...args);
    return true;
  },
  appendInitialChild: function (parentInstance, child) {
    console.log('appendInitialChild', parentInstance, child);
    parentInstance.appendChild(child);
  },
  clearContainer: function (...args) {
    console.log('clearContainer', ...args);
  },
  finalizeInitialChildren: function (
    domElement,
    type,
    props,
    rootContainerInstance,
    hostContext
  ) {
    console.log(
      'finalizeInitialChildren',
      domElement,
      type,
      props,
      rootContainerInstance,
      hostContext
    );
    return props.autofocus; // simply return true for experimenting
  },
  appendChildToContainer: function (container, child) {
    console.log('appendChildToContainer', container, child);
    container.appendChild(child);
  }
};

const ReactReconcilerInst = ReactReconciler(hostConfig);

export default {
  render: (
    reactElement: ReactNode,
    domElement: OpaqueRoot,
    callback?: () => void
  ) => {
    return ReactReconcilerInst.updateContainer(
      reactElement,
      ReactReconcilerInst.createContainer(domElement, false),
      null,
      callback
    );
  }
};
