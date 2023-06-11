import React from 'react';
import { signal } from '@preact/signals-react';

const count = signal(0);

setTimeout(() => {
  count.value = 100;
}, 2000);

export default function App () {
  return <div>
    <Header />
    <Body />
  </div>;
}

function Header () {
  console.log('header render');
  return (
    <p>
      <button onClick={() => count.value++}>count++</button>
    </p>
  );
}

function Body () {
  console.log('body render');

  return (
    <div>
      {count.value}
    </div>
  );
}
