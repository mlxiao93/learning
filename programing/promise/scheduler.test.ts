import { Scheduler } from './scheduler';

describe('Scheduler', () => {
  let execList: number[] = [];
  let resolveList: number[] = [];
  let execCount: number = 0;
  let maxExecCount: number = 0;
  function createTask(id: number, timeout: number) {
    return () => {
      execCount++;
      maxExecCount = Math.max(execCount, maxExecCount);
      execList.push(id);
      return new Promise(resolve => {
        setTimeout(() => {
          execCount--;
          resolveList.push(id);
          resolve(id);
        }, timeout);
      });
    };
  }

  beforeEach(() => {
    execList = [];
    resolveList = [];
    execCount = 0;
    maxExecCount = 0;
  });

  test('run', async () => {
    const scheduler = new Scheduler();
    const result = await Promise.all([
      scheduler.run(createTask(1, 1000)),
      scheduler.run(createTask(2, 100)),
      scheduler.run(createTask(3, 2000)),
      scheduler.run(createTask(4, 100)),
    ]);
    expect(result).toEqual([1, 2, 3, 4]);
    expect(execList).toEqual([1, 2, 3, 4]);
    expect(resolveList).toEqual([2, 1, 4, 3]);
    expect(maxExecCount).toBe(2);
  });
});
