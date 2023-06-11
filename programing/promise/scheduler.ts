// 实现JS限流调度器，方法run接收一个返回Promise的函数，同时执行的任务数量不能超过2个
export class Scheduler {
  private limit = 2;
  private wipTaskCount = 0;
  private waitingTasks: {
    task: () => Promise<any>;
    resolve: (val: any | PromiseLike<any>) => void;
  }[] = [];

  private execTask() {
    if (this.wipTaskCount >= this.limit || !this.waitingTasks.length) return;

    this.wipTaskCount++;
    let wipTask = this.waitingTasks.pop();
    const { task, resolve } = wipTask!;
    resolve(
      task().finally(() => {
        this.wipTaskCount--;
        this.execTask();
      })
    );
  }

  public run = <T extends any>(task: () => Promise<T>): Promise<T> => {
    const taskResPromise = new Promise<T>(resolve => {
      this.waitingTasks.unshift({
        task,
        resolve,
      });
    });

    this.execTask();

    return taskResPromise;
  };
}
