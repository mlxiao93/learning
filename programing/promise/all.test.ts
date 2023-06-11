import { all } from './all';

describe('all', () => {
  test('resolved', async () => {
    const res = await all([
      createPromise(1, null, 100),
      createPromise(2, null, 100),
      createPromise(3, null, 100),
    ]);
    expect(res).toEqual([1, 2, 3]);
  });
  test('rejected', async () => {
    const res = await all([
      createPromise(1, null, 100),
      createPromise(null, 2, 100),
      createPromise(3, null, 100),
    ]).catch(err => err);
    expect(res).toEqual(2);
  });
});

function createPromise(data: any | null, error: any, timerout = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data !== null) {
        resolve(data);
      } else {
        reject(error);
      }
    }, timerout);
  });
}
