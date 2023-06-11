import React, { useState, useEffect } from 'react';

export default function App() {
  const [num, setNum] = useState(0);
  const click = () => {
    setTimeout(() => {
      console.log(num);
    }, 3000);
    setNum(num + 1);
  };

  return <div onClick={click}>click {num}</div>;
}
