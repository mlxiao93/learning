import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

export default function App() {
  const [showDemo, setShowDemo] = useState();
  return (
    <div>
      <button onClick={() => setShowDemo(!showDemo)}>Show Demo</button>
      {showDemo && <Demo />}
    </div>
  );
}

function Demo() {
  const ref = useRef();
  function changeStyle() {
    const el = ref.current;
    el.style.marginLeft = '100px';
  }
  useLayoutEffect(() => {
    // sleep(1000);
    // changeStyle();
  }, []);
  useEffect(() => {
    changeStyle();
  }, []);
  sleep(300); // render执行时间长才能复现useFeect操作dom闪烁
  return <div ref={ref} style={{ marginTop: 10 }}>
    hello
  </div>;
}
function sleep(time) {
  let now = performance.now();
  while (performance.now() - now < time) {}
}