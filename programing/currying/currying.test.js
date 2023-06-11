import { currying } from './currying';

function add(...args) {
  return args.reduce((acc, item) => acc + item, 0);
}

test('currying', () => {
  const curryAdd = currying(add);
  expect(+curryAdd(1, 2, 3, 4)).toBe(10);
  expect(+curryAdd(1)(2)(3)(4)).toBe(10);
  expect(+curryAdd(1)(2, 3)(4)).toBe(10);
});
