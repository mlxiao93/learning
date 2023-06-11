import React, { useState, Suspense, useEffect } from 'react';

const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setCount(count => count + 1);
    }, 1000);
  }, []);

  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <Sub count={count} />
      </Suspense>
      <div>count is {count}</div>
    </>
  );
};

const data = wrapPromise(fetchData());

function Sub({ count }) {
  // throw 'error';
  data.read();
  // new Promise();
  return <div className='sub'>I am sub, count is {count}</div>;
}

function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('OK');
    }, 3000);
  });
}

function wrapPromise(promise) {
  let status = 'pending';
  let result;
  let suspender = promise.then(
    r => {
      status = 'success';
      result = r;
    },
    e => {
      status = 'error';
      result = e;
    }
  );
  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    },
  };
}

export default App;
