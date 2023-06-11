/**
 * 科里化累加函数
 */

export function add(...args) {
  function resFunc(...nextArgs) {
    return add(...args, ...nextArgs);
  }

  function calc() {
    return args.reduce((acc, item) => acc + item, 0);
  }

  resFunc.valueOf = calc;

  return resFunc;
}
