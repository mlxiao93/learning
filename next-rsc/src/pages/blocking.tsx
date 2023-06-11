import '@/app/globals.css';
import Expensive from '@/components/expensive';
import { useState } from 'react';

let uniqueId = 0;

export default function Blocking() {
  const [text, setText] = useState('');
  const [list, setList] = useState<{ id: number; text: string }[]>([]);

  return (
    <div>
      <input
        placeholder='search'
        value={text}
        onChange={e => {
          const newText = e.target.value;
          setText(newText);
          setList(
            Array(10000)
              .fill('')
              .map((_, index) => ({
                id: ++uniqueId,
                text: `${index + 1}`,
              }))
          );
        }}
        className='flex-1 border border-gray-300 rounded-md h-10 px-3 py-2 w-full focus:border-blue-500 outline-none placeholder-gray-400'
      />
      <Expensive list={list} />
    </div>
  );
}
