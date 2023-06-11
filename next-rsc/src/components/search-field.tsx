'use client';

import { useState, useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function SearchField() {
  const router = useRouter();
  const pathName = usePathname();
  const [text, setText] = useState('');
  const [isSearching, startSearching] = useTransition();

  return (
    <div>
      <input
        placeholder='search'
        value={text}
        onChange={e => {
          const newText = e.target.value;
          setText(newText);
          startSearching(() => {
            router.push(`${pathName}?kwd=${newText}`);
          });
        }}
        className='flex-1 border border-gray-300 rounded-md h-10 px-3 py-2 w-full focus:border-blue-500 outline-none placeholder-gray-400'
      />
      <div
        style={{
          visibility: isSearching ? 'visible' : 'hidden',
        }}
      >
        searching...
      </div>
    </div>
  );
}
