import { deepClone } from './deep-clone';

describe('test deep clone', () => {
  it('should be cloned', () => {
    const symbol = Symbol(0)
    const origin = {
      a: 1,
      b: null,
      c: /abc/g,
      d: new Date(),
      e: {
        ee: 1,
      },
      ss: Symbol(1),
      [symbol]: 'ss',
    }

    const clone = deepClone(origin)
    expect([
      clone.a, clone.b, clone.e, clone.ss, clone[symbol]
    ]).toEqual([
      origin.a, origin.b, origin.e, origin.ss, origin[symbol]
    ]);

    expect([
      clone.c,
      clone.d,
      clone.d
    ]).not.toBe([
      origin.c,
      origin.d,
      origin.e
    ]);

    expect(clone.c.source).toBe(origin.c.source);
    expect(clone.d.getTime()).toBe(origin.d.getTime());
  })
});