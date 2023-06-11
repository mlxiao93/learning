function loadImage(url: string) {
  console.log('load', url);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(url);
    }, 1000);
  });
}

let limit: number;
let resolve: (data: any) => void;
let images: string[];
let wipCount: number = 0;

function doLoad() {
  if (!images.length) {
    resolve('finished');
    return;
  }
  if (wipCount >= limit) return;
  wipCount++;
  const wipUrl = images.shift();
  loadImage(wipUrl!).finally(() => {
    wipCount--;
    doLoad();
  });
}

function loadImages(propImages: string[], propsLimit: number): Promise<any> {
  limit = propsLimit;
  images = [...propImages];

  const res = new Promise(rsv => {
    resolve = rsv;
  });
  for (let i = 0; i < limit; i++) {
    doLoad();
  }
  return res;
}

loadImages(['1', '2', '3', '4', '5', '6'], 2);
