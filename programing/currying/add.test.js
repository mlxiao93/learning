import { add } from './add';

test('add', () => {
  expect(+add(1, 2, 3, 4)).toBe(10);
  expect(+add(1)(2)(3)(4)).toBe(10);
  expect(+add(1, 2)(3)(4)).toBe(10);
  expect(+add(1)(2, 3)(4)).toBe(10);
});
