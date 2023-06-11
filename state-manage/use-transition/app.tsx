import React, { useEffect, useState, useTransition } from 'react';

export default function App () {
  const [isPending, startTransition] = useTransition();

  const [kwd, setKwd] = useState('');

  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    startTransition(() => {
      setList(Array(20000).fill('').map(() => Math.random() * Math.random()));
    });
  }, [kwd]);

  return <div>
    <input value={kwd} onChange={(e) => setKwd(e.target.value)} />
    {isPending
      ? (
    <div>loading</div>
        )
      : (
      <Body list={list} />
        ) }
  </div>;
}

function Body ({ list }: { list: any[] }) {
  console.log('body render');

  return (
    <div>
      <ul>
        {list.map(item => (
          <li key={item}>{item}</li>
        )) }
      </ul>
    </div>
  );
}
