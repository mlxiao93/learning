import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

export default function App() {

  const [list, setList] = useState(['a', 'b', 'c', 'd', 'e']);

  function deleteItem(index) {
    const newList = [...list];
    newList.splice(index, 1)
    setList(newList);
  }

  return (
    <ul>
      {list.map((item, index) => (
        <li key={index} onClick={() => deleteItem(index)}>{item}</li>
      ))}
    </ul>
  );
}
