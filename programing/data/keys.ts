class Bar {
  proptoType = 0
  constructor() {}
}

const symbol = Symbol('');

class Foo extends Bar {
  a = 1;
  b = 2;

  constructor() {
    super();
    (this as any)[symbol] = 's';
  }
}

const obj = new Foo();

Object.defineProperty(obj, 'dynamic', {
  value: 3
})

const keyIn: string[] = [];
for (const key in obj) {
  keyIn.push(key);
}

console.log('keyIn               ', keyIn); // ['proptoType', 'a', 'b']

console.log('Object.keys         ', Object.keys(obj)); // ['proptoType', 'a', 'b']

console.log('getOwnPropertyNames ', Object.getOwnPropertyNames(obj)); // ['proptoType', 'a', 'b', 'dynamic']

console.log('ownKeys             ', Reflect.ownKeys(obj)); // ['proptoType', 'a', 'b', 'dynamic', Symbol()]

