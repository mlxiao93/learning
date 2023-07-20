import { useState } from 'react'

export default function ForTesting(props: {
  initCount?: number;
}) {

  const { initCount = 0 } = props;

  const [count, setCount] = useState<number>(initCount);

  return <div>
    <span>{count}</span>
    <button onClick={() => {
      setCount(count => count + 1);
    }}>count++</button>
  </div>
}