// 缓存已clone的对象, 防止死循环
const cache = new WeakMap();
export function deepClone(origin: any) {
  if (
    origin === null 
    || origin === undefined 
    || typeof origin === 'string'
    || typeof origin === 'number'
    || typeof origin === 'boolean'
    || typeof origin === 'symbol'
  ) {
    return origin;
  }

  if (cache.has(origin)) return cache.get(origin); 

  if (origin instanceof RegExp) {
    return new RegExp(origin.source);
  }
  if (origin instanceof Date) {
    return new Date(origin)
  }

  const newObj: any = Array.isArray(origin) ? [] : {};
  // Reflect.ownKeys可以枚举到defineProperty添加的key和Symbol类型的key
  Reflect.ownKeys(origin).forEach(key => {
    const newVal = deepClone(origin[key]);
    cache.set(origin, newVal);
    newObj[key] = newVal;
  })

  return newObj;
 }