export function throttle(fn, interval) {
  let lastExecTime = 0;
  return function(...args) {
    if (Date.now() - lastExecTime < interval) {
      return;
    }
    fn.call(null, ...args);
    lastExecTime = Date.now();
  }
}
