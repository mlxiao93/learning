export function debounce(fn, interval) {
  let timer;
  return function(...args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.call(null, ...args);
    }, interval)
  }
}
