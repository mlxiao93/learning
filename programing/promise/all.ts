export function all(promiseList: Promise<any>[]): Promise<any[]> {
  return new Promise<any[]>((resolve, reject) => {
    const promiseCount = promiseList.length;
    const dataList: any[] = [];
    promiseList.forEach((promise, index) => {
      promise.then(
        data => {
          dataList[index] = data;
          if (dataList.length === promiseCount) {
            resolve(dataList);
          }
        },
        err => {
          reject(err);
        }
      );
    });
  });
}
