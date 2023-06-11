export function currying(func) {
  const curryFunc = (...args) => {
    const resFunc = (...nextArgs) => {
      return curryFunc(...args, ...nextArgs);
    };
    resFunc.valueOf = () => {
      return func(...args);
    };
    return resFunc;
  };
  return curryFunc;
}
