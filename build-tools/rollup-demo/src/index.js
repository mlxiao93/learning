import './index.css';
import foo from './foo.js';

export function hello() {
  console.log('hello');
  foo();
}

hello();
